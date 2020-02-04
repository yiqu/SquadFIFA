import { Component, OnInit, Input } from '@angular/core';
import { ISeason, IGame, Game, Season } from 'src/app/shared/model/season.model';
import { CoreService } from 'src/app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { delay } from 'rxjs/operators';

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

  constructor(public cs: CoreService, public ts: ToastrService) {

  }

  ngOnInit() {
  }


  onEditGame(index: number) {
    this.gameToEdit = this.seasonGames[index];
  }

  onGameSave(game: Game, index: number) {
    const updatedGames: IGame[] = [...this.season.games];
    updatedGames[index] = game;
    this.updateSeasonAndSave(updatedGames);
  }

  updateSeasonAndSave(games: IGame[]) {
    const season: Season = new Season(this.season.hashKey, this.season.player1, this.season.player2, 
      this.season.player1Record,
      this.season.player2Record, this.season.gamesTotal, this.season.owners, this.season.controllers, games,
      this.season.winner, this.season.startDate, this.season.endDate, this.season.pending, this.season.archived, 
      this.season.completed,
      this.season.editing, this.season.lastEdited, this.season.title);
    console.log("to save season: ", season)
    if (season.hashKey && !this.cs.isSeasonSaving) {
      console.log("saving now")
      this.cs.isSeasonSaving = true;
      this.cs.editSeason(season, season.hashKey).pipe(
        delay(0)
      ).subscribe(
        (res: HttpResponse<ISeason>) => {
          this.ts.success("Season " + res.body.title + " has been updated.", "Update Success!");
        },
        (err: HttpErrorResponse) => {
          this.ts.error("Error on save", "Update Error!");
          this.cs.isSeasonSaving = false;
        },
        () => {
          this.cs.isSeasonSaving = false;
        }
      );
    } else {
      this.ts.error("No haskkey found for this season", "Season Error!");
    }
    
  }

  onGameCancel() {
    this.resetGameToEdit();
  }

  resetGameToEdit() {
    this.gameToEdit = undefined;
  }

}