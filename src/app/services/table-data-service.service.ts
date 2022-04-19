import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { IData } from '../fetchedData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  constructor(private http:HttpClient) { }
  url = 'https://jsonplaceholder.typicode.com/todos'
  
  tableData(): Observable<IData[]>{
    console.log(this.http.get<IData[]>(this.url))
    return this.http.get<IData[]>(this.url)
  }
}
