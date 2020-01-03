import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGame, GoalDetail, IGameController } from 'src/app/shared/model/season.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { dateInputValidator } from '../../../../../shared/validators/general-validators';
import * as _ from 'lodash';
import * as FUTILS from 'src/app/shared/utils/forms.utils';
import { InitErrorMatcher } from '../../../../../shared/matchers/form-err-matcher';

export const INPUT_FORMAT: string = "MM/DD/YY HH:mm";
export const INPUT_TYPES: string[] = [INPUT_FORMAT, "MM/DD/YYYY HH:mm", "MM-DD-YY HH:mm"];
export const DISPLAY_FORMAT: string = "MM/DD/YY hh:mm a";
export const POSITIVE_INT_PATTERN: RegExp = new RegExp(/^[1-9]\d*$/);

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
    datePlayedHint: string = "Enter in format: MM/DD/YY HH:mm";
    dateplayedPlaceholder: string = "Game played date";
    initErrorMatcher = new InitErrorMatcher();

    constructor(public fb: FormBuilder) {
    }

    get datePlayedControl(): FormControl {
      return <FormControl>this.gameFg.get("datePlayed");
    }

    get finished(): FormControl {
      return <FormControl>this.gameFg.get("finished");
    }

    get gameControllers(): FormArray {
      return <FormArray>this.gameFg.get("controllers");
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
    * 
    * Create Form Group for the game being edited.
    */
    createGameFormGroup() {
      this.gameFg = this.fb.group({
        finished: FUTILS.createFormControl2(this.game.finished, false),
        datePlayed: FUTILS.createFormControl2(moment(this.game.datePlayed).format(INPUT_FORMAT), false, 
          [Validators.required, dateInputValidator]),
        controllers: this.fb.array([])
      });

      //loop through controllers
      this.game.controllers.forEach((controller: IGameController, index: number) => {
        // loop through goal details and create array
        const goalScoredFga: FormArray = this.fb.array([]);
        controller.goalDetails.forEach((goalDet: GoalDetail) => {
          goalScoredFga.push(new FormGroup({
            goalCount: FUTILS.createFormControl2(goalDet.goalCount, false, 
              [Validators.required, Validators.pattern(POSITIVE_INT_PATTERN)]),
            goalScorer: FUTILS.createFormControl2(goalDet.goalScorer, false, [Validators.required]),
            goalTime: FUTILS.createFormControl2(goalDet.goalTime, false, [Validators.required])
          }))
        });
        // create the individual controller fg
        const controllerFg = this.fb.group({
          goalDetails: goalScoredFga,
          goalsScored: FUTILS.createFormControl2(this.game.controllers[index].goalsScored, true, [
            Validators.required]),
          teamName: FUTILS.createFormControl2(this.game.controllers[index].teamName, false, [Validators.required]),
          user: FUTILS.createFormControl2(this.game.controllers[index].user, false, [Validators.required])
        });
        // push the fg to controller form array
        (<FormArray>this.gameFg.get("controllers")).push(controllerFg);
      });
      console.log(this.gameFg)
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

    getGameController(i: number): FormGroup {
      return <FormGroup>(<FormArray>this.gameFg.get("controllers")).at(i);
    }
}