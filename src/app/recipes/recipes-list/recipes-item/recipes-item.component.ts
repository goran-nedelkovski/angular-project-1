import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  //2.now because we don't have recipeEl any more in our recipe.item.html comp, so add/create own Custom Property recipe (of type Recipe model class) with @Input(), so be accessibla/bindiable from outside(from parent, from recipe-list comp)
  @Input() recipe:Recipe;
  // @Output('selectedRecipe') selectedRecipe = new EventEmitter<{name:string, description: string, imagePath: string}>();
  //2.create/add my own Custom event recipeselected, that I will emit in onSelected() method
  @Output() recipeSelected = new EventEmitter<void>(); //EventEmitter here won't pass any informations, so type is void (return nothing)(don;t contain any informations)
  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    //console.log(event.target);
    //console.log(this.selectedRecipe.emit({name:event.name, description:event.description, imagePath:event.imagePath}));
   //3.in this method I want to emit my own Custom event
    this.recipeSelected.emit(); //we dont't pass anything in emit() (but we could pass Recipe, but we dont do that, because what is parent comp listen?)
  }
}
