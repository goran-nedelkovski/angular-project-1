import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
//12.final step, lets pass select recipe to recipe-detail comp.For that, we must create/add some own property in recipe-detail comp
  @Input() recipe:Recipe;
//3.(lecture123)=>in the constructor() I wlll inject Recipes service (go to Recipes service)
  constructor(private recipesService:RecipesService) { }

  ngOnInit(): void {
  }
//2.(lecture 123)=>now this function will be executed in recipe-detail ts
onAddToShoppingList() {
//5.(lecture123) call that method from the service and pass the ingredients of this recipe
    this.recipesService.getIngredientsToShoppingList(this.recipe.ingredients)
  
}
}
