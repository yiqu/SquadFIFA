import { Type } from '@angular/core';
import { ISeason } from '../../../../shared/model/season.model';

export class SeasonItem {
  constructor(public component: Type<any>, public data: ISeason) {
  }
}