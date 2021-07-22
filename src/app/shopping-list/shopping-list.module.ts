//import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggingService } from "../logging.service";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";
//to be  module add @NgModule decorator
@NgModule({
  //here in NgModule we need to declare all components that we are using here
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    //CommonModule, //import this from '@angular/common' (this CommonModule provide *ngFor and *ngIf fpor teh Feature Modules)
    // ReactiveFormsModule, //import this if we are using Reactive forms approach
    FormsModule,  //import this from '@angular/forms' because we are using TDD forms(template driven approach)
    ShoppingListRoutingModule,
    SharedModule  //import SharedModule here, but remove CommonModule because the CommmonModule is in the SharedModule (to avoid that duplicate code)
  ],
  providers: [
    //lets also provide this Service in this lazy-loaded feature Module (shop-list Module)
    //LoggingService
  ]
})
export class ShoppingListModule {
//////finaly we can export this ShoppingListModule into the main app.module.ts
}
