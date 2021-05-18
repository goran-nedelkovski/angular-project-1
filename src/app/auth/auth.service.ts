////////////////292. Preparing the Signup Request
//1.(292)google -> Firebase Auth Rest Api (that firebase offer to you, for create users and login users).here we need only two methods(see th links on the right side): SignUp with email and password and signIn with email and password (these 2 links).and lets start 1st with link SignUp..we see the endpoint(url to which we send our request) and (under that url) we send that request with request body payload(request body data: email, password and returnSecureToken:true). Request is POST (we can see that above the url),And as response we get/receive an useId(firebase creates unique id for each user), tokenId (type:string, that is A Firebase Auth ID token for the newly created user), expiresIn:	string	(the number of seconds in which the ID token expires;//we can see all of these info in the documentation of firebase auth rest api).(go to auth folder and create auth.serfvice.ts //we need this new service that can dial with this auth request)
//2.(292)go to auth folder and create auth.serfvice.ts //we need this new service that can dial with this auth request)
//2.this auth.service will be responsible for Sign Up the user, signIn the user and manage the token

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
@Injectable({providedIn:'root'}) //if we inject service into a service like here, we need to add @Injectable()
export class AuthService {
//5.(292)we need http:HttpClient to send that requests.inject it in the constructor
    constructor(private http:HttpClient) {}
//4.(292)add signUp()/register method.This method should send our request to that signUp url(to signUp endpoint)
//4.(292) signUp(expect to receive as parameters/input values email:string, password:string) 
    signUp(email:string, password:string) { //4.expect to receive as parameters/value email:string, password:string
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
        });
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
        });
    }

}