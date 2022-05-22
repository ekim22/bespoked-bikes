import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {SalesService} from "../../sales/sales.service";
import {Observable, of, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-commission-report',
  templateUrl: './commission-report.component.html',
  styleUrls: ['./commission-report.component.css']
})
export class CommissionReportComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  sales$!: Subscription;
  salesPeople = new Set<string>();
  salesPeopleList: any = {};
  salesPeopleArray: any = [];
  commissions$!: Observable<any>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  dataSource = new MatTableDataSource([]);

  // Table variables
  displayedColumns = ['Sale Date', 'Customer', 'Product', 'Price', 'Commission Percentage', 'Salesperson Commission' ];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesPeople = new Set<string>();
    this.salesPeopleList = {};
    this.salesPeopleArray = [];
    this.salesService.getSales();
    this.sales$ = this.salesService.sales.subscribe(sales => {

      if (this.salesPeopleArray.length === 0) {
        sales.map(s => {
          let salespersonName = s.salesperson.firstName + " " + s.salesperson.lastName;
          let commissionEarned = s.product.salePrice * s.product.commissionPercentage;
          if (this.salesPeople.has(salespersonName)) {
            console.log('Name exists');
            this.salesPeopleList[salespersonName]["sales"].push({
              saleDate: s.saleDate,
              customer: (s.customer.firstName + " " + s.customer.lastName),
              product: s.product.name,
              commissionPercentage: s.product.commissionPercentage,
              price: s.product.salePrice,
              commissionEarned: commissionEarned,
            });
            this.salesPeopleList[salespersonName]["totalCommissionEarned"] += commissionEarned;
          } else {
            this.salesPeople.add(salespersonName);
            this.salesPeopleList[salespersonName] = {
              name: salespersonName,
              sales: [{
                saleDate: s.saleDate,
                customer: (s.customer.firstName + " " + s.customer.lastName),
                product: s.product.name,
                commissionPercentage: s.product.commissionPercentage,
                price: s.product.salePrice,
                commissionEarned: commissionEarned
              }],
              totalCommissionEarned: commissionEarned
            }
          }
        });


        this.salesPeople.forEach(v => this.salesPeopleArray.push(this.salesPeopleList[v]));
        console.log(this.salesPeopleArray)
        console.log(this.salesPeopleArray.sales)
        this.commissions$ = of(this.salesPeopleArray);
        this.dataSource = new MatTableDataSource(this.salesPeopleArray);
      }

    });
  }

  ngOnDestroy() {
    this.sales$.unsubscribe();
  }

  startRangeChanged(startDate: any) {
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
        if (date > startDate) {
          // @ts-ignore
          filtered.sales.push(z)
          filtered.totalCommissionEarned += z.commissionEarned
        }
      })
      this.salesPeopleArray.push(filtered)
    });
    this.commissions$ = of(this.salesPeopleArray);
  }

  endRangeChanged(endDate: any) {
    this.salesPeopleArray = this.salesPeopleArray.map((v: { name: any; sales: string | any[]; }) => {
      let commissions = {
        name: v.name,
        sales: [],
        totalCommissionEarned: 0
      }
      for (let i = 0; i < v.sales.length; i++) {
        let date = new Date(v.sales[i].saleDate);
        if (date < endDate) {
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
    this.salesPeopleArray = [];
    this.salesPeople.forEach(v => this.salesPeopleArray.push(this.salesPeopleList[v]));
    this.commissions$ = of(this.salesPeopleArray);
  }
}
