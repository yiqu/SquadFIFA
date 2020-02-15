import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import * as moment from 'moment';
import { User } from '../model/user.model';
import { Editor } from '../model/season.model';

@Pipe({name: 'tableDataDisplay', pure: true})
export class TableDataDisplayPipe implements PipeTransform {
  
  transform(value: any, columnId: string): any {
    if (columnId === "archived" || columnId === "completed") {
      return value ? "Yes" : "No";
    }
    if (value) {
      let result : string = "";
      switch (columnId) {
        case "startDate": {
          result = moment(value).format("MM/DD/YY, HH:mm");
          return result;
        }
        case ("player1"): {
          result = (<User>value).user ? (<User>value).user.id : "Unknown";
          return result;
        }
        case ("player2"): {
          result = (<User>value).user ? (<User>value).user.id : "Unknown";
          return result;
        }
        case "lastEdited": {
          result = moment((<Editor>value).date).format("MM/DD/YY, HH:mm") + 
            " by " + (<Editor>value).editor.user.id;
          return result;
        }
        case "winner": {
          result = (<User>value).user ? (<User>value).user.id : "TBD";
          return result;
        }
        default: {
          return value;
        }
      }
    }
    return "N/A";

  }
}