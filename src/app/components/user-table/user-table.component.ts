import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { UserTableService } from 'src/app/services/user-table.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  data: User;
  columnsToDisplay: [string, string, string, string] = [
    'firstName',
    'lastName',
    'email',
    'website',
  ];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  posts = {};

  constructor(private userData: UserTableService) {
    // this.post.getPostData().subscribe((x) => {
    //   console.warn(x);
    //   this.data = x;
    //   this.data = new MatTableDataSource<todo>(x);
    //   this.data.sort = this.sort;
    //   this.data.paginator = this.paginator;
    // });
  }
  public dataArray: string[] = [];
  ngOnInit() {
    this.dataArray = this.userData.getData();
    console.log(this.dataArray);
  }
}
