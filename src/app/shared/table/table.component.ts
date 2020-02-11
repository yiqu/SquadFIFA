import { Component, OnInit, ViewChild, Input, OnChanges} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

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
  testColumns: string[] = ["title", "startDate", "completed"];

  constructor() {
  }

  ngOnChanges() {
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
  }

  ngOnInit() {
    if (this.data) { 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
