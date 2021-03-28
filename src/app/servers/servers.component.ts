// import { NgStyle } from '@angular/common';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-servers',        // select element is used usualy(this case)...select element by id '#' is not supported in angular
//   // selector: '[app-servers]',   //select element by attribute '[]' ..and then on the .html tamplate we must have ex: <div attribute>
//   //selector: '.app-servers',    //select element by class '.'  ..
//   //select elemnt by some pseudo selectors ':' also don't work (not supported in angular)
//   templateUrl: './servers.component.html',
//   // template: `
//   // <app-server></app-server>   
//   // <app-server></app-server>`,  //use `` for multi-lines template string//we can inline .html template (property without Url, so we can write all .html template code here)
//   // styleUrls: ['./servers.component.css']  //styles don't have to add, but .html template must be added
//   styles: [`
//     .online {
//       color: white;
//     }
//   `]
// })
// export class ServersComponent implements OnInit {
//   allowedNewServer = false;
//   serverCreationStatus = 'No server was created';
//   serverName = 'Testserver';
//   serverCreated = false;
//   serverStatus:string = 'offline';
//   serverId:number = 10;
//   servers = ['Testserver', 'Testserver 2'];

//   constructor() { 
//     //we wan dinamicaly set serverStatus property to online or offline with Ternary operator in its value
//     this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
//       setTimeout(() => {
//         this.allowedNewServer = true;
//       },2000)
//   }

//   ngOnInit(): void {
//   }

//   getServerStatus() {
//        return this.serverStatus;
//   }
//   getColor() {
//     return this.serverStatus === 'online' ? 'green' : 'red'; //dinamicaly set the color with Ternary operator 
//     //we can dinamicaly set the color with Ternary operator or with if-else like this:
//     // if(this.serverStatus === 'online') {
//     //   return 'green';
//     // }
//     // else {
//     //   return 'red';
//     // }
//   }

//   onCreateServer() {
//     this.serverCreated = true;
//     this.servers.push(this.serverName);
//     this.serverCreationStatus = 'Server was created. Name is' + this.serverName;
//   }
//   //fetch or get the event's data (in this case we fetch or get the value data of this event..t.e. event.target.value)like this, with passing $event obj in the template 
//   onUpdateServerName(event: Event) {  //also here in .ts we recieve the event:Event object as parameter, to fetch the event's data
//     //I want to output what the user enter, what is the value of the input (data of that event)
//     console.log(event);
//     this.serverName = (<HTMLInputElement>event.target).value;  //we must specify the type of event.target with (<>event.target). that will be <HTMLInputElemtn>
//   }

// }
