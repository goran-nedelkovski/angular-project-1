import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'], 
  //5.lets first provide the RecipeService in the recipe.comp.ts
  providers: [RecipesService] //So all childs components of recipes parent comp will use this same instance of this Service Class (but only they will use this same instance, not Shopping-list components)
//6.Now, lets use RecipeServise in recipe-list component
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
