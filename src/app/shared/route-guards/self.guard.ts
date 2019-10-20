import { Injectable, EventEmitter,  } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot,
RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { Observable, of,  } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { LoginService } from '../services/user.service';
import { User } from '../model/user.model';

const REDIRECT_KEY: string = "redirect";
const MY_PROFILE_ROUTE: string = "self";

@Injectable()
export class SelfGuard implements CanActivate {

  constructor(public ls: LoginService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.ls.currentUser$.pipe(
      map((user: User) => {
        if (user.isUser) {
          return user.isUser;
        } else {
          this.router.navigate(['./home'], {
            queryParams: {
              loginDialog: true,
              redirect: MY_PROFILE_ROUTE
            }
          });
          return false;
        }
      })
    );
  }
}