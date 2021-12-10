import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    TabMenuModule,
    InputTextModule,
    ButtonModule,
    MatCardModule,
    ConfirmPopupModule,
    ToastModule,
    InputNumberModule,
  ],
})
export class StylingModule {}
