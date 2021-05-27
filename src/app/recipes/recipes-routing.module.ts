//2.(323To be cleaner our featureModule, we can create new file in recipes folder -> recipes-routing.module.ts)

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";
//4.(323)add const routes:Routes array with all recipes related routes.So cut the recipes path/route with all nested recipes child routes and paste here
////4.(323)import all loaded components short-end with the lamp t.e. click on the comp -> the lamp is on the left -> click and choose: import all missing imports
const routes:Routes = [
    {
/////////////////330. Implementing Lazy Loading
//1.(330)lets start with recipes-routing.module.ts.lazy loading we can use in this feature module because we can own registered routes in this module.
//1.(330)lets add path: '' (empty, because we are already in /recipes page/Module here).now we need to change the route-path in app-roouting.module (go to app-routing.module)
        path: '', //so I can visit this path-routh in the URL with localhost:4200/recipes
//161./////////////// Adding Child Routing Together 
//1.(161)//in app-routnig.module.ts add children: [] in the recipes(parent) path
        component: RecipesComponent, 
//6.(305)in app-routing.module we can use our AuthGuard service in /recipe route(path, because this route/path I wanna protect) bu adding canActivate: [our service class AuthGuard in this array//must import at the top and import it in the app.module]
        canActivate: [AuthGuard],
        children: [
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
    }
];
//3.(323)export the class; add @NgModule() decorator and pass js object
@NgModule({
//5.(323)in @ngModule() add imports:[RouterModule.forChild(routes)]///so forRoot()is used only once in the app.module and in feature Modules we use forChild(routes)
    imports: [RouterModule.forChild(routes)],
//6.(323)after we import RouterModule and we have configure it with all all our registered recipes routes, now we need to export this RouterModule (to can be used also from other modules.We exports: here the RouterModule in our recipes-routing.module trough RecipesRoutingModule, so we need to import:[RecipesRoutingModule class] in recipes.module)(go to recipes.module.ts)
    exports: [RouterModule]
})
export class RecipesRoutingModule {}