import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe-service';
import { Recipe } from '../recipe.module';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes: Recipe[];
sub: Subscription;

@Output() recipewas= new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(){
    this.sub= this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{
     this.recipes=recipes;
    })
    this.recipeService.recipesChanged.subscribe((recipes: Recipe[])=>{
    this.recipes= recipes;
    })
   this.recipes= this.recipeService.getRecipes();
  }

  onrecipeSelected(recipe:Recipe){
    this.recipewas.emit(recipe);
  }
  onNewRecipe(){
    this.router.navigate(['res/edit']);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

