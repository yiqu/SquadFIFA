import { Component, OnInit, Input } from '@angular/core';
import { ISeason, IGame } from 'src/app/shared/model/season.model';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'season-games',
  templateUrl: 'games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit {

  @Input()
  season: ISeason;

  gameToEdit: IGame;

  get seasonGames(): IGame[] {
    return this.season.games;
  }

  constructor(public cs: CoreService) {

  }

  ngOnInit() {
  }


  onEditGame(index: number) {
    this.gameToEdit = this.seasonGames[index];
  }

  onGameSave() {
    this.resetGameToEdit();
  }

  onGameCancel() {
    this.resetGameToEdit();
  }

  resetGameToEdit() {
    this.gameToEdit = undefined;
  }

}