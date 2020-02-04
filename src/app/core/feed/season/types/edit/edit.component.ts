import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IGame, GoalDetail, IGameController, Game } from 'src/app/shared/model/season.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { dateInputValidator, numOnlyValidator } from '../../../../../shared/validators/general-validators';
import * as _ from 'lodash';
import * as FUTILS from 'src/app/shared/utils/forms.utils';
import { InitErrorMatcher } from '../../../../../shared/matchers/form-err-matcher';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/shared/model/user.model';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/user.service';
import { CoreService } from 'src/app/shared/services/core.service';

export const INPUT_FORMAT: string = "MM/DD/YY HH:mm";
export const INPUT_TYPES: string[] = [INPUT_FORMAT, "MM/DD/YYYY HH:mm", "MM-DD-YY HH:mm"];
export const DISPLAY_FORMAT: string = "MM/DD/YY hh:mm a";
export const POSITIVE_INT_PATTERN: RegExp = new RegExp(/^[1-9]\d*$/);
export const POSITIVE_INT: RegExp = new RegExp(/^(0|[1-9]\d*)$/);

@Component({
    selector: 'season-game-editor',
    templateUrl: 'edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class SeasonGameEditComponent implements OnInit, OnDestroy {

  @Input()
  game: IGame;

  @Output()
  onGameSaved: EventEmitter<Game> = new EventEmitter<Game>();

  @Output()
  onGameCancel: EventEmitter<any> = new EventEmitter<any>();

  defaultTitle: string = "Editing Game";
  datePlayedTitle: string = "";
  gameStatusTitle: string = "";
  gameFg: FormGroup;
  datePlayedHint: string = "Enter in format: MM/DD/YY HH:mm";
  dateplayedPlaceholder: string = "Game played date";
  initErrorMatcher = new InitErrorMatcher();
  filteredUsers: Observable<User[]>;
  allUsers: User[] = [];
  editClosed$: Subject<any> = new Subject();
  unsavedChanges: boolean = false;

  constructor(public fb: FormBuilder, public ls: LoginService, public cs: CoreService) {
    this.ls.allUsers$.pipe(
      takeUntil(this.editClosed$)
    ).subscribe((users: User[]) => {
      this.allUsers = users;
    });
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
      this.unsavedChanges = true;
    })
  }
  
  ngOnDestroy() {
    this.editClosed$.next();
    console.log("destoryed edit.")
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
        goalScoredFga.push(this.createNewGoalDetailFg(goalDet.goalCount, goalDet.goalScorer, goalDet.goalTime));
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
  }


  updateTitle() {
    const datePlayed: string = moment(this.game.datePlayed).format(DISPLAY_FORMAT);
    const datePlayedFromNow: string = moment(this.game.datePlayed).fromNow();
    this.datePlayedTitle = datePlayed + " (" + datePlayedFromNow + ")";
    this.gameStatusTitle = this.game.finished ? "finished" : "on going";
  }

  onCancel() {
    this.onGameCancel.emit();
  }

  onSave() {
    const formValues = this.gameFg.value;
    const formRawValues = this.gameFg.getRawValue();
    const datePlayed: number = moment(formValues.datePlayed, INPUT_TYPES).valueOf();
    const savedGame: Game = new Game(formRawValues.controllers, formRawValues.finished, datePlayed, null);
    this.onGameSaved.emit(savedGame);
  }

  getGameController(i: number): FormGroup {
    return <FormGroup>(<FormArray>this.gameFg.get("controllers")).at(i);
  }

  onSelectFocus(index: number, ctrlName: string) {
    this.filteredUsers = (<FormArray>this.gameFg.get('controllers')).at(index).get(ctrlName).valueChanges.pipe(
      startWith(""),
      map(value => this.filterInput(value))
    );
  }

  private filterInput(value: any): User[] {
    let filterValue = "";
    if (!(typeof value === 'string' || (value instanceof String))) {
      filterValue = value.user.id;
    } else {``
      filterValue = value.toLowerCase();
    }
    
    if (value) {
      return this.allUsers.filter((user: User) => {
        const wholeName: string = user.user.id + " " + user.user.firstName + 
          " " + user.user.lastName;
        return (wholeName.toLowerCase().indexOf(filterValue) >= 0)
      });
    }
    return this.allUsers;
  }

  playerIdDisplayFn(user: User): string | undefined {
    let result: string;
    if (user) {
      result = user.user.id;
      if (user.user.firstName || user.user.lastName) {
        result += (" (" + user.user.firstName + ", " + user.user.lastName + ")")
      }
    }
    return result;
  }

  onNewGoal(i: number) {
    (<FormArray>this.gameControllers.at(i).get("goalDetails")).push(this.createNewGoalDetailFg(1, null, ""));
  }

  private createNewGoalDetailFg(goalCount: number, goalScorer: string, goalTime: string) {
    return new FormGroup({
      goalCount: FUTILS.createFormControl2(goalCount, false),
      goalScorer: FUTILS.createFormControl2(goalScorer, false, [Validators.required]),
      goalTime: FUTILS.createFormControl2(goalTime, false, [Validators.required, Validators.pattern(POSITIVE_INT)])
    });
  }

  onGoalRemove(controllerIndex: number, gameIndex: number) {
    (<FormArray>this.gameControllers.at(controllerIndex).get('goalDetails')).removeAt(gameIndex);
  }

  setDateNow() {
    this.datePlayedControl.setValue(moment().format(INPUT_FORMAT));
  }
}