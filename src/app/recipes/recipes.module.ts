import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './component/recipes.component';
import { StylingModule } from '../styling/styling.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RecipesComponent],
  exports: [RecipesComponent],
  imports: [CommonModule, StylingModule, FormsModule],
})
export class RecipesModule {}
