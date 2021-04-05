import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';  // ../ ->one level up, t.e. back, out of this folder to the parent folder

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];  //Igrediend model we will create in a sheared folder inside in a app folder, and it contains shared features/elements like ingredients which we will use in Recipe and in Shopping-list sections

  constructor() { }

  ngOnInit(): void {
  }
  //8.implement that method here in ts comp, where we expect to receive the Igredient from $event, so as parameter I wourl write ingredient:ingredient (I know that I will receive Ingredient obj, because that data was send/pass from the event emit(Ingredient obj))
  onIngredientAdded(ingredient:Ingredient) {
    //9.final, push my new ingredient obj to the Ingredients[] array
    this.ingredients.push(ingredient);
  }

}
