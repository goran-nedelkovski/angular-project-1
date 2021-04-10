import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
@Injectable({providedIn:'root'})
//1.lets create(manualy) a shopping-list.service.ts in the shopping-list folder (service file should be in the folder with that features, next to the component's files, best practice )
export class ShoppingListService {
///9'''(..A-B lecture)add/create a own event here in the Service (we could also remove slice() for getting the original array..but I will go with the second solution: with own event)
@Output() ingredientsChanged = new EventEmitter<Ingredient[]>(); //this EventEmitter will emit our Ingreadien[] array
//1'''add/replace the Ingredient[] here from shopping-list comp.this service will manage our shopping-list(our ingredients)
//1''' and make it private
private ingredients:Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)   
    ]
//2''' add this method that will return only the Copy of the original Ingredient[] array (with slice())
    getIngredients() {
        return this.ingredients.slice();
    }
//7'''add/create addIngredient() for adding new Ingredient.I know that I will receive ingredient:Ingredient (after this, go to shopping-edit comp)
//7'''So, basicaly everything(every busines logic from the component is replace here in the service)
    addIngredient(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
    //10'''(..A-B lecture) here whenever we changed our array(whenever change array with new ingredient added), simply call our own event.emit(copy of our array, not the oriiginal)
    this.ingredientsChanged.emit(this.ingredients.slice());//simply call our own event.emit(copy of our array, not the oriiginal)
    }
//So, basicaly everything(every busines logic from the component is replace here in the service)
}