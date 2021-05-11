import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
//12.final step, lets pass select recipe to recipe-detail comp.For that, we must create/add some own property in recipe-detail comp
  // @Input() recipe:Recipe;
  //////////////////162. Configuring Route Parameters
  //1.(162) remove @Input()
  recipe:Recipe;
  //4.(162)create that global id variable
  id:number;
//3.(lecture123)=>in the constructor() I wlll inject Recipes service (go to Recipes service)
  constructor(private recipesService:RecipesService,
  //2.(162)inject route:ActivatedRoute in the consttuctor() in recipes-detail (in this comp to be loaded)
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
  //3.(162)In ngOniInit() in recipes-detail comp, we retrive/load/get the recipe with the current id (we initializing here)
    //1st approuch of retreiving the id (with snapshot).This will work only when we loaded this comp for the first time (and set that first getting value of the id)
    // const id = +this.route.snapshot.params['id'];
    // this.recipe = this.recipesService.getRecipe(id);
//2nd approuch(we will use this approuch, intead of 1st), dinamic(without snapshot, when params changed, updated, dinamic).With this approuch we can react/subscibe() to any dinamic changes of params Observable object
    this.route.params.subscribe(
      //here we get/receive the changed params
      (params:Params) => {
        this.id = +params['id'] //4.(162)when we get the changed params obj with that id property(params['id']),convert it from string into Number with + and store it into global id variable
        //5.(162)with this id information, we want to load our Recipe from our recipes.service.ts (load our recipe from that recipes[] there).So in Recipe service we need to create a method getRecipe(id:number)
        //6.(162).Here (after fetch the id and storing in a variable), I want to fetch my new Recipe from the recipes.service with that id and store it in the recipe variable
        this.recipe = this.recipesService.getRecipe(this.id);
        //now if we manuely type in the IRL: localhost:4200/recipes/0 -> will be loaded/render the 1st recipe on the right(in this recipes-detail comp)
      }
    );
  }
//2.(lecture 123)=>now this function will be executed in recipe-detail ts
  onAddToShoppingList() {
//5.(lecture123) call that method from the service and pass the ingredients of this recipe
    this.recipesService.getIngredientsToShoppingList(this.recipe.ingredients)
  }
//4.(166)in this method in the ts, we need to navigate to 'edit' (so inject router and route).//because we are already in the recipes with the current id t.e. we are already in /recipes/:id (/recipes/0 or /recipes/1), we only need to navigate to 'edit' relativly to this currently active route
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo:this.route});
//So, we dont need id here(its only for demo purposes)
///4.(166)the alternative way is(more complex):
  //this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.route}); //up one level(to the /recipes folder, and from there add first this.id(the current updated id that we get) and second add 'edit' (t.e. from ../recipes go to :id/edit))
  }
//5(234) Implement this onDeleteRecipe() in the ts code and call here deleteRecipe() from the RecipeService with this.id as argument (go to recipe-edit template)
  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
  ////////////////235. Redirecting the User (after Deleting a Recipe)
//1(235)we go in recipe-detail comp(vecause here lives the delete button) and here in this method in the ts, we need to navigate away (navigate to /recipes)
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
  /////////////////168. One Note about Route Observables
  //1.(168)//when we use pre-defined(menaged) Observable from angular, we don't need to clean them(dont need to unsubscribe), but when I use my own created Obserbavles, at the end I must to clean them(to unsubscribe() to them)
}

