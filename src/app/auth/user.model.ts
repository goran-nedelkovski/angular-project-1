//////////////298. Creating & Storing the User Data
//1.(298)lets create a User Model (in the auth folder -> create a new file user.model.ts).This User model will store the core data of the User
export class User {
//2.(298)lets add the constructor(and here I will use the shortcut assign the input parameters to properies in the same line with private/public accessor)
    constructor(
        public email:string, 
        public id: string, 
        private _token:string, 
        private _tokenExpirationDate:Date) {}
//2'(298)why _token and _tokenExpirationDate are private? because we can't access to them direclty, but only trought getter accessor (that will automaticaly check their Validity);//we set a token when you create a new User object, and we will always create a new User object when the user is logs In
//3.(298)so lets add a getter accesor(to get the token)//a getterf looks like a function, but we access to it like a property, for ex: User.token (so why that its called accessor property;//its a speacial property, where we can write some code that can run/execute when we access to this getter property t.e. when we call this .token getter property)
    get token() {
    //3.(298) in the getter, we want to return this._token, but first befor we do that we can add a sertain checks
    //3'.(298) if _tokenExpirationDate does not exist or _tokenExpirationDate is < of the current Time(new Date();//new Date()>this._tokenExpirationDate=>//which means that the token expires), then return null; (even we might have a token)
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
        //go to auth.service.ts
    }
}

