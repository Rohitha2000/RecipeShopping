import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{
    ingredientsChanged= new EventEmitter<Ingredient[]>();
    startedEditing= new Subject<number>();
    ingredients : Ingredient[] =[
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 15)
       ];

       getIngredients(){
        return this.ingredients.slice();
       }

       getingredient(index: number){
        return this.ingredients[index];
       }

       addingredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
       }

       addIngredients(ingredients: Ingredient[]){
        // for(let ingre of ingredients){
        //     this.addingredient(ingre);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
       }

       update(index:number, newIngredient:Ingredient){
        this.ingredients[index]= newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());

       }

       delete(index:number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
       }
}