////////////////////422. Analyzing the Testing Setup (as created by the CLI)
//this file is for testing()Unit testing in angular
import { TestBed } from '@angular/core/testing';
//import TestBed utility for Testing(and we can also additionaly async utility for testing)
import { AppComponent } from './app.component';
//functions describe(), beforeRach(), it(), expect() are from JEST Testing package (not from angular//there is also Karma package for testing)
//this nested/embeded anonimus fuction is a Closure (that has access to the parent's variable 'AppComponent', t.e. here we can declare:ApComponent, just like in the app.module)
describe('AppComponent', () => { 
  //beforeEach will be executed befor each test blocks
  beforeEach(async () => {  //beforeEach accept as argument async/awayt function (for asunc calls)
    await TestBed.configureTestingModule({ //this async will wait to done/run this Promise(TestBed.configureTetsingModule({declarations:AppComponent}))
      declarations: [   //here in this promise we declare AppComponent
        AppComponent
      ],
    }).compileComponents(); //.compile the otherf components
  });//these test block are indeoendent of each other
//1st test:it() is function from JEST testing package and it will check if we 'should create the app' 
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);  //create Appcomponent from the TestBed obj and store in fixtire variable
    const app = fixture.componentInstance;  //ccess from fixture to componentInstance (to our app) and store the app in a variabale
    expect(app).toBeTruthy(); //expect(to receive our app as argument here). to be truthy (or to be existing)
  });
//2nd test:it() here will check if our appComponent should have as title 'my-first-app' property in the app.component.ts
  it(`should have as title 'my-first-app'`, () => { 
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance; 
    expect(app.title).toEqual('my-first-app'); //expect(to receive app.title property) and this prperty should be Equal to 'my-first-app'
  });
//3rd test: it should check if there is should render title in some tag in the template (.span or h1 for ex.)
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('my-first-app app is running!');
    //expect(to receive that render html element with text content), and its text content mustg contain 'my-first-app app is running!' 
  });
});
//////////////////423. Running Tests (with the CLI)
//1.(423)run in the terminal: ng test (to run/execute all tests blocks in app.comp.spec.ts t.e. to test our app if its ok)
