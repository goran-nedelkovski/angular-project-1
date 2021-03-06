import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import * as EventEmitter from 'node:events';
import { Recipe } from '../recipes.model'; //to inform typeScript we must import Recipe model class here
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
 private subscription:Subscription;
  //7.create new own custom event (this is 2nd custom event, that will be emitted to the main parent recipe),and EventEmitter will be of type Recipe(we pass Recipe here, because this information need it on the recipe parent in the end) 
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes:Recipe[]; //6'.this will be undefined initialy, because we have already manage this recipes[] in RecipeService class
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://rasamalaysia.com/wp-content/uploads/2020/02/honey-garlic-salmon2.jpg'),
  //   new Recipe('Another Test Recipe', 'This is simply a test', 'https://rasamalaysia.com/wp-content/uploads/2020/02/honey-garlic-salmon2.jpg')
  // ];   //of type Recipe array t.e. array of Recipes t.e. array of Recipe objects t.e. [{Recipe obj1},{Recipe obj 2 },...
//for Image path, go to Google -> Recipe -> Image ->open image in new tab -> copy-paste that absolute url
//to can see this, we must do something in the .html template

//6'.Now, lets use/inject instance of RecipeServise class in the constructor() in recipe-list comp
constructor(private recipesService:RecipesService,
  private router:Router,
  private route:ActivatedRoute) {}

  ngOnInit(): void {
  //11(233)now in my recipe-list component I want to subscibe/listen to my Subject observable(here in this component because here we are get the recipes )
    //3.(283)we need to unsubscribe here in recipe-list comp when we want to leave this comp.So 1st implement OnDestroy interface, 2nd create a private property:Subscription and store this subscribe code in that property and 3rd in ngOnDestroy unsubscibe() on this subscription property.
    this.subscription = this.recipesService.recipesChanges.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    );
  //6'.we will get the value of recipes[] here in ngOnInit.And for that, we get to inject our Service in the constructor()
  this.recipes = this.recipesService.getRecipes(); //get the copy of that array and store in the recipes property 
}
//7'finaly when we save and see the page on the browser, we see that its the same as before, because we only menage our recipes[] in the Service


//6.now, when we have/get that information of recipeEl (which recipe was selected), we will get here the selected Recipe by passing recipe:recipe
//7.here in this method we want to emit my new created event(2nd custom event) to the main parent recipe.component, lets create it first
  //4''remove it onRecipeSelected()
// onRecipeSelected(recipe:Recipe) {
  //   //console.log(event)
  //   //console.log(recipe);
  //   this.recipeWasSelected.emit(recipe); //8.in emit() we pass recipe as data (emit(recipe) to the recipe parent component)
  // }

  //2.(166)//in this method in the ts code, navigate to ../new path (inject router and route)
  onNewRecipe() {
      this.router.navigate(['new'], {relativeTo:this.route});//we are alreadu in /recipes, so I will use 'new'(relative path to that apsolute path /recipes)(next we need to do the same with edit link, so go to recipes-detail)
  }
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
