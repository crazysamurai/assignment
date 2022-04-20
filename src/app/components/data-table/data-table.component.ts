import { Component, ViewChild } from '@angular/core';
import { PostService } from 'src/app/table-data.service';
import { todo } from 'src/app/table-data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-data-table',
  styleUrls: ['./data-table.component.scss'],
  templateUrl: './data-table.component.html',
})
export class dataTable {
  // data: todo[] = [];
  data: any;
  columnsToDisplay: [string, string] = ['id', 'title'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  posts = {};

  constructor(private post: PostService) {
    this.post.getPostData().subscribe((x) => {
      console.warn(x);
      this.data = x;

      this.data = new MatTableDataSource<todo>(x);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
    });
  }
}