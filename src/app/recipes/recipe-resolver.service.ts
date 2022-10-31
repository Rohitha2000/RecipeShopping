import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorage } from "../shared/data-storage.service";
import { RecipeService } from "./recipe-service";
import { Recipe } from "./recipe.module";



@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe[]>{
   constructor(private data: DataStorage, private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes= this.recipeService.getRecipes();
        if(recipes.length === 0){
            return this.data.fetchRecipes();

        }
        else{
            return recipes;
        }
    
    }
   
}