import { Component, OnInit, Input } from '@angular/core';
import { SeasonDynamicBase } from './base.component';
import { ISeason } from 'src/app/shared/model/season.model';

@Component({
  templateUrl: 'single.component.html',
  styleUrls: ['single.component.css', '../season.component.css']
})

export class SingleSeasonComponent implements SeasonDynamicBase {

  @Input()
  seasonInfo: ISeason;
  
  constructor() {
  }

}