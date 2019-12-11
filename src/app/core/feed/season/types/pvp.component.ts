import { Component, OnInit, Input } from '@angular/core';
import { SeasonDynamicBase } from './base.component';
import { ISeason } from 'src/app/shared/model/season.model';

@Component({
  templateUrl: 'pvp.component.html',
  styleUrls: ['pvp.component.css', '../season.component.css']
})

export class PvpSeasonComponent implements SeasonDynamicBase {

  @Input()
  seasonInfo: ISeason;

  createdDateDisplay: string = "FROMNOW";

  constructor() {
  }


}