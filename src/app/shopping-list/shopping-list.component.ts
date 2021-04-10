import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';  // ../ ->one level up, t.e. back, out of this folder to the parent folder
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService] //4'''I will provide ShoppingListService in AppModule, because later I will access it from my Recipes section 
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[]; //3''' initialy will be undefined, and the value of the array will be in my service
  // [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10)
  // ];  //Igrediend model we will create in a sheared folder inside in a app folder, and it contains shared features/elements like ingredients which we will use in Recipe and in Shopping-list sections
//5'''inject shoppingList service in the constructor()
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    //6'''here in ngOnInit set the ingredients[] array to the its value from the service (from the method from the service)
    //6'''all initialization go to ngOnInit() (the best practice in gereral)
    this.ingredients = this.slService.getIngredients();
    //11'''(..A-B lecture) here in ngOnInit() I want to listen/subscribe to my own event
    this.slService.ingredientsChanged.subscribe(
      //we expect to receive some ingredient:Ingrediens[]
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }
  //8.implement that method here in ts comp, where we expect to receive the Igredient from $event, so as parameter I wourl write ingredient:ingredient (I know that I will receive Ingredient obj, because that data was send/pass from the event emit(Ingredient obj))
  // onIngredientAdded(ingredient:Ingredient) {
  //   //9.final, push my new ingredient obj to the Ingredients[] array
  //   this.ingredients.push(ingredient);
  // }

}
