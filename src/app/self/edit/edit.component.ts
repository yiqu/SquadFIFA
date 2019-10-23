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

@Component({
  selector: 'app-self-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.css', '../self.component.css']
})

export class SelfEditComponent implements OnInit {

  profileFg: FormGroup;

  constructor(public ls: LoginService, public fb: FormBuilder) {
  }

  get userMetaFg() {
    return this.profileFg.get('user');
  }

  ngOnInit() {
    this.ls.currentUser$.subscribe((user: User) => {
      console.log(user);
      this.createUserFg(user);
      console.log(this.profileFg)
    });
  }

  private createUserFg(user: User): void {
    
    this.profileFg = this.fb.group({
      admin: FUTILS.createFormControl(user.admin, true),
      hashKey: FUTILS.createFormControl(user.hashKey, true),
      isUser: FUTILS.createFormControl(user.isUser, true),
      user: this.fb.group({
        id: FUTILS.createFormControl(user.user.id, true),
        firstName: FUTILS.createFormControl(user.user.firstName, false, [VALS.alphaValidator]),
        lastName: FUTILS.createFormControl(user.user.lastName, false),
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
}