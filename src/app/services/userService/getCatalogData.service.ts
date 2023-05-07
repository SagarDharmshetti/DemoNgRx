import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  AppState,
  getDataState,
  getAllProducts,
} from 'src/store/userData/reducers';
import * as ProductDataActions from '../../../store/userData/actions/getCatalogData.action';

@Injectable({
  providedIn: 'root',
})
export class getCatalogDataService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  productURL: string = 'http://localhost:3000/productsitems';

  getProductData() {
    return this.http.get(this.productURL);
  }

  loadProducts() {
    return this.store.dispatch(new ProductDataActions.DataLoadBegin());
  }

  getData() {
    return this.store.select(getDataState);
  }

  getProduct() {
    return this.store.select(getAllProducts);
  }

  // loadData() {
  //   return this.http.get(this.baseURL);
  // }
  // load() {
  //   this.store.dispatch(new DataActions.LoadDataBegin());
  // }
  // getData() {
  //   return this.store.select(getDataState);
  // }
  // getItems() {
  //   return this.store.select(getAllItems);
  // }
}
