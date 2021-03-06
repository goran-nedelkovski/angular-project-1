import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service'; //import the interface AuthResponseData
import { AlertComponent } from '../shared/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
//////////////////286.How authentication works
//1.(286)Client send auth data to the server.Server is Restful Api and it dont know the client(not care about client).Client-server communicate through http:HttpClient req/res. So 1st we check on the client side validation of the credentials(validation of username and password), and this auth data we send to the server.The server also check if the username and password are valid and if the are valied, the server create Token (with secret algoritams) and send that token to the client.That Token is encoded JSON String(not encripted).Client stores that Token in the Stogare(In the Browser's Local Storage).And this token will be attached on any request(attached on the header like query params itn..) send to the server and these request must be authenticated/authorize.
//////////////////287. Adding the Auth Page
//1.(287)create new component auth with: ng g c auth (in the app folder) and this component(page)will be for login/logout the user(so, the Recipe page at start will not be accessibale/locked down if the user is logout or if the user is loggedIn,then Recipes page will be shown) (go to auth.comp.html template)
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
//////////////313. Creating a Component Programmatically
//we can access to this Placeholder directive with @ViewChild('selector...localReference or we can pass here a type t.e. name of the directive(and @VieChild will find that place-element in the dom with thid directive)')
@ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective  //awe can store this in a alertHost property becaus this is the place-element where we can host our alert.alertHost: is of type PlaceholderDirectfive
private closeSub: Subscription; //because EventEmitter is based on the Subject (ando so that have the same type of :Subscription)
///////////////288. Switching Between Auth Modes
//1.(288)to can swithch between auth modes(login and logout), here in auth comp ts we neet to manage the currently active mode.So lets create a property isLoginMode (boolean) and its initialy set to true
  isLoginMode = true; //initialy set to true
//3.(294)we can use this spinner in auth.component and there I want to hide the entire form while we are currently loading the spinner
//3.(294)for that here in auth.comp.ts I will create a property isLoading and set to false initialy
  isLoading = false;
  error: string = null; //8.(294)also I want to show error message in alert box if we have an arror t.e. if we have a problem with login.for that I will create error property to store the error:string messagge and initialy set to null
  constructor(private authService: AuthService,
    private router:Router,
    //here we will create our own component dinamicaly/programaticaly.For that, we need ot inject ComponentFactoryResolver in the constructor()
    private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }
//2.(288)I will add method onSwitchMode() (swithicg from login to logout or oposite) which will be oposite of isLoginMode with ! (dinamicaly switching from true to false and oposite) (go to auth.comp.html template)
  onSwitchMode() {
    //this.isLoginMode = false;
    this.isLoginMode = !this.isLoginMode;//2.now we need to connect/bind onSwitchMode() and isLogin property with our Template (go to auth.comp.html template)
  }
//4.(289)add onSubmit() on the ts, and here as argument we expect to receive that form object form:NgForm (import it from @ang/forms)
  onSubmit(form: NgForm) {
    //console.log(form.value);//console.log the value of the form object
     //form.reset();//after sending/sumbiting the form, reset the form with form.reset() like at the begining with empty fields.
  ///////////////////293. Sending the Signup Request
  //2.(293)1st we can check if the form is not valid (with !) then this method will not trigger/not fire
    if(!form.valid) {
      return; //if the form is not valid, this method will not trigger/not fire
    }
  //1.(293)here in onSubmit before form.reset, first I want to extract my email and password , t.e. to get the values of the email and password and store in variabvles(with form.value.email and form.value.password)
    const email = form.value.email;
    const password = form.value.password;
    //5.(296)we have duplicate code(in login and sighUp logic), so to avoid that, we can create a variable let authObs: Observable<generic type that returns/give us back that AuthResponseData(we need to export that interface to can use here, to can import it first at the top)> (import Observable from 'rxjs')
    //5.(296)the idea with this variable is to store both Observables(this.http.login() and this.http.signUp() to this authobs:Observable variable (without the subscribe code) and after if-else we can subscribe() to that authObs:Observable variable)
    let authObs: Observable<AuthResponseData>//5.this <AuthResponseData> will be used here by auth:Observable
  //4.(294)add here in onSubmit() right befor sendich the form, re-set isLoading to true.
    this.isLoading = true;
  //4.(293) check if we are in isLoginMode then here will be SignIn() logic (here we can't do nothing for now, because we did't add singIn logic yet, we only added signUp logic) and else (if we are not on isLoginMode then, here will be signUp logic)
    if(this.isLoginMode) {
      // ... //4.(296)here in this.isLoginMode will be the login() logic.call the login(also forward the extracted email and password here as arguments) from Auth Service and subscribe() to it(subscribe to that observable that returns/give us back <AuthResponseData interface object>)
     //5-1.(296)the idea with this variable is to store both Observables(this.http.login() and this.http.signUp() to this authobs:Observable variable (without the subscribe code) and after if-else we can subscribe() to that authObs:Observable variable)
      authObs = this.authService.login(email, password);
      // this.authService.login(email, password).subscribe(
      //   resData => { //4.we know that we will get/receive that AuthResponseData interface object, that we can store in some variable resData and simply console thatg varibale
      //     console.log(resData);
      //     this.isLoading = false;
      //   }, error => {
      //     console.log(error);
      //     this.error = 'An Error occus';
      //     this.isLoading = false;
      //   }
      // );
    }
    else { //here will be the singUp/register logic
  //5-1.(296)the idea with this variable is to store both Observables(this.http.login() and this.http.signUp() to this authobs:Observable variable (without the subscribe code) and after if-else we can subscribe() to that authObs:Observable variable)
      authObs = this.authService.signUp(email, password);
      //3.(293)in else (if we are not on this.isLoginMode), then here will be the signUp () logic
      //3.(293)we need to inject our auth Service here in our auth component, so we can call signUp(with extracted email and password as parameters) method from the Service and subscribe() to this singUp() method (to this Observable)
    // this.authService.signUp(email, password).subscribe(
    //   resData => {//we expect to receive resData:AuthResponseData interface(response data payload, as success response)
    //     console.log(resData)
    //   //5.(294)here as soon as we are done with sending the form(t.e. when we get the response), set back isLoading to false (in both case, in the success case and in the error case)
    //     this.isLoading = false;
    //   }, errorRes => { //2nd argument in subscribe will be error callback (if we get an error obj)
    //     console.log(errorRes)
    //////////////////295. Improving Error Handling
    //1.(295)in console we can see in the response Error object ->error -> message: 'EMAIl_EXIST' => and that code is provide by Firebase (I can see that in the documentation of Firebase auth rest api in Common error codes:)
    // //1.(295)letts check with switch the error.message property
    //   switch (errorRes.error.error.message) {
    //     case 'EMAIL_EXISTS': this.error = 'This email already exists';
    //   //2(295).its noot good practice here in the component this error handling logic(because the component is care about updating the UI, and not the handle logic).This handle logic we can move in the Service with rxjs/operators
    //   }
      // );
      // )
    //   //8.(294)also I want to show error message if we get an arror here t.e. if we have a problem with login.for that I will create error property to store the error:string messagge and initialy set to null and here we get the error.message and store to that error:string property (go to the template)
    //     //5.(294)here as soon as we are done with sending the form(t.e. when we get the response), set back isLoading to false (in both case, in the success case and in the error case)
    //     this.isLoading = false;
    // //6.(294)now isLoading property we can use in the template to hide the form
    //   });
    }
  //5-2.(296)the idea with this variable is to store both Observables(this.http.login() and this.http.signUp() to this authobs:Observable variable (without the subscribe code) and after if-else we can subscribe() to that authObs:Observable variable)
    authObs.subscribe(
        resData => { //4.we know that we will get/receive that AuthResponseData interface object, that we can store in some variable resData and simply console thatg varibale
          console.log(resData);
          this.isLoading = false;
      //////////////299. Reflecting the Auth State in the UI
//1.(299)lets forward user to a different route once the user is authenticate/logged In t.e. redirect the user once the user is authenticate/logged In(we can do in the handleAuthentication() or in the component in subscribe()).I will do that redirection/navigation in the component(in subscribe(only in the success case)), so I need to inject a router:Router
          this.router.navigate(['/recipes']); //programmatic navigation/redirect to '/recipes' route/page (programmatic from our code because that we know when the login is done) (go to header.comp.html)
        },
    //7(295)here in the component we subscribe() to that throwError(errorMessage) Observable and we know that we get/receive that errorMessage value from the throwError Observable (that errorMessage value that is send/emit/return/throw by throwError observable), because here we subscribe() to that throwError(errorMessage) Observable
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        }
    );
//5'(296)now if we login with the same email and password, in the console we succefuly get back the Response object (..plus with property registered: true;//which means the user is registered in the db with signUp/register logic)
  //5.(239)we can see in the console(if we signUp, switch to signUp) the new registered User object and we can se that registered User in firebase.com -> Authenticate -> Users (Refresh)).But if we input the exactly email and password (or at least the same email) we get an error because thatg User already exists
    form.reset();//after sending/sumbiting the form, reset the form with form.reset() like at the begining with empty fields.
    ngOnDestroy() {  //we also want to clear/unsubscribe here in ngOnDestroy() if we want to leave/rid of AuthComponent
      if(this.closeSub) { //if we have an active closeSub:Subscription
        this.closeSub.unsubscribe();  //then unsubscribe()/clear /unlisten anymore
      }
    }
    private showErrorAlert(message: string) {
    //////////////////312. Preparing Programmatic Creation (Section: Dynamic Components)
      //here we will create our own component dinamicaly/programaticaly with code.For that, we need ot inject ComponentFactoryResolver in the constructor()
     //const alertCmp = new AlertComponent(); //its a valid ts cide, but its not a valid Angular code
      //with our injected ComponentFactoryResolver service, we can access to the resolve Component Factory() method
      const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent) //pass in resolveCompFactory(type of the Component t.e. in our case AlertComponent)
//this alertCmpFactory is an Object/instance(not the Comp) that know how to create the AlertComponent
//now with that Factory, we can use that to create a concrete Component(dinamicaly).but we need a place to attach that Component to our DOM.we need to inform Angular where we want to attach/add that component (created with that Factory dinamicaly).So go to the .html template
    ////////////////////313.Creating a Component Programaticaly (comp that created manualy, programaticaly from code)
////now here we can accss to viewContainerRef of our PlaceHolder directive, because our directive expose/export the ViewContainerRef as a piblic property in the construncor()
      const hostViewContainerRef = this.alertHost.viewContainerRef;//ViewContainerRef is an Object/Container that refer/point to that place-element in the Dom with which can interact
    //now we can clear anything that may be rendered here before, befor I render something new
      hostViewContainerRef.clear(); //clear will clear all angular components that are been rendered in that place before
    /////now we can use our componentFactory to create our own Alert component(dinamicaly) with code in the hostViewContainerRef
  //in that place-el of the Dom hostViewContainerRef, in that place createComponent(and pass here alertCmpFactory) ->and this will create a new alert Component(dinamicaly) in that place-element in the DOM
      const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
      ///this comp is created manualy, programaticaly from code
      ///with this we have created manualy a component trough code
      /////////////////314. Understanding entryComponents
      //we need to inform angular that the AlertComponent was created in some place in the DOM, so we need to prepare Angular for this creation, and add this AlertComponent in entrtyComponent:[](because this AlertComponent was created programaticaly/manualy with code without selector or route/path).so go to app.module.ts
    /////////////////////////////315. Data Binding & Event Binding
//store this comp in a const componentRef, .instance => access to any instances/properties of this Component that was created here
      componentRef.instance.message = message //access to message property (of the AlertComponent) = message that we are getting as a string parameter input
    //now for close we need to manualy listen/subscribe to our close event here.we can with subscribe() and ots ok (this is an exeption,because we have only subscribe on a Subject Obs, but this custom event is just like subject obs because we have created that own event with EventEmitter and @Output in a component wich have own selector)
    ////subscribe()/listen to our own event 'close'
      this.closeSub = componentRef.instance.close.subscribe(() => { //here ew need to unsubscribe(), because we do this manualy
        //here we wanna clear that componentRef
         this.closeSub.unsubscribe();  //cleaar the subscription*(unsubscribe here), because I know that this component will be removed
        //and to remove the component, we can use hostViewContainerRef.clear() ->to clear all content that was render here
          hostViewContainerRef.clear()
      })
    /////So this is how to dinamicaly/programaticaly create a Component inside from a code
    }
  }

/////////////////290. Preparing the Backend
//1.(290)in our firebase.console project, go to Authentication page -> -> Get started -> set up Sing In method (in Users). before we do that, lets go to the Database(Realtime Database)-> Rules -> and for ".read" and '.write' set 'auth != null' t.e. this: ".read": "auth != null",".write": "auth != null" -> Publish//this will tell firebase, that only authenticate users can read and write our data ;//now if we fetch recipes, we see error in the console(401, nort authorize)
//2.(290)go back to our firebase.console project, go to Authentication page to enable the authentication and to add some logic to be able to visit our authenticate routes again-> Get started -> set up Sing In method (in Users) ->choose Emial/password -> click Enable(only the 1st one at the top)->Save (now we have firebase biuld-In authentication active, where you can send request to sertain api-endpoint to create Users and logged the users in.//and you can see the Users in the Users tab (Authentication->Users))
/////////(291)Make sure you got Recipes in your backend!
//291.In order to continue with this module and send successful authenticated requests, you need to ensure that you got recipes stored in your backend database.
//So in case you deleted those (or never added any), make sure you do add some recipes before you turn on protection as shown in the last lecture!
////////////////292. Preparing the Signup Request
//1.(292)google -> Firebase Auth Rest Api (that firebase offer to you, for create users and login users).here we need only two methods(see th links on the right side): SignUp with email and password and signIn with email and password (these 2 links).and lets start 1st with link SignUp..we see the endpoint(url to which we send our request) and (under that url) we send that request with request body payload(request body data: email, password and returnSecureToken:true). Request is POST (we can see that above the url),And as response we get/receive an useId(firebase creates unique id for each user), tokenId (type:string, that is A Firebase Auth ID token for the newly created user), expiresIn:	string	(the number of seconds in which the ID token expires;//we can see all of these info in the documentation of firebase auth rest api).(go to auth folder and create auth.serfvice.ts //we need this new service that can dial with this auth request)
///////////////294. Adding a Loading Spinner & Error Handling Logic
//1.(294)Google->css loading spinners -> https://loading.io ->grab one of them(click) and copy all css code and with terminal in the shared forlder create a new component loading-spinner(:ng g c shared/loading-spinner)  paste the css code in the loading-spinner.comp.css file and change the color wrom white to blue.(or 2nd way-manuely create new folder in the shared folder 'loading-spinner'-> loading-spinner.component.ts...) (go to loadin-spinner.comp.ts file)
//2.(294)in the ts file, we have exported this class LoadinSpinnerComponent and add decorator @Component({ selector: 'app-loading-spinner', templateUrl:'copy the html code for that spinner and paste here'}, stylesUrl:['']) (make sure that this component is added in app.module -> in declarations)
  //3.(294)we can use this spinner in auth.component and there I want to hide th entire form while we are currently loading the spinner
}

