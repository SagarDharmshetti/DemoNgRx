import { User } from 'src/app/model/user/User';
import { AppState } from 'src/store/AppState';

export const AppInitialState: AppState = {
  loading: {
    show: false,
  },

  login: {
    error: null,
    isLoggedIn: false,
    isLoggingIn: false,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
  },
};
