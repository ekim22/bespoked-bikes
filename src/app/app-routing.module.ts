import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalespersonComponent} from "./features/salesperson/salesperson.component";
import {ProductComponent} from "./features/product/product.component";
import {CustomerComponent} from "./features/customer/customer.component";
import {SalesComponent} from "./features/sales/sales.component";

const routes: Routes = [
  { path: 'salespeople', component: SalespersonComponent },
  { path: 'products', component: ProductComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'sales', component: SalesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
