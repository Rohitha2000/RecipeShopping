import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe-service';
import { ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm1:FormGroup;
  id:number;
  editMode= false;
 
  constructor(private route:ActivatedRoute, private resservice: RecipeService, private router:Router) { }

  ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
      this.id= +params['id'];
      this.editMode= params['id']!= null;
      this.initForm();
      
    })
  }
  onSubmit(){
    const newres= new Recipe(
      this.recipeForm1.value['name'],
    this.recipeForm1.value['imagePath'],
    this.recipeForm1.value['description'],
    this.recipeForm1.value['ingredients']
    );
    if(this.editMode){
      this.resservice.updateRecipe(this.id, this.recipeForm1.value) ;
    }
    else{
      this.resservice.addRecipe(this.recipeForm1.value);
    }
    this.onCancel();
  }

  ondeleteIngredient(index: number){
    (<FormArray>this.recipeForm1.get('ingredients')).removeAt(index);
  }
  private initForm(){
    let recipeName= '';
    let resimage= '';
    let resdesc='';
    let resingredients= new FormArray([]);
    if(this.editMode){
      const recipe1= this.resservice.getRecipe(this.id);
      recipeName= recipe1.name;
      resimage= recipe1.imagePath;
      resdesc= recipe1.description;
      if(recipe1['ingredients']){
        for(let ingr of recipe1.ingredients){
          resingredients.push(new FormGroup({
            'name': new FormControl(ingr.name, Validators.required),
            'amount': new FormControl(ingr.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }
    this.recipeForm1= new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(resimage, Validators.required),
      'description': new FormControl(resdesc, Validators.required),
       'ingredients': resingredients
    })
  }

  onAddIngredient(){
   ( <FormArray>this.recipeForm1.get('ingredients')).push(new FormGroup({
    'name': new FormControl(null,Validators.required),
    'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
   }))
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})

  }


}
