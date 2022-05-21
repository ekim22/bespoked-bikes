import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalespersonService {

  constructor(private httpClient: HttpClient) { }

  // TODO get list of salespeople
  getSalespeople() {}

  // TODO update sales person
  updateSalesperson() {}

}
