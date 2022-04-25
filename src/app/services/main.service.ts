import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/other/dialog/dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dummy } from '../models/dummy';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  authUser(user: any) {
    let UserArray: Array<any> = [];
    if (localStorage.getItem('Users')) {
      UserArray = JSON.parse(localStorage.getItem('Users')!);
    }
    return UserArray.find(
      (p) => p.userName === user.userName && p.password === user.password
    );
  }

  //confirm delete
  openConfirmDialog() {
    return this.dialog.open(DialogComponent, {});
  }

  //table data service
  url = environment.demoUrl;

  getPostData(): Observable<dummy[]> {
    return this.http.get<dummy[]>(this.url);
  }
  deleteRow(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  //usertable service
  getData() {
    const dataArray = JSON.parse(localStorage.getItem('Users')!);
    return dataArray;
  }

  //duplicate error
  duplicateMail(email: any): boolean {
    const dataArray = JSON.parse(localStorage.getItem('Users')!);
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].email == email) {
        return true;
      }
    }
    return false;
  }

  //user service
  addUser(user: User) {
    let users: any[] = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users')!);
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
