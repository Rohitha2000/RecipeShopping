import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping-list-serve";
import { Recipe } from "./recipe.module";

@Injectable()
export class RecipeService{
  recipesChanged= new Subject<Recipe[]>();
    recipeselected= new EventEmitter<Recipe>();
  private  recipes: Recipe[]=[
        new Recipe('Chicken Manchuria', 
        'fried Chicken with sauses and spices', 
        'https://upload.wikimedia.org/wikipedia/commons/5/5d/Chicken_65_%28Dish%29.jpg',
        [new Ingredient('Meat', 1),
    new Ingredient('french fries', 30)] ),
        new Recipe('Veg Burger', 
        'A classic veg burger served with seasoned spices', 
        'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/so7o9imjojmmvh9iutar',
        [ new Ingredient('Milk', 2),
    new Ingredient('sugar', 1)] )
      ]; 
      
      constructor(private shop: ShoppingService){

      }

      setRecipes(recipes: Recipe[]){
        this.recipes= recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      getRecipes(){
        return this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      addingIngredients(ingredients1: Ingredient[]){
       this.shop.addIngredients(ingredients1);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newrecipe: Recipe){
        this.recipes[index]= newrecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deletRecipe(index:number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

}