import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe-service';
import { Recipe } from './recipe.module';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
 
})
export class RecipesComponent implements OnInit {
  recipes=[];
  reselected: Recipe;
  constructor(private service: RecipeService) { 

  }

  ngOnInit() {
    this.service.recipeselected.subscribe((recipe: Recipe)=>{
     this.reselected= recipe;
    });

  }

}
