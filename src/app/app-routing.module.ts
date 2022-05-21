import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalespersonComponent} from "./salesperson/salesperson.component";
import {ProductComponent} from "./product/product.component";
import {CustomerComponent} from "./customer/customer.component";
import {SalesComponent} from "./sales/sales.component";

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
