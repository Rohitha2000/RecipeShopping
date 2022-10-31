import { Directive , ElementRef, Renderer2, OnInit, HostListener} from "@angular/core";


@Directive({
  selector: '[BetterHighlight]'
})
export class BetterHighlight implements OnInit{
    constructor(private element: ElementRef, private render: Renderer2){
    }

    ngOnInit(){
       //this.render.setStyle(this.element.nativeElement, 'background-color', 'yellow')
      // this.render.setStyle(this.element.nativeElement, 'font-weight', 'bold')
    }

    @HostListener('mouseenter') mouseover(event: Event){
        this.render.setStyle(this.element.nativeElement, 'background-color', 'blue');
       
    }

    @HostListener('mouseleave') mouseleave(event: Event){
        this.render.setStyle(this.element.nativeElement, 'background-color', 'transparent');
       
    }
}