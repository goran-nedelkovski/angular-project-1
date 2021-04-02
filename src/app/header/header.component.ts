import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes/recipes.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //3.create own event featureSelected
  //with @Output decorator, this our own event will be listenable from outside(from our parent component, app comp)
  @Output() featureSelected = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }
//2.define that method, we expect to receaive as parameter some feature:string
  onSelect(feature:string) {
    this.featureSelected.emit(feature) //4.emit our feature:string that we received as parameter value 'recipe' string in our methods call in the template 
  }
  // onSelect('shopping-list') {

  // }

}
