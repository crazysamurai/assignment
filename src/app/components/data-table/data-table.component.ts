import { Component, ViewChild } from '@angular/core';
import { PostService } from 'src/app/table-data.service';
import { todo } from 'src/app/table-data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-data-table',
  styleUrls: ['./data-table.component.scss'],
  templateUrl: './data-table.component.html',
})
export class dataTable {
  data: todo[] = [];
  columnsToDisplay = ['id', 'title'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  constructor(private post: PostService) {}
  posts = {};
  ngOnInit() {
    this.post.getPostData().subscribe((x) => {
      console.warn(x);
      this.data = x;
      this.dataSource.sort = this.sort;
    });
  }
  @ViewChild(MatSort) sort: MatSort;
}
