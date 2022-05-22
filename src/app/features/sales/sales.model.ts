import {ProductModel} from "../product/product.model";
import {SalespersonModel} from "../salesperson/salesperson.model";
import {CustomerModel} from "../customer/customer.model";

export interface SalesModel {
  _id: string,
  product: ProductModel,
  salesperson: SalespersonModel,
  customer: CustomerModel,
  saleDate: Date
}
