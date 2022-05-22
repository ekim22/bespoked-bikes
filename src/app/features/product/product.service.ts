import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {ProductModel} from "./product.model";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    this.httpClient.get<{ message: string, products: ProductModel[] }>(environment.apiUrl + 'products')
      .pipe(
        tap(
          res => {
            for (let i = 0; i < res.products.length; i++) {
              res.products[i].position = i;
            }
            return res;
          }
        )
      )
      .subscribe(res => {
        this.products$.next(res.products);
        console.log(res.message);
      });
  }

  updateProduct(position: number, productId: string, productData: ProductModel) {
    this.httpClient.put<{message: string}>(environment.apiUrl + 'products/' + productId, productData).subscribe(
      res => {
        // TODO Doesn't do anything important right now, but it will if I have time to implement caching for my get requests.
        const products = this.products$.value.map((product, index) => index === position ? productData : product);
        this.products$.next(products)
        console.log(res.message);
      }
    );
  }

  deleteProduct(position: number, productId: string) {
    this.httpClient.delete<{message: string}>(environment.apiUrl + 'products/' + productId).subscribe(
      res => {
        let products = this.products$.value.slice()
        for (let i = 0; i < products.length; i++) {
          if (i === position) {
            products.splice(i, 1);
          }
        }
        this.products$.next(products)
        console.log(res.message);
      }
    );
  }

  get products() {
    return this.products$.asObservable();
  }
}
