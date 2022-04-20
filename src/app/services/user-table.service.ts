import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserTableService {
  getData() {
    const dataArray: any = localStorage.getItem('Users')!;
    return dataArray;
  }
}
