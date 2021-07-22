///////////////////326. Understanding Shared Modules

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoggingService } from "../logging.service";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from './placeholder.directive';
////we could have many shared Modules (with different name of course)
//1.(326) lets create a new file in the shared foder => shared.module.ts
@NgModule({  //to be a Module (not a classic class) add @NgModule()
  declarations: [  //here we can initialize/declare all our components and directives
    //AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,  //declare Directive alsoi here in the declarations:[] (we can declrae here Directives, not only Components)
    // PlaceholderDirective
    ///////important!!!! here only once (only in one Module) we can declare Components,Directives and Pipes...(not in two modules)
  ],
  //here in imports:[] we can import all the same(common) modules
  /////we can import Module into multiple imports .so its fine if we are import RouterModule in the recipe.module and in shoping-list.module.For the imports Modules are OK, they can use in many modules
  ////!!!!! importing Module can in many imports modules, but for declaration can't in more modules (declaration of Components, Directives, Pipes must be only in One Module)
  imports: [
    CommonModule  //import this CommonModule-> this Module is the same(common) for the both, the recipes.module and the shopping-list , so we can import here in our SharedModule
  ],
  // here we need to exports all the things that we are importing here and that we are declaring here (Components, Direcives + imported Modules), to can use them (impport) in the other Modules (to other Modules that we will use our SharedModule)
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule
    //with this exports, every other Module that import this SharedModule, will have access to these things (to these componens, directive and Common Module)
  ],
  providers: [
    //lets provide log service here in the shared Module (its Eager-loaded Module because is imported in app.module, // but its also imported in shop-list Module)
    LoggingService
  ]
  // entryComponents: [AlertComponent]
////lets now use our Shared Module in shoping-list.module and recipes.module,
///and finaly import this SharedModule in the main app.module.ts
})

export class SharedModule {

}
