import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CrudRestServie } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { delay, map, timeout, retry, retryWhen, delayWhen, tap, 
  take, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ISeason, Season } from '../model/season.model';
import * as UTILS from '../../shared/utils/general-utils';


const SEASON_PATH: string = "seasons.json";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  allSeasons$: BehaviorSubject<ISeason[]>;
  fetchAllSeasons$: Subject<any> = new Subject();
  allSeasonsLoading: boolean = false;
  isUserMobile: boolean = false;
  mobileQuery: MediaQueryList;

  constructor(public rs: CrudRestServie, public media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener((e) => this.mobileQListener(e));
    this.initMobileCheck();

    this.allSeasons$ = new BehaviorSubject<ISeason[]>(null);

    this.fetchAllSeasons$.pipe(
      switchMap((res) => {
        this.allSeasonsLoading = true;
        return this.getSeasons();
      })
    ).subscribe(
      (resultSeasons: ISeason[]) => {
        this.allSeasonsLoading = false;
        this.allSeasons$.next(resultSeasons);
      },
      (err) => {
        this.allSeasonsLoading = false;
      },
      () => {
        console.log("fetch all done");
      }
    );
  }

  getSeasons(): Observable<ISeason[]> {
    return this.rs.getData(SEASON_PATH).pipe(
      map((res: HttpResponse<ISeason[]>) => {
        return this.normalizeSeasonResponse(res);
      })
    );
  }

  createNewSeason(season: ISeason): Observable<HttpResponse<any>> {
    return this.rs.postData(season, SEASON_PATH);
  }

  editSeason(season: ISeason, hash: string): Observable<HttpResponse<any>> {
    const seasonPath: string = "seasons/" + hash + ".json";
    return this.rs.putData(season, seasonPath);
  }

  normalizeSeasonResponse(res: HttpResponse<ISeason[]>): ISeason[] {
    if (res && res.ok && res.body) {
      return UTILS.objectToArray(res.body);
    }
    return [];
  }

  mobileQListener(e: MediaQueryListEvent) {
    if (e.matches) {
      /* the viewport is 600 pixels wide or less */
      this.isUserMobile = true;
    } else {
      /* the viewport is more than than 600 pixels wide */
      this.isUserMobile = false;
    }
    //this.changeDetectorRef.detectChanges();
  }

  initMobileCheck() {
    if (window.matchMedia("(max-width: 600px)").matches) {
      /* The viewport is less than, or equal to, 600 pixels wide */
      this.isUserMobile = true;
    } else {
      /* The viewport is greater than 700 pixels wide */
      this.isUserMobile = false;
    }
  }
}