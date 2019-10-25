import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationEvent, trigger, transition, useAnimation } from '@angular/animations';
import { LoginService } from '../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/model/user.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import * as FUTILS from '../../shared/utils/forms.utils';
import * as VALS from '../../shared/validators/general-validators'
import { InitErrorMatcher } from '../../shared/matchers/form-err-matcher';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-self-seasons',
  templateUrl: 'seasons.component.html',
  styleUrls: ['./seasons.component.css', '../self.component.css']
})

export class SelfSeasonsComponent implements OnInit, OnDestroy {

  seasonFg: FormGroup;

  get userMetaFg() {
    return this.seasonFg.get('data');
  }

  constructor(public ls: LoginService, public fb: FormBuilder, public ts: ToastrService) {
  }

  ngOnInit() {
    this.ls.currentUser$.pipe(
      takeUntil(this.ls.userSettingProfileDone$)
    ).subscribe((user: User) => {
      this.createSeasonsFg(user);
      this.ts.toastrConfig.timeOut = 750;
      this.ts.info("Seasons record loaded.", "User");
      this.ts.toastrConfig.timeOut = 5000;
    },
    (err) => {
    },
    () => {
      console.log("User listener in profile edit DONE")
    });
  }

  createSeasonsFg(user: User) {

  }

  ngOnDestroy() {
    this.ls.userSettingProfileDone$.next(true);
  }
}