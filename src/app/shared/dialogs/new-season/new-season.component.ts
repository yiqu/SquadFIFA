import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper'; 
import { MatButton } from '@angular/material/button';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { take, map, switchMap, exhaustMap, concatMap, tap, 
  takeUntil, mergeMap } from 'rxjs/operators';
import { CrudRestServie } from '../../../shared/services/crud.service';
import { LoginService } from '../../services/user.service';
import * as FUTILS from '../../../shared/utils/forms.utils';
import * as VALS from '../../../shared/validators/general-validators'

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
  subTitleSuffix: string = " on going seasons. Would you like to start a new one?";
  inputData: any;

  inputFg: FormGroup;
  steps: StepperObj[] = [];

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
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
      console.log(data, dialogRef.id)
      if (data !== null) {
        this.inputData = data;

      }

  }

  ngOnInit() {
    this.constructStepperObj();

    this.inputFg = this.fb.group({
      player1Id: FUTILS.createFormControl('John', false, []),
      player2Id: FUTILS.createFormControl('Jake', false, [Validators.required]),
      gamesCount: FUTILS.createFormControl(8, false, [Validators.required]),
      review: FUTILS.createFormControl(null, true),
    });

    this.inputFg.valueChanges.subscribe((res) => {
      console.log(this.inputFg.getRawValue())
    })

  }

  constructStepperObj() {
    this.steps.push(
      new StepperObj("Player One", 'ID/Name', 'Select a player', 'player1Id'),
      new StepperObj("Player Two", 'ID/Name', 'Select a player', 'player2Id'),
      new StepperObj("Total Games Count", 'ID/Name', 'Total amount of games in this season', 'gamesCount'),
      new StepperObj("Review", null, null, "review")
    )
  }

  onNext(isLastStep: boolean, index: number) {
    console.log(isLastStep, index);
    this.seasonStepper.next();
  }

  onBack(index: number) {
    console.log(index)
    this.seasonStepper.previous();
  }

  ngOnDestroy() {

  }
}

export class StepperObj {
  constructor(public labelName: string, 
    public phDisplay: string, 
    public hint: string,
    public formCtrlName: string,
    public buttonNextDisplay: string = "Next",
    public buttonBackDisplay: string = "Back") {

  }
}