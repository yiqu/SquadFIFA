import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper'; 
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import { ToastrService, Toast } from 'ngx-toastr';
import { take, map, switchMap, exhaustMap, concatMap, tap, 
  takeUntil, mergeMap, startWith } from 'rxjs/operators';
import { CrudRestServie } from '../../../shared/services/crud.service';
import { LoginService } from '../../services/user.service';
import * as FUTILS from '../../../shared/utils/forms.utils';
import * as VALS from '../../../shared/validators/general-validators'
import { Subject, Observable, of } from 'rxjs';
import { User, UserInfo } from '../../model/user.model';
import { numOnlyValidator } from '../../../shared/validators/general-validators';
import { StepperObj, IFireBaseResponse } from '../../../shared/model/general-model';
import { ISeason, Season, SeasonRecord, Editor } from '../../model/season.model';
import { isObject } from '../../../shared/pipes/user-name.pipe';
import { CoreService } from '../../services/core.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-new-season',
  templateUrl: 'new-season.component.html',
  styleUrls: ['./new-season.component.css']
})

export class NewSeasonComponent implements OnInit, OnDestroy {

  @ViewChild('seasonStepper', {static: false})
  seasonStepper: MatStepper

  title: string = "Add New Season";
  subTitle: string = "There are currently ";
  subTitleSuffix: string = " on-going seasons. Would you like to start a new one?";
  inputData: any;
  dialogClosed$: Subject<any> = new Subject();
  selectClosed$: Subject<any> = new Subject();
  allUsers: User[] = [];
  filteredUsers: Observable<User[]>;
  formErrors: string[] = [];
  triedToSubmit: boolean = false;
  isSeasonSaving: boolean = false;
  inputFg: FormGroup;
  steps: StepperObj[] = [];
  btnConfirm: string = "Start season";
  btnCancel: string = "Never mind";

  get player1Ctrl(): AbstractControl {
    return this.inputFg.get('player1Id');
  }

  get player2Ctrl(): AbstractControl {
    return this.inputFg.get('player2Id');
  }

  get gamesCount(): AbstractControl {
    return this.inputFg.get('gamesCount');
  }

  constructor(public ls: LoginService, public cs: CrudRestServie,
    public dialogRef: MatDialogRef<NewSeasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public ts: ToastrService,
    public crs: CoreService) {
      console.log(data, dialogRef.id)
      if (data !== null) {
        this.inputData = data;
      }
      
      this.ls.allUsers$.pipe(
        takeUntil(this.dialogClosed$)
      ).subscribe((users: User[]) => {
        this.allUsers = users;
      })
  }

  ngOnInit() {
    this.constructStepperObj();

    this.inputFg = this.fb.group({
      player1Id: FUTILS.createFormControl(null, false, [Validators.required]),
      player2Id: FUTILS.createFormControl(null, false, [Validators.required]),
      gamesCount: FUTILS.createFormControl(8, false, [Validators.required, Validators.min(1),
        numOnlyValidator]),
      review: FUTILS.createFormControl(null, true),
    });

    this.inputFg.valueChanges.pipe(
      takeUntil(this.dialogClosed$)
    ).subscribe((res) => {
     // console.log(this.inputFg);
    },
    (err) => {
    },
    () => {
      console.log("new szn form CHANGES done.")
    });
  }

  onSelectOpen(ctrlName: string) {
  }

  onSelectClosed() {
  }

  onSelectFocus(ctrlName: string) {
    this.filteredUsers = this.inputFg.get(ctrlName).valueChanges.pipe(
      startWith(""),
      map(value => this.filterInput(value))
    );
  }

  private filterInput(value: any): User[] {
    let filterValue = "";
    if (!(typeof value === 'string' || (value instanceof String))) {
      filterValue = value.user.id;
    } else {
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

  constructStepperObj() {
    this.steps.push(
      new StepperObj("Select Player One", 'ID/Name', 'Select a player', 'player1Id'),
      new StepperObj("Select Player Two", 'ID/Name', 'Select a player', 'player2Id'),
      new StepperObj("Set Total Games Count", 'Number of games', 'Total amount of games in this season.', 
        'gamesCount'),
      new StepperObj("Review", null, null, "review")
    )
  }

  onNext(isLastStep: boolean, index: number) {
    // if it is the last step, submit to save new season (if not errors)
    if (this.seasonStepper.selectedIndex === (this.steps.length - 1)) {
      this.triedToSubmit = true;
      this.getAllErrors();
      if (this.inputFg.valid && this.formErrors.length === 0) {
        this.constructSeason();
      }
    } else {
      this.seasonStepper.next();
    }
  }

  onBack(index: number) {
    this.seasonStepper.previous();
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

  onCancel() {
    this.dialogRef.close();
  }

  getAllErrors() {
    // collect all error states from each form control
    this.formErrors = [];
    for (let key1 of Object.keys(this.inputFg.controls)) {
      if (this.inputFg.get(key1).errors) {
        for (let key2 of Object.keys(this.inputFg.get(key1).errors)) {
          this.formErrors.push(key2);
        }
      }
    }
    // check if selected players are duplicated
    const p1Hash = isObject(this.player1Ctrl.value) ? 
      this.player1Ctrl.value.hashKey : this.player1Ctrl.value;
    const p2Hash = isObject(this.player2Ctrl.value) ? 
      this.player2Ctrl.value.hashKey : this.player2Ctrl.value;
    if (p1Hash === p2Hash) {
      this.formErrors.push("Duplicated");
    }
  }

  constructSeason() {
    const p1Id = isObject(this.player1Ctrl.value) ? 
      this.player1Ctrl.value : new User(new UserInfo(this.player1Ctrl.value), false, false, null, null);
    const p2Id = isObject(this.player2Ctrl.value) ? 
      this.player2Ctrl.value : new User(new UserInfo(this.player2Ctrl.value), false, false, null, null);
    const games = this.gamesCount.value;

    const season = new Season("hash", p1Id, p2Id, null, null, games, [p1Id, p2Id], [p1Id, p2Id], [], undefined,
      new Date().getTime(), undefined, "FALSE", false, false, false, new Editor(new Date().getTime(), p1Id));

    this.saveSeason(season);
  }

  saveSeason(s: Season) {
    this.isSeasonSaving = true;
    this.crs.createNewSeason(s).pipe(
      concatMap((res: HttpResponse<IFireBaseResponse>) => {
        if (res.ok && res.body.name) {
          s.hashKey = res.body.name;
          return this.crs.editSeason(s, res.body.name);
        }
        return of(null);
      })
    ).subscribe((res: HttpResponse<ISeason>) => {
    },
    (err) => {
    },
    () => {
      this.ts.success("The new season is created.", "New season!");
      this.dialogRef.close();
      this.isSeasonSaving = false;
    });
  }
  
  ngOnDestroy() {
    this.dialogClosed$.next();
    this.dialogClosed$.complete();
  }
}

