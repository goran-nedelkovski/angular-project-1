//import { Action } from "@ngrx/store"; //import action from n@ngrx/store
import { Ingredient } from "../../shared/ingredient.model";
//import { ADD_INGREDIENT } from "./shopping-list.actions";
//////////////////349. Setting Up the NgRx Store
//1.(349)import everything * as Object from '...file'
import * as ShoppingListActions from "./shopping-list.actions";//import every thing with * as that object
//ShopingListActiojs is my object (every thing of this file is store in this object)
//4.(348)import ADD_INGREDIENT const in this reducer.ts file
////////////////346. Getting Started with Reducers
//1.(346)first we need to install the first package 'store' from the @ngrx module with: npm install --save @ngrx/store
//2.(346)then in shopping-list folder->create this new shop-list.reducer.ts file and here we need to provide Recucer (Reducer is justg a function)
//2'(346)//receive 2 arg(state//the current State before it was changed(it wil be changed by reducer here), 2nd argument is action//action that is trigger/fire to can update the state(action obj has identifier(id) and payload)and the state will update here in reducer base on that identifier(id).for ex.in teh action obj we are sending a new recipes or delete recipe, and then base on that id (wheter is new recipe or delete recipe) we can update the current state in the reducer and the return this new recucer state which in the end we can send to the Store(App state))
//3.(346)also we can set up an initial state (current state, that must be a js object).in there we can copy-paste our initial ingredients:Ingredient[] from the shop-list Service (import Ingredianrt model at the top)
const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)   
    ]
};
//4(346)we can set our 1st argument state to that initialState object as default (which means if state is null or undefined, the assign this initialState obj as default value).So when Reducer will run for the first time will recieve this state = initialState as argument
//3(349)we can specify the action with :ShopingListActions object.AddIngredient action class and we can use this approuch down there also
export function shoppingListReducer(state = initialState, action:ShoppingListActions.AddIngredient) {//receive 2 arg(state//the current State before it was changed(it wil be changed by reducer here), 2nd argument is action//action that is trigger/fire to can update the state(action obj has identifier(id) and payload)and the state will update here in reducer base on that identifier(id).for ex.in teh action obj we are sending a new recipes or delete recipe, and then base on that id (wheter is new recipe or delete recipe) we can update the current state in the reducer and the return this new recucer state which in the end we can send to the Store(App state))
    //5.(346)inside here we can find out which kind of action it is(add recipe or delete recipe or edit recipe..) and update the state base on that action
    ////////////////347. Adding Logic to the Reducer
    //1.(347)here we need to add multiple conditions with switch (we could with if-else also, but if we have a multiple conditions, its better with switch)
    switch(action.type) { //1'.I have to check the type of the action (action:Action.type//import Action at the top from @ngrx/store)
        //1''.now here we have regirtered some cases for the different types of action that we wanna handle
   //5.(348)instead of this string indentifier, use our imported const ADD_INGREDIENt
      //2.(349)use our import object here to can access to Add_INGREDIENT
        case ShoppingListActions.ADD_INGREDIENT://type is the identifier but its value is string
            // state.ingredients.push()=>this is bad practice (never touch the existing intial/old state).instead return a new obj {}
            return {
                ...state, //to not lose the the initial state, copy that data t.e. unpacking/copy the data with spread(...) operator (unpacking/copy all properties from the initialState obj and paste here in this new object t.e. here with spread(...) we have copy of the old data and its ok)
                ingredients: [ //this is the new data that will overwrite what you wanna change (so rule/best practice is to 1stg copy/unpacking the old state data with spread(...), and then 2nd add the new data that will overwrite what you wanna change)
                //4.(349)now instead action, we can specify the payload of the action (go to app.module.ts)
                    ...state.ingredients, action.payload //here I dont wnna lose the old ingredients objects, so I will copy/unpcking them with spread(...), and add new action object 
                ]
            } //here we have to return a new updated state

    }

}

