import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model'; //to inform typeScript we must import Recipe model class here

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://rasamalaysia.com/wp-content/uploads/2020/02/honey-garlic-salmon2.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://rasamalaysia.com/wp-content/uploads/2020/02/honey-garlic-salmon2.jpg')
  ];   //of type Recipe array t.e. array of Recipes t.e. array of Recipe objects t.e. [{Recipe obj1},{Recipe obj 2 },...
//for Image path, go to Google -> Recipe -> Image ->open image in new tab -> copy-paste that absolute url
//to can see this, we must do something in the .html template
  constructor() { }

  ngOnInit(): void {
  }

}
