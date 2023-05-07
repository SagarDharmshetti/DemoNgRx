import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  recovery(email: string): Observable<User> {
    return new Observable<User>((observer) => {
      setTimeout(() => {
        if (email !== 'Sagar@gmail.com') {
          observer.error({ message: 'User not found' });
          observer.next();
        } else {
          const user = new User();
          user.email = email;
          observer.next(user);
        }
        observer.complete();
      }, 2000);
    });
  }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>((observer) => {
      setTimeout(() => {
        if (email !== 'Sagar@gmail.com') {
          observer.error({ message: 'User not found' });
          observer.next();
        } else {
          const user = new User();
          user.email = email;
          observer.next(user);
        }
        observer.complete();
      }, 2000);
    });
  }
}
