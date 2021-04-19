import { EventEmitter, Injectable, Output } from '@angular/core';
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
//1''here I will add a new property (public), which will be my own Custom Event (So, I only add this in my Service.then emit this event in onSelected() in recipe-item comp).
   @Output() recipeSelected = new EventEmitter<Recipe>();//emit event's data of type Recipe (this property will hold Recipe) 
//Recipe service is the place where we manage our recipes
//2.copy/cut recipes[] array from RecipesList comp and make it private here (so to cant access from outside) 
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
//7.(lecture 123)Here we can inject ShopList service in the constrctor()
    constructor(private slService:ShoppingListService) {}
    //3.we can add/create getRecipes() method(public API) which can access to the private recipes[] (and here we can access to this method from outside and trough this method we can indirectly access to the private recipes[])
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


}
//5.we should add our both Services to a place when we can provide them. So, we could add them in app.module.ts, but lets first provide the RecipeService in the recipe.comp.ts for now