import { Action, createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user/User';
// import { Users} from '../user/user.model'

export const recoverPassword = createAction(
  '[Recover Password]',
  props<{ email: string; password: string }>()
);

export const recoverPasswordSuccess = createAction(
  '[Recover Password] success',
  props<{ user: User }>()
);

export const recoverPasswordFail = createAction(
  '[Recover Password] fail',
  props<{ error: any }>()
);

export const login = createAction(
  '[Login]',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] success',
  props<{ user: User; password: User }>()
);

export const loginFail = createAction('[Login] fail', props<{ error: any }>());

// export const getUserList = createAction('[Get User List]')

// export const getUserListSuccess = createAction(
//   '[Recover Password] success',
//   props<{ user: Users }>()
// );

// export const getUserListFail = createAction(
//   '[Recover Password] fail',
//   props<{ error: any }>()
// );
