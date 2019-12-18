import { Component, OnInit, Input } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';

@Component({
  selector: 'season-games',
  templateUrl: 'games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit {

  @Input()
  season: ISeason;

  constructor() {

  }

  ngOnInit() { }
}