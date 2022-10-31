import { parseHostBindings } from "@angular/compiler";
import { ElementRef } from "@angular/core";
import { Directive, HostBinding, HostListener } from "@angular/core";


@Directive({
 selector: '[DropDown]'
})
export class DropDown{
    @HostBinding('class.open') isopen= false;
    // @HostListener('click') toggleOpen1(){
    //     this.isopen= !this.isopen;
    // }


    constructor(private elRef: ElementRef) {}
 

    // to close the dropdown from anywhere
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isopen = this.elRef.nativeElement.contains(event.target) ? !this.isopen : false;
      }
     

}


