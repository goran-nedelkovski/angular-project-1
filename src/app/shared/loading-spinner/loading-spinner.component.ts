import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
///////////////294. Adding a Loading Spinner & Error Handling Logic
//1.(294)Google->css loading spinners -> https://loading.io ->grab one of them(click) and copy all css code and with terminal in the shared forlder create a new component loading-spinner(:ng g c shared/loading-spinner) and paste the css code in the loading-spinner.comp.css file and change the color wrom white to blue.(or 2nd way-manuely create new folder in the shared folder 'loading-spinner'-> loading-spinner.component.ts...) (go to loadin-spinner.comp.ts file)
//2.(294)in the ts file, we have exported this class LoadinSpinnerComponent and add decorator @Component({ selector: 'app-loading-spinner', templateUrl:'copy the html code for that spinner and paste here'}, stylesUrl:['']) (make sure that this component is added in app.module -> in declarations)
  //3.(294)we can use this spinner in auth.component and there I want to hide th entire form while we are currently loading the spinner
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
