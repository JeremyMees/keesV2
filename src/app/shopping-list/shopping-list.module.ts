import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './component/shopping-list.component';
import { StylingModule } from '../styling/styling.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShoppingListComponent],
  exports: [ShoppingListComponent],
  imports: [CommonModule, StylingModule, FormsModule],
})
export class ShoppingListModule {}
