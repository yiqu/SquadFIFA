import { Component, OnInit, ViewChild, Input, OnChanges} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort, MatSortable} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { ISeason } from '../model/season.model';

export class DisplayColumnsData {
  constructor(public id: string, public display: string) {
  }
}

/**
 */
@Component({
  selector: 'app-shared-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})
export class SharedSimpleTableComponent implements OnInit, OnChanges {
  
  @Input()
  columns: DisplayColumnsData[];

  @Input()
  data: any;

  @ViewChild(MatPaginator) 
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = [];

  constructor() {
  }

  ngOnChanges() {
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
      // start paginator
      this.dataSource.paginator = this.paginator;
      // setting sort logic for nested objects
      this.dataSource.sortingDataAccessor = ((item, id) => this.createSortAccessor(item, id));
      // init sort
      this.dataSource.sort = this.sort;
      // create column IDs
      this.displayColumns = this.createColumnIds(this.columns);
      // set initial sort on load
      this.callInitSort();
    }
  }

  createSortAccessor(item: any, id: string) {
    switch(id) {
      case "player1": {
        return (<ISeason>item).player1.user.id;
      }
      case "player2": {
        return (<ISeason>item).player2.user.id;
      }
      case "lastEdited": {
        return (<ISeason>item).lastEdited.editor.user.id;
      }
      case "winner": {
        return (<ISeason>item).winner.user ? (<ISeason>item).winner.user.id : null;
      }
      default: {
        return item[id];
      }
    }
  }

  callInitSort() {
    let init: MatSortable = {disableClear: false ,id: "startDate", start: "desc"};
    this.sort.sort(init);
  }

  createColumnIds(columns: DisplayColumnsData[]) {
    return Array.from(columns, (column: DisplayColumnsData) => {
      return column.id;
    });
  }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onTableSort(sort: Sort) {
  }
}
