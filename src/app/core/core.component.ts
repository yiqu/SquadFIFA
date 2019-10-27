import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/model/user.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as FUTILS from '../shared/utils/forms.utils';
import { NewSeasonComponent } from '../shared/dialogs/new-season/new-season.component';

@Component({
  selector: 'app-core',
  templateUrl: 'core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute,
    public dialog: MatDialog) {

  }

  ngOnInit() {

  }

  onNewSeason(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewSeasonComponent, {
      minWidth: '350px',
      autoFocus: true,
      disableClose: true,
      panelClass: 'login-overlay',
      backdropClass: 'login-overlay-background',
      data: "hi"
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      //this.ls.userLoggedIn(result);
    });
  }
}