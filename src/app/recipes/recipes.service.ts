import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
//import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipes.model';
@Injectable({providedIn: 'root'})
// Instead of adding a service class to the providers[]  array in AppModule , you can set the following config in @Injectable() :
// @Injectable({providedIn: 'root'})
// export class MyService { ... }
//Services => are classes for centrilize/store our busines logic code, for managing data in the central place and so on..
//we will need 2 services here: shopping-list services (for managing our shopping-list data) and recipe service (for managing our recipe component data)
//1.lets create(manualy) a recipes.service.ts in the recipes folder (service file should be in the folder with that features, next to the component's files )
//1.Service is a normal ts Class (no need of Decorator, unless @Injectable() if we plan to inject a service into this service)
export class RecipesService {
//9(233)lets create a Subject observable in our Recipe Service, whenever the recipes[] changes(just like in a shoping-list service)
    recipesChanges = new Subject<Recipe[]>(); //<Subject obs is of geeneric type Recipe[]>
//1''here I will add a new property (public), which will be my own Custom Event (So, I only add this in my Service.then emit this event in onSelected() in recipe-item comp).
// @Output() recipeSelected = new EventEmitter<Recipe>();//emit event's data of type Recipe (this property will hold Recipe) 
//6.(180)in recipes Service, replace EventEmitter with Subject observable (Import Subject from 'rxjs' here in this Service).And we can remove it because we dont need (But if I want to select different Recipe, I will use Subject obs)
    // recipeSelected = new Subject<Recipe>();  
//Recipe service is the place where we manage our recipes
//2.copy/cut recipes[] array from RecipesList comp and make it private here (so to cant access from outside) 
///////////////283. Transforming Response Data
//1.(283)we no longer need this existing array of recipes(because we have fetched/loaded recipes:Recipe[]]), so I will comment this array (comment to in case if we need again this dummy data)
private recipes:Recipe[] = [
        new Recipe('Tasty Snitzel',
         'This is simply a test',
          'https://rasamalaysia.com/wp-content/uploads/2020/02/honey-garlic-salmon2.jpg',
          [
        //2''''add here in recipes[], add [] of some new Ingredien() in both (then go to repipes-detail comp)
              new Ingredient('Meat', 1),
              new Ingredient('French Fries', 20)
          ]),
        new Recipe('Big fat Burger',
         'This is simply a test', 
         'https://rasamalaysia.com/wp-content/uploads/2020/02/honey-garlic-salmon2.jpg',
         [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
         ])
    ];   //of type Recipe array t.e. array of Recipes t.e. array of Recipe objects t.e. [{Recipe obj1},{Recipe obj 2 },...
//2.(283)instead I wi/ll initialize private property recipes: Recipe[] to an empty array [].(so when app load, we will have no recipes loaded here)(go to Data Storage service)
    //private recipes: Recipe[] = [];
    //7.(lecture 123)Here we can inject ShopList service in the constrctor()
    constructor(private slService:ShoppingListService) {}
    //3.we can add/create getRecipes() method(public API) which can access to the private recipes[] (and here we can access to this method from outside and trough this method we can indirectly access to the private recipes[])
//5.(282) create a method to overwrite/re-set the existing array of Recipes (overwright this array with fetched/loaded recipes) with fetched/loaded recipes
    setRecipes(recipes: Recipe[]) { //we expect to get/retrieve as parameter recipes:Recipe[] (our fetced/loaded recipes)
        this.recipes = recipes; //5.(282)(and this will overwrite/re-set our existing array with new fetched/loaded recipes(with parameter recipes:Recipe[]))
        //6.(282) since we changed our recipes array, we need to call here recipesChanged subject observable and send/emit/push the new value (this.recipes.slice()-the copy) with next() (go back to dataStorage Service)
        this.recipesChanges.next(this.recipes.slice()); //emit/send/next this new array of fetched/loaded recipes, send/next() back to the DataStorage Service(t.e. to the place where we are interested/care about the response (where we subscibe to our fetched/loaded recipes)))
        // this.dataStorageService.fetchRecipes().subscribe(
        //     recipes => {
        //         this.recipes = recipes;
        //     }
        // );
    }
    getRecipes() {
    //with this.recipes we return a direct reference to the array
    //4.because array are objects of reference type (from javaScript-reference type lecture), we can create a copy of the array with slice() and with that slice() method we return a new array which is copy of the original array (and with that we can't access to the original private array from outside, but we only get the copy)
        return this.recipes.slice(); //we can create a copy of the array with slice() and with that slice() method we return a new array which is copy of the original array (and with that we can't access to the original private array from outside, but we only get the copy)
    //(from javaScript-primitive type(variables) and reference type(Objects, arrays))
    }
//4.(lecture 123)Add this method in this Recipes service
    getIngredientsToShoppingList(ingredients:Ingredient[]) {
//6.(lecture 123)Here we need to access to the Shoppinglist service.So add @Injectable() when we add service into service
       //7.(lecture123)access-rich here to the service here in the method (go to slService and add new method addIngredients() and after that come back here in recipes Service)
       //9.(lecture123) access to addIngredients() from shService here in Recipe service  
       this.slService.addIngredients(ingredients);
    }
//5.(162)So in Recipe service we need to create a method getRecipe(id:number)
    getRecipe(id:number) {
        return this.recipes[id]; //return recipes[select item(id) as index] (go back to recipes-detail comp (comp to be loaded))
    }
//2(233)in my recipe Service lets create these 2 methods
    addRecipe(recipe: Recipe) { //expect go receive recipe:recipe as parameter
     //3.(233)add-save/push my recipe in recipes[] 
        this.recipes.push(recipe); //add-save/push my recipe in recipes[]
    //10.(233)here in addRecipe() our Recipe[] will change and I will here call our Subject obs that will emit/send value of ouchanged recipe[]/copy (go to recipe-list comp)
        this.recipesChanges.next(this.recipes.slice());
    }
    updateRecipe(index:number, newRecipe:Recipe) {//expect to recieve current index:number and newRecipe:recipe
    //4.(233)update/replace the existing/old one at the current index, replace/set with newRecipe:recipe
        this.recipes[index] = newRecipe; //update/replace the existing/old one at the current index, replace/set with newRecipe:recipe 
    //10.(233)also in updateRecipe() do the same because our Recipe[] will change and I will here call our Subject obs that will emit/send value of our changed recipe[]/copy (go to recipe-list comp)
    this.recipesChanges.next(this.recipes.slice());
    }
    ////////////////234. Adding a Delete and Clear (Cancel) Functionality
    //1(234)in Recipe service add deleteRecipe() method
    deleteRecipe(index:number) { //we expect to get as argument the index:number of the recipe
    //2(234)with splice() we can Remove the current Recipe(with the current index); splice(1st argument is the index, 2nd argument is the the number of removed items(1))
        this.recipes.splice(index, 1); 
    //3(234) after the array changed, call recipesChange subject observable and send/emit the new/changed/updated array(copy of this new/changed array) (go to recipes-detail template)
        this.recipesChanges.next(this.recipes.slice());
    }


}
//5.we should add our both Services to a place when we can provide them. So, we could add them in app.module.ts, but lets first provide the RecipeService in the recipe.comp.ts for now