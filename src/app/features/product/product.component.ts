import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProductService} from "./product.service";
import {NgForm} from "@angular/forms";
import {ProductModel} from "./product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProductComponent implements OnInit {
  products$!: Observable<ProductModel[]>;

  // Table variables
  displayedColumns = ['Name', 'Manufacturer', 'Style', 'Purchase Price', 'Sale Price', 'Qty On Hand', 'Commission Percentage'];
  expandedRow!: ProductModel | null;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.products$ = this.productService.products;
  }

  updateInfo(position: number, id: string, form: NgForm) {
    this.productService.updateProduct(position, id, form.value);
  }

}
