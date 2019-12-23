import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGame } from 'src/app/shared/model/season.model';
import * as moment from 'moment';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'season-game-editor',
    templateUrl: 'edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class SeasonGameEditComponent implements OnInit {

    @Input()
    game: IGame;

    @Output()
    onGameSaved: EventEmitter<any> = new EventEmitter<any>();

    defaultTitle: string = "Editing Game";
    datePlayedTitle: string = "";
    gameStatusTitle: string = "";

    constructor(public fb: FormBuilder) {

    }

    ngOnInit() {
      this.updateTitle();
      console.log("editing", this.game);
      
    }

    updateTitle() {
      const datePlayed: string = moment(this.game.datePlayed).format("MM/DD/YYYY hh:mm a");
      const datePlayedFromNow: string = moment(this.game.datePlayed).fromNow();
      this.datePlayedTitle = datePlayed + " (" + datePlayedFromNow + ")";
      this.gameStatusTitle = this.game.finished ? "finished" : "on going";
    }

    onSave() {
      this.onGameSaved.emit();
    }
}