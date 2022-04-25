import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OnInit } from '@angular/core';
import { dummy } from 'src/app/models/dummy';
import { User } from 'src/app/models/user';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-data-table',
  styleUrls: ['./data-table.component.scss'],
  templateUrl: './data-table.component.html',
})
export class dataTable implements OnInit {
  dummyData: any = [];
  dataArray: any = [];
  data: User;

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (dummyData: dummy) => `${dummyData.id}`,
    },
    {
      columnDef: 'userId',
      header: 'User ID',
      cell: (dummyData: dummy) => `${dummyData.userId}`,
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (dummyData: dummy) => `${dummyData.title}`,
    },
    {
      columnDef: 'completed',
      header: 'Completed',
      cell: (dummyData: dummy) => `${dummyData.completed}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef).concat(['remove']);

  // userColumns = [
  //   {
  //     columnDef: 'image',
  //     header: 'Profile picture',
  //     cell: (userData: User) => `${userData.image}`,
  //   },
  //   {
  //     columnDef: 'firstName',
  //     header: 'First Name',
  //     cell: (userData: User) => `${userData.firstName}`,
  //   },
  //   {
  //     columnDef: 'lastName',
  //     header: 'Last Name',
  //     cell: (userData: User) => `${userData.lastName}`,
  //   },
  //   {
  //     columnDef: 'email',
  //     header: 'Email',
  //     cell: (userData: User) => `${userData.email}`,
  //   },
  //   {
  //     columnDef: 'website',
  //     header: 'Website',
  //     cell: (userData: User) => `${userData.website}`,
  //   },
  //   {
  //     columnDef: 'college',
  //     header: 'College',
  //     cell: (userData: User) => `${userData.college}`,
  //   },
  //   {
  //     columnDef: 'strength_A',
  //     header: 'Strength_A',
  //     cell: (userData: User) => `${userData.strength_A}`,
  //   },
  //   {
  //     columnDef: 'strength_B',
  //     header: 'Strength_B',
  //     cell: (userData: User) => `${userData.strength_B}`,
  //   },
  //   {
  //     columnDef: 'gender',
  //     header: 'Gender',
  //     cell: (userData: User) => `${userData.gender}`,
  //   },
  //   {
  //     columnDef: 'dob',
  //     header: 'Date of Birth',
  //     cell: (userData: User) => `${userData.dob}`,
  //   },
  //   {
  //     columnDef: 'about',
  //     header: 'About',
  //     cell: (userData: User) => `${userData.about}`,
  //   },
  // ];
  // displayedUserColumns = this.userColumns
  //   .map((c) => c.columnDef)
  //   .concat(['remove']);

  // dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    // private mainService: PostService,
    // private mainService: DeleteService,
    // private mainService: UserTableService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.dataArray = this.mainService.getData();
    this.dataArray.sort = this.sort;
    this.dataArray.paginator = this.paginator;

    this.mainService.getPostData().subscribe((x) => {
      this.dummyData = x;
      this.dummyData = new MatTableDataSource<dummy>(x);
      this.dummyData.sort = this.sort;
      this.dummyData.paginator = this.paginator;
    });
  }

  deleteItem(item_id: any) {
    this.mainService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.mainService.deleteRow(item_id).subscribe((result) => {
            this.ngOnInit();
          });
        }
      });
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
    this.dummyData.filter = filterValue.trim().toLowerCase();
    // this.dataArray.filter = filterValue.trim().toLowerCase();
  }

  // tabKey: any = [];
  // tabValue: any = [];
  // getData() {
  //   this.dataArray.forEach((element) => {
  //     this.tabKey = Object.keys(element);
  //     this.tabValue.push(Object.values(element));
  //   });
  //   console.log(this.tabValue);
  // }
}

// this.dataArray = this.userData.getData();
// this.dataArray.sort = this.sort;
// this.dataArray.paginator = this.paginator;
