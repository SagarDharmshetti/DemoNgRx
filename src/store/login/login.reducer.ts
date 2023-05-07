import { AppInitialState } from './../AppInitialState';
import {
  recoverPassword,
  recoverPasswordSuccess,
  recoverPasswordFail,
} from './login.action';
// import { login } from 'src/store/login/login.action';
import { createReducer, on } from '@ngrx/store';
import { login, loginFail, loginSuccess } from './login.action';
import { LoginState } from './loginState';

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(
  initialState,

  on(login, (currentState) => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    };
  }),

  on(loginSuccess, (currentState) => {
    return {
      ...currentState,
      isLoggedIn: true,
      isLoggingIn: false,
    };
  }),

  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false,
    };
  }),

  on(recoverPassword, (currentSatate) => {
    return {
      ...currentSatate,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),

  on(recoverPasswordSuccess, (currentSatate) => {
    return {
      ...currentSatate,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),

  on(recoverPasswordFail, (currentSatate, action) => {
    return {
      ...currentSatate,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    };
  })
);

export function loginReducer(state: LoginState, action: any) {
  return reducer(state, action);
}
