//1.create this dropdown.directive.ts in shared folder(manuely, or we could with cli-command line in that shared folder), create@Directive() decoratorto })
import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'  //i'll choose unique name for my attribute selector
}) 
export class DropdownDirective {
//3.I'll add isOpen directive/property and set to false initialy.
//5.to dinamicaly attach/add or detach/remove css class 'open' (to the div.btn-group in recipe-detail comp) I will use @HostBinding to this property
    @HostBinding('class.open') isOpen = false; //5.@HostListener('bind to class property of the element t.e. class array of all css classes, and attach to open class of that class array').Whenever .open class will be attach when isOpen is true, and will be detach/remove when isOpen is false
//2.to Listen on click event, I will use @HostListener()
    @HostListener('click') toggleOpen() {  //listen to 'click' and I want to execute toggleOpen() listener funtion
        this.isOpen = !this.isOpen; //4.use this.isOpen in the method's code block.. !=>negation of isOpnen value(for toggling this property), t.e. if its false, this will be true, and oposite, if its true, this will be false
    } 
}
//6.to can use it this directive, we must include it in app.module.ts
//7. now I can use our Directive in recipe-detail.comp.html to the div.btn-group and in header.html in li.dropdown element



