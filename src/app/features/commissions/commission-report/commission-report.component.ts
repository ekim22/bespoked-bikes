import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {SalesService} from "../../sales/sales.service";
import {Observable, of, Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {MatOption, MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-commission-report',
  templateUrl: './commission-report.component.html',
  styleUrls: ['./commission-report.component.css']
})
export class CommissionReportComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild('year') year!: MatSelect;
  @ViewChild('quarter') quarter!: MatSelect;
  sales$!: Subscription;
  salesPeople = new Set<string>();
  salesPeopleList: any = {};
  salesPeopleArray: any = [];
  commissions$!: Observable<any>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  years: [{label: string, value: string}] = [{label: String(new Date().getFullYear() - 20), value: String(new Date().getFullYear() - 20)}];
  quarters = [
    'Q1',
    'Q2',
    'Q3',
    'Q4',
  ]

  // Table variables
  displayedColumns = ['Sale Date', 'Customer', 'Product', 'Price', 'Commission Percentage', 'Salesperson Commission' ];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.makeYears();
    this.salesPeople = new Set<string>();
    this.salesPeopleList = {};
    this.salesPeopleArray = [];
    // This was written when I was so tired. It can be entirely refactored into a service and in a cleaner way. If I did that, it would also likely eliminate the need for the extra code that was written to reconcile updates to commission related data and updating the quarterly report accordingly.
    this.sales$ = this.salesService.getCommissions().subscribe(res => {
      this.salesService.updateSalesState(res.sales);
      let sales = res.sales;
      if (this.salesPeopleArray.length === 0) {
        sales.map(s => {
          let salespersonName = s.salesperson.firstName + " " + s.salesperson.lastName;
          // @ts-ignore
          let commissionEarned = s.salePrice * s.commissionPercentage;
          if (this.salesPeople.has(salespersonName)) {
            this.salesPeopleList[salespersonName]["sales"].push({
              saleDate: s.saleDate,
              customer: s.customerName,
              product: s.product.name,
              commissionPercentage: s.commissionPercentage,
              price: s.salePrice,
              commissionEarned: s.salespersonCommission,
            });
            this.salesPeopleList[salespersonName]["totalCommissionEarned"] += commissionEarned;
          } else {
            this.salesPeople.add(salespersonName);
            this.salesPeopleList[salespersonName] = {
              name: salespersonName,
              sales: [{
                saleDate: s.saleDate,
                customer: s.customerName,
                product: s.productName,
                commissionPercentage: s.commissionPercentage,
                price: s.salePrice,
                commissionEarned: commissionEarned
              }],
              totalCommissionEarned: commissionEarned
            }
          }
        });


        this.salesPeople.forEach(v => this.salesPeopleArray.push(this.salesPeopleList[v]));
        this.commissions$ = of(this.salesPeopleArray);
      }
    });
  }

  ngOnDestroy() {
    this.sales$.unsubscribe();
  }

  rangeChanged(year: number, quarter: string, event: MatOptionSelectionChange) {
    console.log(year, quarter)
    if (event.isUserInput) {
      switch(quarter) {
        case "Q1": {
          this.startRangeChanged(year, 0)
          this.endRangeChanged(year, 3)
          break;
        }
        case "Q2": {
          this.startRangeChanged(year, 3)
          this.endRangeChanged(year, 6)
          break;
        }
        case "Q3": {
          this.startRangeChanged(year, 6)
          this.endRangeChanged(year, 9)
          break;
        }
        case "Q4": {
          this.startRangeChanged(year, 9)
          this.endRangeChanged(year, 12)
          break;
        }
      }
    }
  }

  startRangeChanged(year: number, month: number) {
    let startDate = new Date(new Date().setFullYear(year, month, 1));

    this.salesPeopleArray = [];
    this.salesPeople.forEach(v => {
      const filtered = {
        name: this.salesPeopleList[v].name,
        sales: [],
        totalCommissionEarned: 0
      }
      this.salesPeopleList[v].sales.forEach((z: {
        commissionEarned: number;
        saleDate: string | number | Date; }) => {
        let date = new Date(z.saleDate);
        if (date >= startDate) {
          // @ts-ignore
          filtered.sales.push(z)
          filtered.totalCommissionEarned += z.commissionEarned
        }
      })
      this.salesPeopleArray.push(filtered)
    });
    this.commissions$ = of(this.salesPeopleArray);
  }

  endRangeChanged(year: number, month: number) {
    let endDate = new Date(new Date().setFullYear(year, month, 0));

    this.salesPeopleArray = this.salesPeopleArray.map((v: { name: any; sales: string | any[]; }) => {
      let commissions = {
        name: v.name,
        sales: [],
        totalCommissionEarned: 0
      }
      for (let i = 0; i < v.sales.length; i++) {
        let date = new Date(v.sales[i].saleDate);
        if (date <= endDate) {
          // @ts-ignore
          commissions.sales.push(v.sales[i]);
          commissions.totalCommissionEarned += v.sales[i].commissionEarned;
        }
      }
      return commissions;
    })
    this.commissions$ = of(this.salesPeopleArray);
  }

  clearDateRange() {
    this.range.get('start')?.patchValue(null);
    this.range.get('end')?.patchValue(null);
    this.year.options.forEach((data: MatOption) => data.deselect());
    this.quarter.options.forEach((data: MatOption) => data.deselect());
    this.salesPeopleArray = [];
    this.salesPeople.forEach(v => this.salesPeopleArray.push(this.salesPeopleList[v]));
    this.commissions$ = of(this.salesPeopleArray);
  }

  makeYears() {
    const year = new Date().getFullYear() - 20;
    for (let i = 1; i <= 20; i++) {
      this.years.push({
        label: String(year + i),
        value: String(year + i)
      })
    }
  }
}
