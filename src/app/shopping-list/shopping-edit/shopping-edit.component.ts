
import { ViewChild, ElementRef, EventEmitter} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping-list-serve';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputref: ElementRef;
  @ViewChild('f') forms:NgForm;

  constructor(private shop: ShoppingService) { }
 subscription: Subscription;
 editmode= false;
 editindex:number;
 edititem:Ingredient;
  ngOnInit() {
   this.subscription= this.shop.startedEditing.subscribe((index:number)=>{
     this.editindex= index;
      this.editmode= true;
      this.edititem= this.shop.getingredient(index);
      this.forms.setValue({
        name: this.edititem.name,
        amount: this.edititem.amount
      })
    });
  }
  addItem(form: NgForm){
    const value= form.value;
   const newIngredient= new Ingredient(value.name,value.amount);
   if(this.editmode){
    this.shop.update(this.editindex, newIngredient);
    
   }
   else{
   this.shop.addingredient(newIngredient);
   
   }
   this.editmode= false;
   this.forms.reset();
   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDelete(){
   this.shop.delete(this.editindex);
   this.forms.reset();
  }
}
