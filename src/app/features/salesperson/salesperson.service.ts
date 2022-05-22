import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SalespersonModel} from "./salesperson.model";
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SalespersonService {
  private readonly salesPeople$: BehaviorSubject<SalespersonModel[]> = new BehaviorSubject<SalespersonModel[]>([]);

  constructor(private httpClient: HttpClient) { }

  getSalesPeople() {
    this.httpClient.get<{ message: string, salesPeople: SalespersonModel[] }>(environment.apiUrl + 'salespeople')
      .pipe(
        tap(
          res => {
            for (let i = 0; i < res.salesPeople.length; i++) {
              res.salesPeople[i].position = i;
            }
            return res;
          }
        )
      )
      .subscribe(res => {
        this.salesPeople$.next(res.salesPeople);
        console.log(res.message);
      });
  }

  updateSalesperson(position: number, salespersonId: string, salespersonData: SalespersonModel) {
    this.httpClient.put<{message: string}>(environment.apiUrl + 'salespeople/' + salespersonId, salespersonData).subscribe(
      res => {
        // TODO Doesn't do anything important right now, but it will if I have time to implement caching for my get requests.
        const salesPeople = this.salesPeople$.value.map((salesperson, index) => index === position ? salespersonData : salesperson);
        this.salesPeople$.next(salesPeople)
        console.log(res.message);
      }
    );
  }

  get salesPeople() {
    return this.salesPeople$.asObservable();
  }

}
