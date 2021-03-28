//import {features} from 'module/package.js' 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//1.we must import here first, so to TypeScript understand that we need to import this feature from the module/package '@angular/forms' 
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
//import { ServerComponent } from './server/server.component';  //we must import here also, so to TyeScriot to know (without .ts extension, because .ts extension is added by webpack when bundle this automaticaly)
//import { ServersComponent } from './servers/servers.component';  //we must import here also, so to TyeScriot to know (without .ts extension, because .ts extension is added by webpack when bundle this automaticaly)
//angular is split (contain) of many modules/packages(re-usable piece of code in a separate file), and if we want to use some features of that modules/packages, simpli do here with import {} in app.modules.ts 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    //ServerComponent,
    //ServersComponent   //we must declare here our ServerComponent, so to Angular can knows (in declaration property of @ngModule)
  ],
  //2.we must import here also, so to Angular understand with @NgModule that we need to import this feature 
  imports: [
    BrowserModule,  //BrowserModule is build-in Module, to can start our app on the Browser
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]  //starts our application by this root component, (which component will be recognize in the index.html file? => AppComponent)
})
export class AppModule { }

//components->for making a web page; modules -> bundles all pieces (components) into packages/modules
//modules -> bundles all pieces (components) into packages/modules
//2nd. app.module.ts is the second file to be executed
//bootrstap array lists all the components that should be known to angular(t.e. is reference to the root AppComponent) 
//bootstrap starts the application with this special component, the root component (AppComponent )

//3rd. is that AppComponent from the bootstrap array, that will be analized by angular, and will be render in index.html in the app-root selecetor tag

//AppModule is empty class like our component and as a component, we transform it in something else, bu adding a decorator ->@ngModule decorator, which is imported from @angular/core module/package 