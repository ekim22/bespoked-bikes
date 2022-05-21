import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private httpClient: HttpClient) { }

  // TODO get list of sales
  getSales() {}

  // TODO create a new sale
  createSale() {}

}
