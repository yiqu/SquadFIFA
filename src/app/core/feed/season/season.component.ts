import { Component, OnInit, Input } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';

@Component({
  selector: 'feed-season',
  templateUrl: 'season.component.html',
  styleUrls: ['season.component.css']
})

export class FeedSeasonComponent implements OnInit {

  @Input('seasonInfo')
  season: ISeason;

  createdDateDisplay: string = "FROMNOW";

  constructor() {
    
  }

  ngOnInit() {
    console.log(this.season)
  }

}