import { Component, OnInit } from '@angular/core';
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
}
