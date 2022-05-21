import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SalespersonModel} from "./salesperson.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalespersonService {
  private readonly salesPeople$: BehaviorSubject<SalespersonModel[]> = new BehaviorSubject<SalespersonModel[]>([]);

  constructor(private httpClient: HttpClient) { }

  getSalesPeopleList() {
    this.httpClient.get<{ message: string, salesPeople: SalespersonModel[] }>(environment.apiUrl + 'salespeople')
      .subscribe(res => this.salesPeople$.next(res.salesPeople))
  }

  // TODO update sales person
  updateSalesperson(salesperson: SalespersonModel) {
    this.httpClient.put(environment.apiUrl + 'salespeople/' + salesperson._id, salesperson)
  }

  get salesPeople() {
    return this.salesPeople$.asObservable();
  }

}
