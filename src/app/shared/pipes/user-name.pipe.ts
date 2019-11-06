import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user.model';
import memo from 'memo-decorator';

@Pipe({name: 'userDisplay', pure: true})
export class UserDisplayPipe implements PipeTransform {
  
  transform(value: User, option: string): any {
    let result = "User_name";
    if (!value) {
      result = "Not Selected";
      return result;
    }
    if (!isObject(value)) {
      return value + " (Unregistered User)";
    }
    switch(option) {
      case "first_last": {
        result = value.user.firstName + " " + value.user.lastName;
        break;
      }
      case "first": {
        result = value.user.firstName;
        break;
      }
      case "last": {
        result = value.user.lastName;
        break;
      }
      case "first_id": {
        result = value.user.firstName + " (" +  value.user.id + ")";
        break;
      }
      case "last_id": {
        result = value.user.firstName + " (" +  value.user.id + ")";
        break;
      }
      default: {
        result = "User_name";
      }
    }
    return result;
  }
}

export function isObject(test: any) {
  return typeof test === 'object' && test !== null;
}