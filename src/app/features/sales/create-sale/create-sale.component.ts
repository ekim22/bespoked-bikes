import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ProductService} from "../../product/product.service";
import {CustomerService} from "../../customer/customer.service";
import {SalespersonService} from "../../salesperson/salesperson.service";
import {ProductModel} from "../../product/product.model";
import {CustomerModel} from "../../customer/customer.model";
import {SalespersonModel} from "../../salesperson/salesperson.model";
import {Observable} from "rxjs";
import {SalesService} from "../sales.service";

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent implements OnInit {
  saleForm!: FormGroup;
  products$!: Observable<ProductModel[]>;
  customers$!: Observable<CustomerModel[]>;
  salespersons$!: Observable<SalespersonModel[]>;

  constructor(private productService: ProductService,
              private customerService: CustomerService,
              private salespersonService: SalespersonService,
              private salesService: SalesService) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.customerService.getCustomers();
    this.salespersonService.getSalesPeople();

    this.products$ = this.productService.products;
    this.customers$ = this.customerService.customers;
    this.salespersons$ = this.salespersonService.salesPeople;
  }

  createSale(saleDate: string, productId: string, customerId: string, salespersonId: string) {
    this.salesService.createSale(productId, customerId, salespersonId, saleDate);
  }
}
