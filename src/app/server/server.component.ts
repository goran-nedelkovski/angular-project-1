// //import that @Component decorator, so typeScript can know/understand it (and now ts knows the @Component decorator and it can parse and compile the .ts code into .js code)
// import {Component} from '@angular/core';
// //we must make a decorator here to tell angular that is not just .ts class, but its special class-Component
// //decorator -> is .ts feature for enchance (nest) elements to use in our code.We must import this decorator at the top
// //in decorator() we must pass js object to configuration (because without configuration it cant be valueable to angular) 
// //in that js object inside we can store some important info as meta data(in the background) for this class, which will tell angular what to do with this class  
// @Component({
//     selector: 'app-server', //with this selector tag we can use this component in other component's .html files
//     templateUrl: './app.component.html',  //we need a relative path to point to this file (./)//this file will hold the .html template for this component
// })
// //with this we have created our first component and finaly we must import in the app.module.ts so to can use it

// //export this class, to can use later outside (ex: in app components  we will import this comp
// export class ServerComponent {
//     serverId:number = 10;
//     serverStatus:string = 'offline';

//     getServerStatus() {
//         return this.serverStatus;
//     }
// }