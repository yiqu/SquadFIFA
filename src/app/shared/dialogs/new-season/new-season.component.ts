import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
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
  subTitle: string = "sub";

  constructor(public ls: LoginService, public cs: CrudRestServie,
    public dialogRef: MatDialogRef<NewSeasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data, dialogRef.id)
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}