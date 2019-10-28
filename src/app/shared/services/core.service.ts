import { Injectable } from '@angular/core';
import { CrudRestServie } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(public rs: CrudRestServie) {

  }

  getSeasons(): Observable<ISeason[]> {
    return this.rs.getData(SEASON_PATH).pipe(
      map((res: HttpResponse<ISeason[]>) => {
        return this.normalizeSeasonResponse(res);
      })
    );
  }

  normalizeSeasonResponse(res: HttpResponse<ISeason[]>): ISeason[] {
    let result: ISeason[] = [];
    console.log(res)

    return result;
  }
}