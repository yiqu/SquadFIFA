import { Injectable, EventEmitter,  } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot,
RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable, of,  } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class AdminAuthGuard implements CanActivate {

constructor() {
}

canActivate(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | boolean {
    return of("KEVIN").pipe(
      delay(2000),
      map((val)=> {
        console.log(val);
        return true;
      })
    )
}
}