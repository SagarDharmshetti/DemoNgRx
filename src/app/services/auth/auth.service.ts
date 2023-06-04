import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth,
    public router: Router,) {}

  recovery(email: string): Observable<User> {
    return new Observable<User>((observer) => {
      this.auth.sendPasswordResetEmail(email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.next(error);
        observer.complete();
      })
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
