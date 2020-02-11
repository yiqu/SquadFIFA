import { Component, OnInit, OnDestroy } from '@angular/core';
import { DisplayColumnsData } from '../shared/table/table.component';
import { CoreService } from '../shared/services/core.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ISeason } from '../shared/model/season.model';

@Component({
  selector: 'app-archives',
  templateUrl: 'archives.component.html',
  styleUrls: ['./archives.component.css']
})

export class ArchivesComponent implements OnInit, OnDestroy {

  tableColumns: DisplayColumnsData[] = [];
  tableData: any;
  compDestoryed$: Subject<any> = new Subject<any>();
  seasonData: ISeason[];

  constructor(public cs: CoreService) {
    this.cs.allSeasons$.pipe(
      takeUntil(this.compDestoryed$)
    ).subscribe(
      (res: ISeason[]) => {
        this.createTableData(res);
        this.seasonData = res;
      }
    )
  }

  ngOnInit() {
    this.cs.fetchAllSeasons$.next();
  }

  ngOnDestroy() {
    this.compDestoryed$.next();
  }


  createTableData(seasons: ISeason[]) {
    this.tableColumns = [];
    this.tableColumns.push(
      new DisplayColumnsData("title", "Title"),
      new DisplayColumnsData("startDate", "Start Date"),
      new DisplayColumnsData("gamesTotal", "Games Total"),
      new DisplayColumnsData("completed", "Completed"),
    )

    this.tableData = seasons;
  }
}