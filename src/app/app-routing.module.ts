import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyComponent } from './money/component/money.component';
import { ShoppingListComponent } from './shopping-list/component/shopping-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: ShoppingListComponent },
  { path: 'money', component: MoneyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
