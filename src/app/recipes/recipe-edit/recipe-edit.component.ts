import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
//164.///////////// Adding Editing Routes
//1.(164)to can add new Recipe and to add existing recipes, we need to create a new component(ng g c recipes/recipe-edit)
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number; ////3.(165)when I get/retreive that updated id, store it in a global variable id
//4.(165)//after I get the id, I want to find out wheter I'm editing the recipe on I'm creating a new recipe.So I want to store this information in a property editMode = false intialy(so initialy we are creating a new recipe(we are not on edit mode with false));
  editMode = false;
  //1.(165)inject route:ActivatedRoute in contructor()
  constructor(private route:ActivatedRoute) { }
//////////////////165. Retrieving Route Parameters (retreive the id and then determine wheter we are in edit or not)
  ngOnInit(): void {
  //2.(165)here in ngOniInit I will retreive/get the id (and base on that id I will load this component)
    // const id = this.route.snapshot.params['id'];
    //I will do this dinamicaly(2nd approuch, without snapshot, when params changes, updated..and params obj is Observable, we can subscribe to it and react reactivly to its dinamic changes)
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];//3.(165)when I get/retreive that updated id, convert the params['id'] from String to Number with + and then store it in a global variable id
      //5.(165)here in ngOninit after getting the id, I will check wheter I'm editing the recipe on I'm creating a new recipe whenever the id parameter changes
      //5.(165)check if the params['id'] !==null (t.e. if we get the updated id parameter) we are on Editing mode(so editMode will be set to true here).Otherwise if params['id']===null, then we are creating a new Recipe (so we are no longer in edit mode)
      this.editMode = params['id'] != null ? true : false; //we can check the value(if will be true or false) with Ternary operator or I can with if-else 
        console.log(this.editMode); //5.(165)we can see in the console that if I type ../0/edit => true, and if I type ../new =>false
        // if(params['id'] !== null) {
        //   this.editMode = true;
        // }
        // else {
        //   this.editMode = false;
        // }
        // console.log(this.editMode)
      }
    );  
  }

}
