import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGame, GoalDetail } from 'src/app/shared/model/season.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { dateInputValidator } from '../../../../../shared/validators/general-validators';
import * as _ from 'lodash';
import * as FUTILS from 'src/app/shared/utils/forms.utils';
import { InitErrorMatcher } from '../../../../../shared/matchers/form-err-matcher';

export const INPUT_FORMAT: string = "MM/DD/YY HH:mm";
export const INPUT_TYPES: string[] = [INPUT_FORMAT, "MM/DD/YYYY HH:mm", "MM-DD-YY HH:mm"];
export const DISPLAY_FORMAT: string = "MM/DD/YY hh:mm a";

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
    initErrorMatcher = new InitErrorMatcher();

    constructor(public fb: FormBuilder) {

    }

    get datePlayedControl(): AbstractControl {
      return this.gameFg.get("datePlayed");
    }

    ngOnInit() {
      this.updateTitle();
      console.log("editing", this.game);
      this.createGameFormGroup();
      this.gameFg.valueChanges.subscribe((val) => {
        //console.log(this.gameFg);
      })
    }

    //firstName: ['value', Validators.required],
    /**
     * Note: You can define the control with just the initial value, 
     * but if your controls need sync or async validation, 
     * add sync and async validators as the second and third items in the array.
     */

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
        datePlayed: FUTILS.createFormControl2(moment(this.game.datePlayed).format(INPUT_FORMAT), false, 
          [Validators.required, dateInputValidator]),
        p1: this.fb.group({
          user: this.game.controllers[0].user,
          teamName: FUTILS.createFormControl2(this.game.controllers[0].teamName, false, [Validators.required]),
          goalsScored: this.game.controllers[0].goalsScored,
          goalDetails: p1GoalDetails
        }),
        p2: this.fb.group({
          user: this.game.controllers[1].user,
          teamName: FUTILS.createFormControl2(this.game.controllers[1].teamName, false, [Validators.required]),
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
      const datePlayed: string = moment(this.game.datePlayed).format(DISPLAY_FORMAT);
      const datePlayedFromNow: string = moment(this.game.datePlayed).fromNow();
      this.datePlayedTitle = datePlayed + " (" + datePlayedFromNow + ")";
      this.gameStatusTitle = this.game.finished ? "finished" : "on going";
    }

    onSave() {
      // normalize inputs to send to server
      const formValues = this.gameFg.value;
      const datePlayed: number = moment(formValues.datePlayed, INPUT_TYPES).valueOf();
      const finished = formValues.finished;
      console.log(datePlayed, finished)


      //this.onGameSaved.emit();
    }
}