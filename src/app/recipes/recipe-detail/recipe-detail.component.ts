import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe-service';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
@Input() recipe: Recipe;
id:number;
  constructor(private recipeservice: RecipeService, private route: ActivatedRoute, private router:Router) { }
recipes: Recipe[];
 sub: Subscription;
  ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.recipe= this.recipeservice.getRecipe(this.id);
    });

  
      this.sub= this.recipeservice.recipesChanged.subscribe((recipes:Recipe[])=>{
       this.recipes=recipes;
      })
      this.recipeservice.recipesChanged.subscribe((recipes: Recipe[])=>{
      this.recipes= recipes;
      })
     this.recipes= this.recipeservice.getRecipes();
    
  }

  toShoppingList(){
   this.recipeservice.addingIngredients(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route});
  }
  onDelete(){
    this.recipeservice.deletRecipe(this.id);
    this.router.navigate(['/res'])
  }

}
