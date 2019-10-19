import { Injectable } from '@angular/core';
import { User, UserInfo, UserData } from '../model/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

const REDIRECT_KEY = "redirect";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // current user data
  currentUser: User;

  // sub to emit when login dialog window closes
  dialogClose$: Subject<boolean> = new Subject();
  currentUser$: BehaviorSubject<User> = new BehaviorSubject(this.currentUser);;

  constructor(public router: Router, public route: ActivatedRoute) {
    // create init user
    this.createInitUser();
  }

  isUserLoggedIn(): boolean {
    return this.currentUser.isUser;
  }

  createInitUser() {
    this.currentUser = new User();
    this.currentUser.setUser(new UserInfo(null, null, null, null, []));
    this.currentUser$.next(this.currentUser);
  }

  /**
   * User register/login callback.
   * @param data 
   */
  userLoggedIn(data: User) {
    console.log("logged in user:", data)
    if (data) {
      this.setUserData(data);
    } else {
      this.createInitUser();
    }

    let redirectPaths: string[] = [];
    let redirectPathValue: string = this.route.snapshot.queryParams[REDIRECT_KEY];
    if (redirectPathValue) {
      redirectPaths.push(redirectPathValue);
    } else {
      redirectPaths = ['./home']
    }

    this.router.navigate(redirectPaths, {
      queryParams: data ? {user: this.currentUser.user.id} : null,
      queryParamsHandling: ''
    });
  }

  setUserData(data: User) {
    let userData: UserData = new UserData();

    this.currentUser = new User(data.user, data.admin, data.isUser, data.data, data.hashKey);
    this.currentUser$.next(this.currentUser);
  }
}