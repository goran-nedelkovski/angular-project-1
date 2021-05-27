//////////////////Setting Up Routes
//1.create new file app-routin.module.ts for our routes
import { NgModule } from '@angular/core'; //4.import NgMOdule from angular/core
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
// import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
// import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
// import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
// import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
//import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './recipes/recipes.component';
//import { AuthGuard } from './auth/auth.guard';
//4.here at the top(under the imports) we add/create our routes (1st the main routs adn then 2nd the children routes)
    const appRoutes:Routes = [
        {
        //when we first visit the page, we go to the main domain localhost:4200 and that is the empty path:''
            path: '',
            redirectTo: '/recipes', 
            pathMatch: 'full' //redirect to /recipes if full path is empty (if the main is main domain localhost:4200)
        },
//2.(330)here in app-routing.module I will add new reoute-path path: 'recipes'
        {
            path: 'recipes',
    //3.(330)loadChildren=>load only this child(only this feature Module area)when the user visit this path: /recipes;So, (1st way) loadChuldren: './relative path to that feature RecipesModule that we want to load when we visit /recipes, relatively from this current app-routing.module'; and after the path we must add with # the name of that feature Module class we want to load (RecipesModule)
            //loadChildren: './recipes/recipes.module#RecipesModule' //load only this child feature Module are(t.e. loadChildren points on: 'relative path to that child feature Module file and with # point to class name of that feature Module')when the user visit this path: /recipes
    ////3'(330).this will be put in a separate code bundle which is then downloaded on demand as soon as the user visit /recipes, but not sooner
    //3''(330)(2nd way,modern)the alternative(modern)sintax of lazy loading is dinamicaly/asynhronious loading the feature Module with a Promise like this:
    // loadChildren: anonimus function () => in the function's body we have dinamicaly load that relative path with a Resolve Promise function import('./relative path...which is the resolve success value').then(m//when we get that success/fulfilled value m object of the resolve Promise => m.RecipesModule//extract RecipesModule class of that m object (m object is the success value of the promise t.e. all recipes.module.ts file which contains RecipesModule class))
            loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
    ///after adding lazy loading, wits good to re-set/restart our app to see the efect ('clear' the biuld process and then restart 'ng serve' again) (go to app.module)
    ///////best practice to use lazy loading is on some pages that we visit very rearly (we can save so much of initial bundle).Its no sense to use lazy loading on auth page, because that page is always seen (shown) by the user.
    },
    //     {
    //         path: 'recipes', //so I can visit this path-routh in the URL with localhost:4200/recipes
    // //161./////////////// Adding Child Routing Together 
    // //1.(161)//in app-routnig.module.ts add children: [] in the recipes(parent) path
    //         component: RecipesComponent, 
    // //6.(305)in app-routing.module we can use our AuthGuard service in /recipe route(path, because this route/path I wanna protect) bu adding canActivate: [our service class AuthGuard in this array//must import at the top and import it in the app.module]
    //         canActivate: [AuthGuard],
    //         children: [
    //             {
    //         //1.(161)here I want to load the text from ng-template(Please select a Recipe) in this empty path:''(/recipes)and we need a new component for that.//So I will create a new comp with:ng g c recipes/recipes-start;then render this child component in the recipes(parent) with <router-outlet> specieal directive
    //                 path: '',
    //                 component: RecipesStartComponent
    //             },
    //         //3.(164)I will cut this code and place it here before ':id' routes-paths (thats is the order: 1st are the path and 2nd are parameters)
    //             {
    //                 path: 'new', 
    //                 component: RecipeEditComponent
    //             },
    //         //3.(161)add new path-route with path:':id' (:id is dinamic parameter/segment, added relative after '/recipes' t.e. in url will look like:'/recipes/1 or /recipes/2').in this path I want to load/render RecipesDetail comp.this child component will be also render in the recipes .html(parent) with <router-outlet> 
    //             {
    //                 path: ':id',
    //                 component: RecipesDetailComponent,
    //         //10.(284)apply here the resolve:[our Resolver Service] in these two paths(in path: ':id' and in path: ':id/edit') in app-routing.module.ts.And now, angular will run/execute this resolver before loading this routes
    //                 resolve: [RecipesResolverService]
    //             },
    //     //1.(164)to can add new Recipe and to add existing recipes, we need to create a new component(ng g c recipes/recipe-edit)
    //     //I will register the new route-path(relative child path in /recipes parent) here in app-rounting.module.ts(in ../recipes/new I want to load RecipeEdit comp)
    //             //3(164)angular will parse 'new' as 'id' parameter(after ':id' route), so that will ocuur errors.So, I will cut this code and place it here before ':id' routes-paths (thats is the order: 1st are the paths(apsolute  relative) and 2nd are dinamic parameters(dinamic parameters are on the end))
    //     //2.(164)I will duplicate this with :ide/edit(:id-we need the id parameter to can loaded) and /edit-because we are in the edit mode
    //     //its the same component, and we will determine wheter we are on edit or not
    //             {
    //                 path: ':id/edit', 
    //                 component: RecipeEditComponent,
    //                 resolve: [RecipesResolverService]
    //             },
    //             {
    //                 path: 'recipes-list',
    //                 component: RecipesListComponent, children: [
    //                     {
    //                         path: 'recipes-item',
    //                         component: RecipesItemComponent
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
        {
            path: 'shopping-list',
            component: ShoppingListComponent, children: [
                {
                    path: 'shopping-edit',
                    component: ShoppingEditComponent
                }
            ]
        },
//2.(287)here in app-rounting.module I want to register a new route with path:'auth' which loads/render the auth page/comp (auth page with email and password) (gp to header.comp.html)
        {
            path: 'auth', 
            component: AuthComponent
        }
        // {
        //     path: '**',
        //     redirectTo: 'recipes'
        // }
    ]
@NgModule({
//////////////////332. Preloading Lazy-Loaded Code
//1.(332)in app-routing.module in .forRoot(appRoutes, as second argument we can add preloadingStrategy:PreloadAllModules to avoid some delay with lazy loading)
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], //5.in imports:[] import RouterModule.forRoot(routes)//RouterModule for routing functionality and forRoot() is a special function that register our routes for our application
    exports: [RouterModule] //6.export that configured RoterModule(configured with our routes), export it back to the main module (to app.module.ts)
}) //3.because this is Module class, we need NgModule() decorator that receive js object with imports:[] and exports:[RouterModule] (export this configured module back to the main module (to app.module.ts))
//2.create export class AppRoutingModule
export class AppRoutingModule {  //7.add/include AppRoutingModule in app.module.ts in imports:[] (and go to app.comp.html)
}