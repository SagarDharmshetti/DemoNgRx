import { LoginState } from './login/loginState';
import { LoadingState } from './loading/loadingState';

export interface AppState {
  loading: LoadingState;
  login: LoginState;
}
