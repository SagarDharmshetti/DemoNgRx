import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  userDataSource: BehaviorSubject<any> = new BehaviorSubject([]);

  // path:string = ".\assets\Users\userlist.json"

  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get('./assets/Users/userlist.json');
  }

  getUserObs(): Observable<any> {
    return this.userDataSource.asObservable();
  }

  setUserObs(userData: any) {
    this.userDataSource.next(userData);
  }

  loadData() {
    return this.http.get('./assets/Users/text-data.json');
  }
}
