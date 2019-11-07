import { Injectable } from '@angular/core';
import { CrudRestServie } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { delay, map, timeout, retry, retryWhen, delayWhen, tap, 
  take, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ISeason, Season } from '../model/season.model';


const SEASON_PATH: string = "seasons.json";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  allSeasons$: BehaviorSubject<ISeason[]>;
  fetchAllSeasons$: Subject<any> = new Subject();
  allSeasonsLoading: boolean = false;

  constructor(public rs: CrudRestServie) {
    this.allSeasons$ = new BehaviorSubject<ISeason[]>(null);

    this.fetchAllSeasons$.pipe(
      switchMap((res) => {
        this.allSeasonsLoading = true;
        return this.getSeasons();
      })
    )
    .subscribe(
      (resultSeasons: ISeason[]) => {
        this.allSeasonsLoading = false;
        this.allSeasons$.next(resultSeasons);
        console.log(resultSeasons);
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

  //https://kq-1-1a499.firebaseio.com/fifa/seasons/-Lt2zkD1WwVfzv5xxKVr.json
  editSeason(season: ISeason, hash: string): Observable<HttpResponse<any>> {
    const seasonPath: string = "seasons/" + hash + ".json";
    return this.rs.putData(season, seasonPath);
  }

  normalizeSeasonResponse(res: HttpResponse<ISeason[]>): ISeason[] {
    let result: ISeason[] = [];
    console.log(res.body)
    if (res && res.ok && res.body) {

    }
    return result;
  }
}