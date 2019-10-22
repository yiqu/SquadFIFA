import { Component, OnInit } from '@angular/core';
import { AnimationEvent, trigger, transition, useAnimation } from '@angular/animations';
import { LoginService } from '../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/model/user.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as FUTILS from '../../shared/utils/forms.utils';


@Component({
  selector: 'app-self-core',
  templateUrl: 'core.component.html',
  styleUrls: ['./core.component.css', '../self.component.css']
})

export class SelfCoreComponent implements OnInit {


  constructor(public ls: LoginService) {
  }


  ngOnInit() {
  }

}