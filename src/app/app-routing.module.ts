//////////////////Setting Up Routes
//1.create new file app-routin.module.ts for our routes
import { NgModule } from '@angular/core'; //4.import NgMOdule from angular/core
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
//4.here at the top(under the imports) we add/create our routes (1st the main routs adn then 2nd the children routes)
    const appRoutes:Routes = [
        {
        //when we first visit the page, we go to the main domain localhost:4200 and that is the empty path:''
            path: '',
            redirectTo: '/recipes', 
            pathMatch: 'full' //redirect to /recipes if full path is empty (if the main is main domain localhost:4200)
        },
        {
            path: 'recipes', //so I can visit this path-routh in the URL with localhost:4200/recipes
    //161./////////////// Adding Child Routing Together 
    //1.(161)//in app-routnig.module.ts add children: [] in the recipes(parent) path
            component: RecipesComponent, children: [
                {
            //1.(161)here I want to load the text from ng-template(Please select a Recipe) in this empty path:''(/recipes)and we need a new component for that.//So I will create a new comp with:ng g c recipes/recipes-start;then render this child component in the recipes(parent) with <router-outlet> specieal directive
                    path: '',
                    component: RecipesStartComponent
                },
            //3.(164)I will cut this code and place it here before ':id' routes-paths (thats is the order: 1st are the path and 2nd are parameters)
                {
                    path: 'new', 
                    component: RecipeEditComponent
                },
            //3.(161)add new path-route with path:':id' (:id is dinamic parameter/segment, added relative after '/recipes' t.e. in url will look like:'/recipes/1 or /recipes/2').in this path I want to load/render RecipesDetail comp.this child component will be also render in the recipes .html(parent) with <router-outlet> 
                {
                    path: ':id',
                    component: RecipesDetailComponent,
            //10.(284)apply here the resolve:[our Resolver Service] in these two paths(in path: ':id' and in path: ':id/edit') in app-routing.module.ts.And now, angular will run/execute this resolver before loading this routes
                    resolve: [RecipesResolverService]
                },
        //1.(164)to can add new Recipe and to add existing recipes, we need to create a new component(ng g c recipes/recipe-edit)
        //I will register the new route-path(relative child path in /recipes parent) here in app-rounting.module.ts(in ../recipes/new I want to load RecipeEdit comp)
                //3(164)angular will parse 'new' as 'id' parameter(after ':id' route), so that will ocuur errors.So, I will cut this code and place it here before ':id' routes-paths (thats is the order: 1st are the paths(apsolute  relative) and 2nd are dinamic parameters(dinamic parameters are on the end))
        //2.(164)I will duplicate this with :ide/edit(:id-we need the id parameter to can loaded) and /edit-because we are in the edit mode
        //its the same component, and we will determine wheter we are on edit or not
                {
                    path: ':id/edit', 
                    component: RecipeEditComponent,
                    resolve: [RecipesResolverService]
                },
                {
                    path: 'recipes-list',
                    component: RecipesListComponent, children: [
                        {
                            path: 'recipes-item',
                            component: RecipesItemComponent
                        }
                    ]
                }
            ]
        },
        {
            path: 'shopping-list',
            component: ShoppingListComponent, children: [
                {
                    path: 'shopping-edit',
                    component: ShoppingEditComponent
                }
            ]
        },

        // {
        //     path: '**',
        //     redirectTo: 'recipes'
        // }
    ]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)], //5.in imports:[] import RouterModule.forRoot(routes)//RouterModule for routing functionality and forRoot() is a special function that register our routes for our application
    exports: [RouterModule] //6.export that configured RoterModule(configured with our routes), export it back to the main module (to app.module.ts)
}) //3.because this is Module class, we need NgModule() decorator that receive js object with imports:[] and exports:[RouterModule] (export this configured module back to the main module (to app.module.ts))
//2.create export class AppRoutingModule
export class AppRoutingModule {  //7.add/include AppRoutingModule in app.module.ts in imports:[] (and go to app.comp.html)
}