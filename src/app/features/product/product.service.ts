import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  // TODO get list of product
  getProducts() {}

  // TODO update product data
  updateProduct() {}
}
