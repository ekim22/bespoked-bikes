import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../product/product.service";
import {Observable} from "rxjs";
import {ProductModel} from "../product/product.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  products$!: Observable<ProductModel[]>;
  startDate!: Date;
  endDate!: Date;


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.products$ = this.productService.products;
  }

  startRangeChanged(dateChange: Date) {
    this.startDate = dateChange;
  }

  endRangeChanged(dateChange: Date) {
    this.endDate = dateChange;
  }

  registerDiscount(productId: string, discounted: boolean, discountPercentage: number) {
    this.productService.registerDiscount(productId, discounted, discountPercentage, this.startDate, this.endDate);
    this.router.navigate(['/products']);
  }
}
