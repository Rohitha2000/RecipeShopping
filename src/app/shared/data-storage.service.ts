import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipes/recipe-service";
import { Recipe } from "../recipes/recipe.module";

@Injectable({providedIn: 'root'})
export class DataStorage{
  constructor(private http: HttpClient, private recipeservice: RecipeService, private authservice: AuthService){
  }
  storeRecipes(){
   const recipes= this.recipeservice.getRecipes();
   return this.http.put('https://recipedatabase-473c6-default-rtdb.firebaseio.com/recipes.json', 
   recipes).subscribe( response=>{
    console.log(response);
   } );
    
  }

  fetchRecipes(){
 
        return this.http.get<Recipe[]>(
            'https://recipedatabase-473c6-default-rtdb.firebaseio.com/recipes.json').pipe(
    map(recipes =>{
        return recipes.map(recipe =>{
            return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []};
        })
    }),
     tap(recipes=>{
        this.recipeservice.setRecipes(recipes);
     })
            )
    
  }


}