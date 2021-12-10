import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../service/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  recipes: Array<Recipe> = [];
  constructor(private recipesService: RecipesService, private router: Router) {}

  public ngOnInit(): void {
    this.recipesService
      .getRecipes()
      .subscribe((recipes: Array<DocumentData>) => {
        this.recipes = recipes as Array<Recipe>;
      });
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) return;
    this.recipesService.addNewRecipe(form.value);
    form.resetForm();
  }

  public deleteRecipe(recipe: Recipe): void {
    this.recipesService.deleteRecipe(recipe);
  }
}
