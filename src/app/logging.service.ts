////////////////334. Loading Services Differently

import { Injectable } from "@angular/core";

//lets create this dummy service file with dummy data
//@Injectable({providedIn: 'root'}) //this will provide the same instance of the Service in entire app
//lets comment @Injectable and provide this Srvice in app.module in providers:[]
export class LoggingService {
  lastlog: string;

  printLog(message:string) {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
    //now call this service in app.component.ts in ngOnInit()
  }
}
