import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGame, GoalDetail } from 'src/app/shared/model/season.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as FUTILS from 'src/app/shared/utils/forms.utils';

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
    gameFg: FormGroup;

    constructor(public fb: FormBuilder) {

    }

    ngOnInit() {
      this.updateTitle();
      console.log("editing", this.game);
      this.createGameFormGroup();
    }

    createGameFormGroup() {
      const p1GoalDetails: FormArray = new FormArray([]);
      const p2GoalDetails: FormArray = new FormArray([]);

      this.game.controllers[0].goalDetails.forEach((gd: GoalDetail) => {
        p1GoalDetails.push(this.createFgFromGoalDetail(gd));
      });

      this.game.controllers[1].goalDetails.forEach((gd: GoalDetail) => {
        p2GoalDetails.push(this.createFgFromGoalDetail(gd));
      });

      this.gameFg = this.fb.group({
        finished: FUTILS.createFormControl2(this.game.finished, false),
        datePlayed: FUTILS.createFormControl2(this.game.datePlayed, false),
        p1: this.fb.group({
          user: this.game.controllers[0].user,
          teamName: this.game.controllers[0].teamName,
          goalsScored: this.game.controllers[0].goalsScored,
          goalDetails: p1GoalDetails
        }),
        p2: this.fb.group({
          user: this.game.controllers[1].user,
          teamName: this.game.controllers[1].teamName,
          goalsScored: this.game.controllers[1].goalsScored,
          goalDetails: p2GoalDetails
        })
      });

      console.log(this.gameFg)
    }

    createFgFromGoalDetail(detail: GoalDetail): FormGroup {
      return this.fb.group({
        goalCount: FUTILS.createFormControl2(detail.goalCount, false, [Validators.required]),
        goalScorer: FUTILS.createFormControl2(detail.goalScorer, false, [Validators.required]),
        goalTime: FUTILS.createFormControl2(detail.goalTime, false, [Validators.required])
      })
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