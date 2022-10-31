import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping-list-serve';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[];
  constructor(private shop: ShoppingService, private logging: LoggingService) { }

  ngOnInit(){
    this.ingredients= this.shop.getIngredients();
    this.shop.ingredientsChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients= ingredients;
    })
    this.logging.printlog('Hello from  Shopping list component')
  }
  onEditItem(index){
    this.shop.startedEditing.next(index);
  }
  
}
