import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'dbs-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit, AfterViewInit{

  @Input() pageSizeOptions;
  @Input() filterItems;
  @Input() columns;
  @Input() displayedColumns;
  @Input() items;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }


  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.items);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterKey: string, filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
