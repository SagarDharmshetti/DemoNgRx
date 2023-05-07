import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as DataActions from '../actions/data.actions';
import { AppState, getAllItems, getDataState } from '../reducers';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}

  baseURL: string = 'http://localhost:3000/usersList';

  loadData() {
    return this.http.get(this.baseURL);
  }
  load() {
    this.store.dispatch(new DataActions.LoadDataBegin());
  }
  getData() {
    return this.store.select(getDataState);
  }
  getItems() {
    return this.store.select(getAllItems);
  }
}
