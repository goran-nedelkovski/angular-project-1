//////////////301. Attaching the Token with an Interceptor
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
//1.(301)lets creat a new file in he auth folder -> auth-interceptor.service.ts (with interceptor we will manipulate our request(http.post() in storeRecipes()), instead of manuely doing it twice)
@Injectable()
//2.(301)exposrt the class AuthInterceptorService, then add @Injectable()(because we're planning to add other servives into this Service; and don't pass that objec {providedIn:'root' because we will provided this interecptor Service differently in app.module.ts})
//3.(301)this Service class implements HttpInterceptor interface(import it from @ang/common/http)
export class AuthInterceptorService implements HttpInterceptor {
//4.(301)that interface forces us to add intercept() method here, which takes 2 arguments(req:HttpRequest<generic type of type any//we dont know which data this request will return>, next:HttpHandler //import these from @ang/common/http)
   //6.(301)I want to added my request and add my token to the req. For that, here we can add constructortor() and inject authService there
   constructor(private authService: AuthService) {}

    intercept(req:HttpRequest<any>, next: HttpHandler) {
    //7.(301)now with injected authService, we can here in intercept() rich to our authService and access to the user Subject Observable and we can subscribe to it to can get the user data obj from that Obs. 
    //8.(301)now we have the same problem with 2 Observables.I will solve in the same way as previuos lecture with .pipe(operators take(1), exhaustMap(take the user:User data from the 1st obs and => {return the inner Observable}))(so grab/move/cut this pice of code from fecthRecipes() into here in Intercept)
        return this.authService.user.pipe(take(1), exhaustMap(
            user => {
      //13.(301)here we use the same logic for all outgoing requets(include signUp and login requets).But the problem is that, when we try to subscribe to the user subject obs, that user subj obs is initialy set to null in the Auth Service, so when we get the user(null) and we try access to the token of null, that will give us an error and request will not be send.
      //13.(301)this problem we can solve with if check..if (!user or user===null) {return the original request t.e. return next.handle(req)} otherwise/else if (user//if we get the user auth obj) {return the modified request with token atttached as query Params}
                if(!user) { //or if user === null
                    return next.handle(req); //return the original req (when the user === null, we dont need to modified the req)
                } //else return the modified request (we only add a token when we get the user auth obj)
            //...//we can here add the req base on the user:User that we get 
            //9.(301)now here we can clone the req. For that, store the cloned req in a variable modifiedReq and call function req.clone({pass js object with updated params: new Httpparams().set('auth', user.token)}) t.e. const modifiedReq=req.clone({Updated params: new HttpParams().set('auth', user.token)})
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                //5.(301)here inside in intercept() we need to return Observable next.handle(req) which will handle that req(t.e. store the req in this next.handle() observble , which will handle the req, and emit that obs with next)
            //10(301)now we should next.handle(modifiedReq) and with this, interceptor should add the token to all outgoing requests (go to app.module.ts)
                return next.handle(modifiedReq);
            }
        ))
        // //5.(301)here inside in intercept() we need to return Observable next.handle(req) which will handle that req(t.e. store the req in this next.handle() observble , which will handle the req, and emit that obs with next)
        // return next.handle(req);
    }
}