import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalespersonComponent} from "./features/salesperson/salesperson.component";
import {ProductComponent} from "./features/product/product.component";
import {CustomerComponent} from "./features/customer/customer.component";
import {SalesComponent} from "./features/sales/sales.component";
import {SalesDetailsComponent} from "./features/sales/sales-details/sales-details.component";
import {CreateSaleComponent} from "./features/sales/create-sale/create-sale.component";
import {CommissionReportComponent} from "./features/commissions/commission-report/commission-report.component";

const routes: Routes = [
  { path: 'salespeople', component: SalespersonComponent },
  { path: 'products', component: ProductComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'sales/details', component: SalesDetailsComponent},
  { path: 'sales/create', component: CreateSaleComponent},
  { path: 'quarterly-commissions', component: CommissionReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
