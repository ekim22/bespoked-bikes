import {Pipe, PipeTransform} from "@angular/core";
import {ProductModel} from "../../features/product/product.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Pipe({
  name: 'manufacturersProduct'
})
export class ManufacturersProductPipe implements PipeTransform {
  transform(products: Observable<ProductModel[]>, manufacturer: string): any {
    return products.pipe(
      map(v => {
        return v.filter(p => p.manufacturer === manufacturer)
      })
    )
  }
}
