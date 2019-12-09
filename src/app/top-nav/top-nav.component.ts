import { Component, OnInit } from '@angular/core';
import { NavItem } from '../shared/model/general-model';
import { User } from '../shared/model/user.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { delay, concatMap, map, takeUntil, startWith, timeInterval, skip } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from '../shared/dialogs/login/login.component';
import { LoginService } from '../shared/services/user.service';
import * as _ from 'lodash';
import { CoreService } from '../shared/services/core.service';

const NAV_ITEM_LIST = [
  new NavItem("Home", ["home"]),
  new NavItem("Players", ["players"]),
  new NavItem("Statistics", ["statistics"]),
  // new NavItem("About", ["about"]),
  new NavItem("Profile", ["self"]),
  new NavItem("Login", ["home"], false, { loginDialog: true }),
]
const loginQueryParamKey: string = "loginDialog";
const USER_PARAM_KEY: string = "user";
const LOGOUT_PARAM_KEY: string = "logoutUser";

@Component({
  selector: 'app-navbar-top',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})

export class TopNavComponent implements OnInit {

  public subTitle: string = "Season Tracker";
  public navItemsList: NavItem[] = [];
  public menuOpen: boolean = false;
  userLoginText: string = "Login";
  
  constructor(public router: Router, public route: ActivatedRoute,
    public dialog: MatDialog, public ls: LoginService, public cs: CoreService) {
      this.navItemsList.push(...NAV_ITEM_LIST);
  }

  ngOnInit() {
    this.ls.currentUser$.subscribe((user: User) => {
      console.log("top nav: ",user)
      this.updateLoginCompoent(user.isUser);
      this.ls.updateCurrentUser(user);
    });

    /**
     * Route Obs's is a BehaviorSubject, avoid doing any navigating in here based on routes
     */
    this.route.queryParamMap.subscribe((queryParam: ParamMap) => {
      //?user
      const userIdParamValue: string = queryParam.get(USER_PARAM_KEY);
      //?loginDialog
      const loginParamValue: string = queryParam.get(loginQueryParamKey);
      //?logOut
      const logOutParamValue: string = queryParam.get(LOGOUT_PARAM_KEY);

      if (queryParam.get(loginQueryParamKey)) {
        this.openDialog();
      }
    });
  }

  updateLoginCompoent(isUser: boolean) {
    let indexOfLogInButton = _.findIndex(this.navItemsList, (item: NavItem) => {
      return item.display === "Logout" || item.display === "Login";
    });
    if (isUser) {
      this.navItemsList[indexOfLogInButton].display = "Logout";
      this.navItemsList[indexOfLogInButton].params = ['/logout'];
      this.navItemsList[indexOfLogInButton].qparams = {logoutUser: this.ls.currentUser.user.id};
      this.navItemsList[indexOfLogInButton].handling = "";
    } else {
      this.navItemsList[indexOfLogInButton].display = "Login";
      this.navItemsList[indexOfLogInButton].params = ['/home'];
      this.navItemsList[indexOfLogInButton].qparams = {loginDialog: true};
      this.navItemsList[indexOfLogInButton].handling = "";
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      minWidth: '350px',
      autoFocus: true,
      disableClose: true,
      panelClass: 'login-overlay',
      backdropClass: 'login-overlay-background',
      data: this.ls.currentUser
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      this.ls.userLoggedIn(result);
    });
  }
}