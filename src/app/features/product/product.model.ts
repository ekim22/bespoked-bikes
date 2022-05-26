export interface ProductModel {
  position: number,
  _id: string,
  name: string,
  manufacturer: string,
  style: string,
  purchasePrice: number,
  salePrice: number,
  qtyOnHand: number,
  commissionPercentage: number
  discounted: boolean;
  discountedPrice: number;
  discountPercentage: number;
  discountStartDate: Date,
  discountEndDate: Date,
}
