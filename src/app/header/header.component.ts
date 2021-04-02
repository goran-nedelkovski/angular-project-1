import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes/recipes.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //with @Output decorator, this our own event will be listenable from outside(from our parent component, app comp)
  @Output() featureSelected = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature:string) {
    this.featureSelected.emit(feature) //emit our feature:string that we received as parameter value 'recipe' string in our methods call in the template 
  }
  // onSelect('shopping-list') {

  // }

}
