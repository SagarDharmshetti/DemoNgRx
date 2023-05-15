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
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
        this.auth.signInWithEmailAndPassword(email, password).then((firebaseUser: firebase.default.auth.UserCredential) => {
          observer.next({email, uid: firebaseUser?.user?.uid || ""});
          setTimeout(() => {
            this.router.navigate(['logged-in']);
            observer.complete();
          }, 2000);
        }).catch (error => {
          observer.error(error);
          observer.complete();
        })
      })
    })
  }
}
