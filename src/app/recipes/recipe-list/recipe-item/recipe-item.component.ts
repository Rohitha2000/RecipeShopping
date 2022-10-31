import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../../recipe-service';
import { Recipe } from '../../recipe.module';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe: Recipe;
 @Input() index:number;

  constructor(private service: RecipeService) { }

  ngOnInit(): void {
  }

}
