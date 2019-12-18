import { Component, OnInit, Input } from '@angular/core';
import { ISeason, IGame } from 'src/app/shared/model/season.model';

@Component({
  selector: 'season-games',
  templateUrl: 'games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit {

  @Input()
  season: ISeason;

  get seasonGames(): IGame[] {
    return this.season.games;
  }

  constructor() {

  }

  ngOnInit() { }
}