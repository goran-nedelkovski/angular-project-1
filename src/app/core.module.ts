/////////////////327. Understanding the Core Module
//create a new file in the main app folder -> core.module.ts (next to the app.module.ts)
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "./logging.service";
import { RecipesService } from "./recipes/recipes.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

//this module will be for the Core Services that we have provided in the app.module.ts
@NgModule({
   ////but only cut/replace in the CoreModule if we provide our Services in the providers:[] of app.module, but not if we provided with @Injectable({providedIn:'root'}) (the recommendation is to use this approuch to be more leaner the app)
/////So, if we provided service with @Injectable({providedIn:'root'}) (the recommendation is to use this approuch to be more leaner the app), we can't put that service in the CoreModule
    declarations: [],
    imports: [],
    providers: [
      ShoppingListService,
      RecipesService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true //to allow to use multy(many) interceptors
      },
      //add Logging Service here in the Core Module (Eager Module) in the proviers:[]
      //LoggingService  //comment this as wall 
    ]
  /////!!!!! we dont need to export the Services, (they are automaticaly inject/provide on the root level and we can use them in while app) (only Components, Directives..from the declarations:[] has to be exported)
/////Services are automaticaly inject on the root level (we dont need to to export them)
})
export class CoreModule {

}
