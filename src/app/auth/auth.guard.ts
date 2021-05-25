//////////////305. Adding an Auth Guard
//1.(305)we need to add Route Guard to prevent/protect some route(to prevent of user going to that route if its not authenticate/if its not loggedin)->route guard is some code that is runs/execute before some route has loaded
//1.(305)for that in auth folder -> lets create a new file auth.gurad.ts

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs"; //import Observable from 'rxjs'
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
//2.(305) add @Injectable() decorator because we will inject some services into this Guard Service
@Injectable({providedIn:'root'})
//1.(305)export the class AuthGuard, implements canActivate interface (import it from @ang/router)
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, 
        private router:Router) {}
//3.(305)this interface canActivate forces us to add method canActivate(route:ActivatedRouteSnapsot//currently active route, state:RouterStateSnapshot) //with ctrl + enter on the interface we can see what has inside in that interface.this method shoud return :Observable<boolean> or Promise<boolean> or boolean
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //4.(305)here we want to return the status that arrived from the Auth Service. so lets inject authServce in contructor()
    //5.(305) here we can find out if the user is authenticate/loggedIn or not by looking at that user Subject observable.don't subscibe to it, but only return this user subject observbale.This subj Observable will not return boolean, but will retrn our user auth object. To fix this, we can do by subscribing with pipe(operator map(to transform/map the Observable value here/our user auth obj to true/false/boolean))
        return this.authService.user.pipe(take(1),
    //8.(305)we want to take the user auth obj only once t.e. to tak the last user and unsubscribe then for this once guard execution, so we can user operator take(1) //import take from 'rxjs/operators'//
        map(user => { 
        //5.(305)with map() we want to to transform/map the Observable value/our user auth obj to true/false/boolean) t.e. with map() we get our user auth obj, and inside we want to return true or false 
            //return !!user; //this will return true (!user will return false, and !!user will retrn true). (go to app-routing.module.ts)
            //this the same we can do with if-else like this:
            // if(!user) { return false } //if user === null
            // else { return true } //if we have the user, return true 
    //7.(305)when we get the user => intead return !!user only, we first can store !!user in const isAuth and then check is isAuth exist(if its true), then return true, otherwise/else return this.router.createUrlTree(['/auth'])//t.e. if its false, redirect to /auth.Import UrlTree from @ang/router and in canActivate() return: Observbale<boolean | UrlTree> | Promise<boolean | Urltree> | boolean | UrlTree
            const isAuth = !!user; //store the true value in isAuth varuable
            if(isAuth) {   //check is isAuth exist(is realy its true)
                return true; //then return true
            }  //else
            else { //else as false navigate/redirect with createUrltre on /auth route (import UrlTree and inluce urltree in the types t.e. return <boolean | Url>...//UrlTree is new feature in authentication and in our case it redirect the user to some other route when the usr its not authenticate t.e. when the route the user wants to visit is blocked)
                return this.router.createUrlTree(['/auth']);
            }
            //2nd way, we could do this with tap(isAuth => { //we get/recieve isAuth(true) that map() returns
            //if(!isAuth) { this.router.navigate(['/auth']) } //and redirect the user with router.navigate(/auth) (old way)
         //this approuch in some cases may give us a multiple redirects that interferent each other.So, instead of using this approuch, we can use other approuch. 
            // })
        }));
    }
    
}