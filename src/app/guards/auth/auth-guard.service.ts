import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/AppState';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private store: Store<AppState>, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap((loginState) => {
        if (loginState.isLoggedIn) {
          return of(true);
        }
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }
}
