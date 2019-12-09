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

  // B-subj for all seasons info. Use this for all seasons information.
  public allSeasons$: BehaviorSubject<ISeason[]>;
  // Subj for making a call to backend for seasons, triggers allSeasons b-subj
  public fetchAllSeasons$: Subject<any> = new Subject();

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

  /**
   * Query to backend for all seasons
   */
  getSeasons(): Observable<ISeason[]> {
    return this.rs.getData(SEASON_PATH).pipe(
      map((res: HttpResponse<ISeason[]>) => {
        return this.normalizeSeasonResponse(res);
      })
    );
  }

  /**
   * Create a new season
   * @param season 
   */
  createNewSeason(season: ISeason): Observable<HttpResponse<any>> {
    return this.rs.postData(season, SEASON_PATH);
  }

  /**
   * Edit a existing season info.
   * @param season 
   * @param hash 
   */
  editSeason(season: ISeason, hash: string): Observable<HttpResponse<any>> {
    const seasonPath: string = "seasons/" + hash + ".json";
    return this.rs.putData(season, seasonPath);
  }

  /**
   * Normalize the seasons info reponse from the backend. Fill in any
   * missing info from defaults.
   * @param res 
   */
  normalizeSeasonResponse(res: HttpResponse<ISeason[]>): ISeason[] {
    let seasons: ISeason[] = [];
    if (res && res.ok && res.body) {
      seasons = UTILS.objectToArray(res.body);
      seasons = seasons.map((season, i) => {
        // create the Season object if the hashkey exists
        if (season.hashKey) {
          return new Season(season.hashKey, season.player1, season.player2, season.player1Record, season.player2Record,
            season.gamesTotal, season.owners, season.controllers, season.games, season.winner, season.startDate,
            season.endDate, season.pending, season.archived, season.completed, season.editing, season.lastEdited,
            season.title);
        }
      });
    }
    console.log("normialize: ", seasons)
    return seasons;
  }

  mobileQListener(e: MediaQueryListEvent) {
    if (e.matches) {
      /* the viewport is 600 pixels wide or less */
      this.isUserMobile = true;
    } else {
      /* the viewport is more than than 600 pixels wide */
      this.isUserMobile = false;
    }
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