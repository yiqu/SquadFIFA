import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/model/user.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as FUTILS from '../shared/utils/forms.utils';

@Component({
  selector: 'app-core',
  templateUrl: 'core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  onNewSeason(): void {

  }
}