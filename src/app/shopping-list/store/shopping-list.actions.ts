//6.(348)also import Action here
import { Action } from "@ngrx/store"; //import action from n@ngrx/store
import { Ingredient } from "src/app/shared/ingredient.model";
///////////////348. Understanding & Adding Actions
//1.(348)lets create this new file shop-list.actions.ts in shop-list folder
//2.(348)create a new subfolder 'store' in the shop-list folder and move action.ts and reducer.ts files in this folder (with drag and drop here or with copy-paste)
//3.(348) create a const/variaboe to store our string indentifier to this const/var.and with export this const, we can import this in other files(in reducer.ts, so go to shop-list.reducer.ts)
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
//7.(348)we can create/export our class AddIngredient and implements Action interface class(the action must have identifier and payload(body data))
export class AddIngredient implements Action {
//8.this Action interface forces us to structure our AddIngredient class in a sertain way: 1st the action must have identifier t.e. type property and 2nd payload(body data) property) 
//8.t.e. this Action interface force us to use these properties: type(identifier) and payload(body data)
    readonly type = ADD_INGREDIENT; //8'.1st property type = ADD_InGREDIENT and extra notation with readonly (that means that this property type mustg never change from outside, it can only be readed, but not overwrite this)
    payload: Ingredient //8''2nd property payload: Ingredient (this payload property should be of type Ingredient)
}