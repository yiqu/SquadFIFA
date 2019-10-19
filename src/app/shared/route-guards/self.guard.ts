import { Injectable, EventEmitter,  } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot,
RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { Observable, of,  } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { LoginService } from '../services/user.service';

const REDIRECT_KEY: string = "redirect";
const MY_PROFILE_ROUTE: string = "self";

@Injectable()
export class SelfGuard implements CanActivate {

  constructor(public ls: LoginService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.ls.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['./home'], {
        queryParams: {
          loginDialog: true,
          redirect: MY_PROFILE_ROUTE
        }
      });
    }
  }
}