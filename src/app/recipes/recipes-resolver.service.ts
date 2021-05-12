////////////////284. Resolving Data Before Loading
//fixing an error(:cannot find property ingredient) with a guerd or with a Resolver service guard(Resolver is from Routing module Section)
//Resolver=>specieal Guard, t.e. it is some code that is run/execute before loading the route, to make sure that the sertain data on this route depends on, is there on the route.

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from './recipes.model';

//2.(284)add @Inhjectable({providedIn:'root'}) decorator with the modern way {providedIn:'root'} instead of adding this Service in providers:[] in app.module.ts(import it from@ang/core)
@Injectable({providedIn: 'root'})
//1.(284)create new file recipes-resolver.service.ts in the recipes folder
export class RecipesResolverService implements Resolve<Recipe[]> {
//3.(284)this service needs to implements Resolve interface<gereric interface, we must here define which type of data will be resolve in the end, in our case that data which we will resolve is Recipe[] (import Recipe from recipe.model )> (import it from @angular/router)
//3.so our resolve code runs some code that loads some Recipes (Recipe[])
//4.(284) inject our DataStorage Service here in the constructor(), becase that is the service that make the http request
    constructor(private dataStorageServive: DataStorageService) { }

//5.(284) Resolver interface forces us to add resolve(1st argument is the data about the current active route->route:ActivatedRouteSnapshot, 2nd argument is state:RouterStateSnapshot) method
    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    //5.we could get the information about the id that we request to, but here we want to load all recipes[]
    //5.the goal here is to return array of recipes(because we loaded first recipe[]) or an Observable that contain/emit that resolved array of Recipes.(go to data-stogare.service.ts)
//9.(284)(here in the resolve() we return fetchRecipe() Observable from data Storage Service.I will not subscribe() here, but the resolve() will automaticaly subscibe for me to see/resolve once the data is there (t.e. resolver will subscribe for me to see/resolve if the recipes[] data is there)
        return this.dataStorageServive.fetchRecipes();
//9.(284)here we call fetchRecipe() Observable whenever this route is loaded (this is important to make sure that our data is realy there when we need it)
//9.I will not subscribe() here, but the resolve() will automaticaly subscibe for me to see/resolve once the data is there (go to app-routing.module to apply this resolver)
    }
}