import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as model from './user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class UserDataService {
  url = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  getUserList(): Observable<model.User[]> {
    return this.http.get(this.url + '/users').pipe(
      map((rep) => {
        const response: any = rep || {};
        if (response.status) {
          throw {};
        } else {
          return <model.User[]>rep;
        }
      })
    );
  }
}
