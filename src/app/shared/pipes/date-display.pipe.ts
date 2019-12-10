import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import * as moment from 'moment';

@Pipe({name: 'dateDisplay', pure: true})
export class DateDisplayPipe implements PipeTransform {
  
  transform(value: any, displayType: string): any {
    if (value) {
      const dateMilli = +value;
      switch (displayType) {
        case "FROMNOW": {
          return moment(dateMilli).fromNow();
        }
        case "FULLDATE": {
          return moment(dateMilli).format("MM/DD/YY, h:mm A");
        }
        default: {
          return value;
        }
      }
    }
    return "BAD DATE";

  }
}