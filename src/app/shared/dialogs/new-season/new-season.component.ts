import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { take, map, switchMap, exhaustMap, concatMap, tap, 
  takeUntil, mergeMap } from 'rxjs/operators';
import { CrudRestServie } from '../../../shared/services/crud.service';
import { LoginService } from '../../services/user.service';

@Component({
  selector: 'app-dialog-new-season',
  templateUrl: 'new-season.component.html',
  styleUrls: ['./new-season.component.css']
})

export class NewSeasonComponent implements OnInit, OnDestroy {

  title: string = "Add New Season";
  subTitle: string = "There are currently ";
  subTitleSuffix: string = " on going seasons. Would you like to start a new one?";
  inputData: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(public ls: LoginService, public cs: CrudRestServie,
    public dialogRef: MatDialogRef<NewSeasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
      console.log(data, dialogRef.id)
      if (data !== null) {
        this.inputData = data;

      }

  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

  }

  ngOnDestroy() {

  }
}