import { Component, ViewChild } from '@angular/core';
import { PostService } from 'src/app/table-data.service';
import { todo } from 'src/app/table-data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OnInit } from '@angular/core';
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-data-table',
  styleUrls: ['./data-table.component.scss'],
  templateUrl: './data-table.component.html',
})
export class dataTable implements OnInit {
  data: any = [];

  columnsToDisplay: [string, string, string, string, string] = [
    'id',
    'userId',
    'title',
    'completed',
    'remove',
  ];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  posts = {};

  constructor(private post: PostService) {}

  ngOnInit() {
    this.post.getPostData().subscribe((x) => {
      console.warn(x);
      this.data = x;
      this.data = new MatTableDataSource<todo>(x);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
    });
  }

  deleteRow(item_id: any) {
    this.post.deleteRow(item_id).subscribe((result) => {
      this.ngOnInit();
    });
  }
}
