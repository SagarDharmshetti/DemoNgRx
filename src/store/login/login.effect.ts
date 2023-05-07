import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetUserService } from 'src/app/services/userService/get-user.service';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPasswordFail,
  recoverPasswordSuccess,
  recoverPassword,
} from './login.action';

@Injectable()
export class LoginEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService // private getUserService: GetUserService
  ) {}

  // recoverPassword$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(recoverPassword),
  //     switchMap((payload: { email: string; password: string }) =>
  //       this.authService.recovery(payload.email, payload.password).pipe(
  //         map((user) => recoverPasswordSuccess({ user })),
  //         catchError((error) => of(recoverPasswordFail({ error })))
  //       )
  //     )
  //   )
  // );

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      switchMap((payload: { email: string; password: string }) =>
        this.authService.login(payload.email, payload.password).pipe(
          map((user) =>
            loginSuccess({
              user,
              password: new User(),
            })
          ),
          catchError((error) => of(loginFail({ error })))
        )
      )
    )
  );
}
