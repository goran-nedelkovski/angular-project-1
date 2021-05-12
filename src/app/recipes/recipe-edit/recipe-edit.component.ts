import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipes.model';
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
    private recipesService:RecipesService,
    private slService: ShoppingListService,
    private router:Router) { }
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
    ////////////////////233.Submit the form
    //1.(233)here in onSubmit() I dont want to print my form, but I want to save/add my form(recipe) in my array of recipes or update the existing one.(for that go to recipes.service.ts and create these 2 methods)
    //console.log(this.recipeForm);
    //6.(233)(1st way)lets create a newRecipe obj/instance here outside of if- with new Recipe(here in Recipe() constructor we need to pass all the data of my recipeForm that the constructor expects: this.recipeForm.value['name'], ...)
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['imagePath'], 
    //   this.recipeForm.value['description'], 
    //   this.recipeForm.value['ingredients']);
    if(this.editMode) {
    //5(233)check if we are on EditMode(true), then update the existing one, t.e. call updateRecipe() from the Service.as 1st argument pass this.id, and as 2nd argument we need to create a newRecipe (const newRecipe=new Recipe(...) outside of if-else)
      // this.recipesService.updateRecipe(this.id, newRecipe);
    //8.(233)(2nd way)instead of createing newRecipe obj/instance, we can do with shortend, t.e. we can pass as 2nd argument only this.recipeForm.value (and this obj will contain all the properties of my Recipe/all empty input fields, so its the same)  
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    }
    //7.(233)else if we are not in editMode, then add/save a new recipe in my recipes[] t.e. call addRecipe() from the Service and pass newRecipe obj/instance here as argument (or we can pass as 2nd argument only this.recipeForm.value (and this obj will contain all the properties of my Recipe/all empty input fields, so its the same)  )
    else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    //8.(234)also here in Submit() I will call onCancel() because we have done at this point and we can navigate away
    this.onCancel();
  //9.(233)but because when we get our Recipes in the Service we use .slice()/copy so, this recipe thatg we are using in component is not the same as that recipes in the Service)(because of slice()).So go in the recipesservice.ts and create a Subject observable (just like in a shoping-list service) 
  }
  ////////////////231.Adding new Ingredient Controls
  //3(231)in this method (in the ts) I can dinamicaly add new Ingredient like this:
  onAddIngredient() {//4.(231)access to the array 'ingredients' must be with get('ingredients')(getter) and to understand angular that this is an Array, we must define the generic type at the begining <FormArray> and all this part with () t.e. (<FormArray>this.recipeForm.get('ingredients')) 
    (<FormArray>this.recipeForm.get('ingredients')).push( //5.on the selected array(FormArray), push new Ingredient obj as new FormGroup({ name:new FormControl, amount:new FormControl})
      new FormGroup({  //5.on the selected array(FormArray), push new Ingredient obj as new FormGroup({ name:new FormControl, amount:new FormControl})
    //3.(232)add also Validations here in onAddIngredient()(just copy-paste the array[] of Validators as second argument in amount controls, and as 1st argument will be null(empty value) as default value)
        name: new FormControl(null, Validators.required), //as 1st argument will be null(empty value) as default value), and 2nd argument will be Validators.required
        amount: new FormControl(null, [
          //for name control will be also Validators.requered, but for amount we will add array od two Validations(Validators.required and Valitors.pattern(/copy-paste the regular expression here in //(between these 2 back-slashes)/))   
               Validators.required,
               Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
//2.(238)implement this method onDeleteIngredxient(i) in ts
  onDeleteIngredient(index:number) { //we know that we will receive ghe index:number
    //2.(238)here call this,recipeForm.get('ingredients') which is of type FormArray, and on this array call removeAt(index)
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  /////////////////227. Creating the Form For Editing Recipes
  //1.(227)after we created form's template, lets initial our form here in this ts method.Its important here to know wheter we are on edit mode or on new mode.first I will create a private method here in recipes-edit comp
  private initForm() { //3.(227)initial our form here with a value new FormGroup(to guve us the outer sheal/frame of our form,//pass js object with key:value pairs of the controls that I ant to register here)
   let recipeName = ''; //create outside new local variable
    let recipeImagePath = '';//7.(227)//the same will be true with imagePath also, so lets create a property for imagePath = '' initialy and if we are on editMode then set the value of this property to recipe.imagePath.
    let recipeDescription = ''; //8.(227)//7.(227)//the same will be true with descrdiption also, so lets create a property for recipeDescription = '' initialy and if we are on editMode then set the value of this property to recipe.description.
////////////////230. Adding Ingredient Controls to a Form Array
  //1.(230)when we initial the form, we need a property recipeIngredients = new FormArray() (a default value is this new FormArrat([empty array initialy]))
    let recipeIngredients = new FormArray([]); //FormArray initialy set to empty [] array (without ingredients) 
    //5.(227)here we will write some logic of what the value will be if we are on editMode
    if(this.editMode) {
      //6.(227)inject our Recipe Service and the if we are on editMode then the value of recipeName will be the currentRecipe (with that current id) .name
      const recipe = this.recipesService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
  //2(230)here we need to check if we have some ingredients in my loaded recipe to begin with
      if(recipe['ingredients']) {//so, check if recipe['ingredients'] or recipe.ingredients proeperty exists(is set), then for of loop each ingredient objects in that array
        for(let ingredient of recipe.ingredients) { //3(230)for of loop each ingredient object in that array
          recipeIngredients.push( //4(230)in recipeIngredients array push each ingredient object like formFroup of 2 FormControls(name and amount)
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
           //2(232)for name control will be also Validators.requered, but for amount we will add array od two Validations(Validators.required and Valitors.pattern(/copy-paste the regular expression here in //(between these 2 back-slashes)/))   
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      
      }
    }
  /////////////////232.Adding validation
  //1.(232)(add Validator.required as second argument in the FormControls od my recipeForm)
   this.recipeForm = new FormGroup({ 
     //4.(227)here in FormControl()we have to deceide/determine wheter we are on editMode or not.So create outside new local variable 
      'name': new FormControl(recipeName, Validators.required), //9(227)in FormControl() pass as argument recipeName.So the value of recipeName will be eahther '' (empty string, if we are not on editMode) or the value will be recipe.name(current recipe that we are editing). do the same with other 2 controls
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
    //5.(230)here in my recipeForm, we can initialy set 'ingredients' formControl to recipeIngredients array (new array fill with the new Ingredient)
      'ingredients': recipeIngredients //6.(230)now lets sinhronize this with our html code
    });
  }
  /////////////////229.Fixing a Bug
  //1.(229)"get the controls" logic (of my 'ingredients' FormArray)into a getter of my component code (the .ts file):
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
//7.(234)Implement onCance() in the ts code also and here I want to navigate away t.e. I want to navigate up one level/one level back (['../'])(for that we need the router:Router, so inject it in the constructor)
  onCancel() {
    //7.in this method I want to navigate away t.e I want to navigate up one level/one level back (['../']) (for thatg we need the router:Router).That is the 1st arg, and 2nd argument is {relativeTo:this.route/activated Route}
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
