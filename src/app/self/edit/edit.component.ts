import { Component, OnInit } from '@angular/core';
import { AnimationEvent, trigger, transition, useAnimation } from '@angular/animations';
import { LoginService } from '../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/model/user.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as FUTILS from '../../shared/utils/forms.utils';
import * as VALS from '../../shared/validators/general-validators'
import { InitErrorMatcher } from '../../shared/matchers/form-err-matcher';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-self-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.css', '../self.component.css']
})

export class SelfEditComponent implements OnInit {

  profileFg: FormGroup;
  initErrorMatcher = new InitErrorMatcher();
  updating: boolean = false;

  constructor(public ls: LoginService, public fb: FormBuilder, public ts: ToastrService) {
  }

  get userMetaFg() {
    return this.profileFg.get('user');
  }

  ngOnInit() {
    this.ls.currentUser$.subscribe((user: User) => {
      this.createUserFg(user);
      this.ts.toastrConfig.timeOut = 750;
      this.ts.info("Profile loaded.", "User");
      this.ts.toastrConfig.timeOut = 5000;
    });
  }

  private createUserFg(user: User): void {
    this.profileFg = this.fb.group({
      admin: FUTILS.createFormControl(user.admin, true),
      hashKey: FUTILS.createFormControl(user.hashKey, true, [Validators.required]),
      isUser: FUTILS.createFormControl(user.isUser, true),
      user: this.fb.group({
        id: FUTILS.createFormControl(user.user.id, true, [Validators.required]),
        firstName: FUTILS.createFormControl(user.user.firstName, false, [Validators.required, VALS.alphaValidator]),
        lastName: FUTILS.createFormControl(user.user.lastName, false, [Validators.required, VALS.alphaValidator]),
        avatar: FUTILS.createFormControl(user.user.avatar, false)

      }),
      data: this.fb.group({
        matchesPlayed: FUTILS.createFormControl(user.data.matchesPlayed, true), 
        seasonsPlayed: FUTILS.createFormControl(user.data.seasonsPlayed, true), 
        wins: FUTILS.createFormControl(user.data.wins, true), 
        draws: FUTILS.createFormControl(user.data.draws, true), 
        losses: FUTILS.createFormControl(user.data.losses, true),
        mostUsedTeam: FUTILS.createFormControl(user.data.mostUsedTeam, true),
        favoritePlayer: FUTILS.createFormControl(user.data.favoritePlayer, true),
        totalGoalsScored: FUTILS.createFormControl(user.data.totalGoalsScored, true),
        totalGoalsConceded: FUTILS.createFormControl(user.data.totalGoalsConceded, true)  
      })
    });
  }

  subscribeToFg() {
  }

  updateProfile() {
    if (this.profileFg.invalid) {
      this.ts.error("Please fix the errors before saving.");
    } else {
      this.updating = true;
      const formValues: User = this.profileFg.getRawValue();
      const user = new User(formValues.user, formValues.admin, formValues.isUser, 
        formValues.data, formValues.hashKey);
      this.ls.updateUserProfile(user).pipe(
        map((res: HttpResponse<any>) => {
          return res.body as User;
        })
      ).subscribe(
        (res: User) => {
          this.ls.setUserData(res);
        },
        (err: HttpErrorResponse) => {
          this.updating = false;
        },
        () => {
          this.updating = false;
          this.profileFg.markAsPristine();
          this.ts.success("Profile updated.", "Success");
        }
      );
    }
  }
  
}