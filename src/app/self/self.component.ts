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
  }


  ngOnInit() {
    // this.ls.currentUser$.subscribe((user: User) => {
    //   console.log(user);
    //   this.createUserFg(user);
    //   console.log(this.profileFg)
    // });
  }


}