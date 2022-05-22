import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {SalesModel} from "./sales.model";

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private readonly sales$: BehaviorSubject<SalesModel[]> = new BehaviorSubject<SalesModel[]>([]);

  constructor(private httpClient: HttpClient) { }

  getSales() {
    this.httpClient.get<{message: string, sales: SalesModel[]}>(environment.apiUrl + 'sales').subscribe(res => {
      this.sales$.next(res.sales);
      console.log(res.message);
    })
  }

  createSale(productId: string, customerId: string, salespersonId: string, saleDate: string) {
    const newSale = {
      product: productId,
      customer: customerId,
      salesperson: salespersonId,
      saleDate: saleDate
    };
    this.httpClient.post<{message: string}>(environment.apiUrl + 'sales/create', newSale).subscribe(res => {
      console.log(res.message)
    })
  }

  get sales() {
    return this.sales$.asObservable();
  }

}
