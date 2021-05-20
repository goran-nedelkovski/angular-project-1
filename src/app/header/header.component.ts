import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
//import { Subscription } from 'rxjs';
//import { Recipe } from '../recipes/recipes.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //6.(299)we can unsubscribe when we leave this component, so 1st add private property userSub:Sub, then store all the subscription code (in ngOnInit) in this.userSub property and in ngOnDestroy() add unsubscribe() to this property
  private userSub:Subscription; 
//7'(299)so add a property isAuthenticated and initialy set to false
  isAuthenticated = false;
  //3.create own event featureSelected
  //with @Output decorator, this our own event will be listenable from outside(from our parent component, app comp)
  // @Output() featureSelected = new EventEmitter<string>()
//4.(299)in header.comp.ts inject the Auth Service
  constructor(private dataStorageService:DataStorageService,
    private authService:AuthService) { }

  ngOnInit(): void {
//5.(299)in the header component(in ngOnInit) we can subscribe to that user subject obs to update correctly base on the user's status(wheever the user is null or exist))
    this.userSub = this.authService.user.subscribe(
      user => { //we know that we will get/receive the user object
      //7.(299)lets assume that this user wheter will be null if we are not logged in or will exists(user object) if we are logged in.So idea is, if we have the user, we are logged in
        this.isAuthenticated = !user ? false : true; 
      //7''(299)when we get the user(null or exist) isAuthentication = false if !user(if user === null) or otherwise isAuthenticate = true if user exists like normal js object 
      //7'' we can also do like this: this.isAuthenticated = !!user; (true -> we can see that with console.log(!user) and console.log(!!user)) (go to header.comp.html)
      }
    );
    // this.recipesSub = this.dataStorageService.fetchRecipes().subscribe(
    //   (recipes:Recipe[]) => {
    //     console.log(recipes);
    //   }
    // );
  }
//2.define that method, we expect to receaive as parameter some feature:string
  // onSelect(feature:string) {
  //   this.featureSelected.emit(feature) //4.emit our feature:string that we received as parameter value 'recipe' string in our methods call in the template 
  // }
  // onSelect('shopping-list') {

  // }
//8(281)add this method in the header.comp.ts and call here storeRecipes() from DataStprage Service (inject this service in the constricotr and import at the top)
  onSaveData() {
    this.dataStorageService.storeRecipes();
  //8(281)that's all, and we can see in the console the response(our stored resipes[]) and in the firebase we can see a new node resipes (folder), which contains our data (our stored recipes).
  //8(281).if we used post request (for one single Recipe is used post() btw), then in the db we need to have an encripted key (id) for that Recipe (encriped kes for all Recipes objects/pieces), but with put() method, firebase assume that I know what I put there in the db(so, we dont need encripted keys(id) with put() method //only for post() we need that id(encripted keys))
  }
//3.(282)//add this onFecthData() on header.comp. ts and there we can accces to that method fetchRecipes() trough the injected DataStorage Service 
  onFetchData() {
  //8.(284)we will subscribe() here in onFetchData() in header comp.ts
    //8.in subscribe() we dont need to pass a function if we are not interested/not care about the response (go to recipes-resolver.service)
  this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  // ngOnDestroy() {
  //   this.recipesSub.unsubscribe();
  // }

}
