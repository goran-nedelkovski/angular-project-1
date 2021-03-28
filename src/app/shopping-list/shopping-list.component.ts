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

}
