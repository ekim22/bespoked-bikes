import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {CustomerModel} from "./customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly customers$: BehaviorSubject<CustomerModel[]> = new BehaviorSubject<CustomerModel[]>([]);

  constructor(private httpClient: HttpClient) { }

  getCustomers() {
    this.httpClient.get<{ message: string, customers: CustomerModel[] }>(environment.apiUrl + 'customers')
      .subscribe(res => {
        this.customers$.next(res.customers);
        console.log(res.message);
      });
  }

  get customers() {
    return this.customers$.asObservable();
  }

}
