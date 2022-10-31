import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponse, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode= true;
    isLoading= false;
    error: string= null;
    @ViewChild(PlaceholderDirective) alerthost: PlaceholderDirective;
    private sub: Subscription;

    constructor(private authservice: AuthService, private router: Router,
        private component: ComponentFactoryResolver){}
    onSwitchMode(){
        this.isLoginMode= !this.isLoginMode;
    }
    onSubmit(form:NgForm){
        if(!form.valid){
            return;
        }
        const email= form.value.email;
        const password= form.value.password;

        let authObs: Observable<AuthResponse>;
        this.isLoading= true;
        if(this.isLoginMode){
            authObs= this.authservice.login(email, password);
         } else {
            authObs= this.authservice.signup(email, password);
       }

    authObs.subscribe((res)=>{
        console.log(res);
        this.isLoading= false;
        this.router.navigate(['/res'])
       }, 
       errormessage=>{
        console.log(errormessage);
        this.showerrorAlert(errormessage);
        this.error= errormessage;
        
        this.isLoading= false;
       });
}

onHandleError(){
    this.error = null;
}

private showerrorAlert(message:string){
  const alert= new AlertComponent();
 const alertcomfact= this.component.resolveComponentFactory(AlertComponent);
 const hostviewref= this.alerthost.viewcontainer;
 hostviewref.clear();
const compoenentref= hostviewref.createComponent(alertcomfact);
compoenentref.instance.message= message;
this.sub= compoenentref.instance.close.subscribe(()=>{
    this.sub.unsubscribe();
    hostviewref.clear();
});
  
}

ngOnDestroy() {
    if(this.sub){
        this.sub.unsubscribe();
    }
}
}