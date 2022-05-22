import {ProductModel} from "../product/product.model";
import {SalespersonModel} from "../salesperson/salesperson.model";
import {CustomerModel} from "../customer/customer.model";

export interface SalesModel {
  _id: string,
  product: ProductModel,
  productName: string,
  salesperson: SalespersonModel,
  salespersonName: string,
  customer: CustomerModel,
  customerName: string,
  salePrice: string,
  commissionPercentage: number,
  salespersonCommission: number,
  saleDate: Date
}
