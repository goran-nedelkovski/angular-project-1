////////////////292. Preparing the Signup Request
//1.(292)google -> Firebase Auth Rest Api (that firebase offer to you, for create users and login users).here we need only two methods(see th links on the right side): SignUp with email and password and signIn with email and password (these 2 links).and lets start 1st with link SignUp..we see the endpoint(url to which we send our request) and (under that url) we send that request with request body payload(request body data: email, password and returnSecureToken:true). Request is POST (we can see that above the url),And as response we get/receive an useId(firebase creates unique id for each user), tokenId (type:string, that is A Firebase Auth ID token for the newly created user), expiresIn:	string	(the number of seconds in which the ID token expires;//we can see all of these info in the documentation of firebase auth rest api).(go to auth folder and create auth.serfvice.ts //we need this new service that can dial with this auth request)
//2.(292)go to auth folder and create auth.serfvice.ts //we need this new service that can dial with this auth request)
//2.this auth.service will be responsible for Sign Up the user, signIn the user and manage the token

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";
//9.(292)lets create a new interface AuthResponseData(no need to export) for the response data that we get back from the api t.e. <the Response data that we get back/retrieve with the post<AuthResponseData>()>(see the Response payload from the documentation)(good practice is to create an interface, which is very helpful when we work with the response data)
export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    //2.(296)response Data Payload for login(signIn) is almost the same (plus registered property:boolean)..So, to be able to use the same Interface, I will add plus registered property with ? (optional, because signUp() will not use that, but login() will use this registered property) 
    registered?: boolean
}
//3.(292)export this class Auth Service and add @Injectable({providedIn:'roto'}0import it from @ang/core)
@Injectable({ providedIn: 'root' }) //if we inject service into a service like here, we need to add @Injectable()
export class AuthService {
//4.(298)here in Auth Service I want to store the Authenticate User (Userf model class), store as a Subject observable(//the idea is to emit/send a new user with subject.next(new user) when we have one/login or also when we logout/when we clear the user/when the user is invalid/when token expired)
     //user = new Subject<User>();//4'(298) Subject<is gerenic type, so the type of the data that this obs returns at the end is Userf model class> (import the Subject from 'rxjs' and import the User from user.model.ts)
//2.(300)now we need to get access to the User(currently loogedIn/auth user) in both (in storeResipes and in fetchRecipes), because we need to get the token from the User (t.e. when we store or fetch Recipes I want to get only the token of the currently loggedIn/authenticate User)(go to auth.service.ts)
//2'(300)lets store the token in a variable and initialy set to null (because we are interested only for the token;//on demand User's data)
  //  token:string = null;
  //2''(300) instead of subject here we can use behaviuorSubject and its the same like the Subject.The difference is that with BehaviourSubject also gives us subscribers and immidiate access to the previous emitted value (that meeans that we have access to the current aciive User even we subscribe after that user has been emitted; t.e. we have access to the latest User).
  //2''(300) user = new BehaviourSubjet<User>(initialy set to null starting value)(go to data-storage.service)
  user = new BehaviorSubject<User>(null);
//3.(299)we manage our user here trough a Subject obs.this will inform all places in our app when our user changes(the user observable changes).Lets assume that user (user subjectg observable) always changes when the authentication status changes(true or false).So, even the token has expired, the user subject obs will emit a new value (which will be null, because the user will be invalid there).(we will add this logic);Lets assume that user subject obs is source of true (so in the header component we can subscribe to that userf subject obs to update correctly base on the user's status)(go to header.comp.ts)
     //5.(292)we need http:HttpClient to send that requests.inject it in the constructor
    constructor(private http: HttpClient, private router:Router) { }
    //4.(292)add signUp()/register method.This method should send our request to that signUp url(to signUp endpoint)
    //4.(292) signUp(expect to receive as parameters/input values email:string, password:string) 
    signUp(email: string, password: string) { //4.expect to receive as parameters/value email:string, password:string
        //6.(292)here in signUp send http.post() request to that signUp url with {request body payload data: email, password, returnSercureToken:true}
        //8.(292)return this prepared Observable (to can subscribe() in the auth.component.ts which is might be interested/care of getting the response of that)       
        //10.(292)in post<generic type>() define the type of Response data that we get back from the api t.e. the type/format of the Response body data t.e post<AuthResponseData>()
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKqQxisoIf6sBjIh0JV7xO126_N7tE4JU',
            //6.(292)that API_KEY later we should replace with my firebase API key.we can find that firebase Api key in firebase.console -> in project settings(in the settings icon at the top-left)->web API key: ... copu-paste this key here(replace the API_KEY including the [] with this web api key from my firebase)
            {
                //7.(292)on the request(because its post request), attach js object here with 3 properties (see from the documentation, t.e. from the request body payload.;//these info the backend requires)
                //7.(292)asign email parameter/value to the email property and asign password parameter/value to password property(the properties names must be the same as in the documentation of firebas auth rest api)
                email: email, //email key/property: gets email parameter/value//asign email parameter/value to the email property
                password: password, //password key/property: gets password parameter/value//asign password parameter/value to password property
                returnSecureToken: true //also Api expect returnSecureToken and set to true(always, as shown in the documentation)
                //2(295).its noot good practice in the component this error handling logic(because the component is care about updating the UI, and not the handle logic).This handle logic we can move here in the Service with rxjs/operators in our Observable chain.so use pipe(operator catchError()//import it from rxjs/operators).also we will need to import 'thwowError' function from 'rxjs';
                //2.so use pipe(operator catchError()//import it from rxjs/operators).also we will need to import 'thwowError' function from 'rxjs' (which will create a new Obserbable that wraps an error);
            })
    //3.(297)here in pipe(operator catchError(paste here this.handleError private method as argument))
         .pipe(catchError(this.handleError),
    //5.(298)add a tap() operator in pipe() //import tap from 'rxjs/operators')//tap() does not change the response(not block the code, not stop, not change), but just do run/execute some code with the data that we get back from that Observable/with the response
         tap(resData => {
    //10.(298)here in tap() call our private handleAuthenticate(with the expected parameters base on resData...//+resData.expiresIn (with + we convert to a number))(copy the all tap() operator and paste also in login pipe())
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    // //6.(298) _tokenExpirationDate:Date is of type Date and its not part of our Response, but we need to generate that.so, here add new variable expirationDate
    //         const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000); //new js Date object, base on that ExpiresIn time that we get back from Firebase
    //     //6'(298) new Date(current Date with new Date().getTime()=current TimeStamps in miliseconds since the beginning of time + resData.expiredIn property that we get back from the Firebase(eith + we has converted to a number * 1000 to miliseconds))
    // //5'(298) here in tap() I want to create my new User (user=new User(the arguments of the constructor requires, base on resData object interface that we get) obj/incatnce user of the User class)
    //         const user = new User(
    //             resData.email, 
    //             resData.localId, 
    //             resData.idToken, 
    //             expirationDate);
    //     //6''.(298)pass that expirationDate object in the User constructor as the last argument.So this will construct/biuld the user with the resDate that we get back
    //     //7.(298) now we can use the Subject observable to send/emit/next that created user t.e. next our currently loggedIn user in our app
    //             this.user.next(user); //this is our currently loggedIn user in our app
    })
    );
        //3.(295).we expect to get.receive the same errorRes and inside paste the code for switch(all error handling logic I wan to be here in the service, not in the component)
        //     //4.(295)add new variable here errorMessage and set initialy to some default error message
        //     let errorMessage = 'An unknown error occured.' 
        // //5.(295)check if we dont have error or error.error properties of errorRes object, then return throwError(errorMessage, the default initial messge)
        // if(!errorRes.error || !errorRes.error.error) {
        //     return throwError(errorMessage); //throwError Observable with that error message value 
        // }
        // //1.(295) else if we have the message property of errorRes object, then switch to that property with switch
        //   switch (errorRes.error.error.message) { //in switch statement we will have only one case "EMAIl_EXISTS": errorMessage = 'new error message'
        //     //5.(295) here I will overwrite/reasign that variable to this error message
        //     case 'EMAIL_EXISTS': errorMessage = 'This email already exists';
        //   //2(295).its noot good practice in the component this error handling logic(because the component is care about updating the UI, and not the error handle logic).This handle logic we can move in the Service with rxjs/operators
        //   }
        // //6.(295) out of the switch block, we can return throwError observabe with that new errorMessage value
        //   return throwError(errorMessage);
        //     }));
    }
    ///////////////////296. Sending Login Requests
    //1.(296)lets create login(receive email:string and password:string as parameters) in auth.service.we can see the signIn method with email and password how will look like in google->Firebase Auth Rest Api documentation; http.post('1st arguments is url..copy-paste the url(api endpoint and replace that [API_KEY] including the [] with our Web Api key in project_settings), 2nd argument is request body payload is with email, password and returnSecureToken(the same as before, copya and paste them in a js object {} as second argument)
    login(email: string, password: string) {
        //3.(296) in post<here define the type of the data that we get back from the api and that is AuthResponseData interface object>. finaly we need to 'return' this prepared Observable (to can subscribe() to our auth.component that is interested/care about the response) 
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKqQxisoIf6sBjIh0JV7xO126_N7tE4JU',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
        //4'.(297)we can use the same pipe(catchError(this.handleError)) also on our login() function
            .pipe(catchError(this.handleError),
        //11.(298)copy the tap() operator and paste also here in pipe() for our login() logic/route
            tap(resData => {
                //10.(298)here in tap() call our private handleAuthenticate(with the expected parameters base on resData...//+resData.expiresIn (with + we convert to a number))  
                            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                // //6.(298) _tokenExpirationDate:Date is of type Date and its not part of our Response, but we need to generate that.so, here add new variable expirationDate
                //         const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000); //new js Date object, base on that ExpiresIn time that we get back from Firebase
                //     //6'(298) new Date(current Date with new Date().getTime()=current TimeStamps in miliseconds since the beginning of time + resData.expiredIn property that we get back from the Firebase(eith + we has converted to a number * 1000 to miliseconds))
                // //5'(298) here in tap() I want to create my new User (user=new User(the arguments of the constructor requires, base on resData object interface that we get) obj/incatnce user of the User class)
                //         const user = new User(
                //             resData.email, 
                //             resData.localId, 
                //             resData.idToken, 
                //             expirationDate);
                //     //6''.(298)pass that expirationDate object in the User constructor as the last argument.So this will construct/biuld the user with the resDate that we get back
                //     //7.(298) now we can use the Subject observable to send/emit/next that created user t.e. next our currently loggedIn user in our app
                //             this.user.next(user); //this is our currently loggedIn user in our app
                }))
        //4'.(297)this handle Error function runs for both Observables related to signUp and the Observables for login
    }
    /////////////////302. Adding Logout
//1(302)lets add logout() methiod in the auth Service
    logout() {
    //2(302)call user Subject obs and next(null) to set out user to null. this will inform all app that the user is unAuth..(, because that the logic, user === null) (go to header.comp.html)
        this.user.next(null);
    //5.(302)here in the Auth Service I want to redirect/navigate away to the /auth route(page).(not in the component; so first inject the router:Router in the constructor)
        this.router.navigate(['/auth']);
    }

//8.(298)as the error Handling before, we need the same logic for our loogedIn user, to handle.So I will add private method
    private handleAuthentication(email:string, userId:string, token:string, expiresIn:number) {//we expect to get these arguments
//9(298)copy and paste here the code from tap().here remove the resData and replace the Users parameters with these paameters of the function 
        //6.(298) _tokenExpirationDate:Date is of type Date and its not part of our Response, but we need to generate that.so, here add new variable expirationDate
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); //new js Date object, base on that ExpiresIn time that we get back from Firebase
        //6'(298) new Date(current Date with new Date().getTime()=current TimeStamps in miliseconds since the beginning of time + resData.expiredIn property that we get back from the Firebase(eith + we has converted to a number * 1000 to miliseconds))
    //5'(298) here in tap() I want to create my new User (user=new User(the arguments of the constructor requires, base on resData object interface that we get) obj/incatnce user of the User class)
            const user = new User( ////////=>this is our created currently loggedIn user in our app t.e. our currently authenticate user that we are creating here base on resData:AuthResponseData object (from resData I get/receive the userId, token...and with these informaitions I am creating here my currently authenticate/logged In user)
                email, 
                userId, 
                token, 
                expirationDate);
        //6''.(298)pass that expirationDate object in the User constructor as the last argument.So this will construct/biuld the user with the resDate that we get back
        //7.(298) now we can use the Subject observable to send/emit/next that currently created authenticate user t.e. next our currently loggedIn user in our app
                this.user.next(user); //this is our currently loggedIn user in our app
    //////////here after I created my currenly auth/loggedIn user(base on the resData), I need to store this data(thisinformation) in the user Subject observable (instead of storing it in Local Storage, here I'm storing the auth/loggedIn user in the Subject observable.So call this obs and next(our currently created auth/loggedIn user)).With this, some components or services (that are interested/care about this auth/loggedIn user, or interested about the user.token), can subscibe to this user Subject observable to can take the user data (to take the currelty logedIn/auth user object with the token)
    }


    //////////////297. Login Error Handling
    //1.(297)it would be nice to share that error handling logic between both Observables(in login and signUp/register) in some private method in the Service
    //1.(297) lets create a new private method here in the Auth Service (private because it will be used only in the service)
    private handleError(errorRes: HttpErrorResponse) {
        //1.(297)expect to receive as argument object errorRes:HttpErrorresponse (import it from @ang/common/http)
        //4.(295)add new variable here errorMessage and set initialy to some default error message
    //2.(297)copy the code for error handling from the pipe and paste here in this private method
        let errorMessage = 'An unknown error occured.'
        //5.(295)check if we dont have error or error.error properties of errorRes object, then return throwError(errorMessage, the default initial messge)
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage); //throwError Observable with that error message value 
        }
        //1.(295) else if we have the message property of errorRes object, then switch to that property with switch
        switch (errorRes.error.error.message) { //in switch statement we will have only one case "EMAIl_EXISTS": errorMessage = 'new error message'
            //5.(295) here I will overwrite/reasign that variable to this error message
            case 'EMAIL_EXISTS': errorMessage = 'This email already exists'; 
            break;
        //5.(297)lets write more cases here in switch (related to Common error codes from documentation)
            case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist';
            break;
            case 'INVALID_PASSWORD': errorMessage = 'The password is invalid or the user does not have a password';
            break;
            //2(295).its noot good practice in the component this error handling logic(because the component is care about updating the UI, and not the error handle logic).This handle logic we can move in the Service with rxjs/operators
        }
        //6.(295) out of the switch block, we can return throwError observabe with that new errorMessage value
        return throwError(errorMessage); 
        //3.(297)now with this method we have the central place for error handling logic, and now go to signUp() to pipe(catchError(paste here this.handleError private method))
    }
}
/////////////////300. Adding the Token to Outgoing Requests
//1(300).why we cant fetch the data? because firebase don't know that we have a valid token. (we know from the responce object, but Firebase dont know)
//1.(300)lets use our token (add it in our outgoing request) to can fetch the data.So, we need to add the token in our outgoing request to let/inform Firebase to know about that (to inform Firebase that we have a valid token).For that, we need to manipulate our outgoing http requests (for storing and fetching data)(so go to data-torage.service.ts)
//1.In Data Storage service, those requests (get and post) now need to be added such as we do attach our token to them (the token we are storing in the User object in the auth.service)
//const user = new User( ////////=>this is our created currently loggedIn user in our app t.e. our currently authenticate user that we are creating and storing here base on resData:AuthResponseData object (from resData I get/receive the userId, token...and with these informaitions I am creating here my currently authenticate/logged In user)
// email, 
// userId, 
// token, 
// expirationDate);