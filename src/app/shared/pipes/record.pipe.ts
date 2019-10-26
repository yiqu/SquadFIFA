import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({name: 'recordPipe', pure: true})
export class RecordCountPipe implements PipeTransform {
  
  @memo()
  transform(value: any): any {
    let val = 0;
    if (value) {
      val = +value
    }
    return val;
  }
}