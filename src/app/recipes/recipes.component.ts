import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
//.store my own custom event in some property (in the main parent recipes comp)
  selectedRecipe:Recipe;  //here property is undefined (because we not asign a value), but we will asign a value in a template where event occur
  constructor() { }

  ngOnInit(): void {
  }
//10.define that method here with parameter recipe:Recipe that we expect to receive. (value/$event=recipe from method's call in the template is send here to this parameter recipe:Recipe).Then this parameter will be stored in our own property, and that property can be bind in the template with child property 
  onSelectedRecipe(recipe:Recipe) {
    this.selectedRecipe = recipe;
  }
}
