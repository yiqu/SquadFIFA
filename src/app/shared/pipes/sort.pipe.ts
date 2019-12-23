import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { ISeason, IGame } from '../model/season.model';

@Pipe({name: 'gameSortDisplay', pure: true})
export class GameSortDisplayPipe implements PipeTransform {
  
  transform(value: ISeason): any {
    console.log("pipe",value)

    return value;
  }
}