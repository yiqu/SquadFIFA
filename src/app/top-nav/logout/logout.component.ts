import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../shared/model/general-model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { take } from 'rxjs/operators';

const loginQueryParamKey: string = "loginDialog";
const logoutUserKey: string = "logoutUser";

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html'
})

export class LogoutComponent implements OnInit {

  logoutMsg: string = "You have been logged out.";
  homeNavItem: NavItem = new NavItem("", ['/home'], false, null, "");
  loginNavItem: NavItem = new NavItem("", ['/home'], false, {loginDialog: true}, "");
  userId: string;

  constructor(public router: Router, public route: ActivatedRoute) {
    this.route.queryParamMap.pipe(
      take(1)
    ).subscribe((res: ParamMap) => {
      this.userId = res.get(logoutUserKey);
    },
    (err)=> {
    },
    () => {
      console.log("logout param done.")
    });
  }

  ngOnInit() {

  }
}