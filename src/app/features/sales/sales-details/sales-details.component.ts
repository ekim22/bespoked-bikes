import { Component, OnInit } from '@angular/core';
import {SalesModel} from "../sales.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {
  saleDetails!: SalesModel;
  productDetails!: FormGroup;
  customerDetails!: FormGroup;
  salespersonDetails!: FormGroup;
  saleDate: FormControl = new FormControl(new Date());

  constructor() { }

  ngOnInit(): void {
    if (history.state['sale']) {
      this.saleDetails = history.state['sale'];
      console.log(this.saleDetails)
      this.productDetails = new FormGroup({
        name: new FormControl(this.saleDetails.productName),
        manufacturer: new FormControl(this.saleDetails.product.manufacturer),
        style: new FormControl(this.saleDetails.product.style),
        purchasePrice: new FormControl(this.saleDetails.product.purchasePrice),
        salePrice: new FormControl(this.saleDetails.salePrice),
        qtyOnHand: new FormControl(this.saleDetails.product.qtyOnHand),
        commissionPercentage: new FormControl(this.saleDetails.commissionPercentage),
      });
      this.customerDetails = new FormGroup({
        firstName: new FormControl(this.saleDetails.customer.firstName),
        lastName: new FormControl(this.saleDetails.customer.lastName),
        address: new FormControl(this.saleDetails.customer.address),
        phone: new FormControl(this.saleDetails.customer.phone),
        startDate: new FormControl(this.saleDetails.customer.startDate)
      });
      this.salespersonDetails = new FormGroup({
        firstName: new FormControl(this.saleDetails.salesperson.firstName),
        lastName: new FormControl(this.saleDetails.salesperson.lastName),
        address: new FormControl(this.saleDetails.salesperson.address),
        phone: new FormControl(this.saleDetails.salesperson.phone),
        startDate: new FormControl(this.saleDetails.salesperson.startDate),
        terminationDate: new FormControl(this.saleDetails.salesperson.terminationDate),
        manager: new FormControl(this.saleDetails.salesperson.manager)
      });
      this.saleDate = new FormControl({value: new Date(this.saleDetails.saleDate), disabled: true});
    }
  }

}
