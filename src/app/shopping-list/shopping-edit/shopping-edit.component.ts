import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
//import * as EventEmitter from 'node:events';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
//4.(221)now since we are in Edit mode, we want to update our form.So we can access to the form with @ViewChild and f-local Reference
  @ViewChild('f') slForm:NgForm; //4.(221)Create @VieChild('f')//to access to the form with @ViewChild('select here the local reference f object')
  private subscription:Subscription;//create property for the subscription
  //10(220)I will store my Mode in a property and initialy set to false
    editMode = false;
    editedItemIndex:number; //create new prperty for the id that we get
  //3(221)//in shop-edit comp, store the item(ingredient:Ingredient with the current id from the shop-list Service) in a property
    editedItem:Ingredient;

    //3.add two properties with @ViewChild('select the local reference here')
  // @ViewChild('nameInput') nameInputRef:ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;
  //4.create my own event with @Outpu() and EventEmitter<here is the type of the data that we will emit, and that is Ingredient model object(type definition)>()  
  // @Output() ingredientAdded = new EventEmitter<{name:string, amount: number}>();  //pass js object type in EventEmitter with properties name:string and amount:number (or we can replace this type definition object with the Ingredient model like this:
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
  // @ViewChild('nameInput') nameInput:ElementRef;
  // @ViewChild('amountInput') amountInput:ElementRef;
  // @Output() ingredient = new EventEmitter<void>();

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    //6.(220)here in ngOnInit(in shop-edit comp) we can subscribe/listen to our Observable to get/retreive the id 
    //7(220)I will store my subsription in that private property
    this.subscription = this.slService.startedEditing.subscribe(
     //we know that we will receive the index(id) 
      (index:number) => {
    //9.(220)here we are on Edititing..but we need to specify/determine what should we do when the form is submitted?to create a new item or editting the existing one 
        this.editMode = true; //editMode set to true because we are editing here, t.e.curently we are on editing mode
        this.editedItemIndex = index; //11(220).store the index in a property
    //3(221)//in shop-edit comp,we can access/reach to the new method getIngredient(index) of the Service and store the item(ingredient:Ingredient with the current id(index:number that we get here) from the shop-list Service) in a property
        this.editedItem = this.slService.getIngredient(index);
   //4.(221)now since we are in Edit mode(and we get the item/Ingredient with this id), we want to update our form.So we can access to the form with @ViewChild and f-local Reference  
      //5.(221)and Here in ngOnInit (while we on edit mode and we get the item/Ingredient with this current id t.e. in our subscription) we aceess to our form and setValue({updated form object with the name value and amount value of the item/ingredient})
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      //5(221)whenever we select a new item(Ingredient), we can populate the form with the right values(name and amount) of that item
      }
    );
  }
//2.define onAddItem() in ts code comp.
//4.(218).I can remove that @ViewChilds in the ts code and in onAddItem() we expect to receive as parameter form:NgForm (form of type NgForm(form js object).Import NgForm from @angular/forms)
  onSubmit(form:NgForm) {
  //5.(218)we can get the value of the form with form.value and store that in a property const value
  const value = form.value;
    //3.in onAddItem() method I want to emit my new own event where I can pass this data(these 2 inputs values in new object/incaence) to the parent component(to the shop-list comp, to Ingredient[])
    //5.So,in onAddItem() first we can create a new Ingredient object/instance of Ingredient model class with those 2 input values in the Ingredient's contructor()
  //6.(218)here when I create a new ingredient obj/instance I can use that const value to access to the properties name and amount of the form js object(value.name and value.amount)  
    const newIngredient = new Ingredient(value.name, value.amount);
    //6.emit my new own event where I can pass this data(t.e. pass the newIngredient object/instance as data) to the parent component(to the shop-list comp, to Ingredient[])
    //this.ingredientAdded.emit(newIngredient); 
    //8'''remove the emitted event(we no longer need the event)
    //8'''and instead of emit event, call the addIngreadient(with newIngredient object/instance from here) from the Service (but first inject the service in the constructor())
  //5(222)here in onAddItem() if we are in EditMode, we can call updateIngredients(editedItemIndex, newIngredient) from the Service, else we can call addIngredient() from the Service
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }
  //5.(222)else if we are not in editMode, then add new Ingredient
    else {
      this.slService.addIngredient(newIngredient);
    }
  ///////////////////223. Resetting the Form
  //1.(223)here in onAddItem() after we save the Updated value or save the new value of the form, we can reset the form here with form.reset();
    //2.(223) here we can switch edit mode back to false (and now we are not on editMode, t.e. we are on add new items mode)(because we were stack in editMode=true and we have never leave this editMode=true), so we can leave it now (because we are done)
    this.editMode = false;
    form.reset();
  //3(223)also I can change/replace the name of this method onAddItem() to onSubmit() here and in the template
     
  }
  // addIngredient(nameInput, amountInput) {
  //   this.nameInput = nameInput.nativeElement.value;
  //   this.amountInput = amountInput.nativeElement.value;
  //   ingredient = new Ingredient(this.nameInput, this.amoutInput);
  //   this.ingredient.emit();
  // }
  //8.(220)In ngOnDestroy I can clean up(unsubscribe) when I leave this component, so I will store the subsription in a private property and here I will unsubsc() to the subsciption
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  //2(224)in this method onClear() in the ts code, reset the form and switch editMode to false.(so with this, we clear/cancel the form ) 
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  //2(225)in this onDelete() method(in ts code)first call onClear(); and we need to inform the Service that one of the items will be delete (so go to the shop-list Service and create delete method there)
  onDelete() {
    //5.(225)in onDelete() in our component, call that deleteIngredient() from the service and pass as parameter this.index property from this component
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();//call onClear(); 
  }

}
