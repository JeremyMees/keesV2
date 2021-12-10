import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyComponent } from './component/money.component';
import { StylingModule } from '../styling/styling.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MoneyComponent],
  exports: [MoneyComponent],
  imports: [CommonModule, StylingModule, FormsModule],
})
export class MoneyModule {}
