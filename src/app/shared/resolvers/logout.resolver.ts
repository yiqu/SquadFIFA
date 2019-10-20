import { Injectable, EventEmitter,  } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot,
RouterStateSnapshot, CanDeactivate, Resolve } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { LoginService } from '../services/user.service';
import { User } from '../model/user.model';


@Injectable()
export class LogoutResolver implements Resolve<User> {

constructor(public ls: LoginService) {
}
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<User> | User {
      this.ls.currentUser$.next(this.ls.createInitUser());
      //this.ls.currentUser = this.ls.createInitUser();
      return null;
  }
}