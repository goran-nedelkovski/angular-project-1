///////////////279. Backend (Firebase) Setup => log in (sign in) on Firebase.console with my google (gmail) account, then create/add new project -> enter project name: ng-course-recipe-book -> next -> checked all and Create new project
//->then choose Realtime Database -> create Database -> choose realtime database location: Us(us-central1) or Belgium(europe-west1) -> Start in test mode (for now, without authentication(in test mode we can unlimited read and write access without auth..)..but we will add authentication soon in the next section) ->  Enable
////////////////280.Seting up DataStorage Service
//1.(280)in the shared folder (right clik->new file)->data-storage.service.ts (we can optionaly make our http requests(post, get..) also in the recipes.service.ts because there we are interacting with the resipes, but here I want to focus only on the http reques in this different file service)
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
//2.(280)add @Injectable()->because we will inject the http Service into this Service (when we inject one service into another, I must use @Injectable(); @Injectable({providedIn:'root'}->this is the modern way, or we also can by add this service in the providers:[] in app.module.ts))
@Injectable({providedIn: 'root'})
//1.(280) lets export the dataStorageSrvice class
export class DataStorageService {
    //3.(280)lets inject http:HttpClient in gthe constructor() (but to can be used this service http:HttpClient, first we must import HttpClientModule in app.module.ts.This is crutial for unlock the http:HttpClient functionality, and we can use http:HttpClient service in every part of our application).So, 1st import HttpClientModule in app.module.ts from '@ang/common/http' and 2nd. inject http:HttpClient service in the constructor() of our Service class and import HttpClient from '@ang/common/http'  
    constructor(private http:HttpClient) {}

}