import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface todo {
  userid: number;
  id: number;
  title: string;
  completed: string;
}

/**
 * post service.
 */
@Injectable()

export class PostService {
  constructor(private http: HttpClient) {}
  url = 'https://jsonplaceholder.typicode.com/todos/';
  getPostData(): Observable<todo[]> {
    return this.http.get<todo[]>(this.url);
  }
}