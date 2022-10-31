import { Directive, OnInit, ElementRef } from "@angular/core";

@Directive({
   selector: '[highlight]'
})
export class Highlight implements OnInit{
    constructor(private element: ElementRef){

    }
    ngOnInit(){
        
       this.element.nativeElement.style.backgroundColor= 'palegreen';
       this.element.nativeElement.style.fontWeight= 'bold';
       this.element.nativeElement.style.fontSize= '20px';
    }
    

}