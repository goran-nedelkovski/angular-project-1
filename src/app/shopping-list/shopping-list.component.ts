import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';  // ../ ->one level up, t.e. back, out of this folder to the parent folder
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService] //4'''I will provide ShoppingListService in AppModule, because later I will access it from my Recipes section
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[]; //3''' initialy will be undefined, and the value of the array will be in my service
  //3.(180)It's good practice to clean the Observable(unsubscribe() to the Subscription() in ngOnDestroy) when we leave the component.For that, first store the Subscription in a private property:of type Subscription(import from 'rxjs')
  private igChangeSub:Subscription //store the Subscription in a private property:of type Subsctition(import it from 'rxjs') and clean it(unsubscribe() in ngOnDestroy) when we leave the component
  // [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10)
  // ];  //Igrediend model we will create in a sheared folder inside in a app folder, and it contains shared features/elements like ingredients which we will use in Recipe and in Shopping-list sections
//5'''inject shoppingList service in the constructor()
  constructor(private slService:ShoppingListService,
    private loggingService: LoggingService) { }

  ngOnInit(): void {
    //6'''here in ngOnInit set the ingredients[] array to the its value from the service (from the method from the service)
    //6'''all initialization go to ngOnInit() (the best practice in gereral)
    this.ingredients = this.slService.getIngredients();
    //11'''(..A-B lecture) here in ngOnInit() I want to listen/subscribe to my own event
  //4.(180)Store the subscription in that private property(subrscribe() returns a subscription and I want to store that in that private property)
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      //we expect to receive some ingredient:Ingrediens[]
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
    //call the service here in ngOnInit
    this.loggingService.printLog('Hello from shoping-list component')
  }
  //8.implement that method here in ts comp, where we expect to receive the Igredient from $event, so as parameter I wourl write ingredient:ingredient (I know that I will receive Ingredient obj, because that data was send/pass from the event emit(Ingredient obj))
  // onIngredientAdded(ingredient:Ingredient) {
  //   //9.final, push my new ingredient obj to the Ingredients[] array
  //   this.ingredients.push(ingredient);
  // }

  //5.(180)then implement OnDestoy interface and ngOnDestroy() hook we can unsubscribe() to the subscription() (no go to recipes.service.ts and do the same(replace EventEmitter with Subject observable))
  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }
  //3.(220)in the ts code in the method I expect to receive index:number as parameter
  onEditItem(index:number) {//4.(220).to get this information to shopping-edit comp(this index:number), I will create Subject obsevable in the service to I can listen/subscribe in shopping-edit comp(go to shop-list service)
    //5.(220)in onEditAtem() send our Subject observable from the service with next(index,//parameter of the method, that is the new value that our Observable will send/emit)
    this.slService.startedEditing.next(index); //(go to shop-edit comp)
  }

}
