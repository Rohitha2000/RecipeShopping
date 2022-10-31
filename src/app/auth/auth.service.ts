import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LocalizedString } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, BehaviorSubject, tap, throwError } from "rxjs";
import { User } from "./user.module";
import { environment } from "src/environments/environment";

export interface AuthResponse{
    kind:string;
    idToken: string;
    email: string;
    refreshToken:string;
    expires:string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpClient, private router: Router){}

    user= new BehaviorSubject<User>(null);
    private tokenexpiretimer:any;
  

    signup(email: string, password: string){
     return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey
    , {
        email: email,
        password: password,
        returnSecureToken: true
    }
    ).pipe(catchError(this.handleError));
    }

    login(email:string, password: string){
       return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey
        , {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resdata=>{
            this.handleAuthentication(resdata.email, resdata.localId, resdata.idToken, +resdata.expires);
          
        }));
    }

    

    autoLogin(){
        
        const userdata:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate: string
        }= JSON.parse(localStorage.getItem('userData'));
        if(!userdata){
            return ;
        }
        const loaduser= new User(userdata.email, 
            userdata.id, 
            userdata._token, 
            new Date(userdata._tokenExpirationDate));

            if(loaduser.token){
                this.user.next(loaduser);
                const expiration= new Date(userdata._tokenExpirationDate).getTime()- 
                new Date().getTime();
                this.autoLogout(expiration);
            }
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenexpiretimer){
            clearTimeout(this.tokenexpiretimer);
        }
        this.tokenexpiretimer= null;
    }

    autoLogout(expirationdate: number){
       this.tokenexpiretimer= setTimeout(()=>{
        // this.logout();
        }, expirationdate);
    }

    private handleAuthentication(email: string, userid:string, token: string, expires:number){
        const expirationdate= new Date(new Date().getTime() + expires * 1000);
            const user= new User(email, userid, token , expirationdate);
            this.user.next(user);
            if(expires != NaN){
            this.autoLogout(expires* 1000);
            }
            localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(err: HttpErrorResponse){
        let errormessage= 'An unknown error occured';
        if(!err.error || !err.error.error){
            return throwError(errormessage);
        }
        switch (err.error.error.message){
            case 'EMAIL_EXISTS':
                errormessage= 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errormessage= 'Email Not Found';
                break;
            case 'INVALID_PASSWORD':         
                errormessage='This password is Invalid';
                break;
        }
        return throwError(errormessage);
    }

}