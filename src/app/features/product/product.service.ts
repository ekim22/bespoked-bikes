import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {ProductModel} from "./product.model";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {DiscountModel} from "../discount/discount.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    this.httpClient.get<{ message: string, products: ProductModel[], discounts: DiscountModel[]}>(environment.apiUrl + 'products')
      .pipe(
        tap(
          res => {
            for (let i = 0; i < res.products.length; i++) {
              res.products[i].position = i;
              let discount = res.discounts.filter(v => v.productId == res.products[i]._id);
              if (discount.length > 0) {
                const todaysDate = new Date(Date.now());
                const discountStartDate = new Date(discount[0].startDate);
                const discountEndDate = new Date(discount[0].endDate);
                if (todaysDate >= discountStartDate && todaysDate <= discountEndDate) {
                  res.products[i].discounted = true;
                  res.products[i].discountPercentage = discount[0].discountPercentage;
                }
              }
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
    this.httpClient.put<{message: string, product: ProductModel}>(environment.apiUrl + 'products/' + productId, productData).subscribe(
      res => {
        const products = this.products$.value.map((product, index) => {
          if (index === position) {
            return this.products$.value.slice()[position] = res.product;
          }
          return product;
        });
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

  registerDiscount(productId: string, discounted: boolean, discountPercentage: number, startDate: Date, endDate: Date) {
    const discount = {
      productId: productId,
      startDate: startDate,
      endDate: endDate,
      discountPercentage: discountPercentage
    }

    this.httpClient.post<{message: string}>(environment.apiUrl + 'discounts/create', discount).subscribe(res => {
      console.log(res.message)
    })

  }

  get products() {
    return this.products$.asObservable();
  }
}
