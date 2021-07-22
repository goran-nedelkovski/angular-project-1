////////////////321. Getting Started with Feature Modules
//1.(321)we have recipes feature area, auth feature area, shop-list feature area..(header is not feature area, its part of the app)
//1.lets create a new file in the recipes folder -> recipes.module.ts
//1.this module will be responsible for building blocks in recipes feature area(packaging all recipes components, services...)

//import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";
//import { DropdownDirective } from "../shared/dropdown.directive";

//1.export class RecipesModule; to be a module we need to import @NgModule() decortor and import it from @ang/core
@NgModule({
    //2.(321)in @NgModule() pass js object for configuration of this module (some properties/key-value pairs t.e. basicaly add inside the same structure like app.module).here will be all recipes related components(so, move all recipes components from app.module and place it here)
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipesItemComponent,
        RecipesStartComponent,
        RecipeEditComponent,
        //DropdownDirective,
    ],
///////////////322. Splitting Modules Correctly
//1.(322)we had an error..router-outlet!!!this directive is provided by RouterModule, so we need to import that RouterModule here; if we want access to form-group directives we must import ReactiveFormsModule; //1.(322)if we want to access to *ngIf and *ngFior imports:[CommonModule] //intead of BrowserModule because this module should be imported only once, in the app.module.ts
    imports: [RouterModule,
       //CommonModule,
       ReactiveFormsModule,
       RecipesRoutingModule,
       SharedModule], //1.(322)if we want to access to *ngIf and *ngFior imports:[CommonModule] =>this CommonModule unlocks *ngFor and *ngIf//intead of BrowserModule because this module should be imported only once, in the app.module.ts
////////this modules we must import also here in the Recipe.module, its not enough in the app.module.(because the Modules and everything in there work standalone/independent of other modules t.e. the blocks of these modules can't acceess to other modules)(only exeption are Services, they can be provided only once in app.module.ts and they can use in whole app)
    //1.(322)so, everything we declared here, must be exported and imported here in this module(its not enough to imort only in app.module.ts).////Only exeption are Services->they may be imported/provided only once in app.module and we can use them in whole app(even in components in feature areas)
//////////////323. Adding Routes to Feature Modules
//1.(323)we can put all routes from the app-routing.module here in our RecipesModule by imports:[RouterModule.forChild(routes)]///so forRoot()is used only once in the app.module and in feature Modules we use forChild(routes).To be cleaner we can create new file in recipes folder -> recipes-routing.module.ts
//7.(323)We exports the RouterModule in our recipes-routing.module trough RecipesRoutingModule, so we need to import:[RecipesRoutingModule class] in recipes.module
//3.(321)how we can use this module to app.module.ts? ->define exports:[all recipes components that we define in declarations, we exports all of them trough RecipesModule, so we can use them in Recipes module and in every module that imports this RecipesModule.that could be the app.module] (go to app.module.ts)
//////////////324. Component Declarations
//1.(324)we dont need to export these recipes components because we are using here internaly only in thid Module and we will not using this recipes components in app.component or any app child component
// exports: [RecipesComponent,
    //     RecipesListComponent,
    //     RecipesDetailComponent,
    //     RecipesItemComponent,
    //     RecipesStartComponent,
    //     RecipeEditComponent]
})
export class RecipesModule {}
//////important!!! =>everything in the module work stand alone.Modules are independent of others, they don't comminicate (unless we dont import them). ////////One component must be declared only in one module, not in two or more modules.So, recipes Module and the components in there has no access to all the things that are imported in app.module, but they only will be used in the Recipes Module.
//////Shared Module => is common Module when we have some duplicate features(components, directives..)in two or more Modules, so we can put that duplicate features in that SharedModule. (to make cleaner gthe app)
//////Core Module => when we have in the AppModule some Services and we want to move them in a separate Core Module, and import this CoreModule back to AppModule. (to make cleaner the App module)
//////Lazy Loading => the idea is when we visit /products or /admit route(page) to only load this page(this current feature Module, not loading evrything). So, to load only the code that belong on this current feature area(current feature Module).With lazy loading we initialy only load the AppModule/Core Module(root route Module with all components there) and we dont load the other feture Modules.and only when we visit other route/page /admit, then we load that feature AdminModule(with all components there).The advantage of lazy loading is that we download a small code bundle (only one Module that we need) and with that our app will start faster(because the app will download a less code when we visit a sertain route).
