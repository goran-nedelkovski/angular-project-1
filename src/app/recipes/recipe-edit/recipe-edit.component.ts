import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';
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
//2(227)the form its selft will be a property, so I will create property recipeForm:FormGroup (type FormGroup import from @ang/forms)
  recipeForm:FormGroup;
  //1.(165)inject route:ActivatedRoute in contructor()
  constructor(private route:ActivatedRoute, 
    private recipesService:RecipesService) { }
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
  //10(227)here in ngOnInit in the subscription(...) we can call our private method initForm(), call it whenever the params obs has change (because that indicates that we reload the page with the new id parameter)
        this.initForm();
      //console.log(this.editMode); //5.(165)we can see in the console that if I type ../0/edit => true, and if I type ../new =>false
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
  //5.I will add this method onSubmit() in my ts code and inside simply log to the console my recipeForm)
  onSubmit() {
    console.log(this.recipeForm);
  }
  /////////////////227. Creating the Form For Editing Recipes
  //1.(227)after we created form's template, lets initial our form here in this ts method.Its important here to know wheter we are on edit mode or on new mode.first I will create a private method here in recipes-edit comp
  private initForm() { //3.(227)initial our form here with a value new FormGroup(to guve us the outer sheal/frame of our form,//pass js object with key:value pairs of the controls that I ant to register here)
   let recipeName = ''; //create outside new local variable
    let recipeImagePath = '';//7.(227)//the same will be true with imagePath also, so lets create a property for imagePath = '' initialy and if we are on editMode then set the value of this property to recipe.imagePath.
    let recipeDescription = ''; //8.(227)//7.(227)//the same will be true with descrdiption also, so lets create a property for recipeDescription = '' initialy and if we are on editMode then set the value of this property to recipe.description.
    //5.(227)here we will write some logic of what the value will be if we are on editMode
    if(this.editMode) {
      //6.(227)inject our Recipe Service and the if we are on editMode then the value of recipeName will be the currentRecipe (with that current id) .name
      const recipe = this.recipesService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
   this.recipeForm = new FormGroup({ 
     //4.(227)here in FormControl()we have to deceide/determine wheter we are on editMode or not.So create outside new local variable 
      'name': new FormControl(recipeName), //9(227)in FormControl() pass as argument recipeName.So the value of recipeName will be eahther '' (empty string, if we are not on editMode) or the value will be recipe.name(current recipe that we are editing). do the same with other 2 controls
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }
}
