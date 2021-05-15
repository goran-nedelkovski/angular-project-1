import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//////////////////286.How authentication works
//1.(286)Client send auth data to the server.Server is Restful Api and it dont know the client(not care about client).Client-server communicate through http:HttpClient req/res. So 1st we check on the client side validation of the credentials(validation of username and password), and this auth data we send to the server.The server also check if the username and password are valid and if the are valied, the server create Token (with secret algoritams) and send that token to the client.That Token is encoded JSON String(not encripted).Client stores that Token in the Stogare(In the Browser's Local Storage).And this token will be attached on any request(attached on the header like query params itn..) send to the server and these request must be authenticated/authorize.
//////////////////287. Adding the Auth Page
//1.(287)create new component auth with: ng g c auth (in the app folder) and this component(page)will be for login/logout the user(so, the Recipe page at start will not be accessibale/locked down if the user is logout or if the user is loggedIn,then Recipes page will be shown) (go to auth.comp.html template)
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
///////////////288. Switching Between Auth Modes
//1.(288)to can swithch between auth modes(login and logout), here in auth comp ts we neet to manage the currently active mode.So lets create a property isLoginMode (boolean) and its initialy set to true
  isLoginMode = true; //initialy set to true

  constructor() { }

  ngOnInit(): void {
  }
//2.(288)I will add method onSwitchMode() (swithicg from login to logout or oposite) which will be oposite of isLoginMode with ! (dinamicaly switching from true to false and oposite) (go to auth.comp.html template)
  onSwitchMode() {
    //this.isLoginMode = false; 
    this.isLoginMode = !this.isLoginMode;//2.now we need to connect/bind onSwitchMode() and isLogin property with our Template (go to auth.comp.html template)
  }
//4.(289)add onSubmit() on the ts, and here as argument we expect to receive that form object form:NgForm (import it from @ang/forms)
  onSubmit(form: NgForm) {
    console.log(form.value);//console.log the value of the form object
  }
/////////////////290. Preparing the Backend
//1.(290)in our firebase.console project, go to Authentication page -> -> Get started -> set up Sing In method (in Users). before we do that, lets go to the Database(Realtime Database)-> Rules -> and for ".read" and '.write' set 'auth != null' t.e. this: ".read": "auth != null",".write": "auth != null" -> Publish//this will tell firebase, that only authenticate users can read and write our data ;//now if we fetch recipes, we see error in the console(401, nort authorize)
//2.(290)go back to our firebase.console project, go to Authentication page to enable the authentication and to add some logic to be able to visit our authenticate routes again-> Get started -> set up Sing In method (in Users) ->choose Emial/password -> click Enable(only the 1st one at the top)->Save (now we have firebase biuld-In authentication active, where you can send request to sertain api-endpoint to create Users and logged the users in.//and you can see the Users in the Users tab (Authentication->Users))
/////////(291)Make sure you got Recipes in your backend!
//291.In order to continue with this module and send successful authenticated requests, you need to ensure that you got recipes stored in your backend database.
//So in case you deleted those (or never added any), make sure you do add some recipes before you turn on protection as shown in the last lecture!
////////////////292. Preparing the Signup Request
//1.(292)google -> Firebase Auth Rest Api (that firebase offer to you, for create users and login users).here we need only two methods(see th links on the right side): SignUp with email and password and signIn with email and password (these 2 links).and lets start 1st with link SignUp..we see the endpoint(url to which we send our request) and (under that url) we send that request with request body payload(request body data: email, password and returnSecureToken:true). Request is POST (we can see that above the url),And as response we get/receive an useId(firebase creates unique id for each user), tokenId (type:string, that is A Firebase Auth ID token for the newly created user), expiresIn:	string	(the number of seconds in which the ID token expires;//we can see all of these info in the documentation of firebase auth rest api).(go to auth folder and create auth.serfvice.ts //we need this new service that can dial with this auth request)
}
