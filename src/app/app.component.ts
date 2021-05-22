import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',   //it has to be unique selector//this is like our own secector tag in index.html (to render the component here in this selector tab)
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  //its an array, it may contain some others styles files (ex: ['server.css', 'servers.css'...])
  // style: [`
  //   h3 {
  //     color: orangered;
  //   }
  // `]
})
export class AppComponent implements OnInit {
  // name = 'Goki'; //Data binding (communication between .ts code(our business logic) and .html template)
  //loadedFeature = 'recipe';  //6.we need a global var, where we can store the feature.it can be 'recipe' initialy
  //6.here in onNavigate(), I will received as parameter, where we should navigate that informations/data from the event
  // onNavigate(feature:string) { //we expect to receaive some feature:string as data emitting from the event
  //   this.loadedFeature = feature;
  // }
  constructor(private authService: AuthService) {}
//8(303)lets see does does autoLogin() works in ngOnInit hook(it loads first, loads early t.e. runs as soon as the app starts) in app.comp.ts (because that is the component that will first loads when our app start, t.e. runs as soon as the app starts).
//8.(303)so, implements OnInit interface and in ngOnInit() call autoLogin() from the Auth Service.So inject authService:Auth Service here in constructor()
    ngOnInit() {
      this.authService.autoLogin();
    }

}
//add Bootstrap (so we don't manualy write css styles)
//1st-> npm install --save bootstrap@3
//2nd in angular.json -> in 'styles' ->add tis new style: node_modules/bootstrap/dist/css/bootstrap.min.css
//check if bootstrap is successfuly included in the Chrome Dev Tools: in Source -> style.css folder -> bootsrtap v.3.4.1 is mention there

//index.html is served by the web server
//<app-root> is our root component(not is default html element) (here in this tag will be renedered our root component that is created by the cli, that root component hold the entire application in the end)
//so <app-root> will be replaced with the .html template of the root component

//main.ts is the first code that will be executed

//app component is the root comp that hold the entire application. and in this root app comp we can nested(add) many components
//for ex: header will be 1st component, main area will be 2nd compoent, sidebar is 3rd component and each of these components contains own html, css and business logic(.ts)
//components are re-usable piece of code, I can use more that once (It allowed to us to split our complex app in a many components-reusable parts)

//component is a Class(Ts class)
//create a new component: ->1st. create a folder 'server' into the app folder(subfolder that will contain my server component)//its a good practice that all components to be inside/nested in the root components (and folder name=component name)
//in the 'server' folder (right click->new file)-> create a new file server.component.ts 

//Data binding = communication (communication between .ts code(our business logic) and .html template)
//Direction: From .ts code to .html template we want some Output data, and in data binding is with String interpolation {{}} or with Property binding [property]="data"
//Oposite direction: From .html template to .ts code, is when we have react to User Events (e x: when user click button) and that is Event Binding (event)="expression"
//3rd way is Two-way Data Binding (in both directions) with [(ngModel)]="data"

//Directives => are instructions in the Dom (like selector)//we use the with attribute selector 
//Directives (attributes): ngIf, ngFor...

//creating components (direct in the main app folder)=> ng g c repipes and ng g c shopping-list
//creating nested components in recipe(overall component that will hold the recipes-list on the left and recipes-detail on the right side)=> ng g c recipes/resipes-listng g c recipes/resipes-detail ng g c recipes/resipes-list/resipes-item 
//creating nested components in shopping-list => ng g c shopping-list/shopping-edit (for ingredients)

//279. Backend (Firebase) Setup => log in (sign in) on Firebase.console with my google (gmail) account, then create/add new project -> enter project name: ng-course-recipe-book -> next -> checked all and Create new project
//->then choose Realtime Database -> create Database -> choose realtime database location: Us(us-central1) or Belgium(europe-west1) -> Start in test mode (for now, without authentication(in test mode we can unlimited read and write access without auth..)..but we will add authentication soon in the next section) ->  Enable

//Resolver=>specieal Guard, t.e. it is some code that is run/execute before loading the route, to make sure that the sertain data on this route depends on, is there on the route.add new file recipes-resolver.service.ts