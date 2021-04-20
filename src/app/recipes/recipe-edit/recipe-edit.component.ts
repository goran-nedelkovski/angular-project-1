import { Component, OnInit } from '@angular/core';
//164.///////////// Adding Editing Routes
//1.(164)to can add new Recipe and to add existing recipes, we need to create a new component(ng g c recipes/recipe-edit)
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
