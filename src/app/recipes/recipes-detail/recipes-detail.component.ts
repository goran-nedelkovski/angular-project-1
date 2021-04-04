import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
//12.final step, lets pass select recipe to recipe-detail comp.For that, we must create/add some own property in recipe-detail comp
  @Input() recipe:Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
