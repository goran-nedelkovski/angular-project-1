import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs'; //lets first import Subject obs from 'rxjs'
@Injectable({providedIn:'root'})
//1.lets create(manualy) a shopping-list.service.ts in the shopping-list folder (service file should be in the folder with that features, next to the component's files, best practice )
export class ShoppingListService {
///9'''(..A-B lecture)add/create a own event here in the Service (we could also remove slice() for getting the original array..but I will go with the second solution: with own event)
/////////////////(Course project-Observables)180. Improving the Reactive Service with Observables (Subjects)
//1.(180)//we can change(improve/replace) EventEmitter with Subject observable.lets first import Subject obs from 'rxjs'
//@Output() ingredientsChanged = new EventEmitter<Ingredient[]>(); //this EventEmitter will emit our Ingreadien[] array
//2.(180)//then I can create Subject observable obj just like EventEmitter here in the Service
ingredientsChanged = new Subject<Ingredient[]>();
//4.(220).to get this information(that index:number) to shopping-edit comp(because that is comp that I am editing), I will create Subject obsevable in the service to I can listen/subscribe in shopping-edit comp
startedEditing = new Subject<number>();//Subject is generic type of type:number(the type of the data that Subsect obs will send is number)
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
    // this.ingredientsChanged.emit(this.ingredients.slice());//simply call our own event.emit(copy of our array, not the oriiginal)
//2.(180)then replace emit() with next() (everywhere in this code in the Service.//next()=>send/emit our Observable with that new value as argument) 
    this.ingredientsChanged.next(this.ingredients.slice());
    }
//8.(lecture123)Here I will add new method addInghredients(here I expect to receive our list of ingredients)
    addIngredients(ingredients:Ingredient[]) {
        //1st way (better way) is to direcly add all ingredients objects(unpacking list of ingredients objects with spread operator(...)) and then emit our own event (and pass a copy of the array with slice) (go to recipes service)
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
        //2nd way is like this:
        // for(let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
    }
//So, basicaly everything(every busines logic from the component is replace here in the service)
}