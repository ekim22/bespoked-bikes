import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'columnKey'
})
export class ColumnKeyPipe implements PipeTransform {
  transform(column: string): string {
    let columnKey = column.replace(/\s/g, '');
    return columnKey[0].toLowerCase() + columnKey.substring(1);
  }
}
