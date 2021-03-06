///////////////279. Backend (Firebase) Setup => log in (sign in) on Firebase.console with my google (gmail) account, then create/add new project -> enter project name: ng-course-recipe-book -> next -> checked all and Create new project
//->then choose Realtime Database -> create Database -> choose realtime database location: Us(us-central1) or Belgium(europe-west1) -> Start in test mode (for now, without authentication(in test mode we can unlimited read and write access without auth..)..but we will add authentication soon in the next section) ->  Enable
////////////////280.Seting up DataStorage Service
//1.(280)in the shared folder (right clik->new file)->data-storage.service.ts (we can optionaly make our http requests(post, get..) also in the recipes.service.ts because there we are interacting with the resipes, but here I want to focus only on the http reques in this different file service)
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Recipe } from '../recipes/recipes.model';
import { RecipesService } from '../recipes/recipes.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
//2.(280)add @Injectable()->because we will inject the http Service into this Service (when we inject one service into another, I must use @Injectable(); @Injectable({providedIn:'root'}->this is the modern way, or we also can by add this service in the providers:[] in app.module.ts))
@Injectable({providedIn: 'root'})
//1.(280) lets export the dataStorageSrvice class
export class DataStorageService {
    //3.(280)lets inject http:HttpClient in gthe constructor() (but to can be used this service http:HttpClient, first we must import HttpClientModule in app.module.ts.This is crutial for unlock the http:HttpClient functionality, and we can use http:HttpClient service in every part of our application).So, 1st import HttpClientModule in app.module.ts from '@ang/common/http' and 2nd. inject http:HttpClient service in the constructor() of our Service class and import HttpClient from '@ang/common/http'  
    constructor(private http:HttpClient,
//2(281)inject the Recipes service:RecipesSevrice(also import at the top) here in my DataStorageService and with that we can directly get our currently loaded recipes from Recipes service and we can avoid that extra argument/paraneter recipes:Recipe[]
        private recipesService: RecipesService, 
        private authService:AuthService) {}
//////////////////281. Storing Recipes
//1.(281)lets create a method storeRecipe() in our Service.We can do on two ways:
//1(281)1st ways is with argument/parameter recipes:Resipes[] and send this data with http.post() to the server; or 2nd way is to inject the Recipes service here in my DataStorageService and we can directly get our currently loaded recipes from Recipes service and we can avoid this extra argument/paraneter recipes:Recipe[].So I will do with this 2nd way
/////////////////300. Adding the Token to Outgoing Requests
//1(300).why we cant fetch the data? because firebase don't know that we have a valid token. (we know from the responce object, but Firebase dont know)
//1.(300)lets use our token (add it in our outgoing request) to can fetch the data.So, we need to add the token in our outgoing request to let/inform Firebase to know about that (to inform Firebase that we have a valid token).For that, we need to manipulate our outgoing http requests (for storing and fetching data)(so go to data-torage.service.ts)
//1.(300)In Data Storage service, those requests (get and post) now need to be added such as we do attach our token to them (the token we are storing in the User object in the auth.service)
//1.(300)here in Data Storage service, lets inject our Auth service in the constructor
//2.(300)now we need to get access to the User(currently loogedIn/auth user) in both (in storeResipes and in fetchRecipes), because we need to get the token from the User, the token that is stored in the User (t.e. when we store or fetch Recipes I want to get only the token of the currently loggedIn/authenticate User)(go to auth.service.ts)
    storeRecipes() {
    //3(281)in storeRecipes() we can reach directly to our currencty loaded Recipes trough Recipes Service and we can store them in a variable.this will retreive our list of Recipes   
        const recipes = this.recipesService.getRecipes();
    //4.(281)now with our currently loaded and stored recipes, we can make http.put() request.//We could make http.post(if I want to store one Recipe, but here I want to store all my Recipes[] and I want to overwrite all previous recipes that I have stored, so then I will use http.put();//firebase works like that-.>if we send http.put() request to its url-api endpoint, all the data there will be overwrite.So, 1st argument in put() will be that url(copy-paste here and because its not entire url api-endpoint, then in the end of the url add /recipes.json segment(/recipes.json is only firebase's characteristic(nothing with angular, nothing with our data),and with this segment we have complete rest api endpoint/node).firebase will transform/translate this segment(this node) in/as folder 'recipes' in database in which we can store/save our data); 2nd argument is our recipes data that we want to attach/send to this url(just like in the post()) 
    //5(281) only with this alone will not send the http req, so this http req will ony be send when we subscribe() to this observable.there are 2 ways here:1st we can return here our Observable(because .put() returns an Observable) and then we can subscribe() to this Observable in the component where we're calling storeRecipes() (in the component that is interested/care about the stored Recipes(about the response), and that would be Header Component because there are our buttons for save and fetch recipes).or 2nd way is to not subscribe() in that component because in this put() scenario, the component is not interested/its not care about the request wheter is done or not.Instead, I will go with this 2nd way and I will directly subscribe() here in this service
    //I will go here with 2nd way,to not subscribe() in that component because in this put() scenario, the component is not interested/its not care about the request wheter is done or not(its not interested about the response).Instead, I will go with this 2nd way and I will directly subscribe() here in this service
    return this.http.put('https://ng-course-recipe-book-9f63a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(
       //6(281)here in subscribe() I ecpect to receive/get the response (the stored recipes)
        response => {
            console.log(response);
    //7(281)now make sure that storeRecipe() is called (and this method will be call in Header component, so add (click) listener on these buttons (click)='onSaveData()'))(go to hedare.comp.html)
        }
    ); //1st argument in put() will be that url-api endpoint(copy-paste here and in the end of the url, add /recipes.json segment/node.firebase will transform/translate this segment in/as folder recipes in which we can store/save our data),2nd argument is our recipes data that we want to attach/send to this url 
    }
///////////////////282. Fetching Recipes
//1.(282) create fetchRecipes() in our DataStorage Service, and this method will be trigger/fire when we click on fetch button (go to header component template)
    fetchRecipes() {
    //3.(300)now we can rich/access to the auth Service and get currently active User. That I wana do when in fetchRecipes()
    //3'(300)make sure we can get the User once (1st way is with unsubscribe() after the subscribe() afterf I am done) or 2ndway(better way) is with pipe(operator take(1))->which means that we get the User once t.e. only the latest User (t.e. take one/the latest value from that Observable and automaticaly unsubscribe())
    //4(300)we can pipe(Sum) user Observable + http.get Observable in a one big Observable which is actuely the operator exaustMap() (import it from 'rxjs/operator' and its 2nd argument in pipe to pipe the user obs).ExhaustMap() waits for the first obs(user obs) to complete and when we get the data from the user obs, then returns inside the inner observable(2nd obs t.e. return http.get() obs)
    //6.(300) 'return' this whole big Observable 
    // return this.authService.user.pipe(take(1), exhaustMap(//here we get the User object, but only once(only the latest User)
    //     user => { //ExhaustMap() waits for the first obs(user obs) to complete and when we get the data from the user obs, then returns inside the inner observable(2nd obs t.e. return http.get() obs)
    //8'.(300)when we get/receive the the user:User from the 1st obs(user subject obs obj,t.e. currently loggedIn/auth User), then on the http.get() request attach our user.token as query Parameter on 2 ways: 1st way is in the end of the url with ?auth='+user.token or 2nd way is after the url with {queryParams: new HttpQueryParams().set('auth', user.token)} (for some other APIs we can add the token in the {header obj} of the request)
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-9f63a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', 
        // {
        // //8''(300) attach the token on 2nd way with {params: new HttpParams()object.set('token's name', token value)}
        //     params: new HttpParams().set('auth', user.token)
        // })
      //7.attach our user.token on the http.get() request as query Parameter on 2 ways: 1st way is in the end of the url with ?auth='+user.token or 2nd way is after the url with {queryParams: new HttpQueryParams().set('auth', user.token)}
    //5.(300)cut map() and tap() operators and paste here in the main pipe() after the exhaustMap().
        )
//12.(301)we don't need any more that logic with pipe(take(1), exhaustMap(..)), that we moved into the Interceptor Service.But here, we should only add map() and tap() operators in pipe() and don't need here that object {params: ...}(go to auth-interceptor.service.ts)
        .pipe(
            map(recipes => { //3.we expect to get the recipes (but the recipes that might not have an Ingredients property)
        return recipes.map(recipe => { //3.here with map() method we will get each/every recipe item of that array
    //3.here we will return the tranformed recipe item/object with {...spread operator on the original recipe(with spread we can copy/unpacking the existing properties of the original recipe(without ingredients property), plus ingredients: recipe.ingredients with ternary operator //if its true ->recipe.ingrediens, else if its false ->[])}   
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};//3.here we will return the tranformed recipe item/object with {...spread operator on the original recipe(with spread we can copy, unpacking the existing properties of the original recipe)}
        }); //this map() is arrays's method (call on the recipes array, and the map() method allowed to transform the elements in that recipes array individual,t.e. transform/map every elements of that arrray)
    }), //6.(284)add tap() operator in the pipe() (after the map() operator, and also import it from 'rxjs/operators') and with tap() we will get/fetch the recipes and we set the existing/old recipes in the page with these new fetched/loaded recipes (by calling the setRecipe(recipes) from the recipeService) 
    tap(recipes => {
        this.recipesService.setRecipes(recipes);
    }))

    //4.(282) return http.get('the argument is the same url-api endpoint'): Observable (). Where we can subscribe t.e. where are we interested/care about the response(about the loaded recipes)? We wont subscribe on the header component, because header component is not interested/not care about the response (we are not using recipes on the Header).So we will subscibe in this DataStorage Service
    //7.(284)we will no longer subscribe here in the service, but simply I will return this Observable and I will subscibe() in the Header comp (go to header comp.ts)
    // return this.http.get<Recipe[]>('https://ng-course-recipe-book-9f63a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    //3.(283)to prevent from some bugs(because we have no input some Ingredients, to not be empty that Ingredients array) we can add here pipe(map() to transform that data) to out fetchRecipes() after http.get()
        // .pipe(
        //     map(recipes => { //3.we expect to get the recipes (but the recipes that might not have an Ingredients property)
        //     return recipes.map(recipe => { //3.here with map() method we will get each/every recipe item of that array
        // //3.here we will return the tranformed recipe item/object with {...spread operator on the original recipe(with spread we can copy/unpacking the existing properties of the original recipe(without ingredients property), plus ingredients: recipe.ingredients with ternary operator //if its true ->recipe.ingrediens, else if its false ->[])}   
        //         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};//3.here we will return the tranformed recipe item/object with {...spread operator on the original recipe(with spread we can copy, unpacking the existing properties of the original recipe)}
        //     }); //this map() is arrays's method (call on the recipes array, and the map() method allowed to transform the elements in that recipes array individual,t.e. transform/map every elements of that arrray)
        // }), //6.(284)add tap() operator in the pipe() (after the map() operator, and also import it from 'rxjs/operators') and with tap() we will get/fetch the recipes and we set the existing/old recipes in the page with these new fetched/loaded recipes (by calling the setRecipe(recipes) from the recipeService) 
        // tap(recipes => {
        //     this.recipesService.setRecipes(recipes);
        // })
        // )
        // .subscribe(
        // //with <Recipe[]> we inform angular which will be the type of the extracted Responce body (return Recipe[])
        //     recipes => { //we expect to get/receive our fetch/loaded recipes
        //         //console.log(recipes);
        //     //7.(282)here in subscibe() in data storage Service, call the injected Recipes Service and call setRecipes(with our fetched/loaded recipes as parameter)
        //         // this.recipesService.setRecipes(recipes);//7.now we can forward these new fetched/loaded recipes (to setRecipe() in Recipe service where we will overwrite/re-set the existing array of recipes with these new fetched/loaded array of recipes)
        //     }
        // );
        //4.(282)we can subscibe here in DataStorage service where we are injecting Recipes Service, because maybe we can do something with the Recipes Service, to push/move the loaded/fetched recipes in that Recipes service which in the end is the place where we menage our Recipes.
    //4(282)we should Set our existing array of recipes/our currently loaded Recipes(in the Recipes service) equal to these onces(to these fetched recipes), to overwright/re-set them to these fetched recipes.(to do that, go to recipes.service)
        //4(282.)btw Subscribe where?->where are we interested/care about the response(about the loaded recipes)? We wont subscribe on the header component, because header component is not interested/not care about the response (we are not using recipes on the Header).So we will subscibe here in this DataStorage Service
    }
}