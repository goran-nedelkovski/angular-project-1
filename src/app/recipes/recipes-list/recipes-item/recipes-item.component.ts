import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  //2.now because we don't have recipeEl any more in our recipe.item.html comp, so add/create own Custom Property recipe (of type Recipe model class) with @Input(), so be accessibla/bindiable from outside(from parent, from recipe-list comp)
  @Input() recipe:Recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
