import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
//import * as EventEmitter from 'node:events';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
//3.add two properties with @ViewChild('select the local reference here')
  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  //4.create my own event with @Outpu() and EventEmitter<here is the type of the data that we will emit, and that is Ingredient model object(type definition)>()  
  // @Output() ingredientAdded = new EventEmitter<{name:string, amount: number}>();  //pass js object type in EventEmitter with properties name:string and amount:number (or we can replace this type definition object with the Ingredient model like this:
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
  // @ViewChild('nameInput') nameInput:ElementRef;
  // @ViewChild('amountInput') amountInput:ElementRef;
  // @Output() ingredient = new EventEmitter<void>();

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
  }
//2.define onAddItem() in ts code comp.
  onAddItem() {
    //3.in onAddItem() method I want to emit my new own event where I can pass this data(these 2 inputs values in new object/incaence) to the parent component(to the shop-list comp, to Ingredient[])
    //5.So,in onAddItem() first we can create a new Ingredient object/instance of Ingredient model class with those 2 input values in the Ingredient's contructor()
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    //6.emit my new own event where I can pass this data(t.e. pass the newIngredient object/instance as data) to the parent component(to the shop-list comp, to Ingredient[])
    //this.ingredientAdded.emit(newIngredient); 
    //8'''remove the emitted event(we no longer need the event)
    //8'''and instead of emit event, call the addIngreadient(with newIngredient object/instance from here) from the Service (but first inject the service in the constructor())
    this.slService.addIngredient(newIngredient);
  }
  // addIngredient(nameInput, amountInput) {
  //   this.nameInput = nameInput.nativeElement.value;
  //   this.amountInput = amountInput.nativeElement.value;
  //   ingredient = new Ingredient(this.nameInput, this.amoutInput);
  //   this.ingredient.emit();
  // }

}
