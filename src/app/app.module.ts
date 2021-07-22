//import {features} from 'module/package.js'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//1.we must import here first, so to TypeScript understand that we need to import this feature from the module/package '@angular/forms'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
// import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
// import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
//import { DropdownDirective } from './shared/dropdown.directive';
//import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
// import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
//import { RecipesService } from './recipes/recipes.service';
import { AuthComponent } from './auth/auth.component';
//import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
//import { AuthInterceptorService } from './auth/auth-interceptor.service';
//import { RecipesModule } from './recipes/recipes.module';
//import { ServerComponent } from './server/server.component';  //we must import here also, so to TyeScriot to know (without .ts extension, because .ts extension is added by webpack when bundle this automaticaly)
//import { ServersComponent } from './servers/servers.component';  //we must import here also, so to TyeScriot to know (without .ts extension, because .ts extension is added by webpack when bundle this automaticaly)
//angular is split (contain) of many modules/packages(re-usable piece of code in a separate file), and if we want to use some features of that modules/packages, simpli do here with import {} in app.modules.ts
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { PlaceholderDirective } from './shared/placeholder.directive';
//import { LoggingService } from './logging.service';
//5.(349)import StoreModule from '@ngrx/store' in app.module and also add in the imports:[] array
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // RecipesComponent,
    // RecipesListComponent,
    // RecipesDetailComponent,
    // RecipesItemComponent,
    // ShoppingListComponent,
    // ShoppingEditComponent,
    //DropdownDirective,  //we must remove this Directive from declarations here, because we have alredy declared this Directive in the SharedModule (it can't be declared in two or more modules, but only in one module)
    // RecipesStartComponent,
    // RecipeEditComponent,
    AuthComponent,
    PlaceholderDirective //declare this PlaceholderDirective in the declaration:[] in app.module
    //LoadingSpinnerComponent  ////we must remove this Directive from declarations here, because we have alredy declared this Directive in the SharedModule (it can't be declared in two or more modules, but only in one module)
    //ServerComponent,
    //ServersComponent   //we must declare here our ServerComponent, so to Angular can knows (in declaration property of @ngModule)
  ],
  //2.we must import here also, so to Angular understand with @NgModule that we need to import this feature
  imports: [
    BrowserModule,  //BrowserModule is build-in Module, to can start our app on the Browser
    FormsModule,  //we need Forms module for building forms, [(ngModel)]...
    ReactiveFormsModule, //1.(228)first import ReactiveFormsModule from @ang/forms and import it in this imports:[] in app.module.ts
    AppRoutingModule, //import AppRoutingModule here in imports:[] and in the top
    HttpClientModule, //3.(280)to can be used http:HttpClient, first we must import HttpClientModule here in imports:[] and import at the top from '@angular/common/http'
    StoreModule.forRoot({shoppingList:shoppingListReducer}), //add Store Module here in the imports:[] and we must inform which reducers we use with forRoot(Reducer) like this: StoreModule.forRoot({reducerMap:shoppingListReducer function})
    //4.(321)here import our RecipesModule to can use all recipes components that are exported there trough this RecipesModule
    RecipesModule, //import here in the imports:[] RecipesModule (featureModule) here in app.module
    ShoppingListModule,  //import ShoppingListModule (feature module) here in app.module.ts
    SharedModule,  //import SharedModule here in app.module.ts (because that common features will be accessible in whole app)
    CoreModule  ////Eager-loaded Module (Core Module) => its Eager module because we are importing here in the app.module//import this CoreModule in the imports:[]; cut the services from the provoders:[] and put them in the core.module.ts (to be more leaner the app)
    //4.(330)in app.module we dont have to import RecipesModule any more, because we lazyly load RecipesModule in app-routing.module with lazy loading
  ],
  ///////////////237. Providing the Recipe Service Correctly
  //1.(237)instead here in recipes component, we must provide Recipe Service in app.module.ts (because here all child recipes components share this service instance, but when we navigate away to the shop-list, this recipes comp is destroyed)
  providers: [ /////if we provide our Services here in the provider:[] it would be better practice to put them in a separate CoreModule (for these core services and then import this module im the imports:[])
  ////but only cut/replace in the CoreModule if we provide our Services here in the providers:[], but not if we provided with @Injectable({providedIn:'root'}) (the recommendation is to use this approuch to be more leaner the app)
/////So, if we provided with @Injectable({providedIn:'root'}) (the recommendation is to use this approuch to be more leaner the app), we can't put that service in the CoreModule
  ////////cut these services and put them in gthe core.module.ts (to be more leaner the app)
    ////then, import this CoreModule in the imports:[]
    // ShoppingListService,  //cut these services and put them in gthe core.module.ts
    // RecipesService,
    //11.(301)here in providers:[] in app.module.ts we need to provide our Inserceptor Service in js object {prvide: HTTP_Interceptors(this is the id-identifier for this provider(id for our service class)), useClass: our Intercepr Secvice class, multi: true //to allow to use multy(many) interceptors} (go to data-storage.service.ts)
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true //to allow to use multy(many) interceptors
    // }
    ////////////////334. Loading Services Differently
    //lets provide the logging Service here in providers:[] in app.module (root Module), but also in shop-list module (lazy-loaded feature Module)
    //LoggingService //lets comment this as well also, and lets use the Eager-loaded Module (Core Module) .btw its Eager module because we are importing here in the app.module
  ],
  bootstrap: [AppComponent],  //starts our application by this root component, (which component will be recognize in the index.html file? => AppComponent)
  //////////////////314. Understanding entryComponents
  //entryComponent: [array of components type, t.e. only the Components that need to be created but without 'selector' or 'route/path' configuration]
  entryComponents: [AlertComponent]  // AlertComponent need to be created but without 'selector' or 'route/path' configuration. (this comp is created manualy, programaticaly from code)
///in agnular 9+ we dont need to specify entryComponents:[], because it has own avi rendereing
})
export class AppModule { }

//components->for making a web page; modules -> bundles all pieces (components) into packages/modules
//modules -> bundles all pieces (components) into packages/modules
//2nd. app.module.ts is the second file to be executed
//bootrstap array lists all the components that should be known to angular(t.e. is reference to the root AppComponent)
//bootstrap starts the application with this special component, the root component (AppComponent )

//3rd. is that AppComponent from the bootstrap array, that will be analized by angular, and will be render in index.html in the app-root selecetor tag

//AppModule is empty class like our component and as a component, we transform it in something else, bu adding a decorator ->@ngModule decorator, which is imported from @angular/core module/package
