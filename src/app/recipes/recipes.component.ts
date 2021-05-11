import { Component, OnInit } from '@angular/core';
//import { Recipe } from './recipes.model';
//import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'], 
  //5.lets first provide the RecipeService in the recipe.comp.ts
  //providers: [RecipesService] //5''So all childs components of recipes parent comp will use this same instance of this Service Class (but only they will use this same instance, not Shopping-list components)
//1.(237)instead here in recipes component, we must provide Recipe Service in app.module.ts (because here all child recipes components share this service instance, but when we navigate away to the shop-list, this recipes comp is destroyed)
  //6.Now, lets use RecipeServise in recipe-list component
})
export class RecipesComponent implements OnInit {
//.store my own custom event in some property (in the main parent recipes comp)
  // selectedRecipe:Recipe;  //here property is undefined (because we not asign a value), but we will asign a value in a template where event occur
//5'' in my mayn Recipe component I want to listen my own event.So, first inject the Recipe service in the constructor()
  // constructor(private recipesService:RecipesService) {}
//6''here in ngOnInit I will listen/subscribe to my own emitted event (her I can set up my listener)
  ngOnInit(): void {
    //  this.recipesService.recipeSelected.subscribe(
    //   //6''here in subcribe(), I know that I will receive some recipe data of type Recipe (because we have emitted Recipe data with EventEmitter<Recipe>(), so store receiving data in some parameter recipe:Recipe)
    //   (recipe:Recipe) => {
    //     console.log('Selected recipe is'+ recipe);
    //     //7'' store my receiving recipe in property this.selectedRecipe (which we can bind-sinhronize in .html template to can output it)
    //     this.selectedRecipe = recipe;
    //   }
    // );
  }
//10.define that method here with parameter recipe:Recipe that we expect to receive. (value/$event=recipe from method's call in the template is send here to this parameter recipe:Recipe).Then this parameter will be stored in our own property, and that property can be bind in the template with child property 
  // onSelectedRecipe(recipe:Recipe) {
  //   this.selectedRecipe = recipe;
  // }
}
