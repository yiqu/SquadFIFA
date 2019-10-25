import { Injectable } from '@angular/core';
import { User, UserInfo, UserData } from '../model/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { CrudRestServie } from './crud.service';
import * as _ from 'lodash';
import { HttpResponse } from '@angular/common/http';

const REDIRECT_KEY: string = "redirect";
const LOGIN_DIALOG_KEY: string = "loginDialog";
const SELF_ROUTE: string = "self";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // current user data
  currentUser: User;

  // sub to emit when login dialog window closes
  dialogClose$: Subject<boolean> = new Subject();
  currentUser$: BehaviorSubject<User>;
  userSettingProfileDone$: Subject<any> = new Subject();

  constructor(public router: Router, public route: ActivatedRoute, public rs: CrudRestServie) {
    // create init user
    this.currentUser = this.createInitUser();
    this.currentUser$ = new BehaviorSubject(this.currentUser);
  }

  isUserLoggedIn(): boolean {
    return this.currentUser.isUser;
  }

  createInitUser(): User {
    let u = new User();
    u.setUser(new UserInfo(null, null, null, null, []));
    return u;
  }

  /**
   * User register/login callback.
   * QUERY PARAM LOGIC:
   *  If logged in, redirect to home with ?user = ID
   *                with a redirect value, navigate to redirect
   *  If Cancelled with a redirect query param of SELF, nav to home with no params (bcuz self is guarded)
   *  If Canelled with no redirect, nav to home
   * 
   * @param data 
   */
  userLoggedIn(data: User) {
    console.log("logged in user:", data)
    let qparams = {};
    let redirectPaths: string[] = [];
    let redirectPathValue: string = this.route.snapshot.queryParams[REDIRECT_KEY];

    if (data.isUser) {
      this.setUserData(data);
      qparams['user'] = data.user.id;
    } else if (!data.isUser && this.route.snapshot.queryParams[LOGIN_DIALOG_KEY]) {
      qparams = null;
    }

    if (redirectPathValue) {
      if (redirectPathValue === SELF_ROUTE && !data.isUser) {
        redirectPaths = [];
        redirectPaths.push('/home');
      } else if (data.isUser) {
        redirectPaths = [];
        redirectPaths.push(redirectPathValue);
      }
    } else {
      redirectPaths = [];
      redirectPaths.push('/home')
    }

    this.router.navigate(redirectPaths, {
      queryParams: qparams
    });
  }

  public setUserData(user: User) {
    this.updateCurrentUser(user);
    this.currentUser$.next(this.currentUser);
  }

  updateCurrentUser(data: User) {
    this.currentUser = new User(data.user, data.admin, data.isUser, data.data, data.hashKey);
  }

  updateUserProfile(user: User): Observable<HttpResponse<any>> {
    const url: string = "users/" + user.hashKey + ".json";
    return this.rs.putData(user, url);
  }
}