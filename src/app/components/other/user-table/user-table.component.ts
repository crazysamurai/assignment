import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  data: User;
  headers = [
    'firstName',
    'lastName',
    'email',
    'gender',
    'college',
    'dob',
    'website',
    'strength_A',
    'strength_B',
    'remove',
  ];
  // columnsToDisplay: [
  //   string,
  //   string,
  //   string,
  //   string,
  //   string,
  //   string,
  //   string,
  //   string,
  //   string,
  //   string,
  // ] = [
  //   'firstName',
  //   'lastName',
  //   'email',
  //   'gender',
  //   'college',
  //   'dob',
  //   'website',
  //   'strength_A',
  //   'strength_B',
  //   'remove',
  // ]
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  columns = [
    {
      columnDef: 'image',
      header: 'Profile picture',
      cell: (userData: User) => `${userData.image}`,
    },
    {
      columnDef: 'firstName',
      header: 'First Name',
      cell: (userData: User) => `${userData.firstName}`,
    },
    {
      columnDef: 'lastName',
      header: 'Last Name',
      cell: (userData: User) => `${userData.lastName}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (userData: User) => `${userData.email}`,
    },
    {
      columnDef: 'website',
      header: 'Website',
      cell: (userData: User) => `${userData.website}`,
    },
    {
      columnDef: 'college',
      header: 'College',
      cell: (userData: User) => `${userData.college}`,
    },
    {
      columnDef: 'strength_A',
      header: 'Strength_A',
      cell: (userData: User) => `${userData.strength_A}`,
    },
    {
      columnDef: 'strength_B',
      header: 'Strength_B',
      cell: (userData: User) => `${userData.strength_B}`,
    },
    {
      columnDef: 'gender',
      header: 'Gender',
      cell: (userData: User) => `${userData.gender}`,
    },
    {
      columnDef: 'dob',
      header: 'Date of Birth',
      cell: (userData: User) => `${userData.dob}`,
    },
    {
      columnDef: 'about',
      header: 'About',
      cell: (userData: User) => `${userData.about}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef).concat(['remove']);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private mainService: MainService) {}

  dataArray: any[] = [];
  ngOnInit() {
    this.dataArray = this.mainService.getData();
  }

  deleteUser(item_email: string) {
    this.mainService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          for (let i = 0; i < this.dataArray.length; i++) {
            if (this.dataArray[i].email == item_email) {
              this.dataArray.splice(i, 1);
              localStorage.removeItem('users');
              localStorage.setItem('Users', JSON.stringify(this.dataArray));
              this.ngOnInit();
            }
          }
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
