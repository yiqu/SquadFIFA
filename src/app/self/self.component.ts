import { Component, OnInit } from '@angular/core';
import { AnimationEvent, trigger, transition, useAnimation } from '@angular/animations';
import { LoginService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/model/user.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as FUTILS from '../shared/utils/forms.utils';


@Component({
  selector: 'app-self',
  templateUrl: 'self.component.html',
  styleUrls: ['./self.component.css']
})

export class SelfComponent implements OnInit {

  profileFg: FormGroup;

  constructor(public ls: LoginService, public fb: FormBuilder) {
    this.profileFg = new FormGroup({});
  }

  ngOnInit() {
    this.ls.currentUser$.subscribe((user: User) => {
      console.log(user);
      this.createInitFg(user);
      console.log(this.profileFg)
    });
  }

  createInitFg(user: User) {
    this.profileFg = this.fb.group({
      admin: FUTILS.createFormControl(user.admin, true),
      hashKey: FUTILS.createFormControl(user.hashKey, true),
      isUser: FUTILS.createFormControl(user.isUser, true)
    });

  }

}