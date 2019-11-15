import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/model/user.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import * as FUTILS from '../shared/utils/forms.utils';
import { NewSeasonComponent } from '../shared/dialogs/new-season/new-season.component';
import { CoreService } from '../shared/services/core.service';
import { ISeason } from '../shared/model/season.model';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-core',
  templateUrl: 'core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit, OnDestroy {

  newSeasonBtnLoad: boolean = false;
  allSeasons: ISeason[] = [];
  onCompDestroy$: Subject<any> = new Subject();

  constructor(public router: Router, public route: ActivatedRoute,
    public dialog: MatDialog, public cs: CoreService, public ls: LoginService) {
  }

  ngOnInit() {
    this.subscribeToSeasonListener();
    // fetch all seasons
    this.cs.fetchAllSeasons$.next();
  }

  onNewSeason(): void {
    this.openDialog(this.allSeasons.length);
  }

  subscribeToSeasonListener() {
    this.cs.allSeasons$.pipe(
      takeUntil(this.onCompDestroy$)
    ).subscribe((seasons: ISeason[]) => {
      this.allSeasons = seasons;
    },
    (err) => {
    },
    () => {
      console.log("szn all done")
    });
  }

  openDialog(dialogData: any): void {
    this.ls.queryAllUsers();
    const dialogRef = this.dialog.open(NewSeasonComponent, {
      minWidth: '350px',
      autoFocus: true,
      disableClose: true,
      panelClass: 'login-overlay',
      backdropClass: 'login-overlay-background',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((createdSeason: any) => {
      // fetch seasons
      this.cs.fetchAllSeasons$.next();
    });
  }

  ngOnDestroy() {
    this.onCompDestroy$.next();
    this.onCompDestroy$.complete();
  }
}