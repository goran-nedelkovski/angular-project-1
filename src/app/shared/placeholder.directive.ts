import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
////Angular needs a ViewContainerRef()->that is a object/container will give Angular a reference/pointer to the place of the DOM to which it can interact with
//to we can access to ViewContainerRef, we need to create a helper-directive Placeholder in the shared folder.So we can create manualy or with command: ng g d shared/placeholder
////Directive has a @Directive({selector: [appPlaceholder]})->with attribute selector, so we can add our Directive as attribute in any html element
//here in the constriuncor() we can need to inject that ViewContainerRef-->
  constructor(public viewContainerRef: ViewContainerRef) { } ////here in the constriuncor() we can need to inject that ViewContainerRef
////this ViewContainerRef will give me a reference/pointer to the place (to that html element) where this Directive will be used
//with public accessor we make this propert public, which means that we can access to this ViewContainerRef from outside
///////ViewContainerRef has useful methods for creating a Component (dinamicaly, in that place/html el where it sits)
}
