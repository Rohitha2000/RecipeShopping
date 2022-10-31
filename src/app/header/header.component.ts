
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorage } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit{
    isAuthenticated= false;
    private usersub: Subscription;
  constructor(private datastorage: DataStorage, private authservice: AuthService){
    
  }

  ngOnInit(){
   this.usersub=  this.authservice.user.subscribe(user => {
    this.isAuthenticated= !!user;
    console.log(!user);
    console.log(!!user);
   });
  }
  onSaveData(){
    this.datastorage.storeRecipes();
  }

  OnFetchData(){
    this.datastorage.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.usersub.unsubscribe();
  }

  onLogout(){
    this.authservice.logout();
  }
  
}