import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalespersonComponent } from './features/salesperson/salesperson.component';
import { ProductComponent } from './features/product/product.component';
import { CustomerComponent } from './features/customer/customer.component';
import { SalesComponent } from './features/sales/sales.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {ColumnKeyPipe} from "./core/pipes/column-key.pipe";
import {TransformDatePipe} from "./core/pipes/transform-date.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import { SalesDetailsComponent } from './features/sales/sales-details/sales-details.component';
import { CreateSaleComponent } from './features/sales/create-sale/create-sale.component';
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { CommissionReportComponent } from './features/commissions/commission-report/commission-report.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { DiscountComponent } from './features/discount/discount.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ManufacturersProductPipe} from "./core/pipes/manufacturers-product.pipe";
import {NetworkInterceptor} from "./core/interceptors/network.interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    SalespersonComponent,
    ProductComponent,
    CustomerComponent,
    SalesComponent,
    HeaderComponent,
    ColumnKeyPipe,
    TransformDatePipe,
    ManufacturersProductPipe,
    SalesDetailsComponent,
    CreateSaleComponent,
    CommissionReportComponent,
    DiscountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
