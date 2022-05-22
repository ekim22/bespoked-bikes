import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let date = new Date(value);
    if (date.toString() !== 'Invalid Date') {
      return date.toLocaleDateString();
    }
    return value;
  }


}
