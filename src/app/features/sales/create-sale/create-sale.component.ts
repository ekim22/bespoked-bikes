import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../product/product.service";
import {CustomerService} from "../../customer/customer.service";
import {SalespersonService} from "../../salesperson/salesperson.service";
import {ProductModel} from "../../product/product.model";
import {CustomerModel} from "../../customer/customer.model";
import {SalespersonModel} from "../../salesperson/salesperson.model";
import {Observable} from "rxjs";
import {SalesService} from "../sales.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {tap} from "rxjs/operators";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent implements OnInit {
  @ViewChild('selectedManufacturer') manufacturer!: MatSelect;
  @ViewChild('selectedProduct') product!: MatSelect;
  @ViewChild('selectedCustomer') customer!: MatSelect;
  @ViewChild('selectedSalesperson') salesperson!: MatSelect;

  products$!: Observable<ProductModel[]>;
  customers$!: Observable<CustomerModel[]>;
  salespersons$!: Observable<SalespersonModel[]>;

  manufacturers: Set<{}> = new Set<{}>();

  productPrice!: number;

  constructor(private productService: ProductService,
              private customerService: CustomerService,
              private salespersonService: SalespersonService,
              private salesService: SalesService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.customerService.getCustomers();
    this.salespersonService.getSalesPeople();

    this.products$ = this.productService.products.pipe(
      tap(p => {
        p.forEach(v => {
          this.manufacturers.add(v.manufacturer)
        })
      })
    );
    this.customers$ = this.customerService.customers;
    this.salespersons$ = this.salespersonService.salesPeople;
  }

  createSale(saleDate: string, productId: string, customerId: string, salespersonId: string) {
    this.salesService.createSale(productId, customerId, salespersonId, saleDate, this.productPrice);
    this._snackBar.open("Sale was created!", "OK", {
      duration: 2000
    });
    this.resetSaleForm();
  }

  calculateCommission(price: number, commissionPercentage: number) {
    return "$" + (price * commissionPercentage).toFixed(2);
  }

  checkSaleForDiscount(discounted: boolean, discountStartDate: Date, discountEndDate: Date, saleDate: string): boolean {
    const discountActive = !(!discounted || new Date(saleDate) < discountStartDate || new Date(saleDate) > discountEndDate);
    if (discountActive) {
      this.productPrice = this.product.value.discountedPrice;
    } else {
      this.productPrice = this.product.value.salePrice;
    }
    return discountActive;
  }

  recalculateCommission() {
    // Note: I like that this works.
    this.salesperson.value = this.salesperson.value;
  }

  resetSaleForm() {
    this.manufacturer.value = null;
    this.product.value = null;
    this.customer.value = null;
    this.salesperson.value = null;
  }
}
