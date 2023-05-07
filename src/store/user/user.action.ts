import { Action, createAction } from '@ngrx/store';
import * as model from './user.model';

export const actionType = {
  GET_USER_LIST: '[User] Get User List',
  GET_USER_LIST_SUCCESS: '[User] Get User List success',
  GET_USER_LIST_FAIL: '[User] Get User List fail',
};

export class GetUserListAction implements Action {
  public readonly type = actionType.GET_USER_LIST;
  constructor(public payload: string) {}
}
export class GetUserListActionSuccess implements Action {
  public readonly type = actionType.GET_USER_LIST_SUCCESS;
  constructor(public payload: model.User[]) {}
}
export class GetUserListActionFail implements Action {
  public readonly type = actionType.GET_USER_LIST_FAIL;
  constructor(public payload: any) {}
}
export type Actions =
  | GetUserListAction
  | GetUserListActionFail
  | GetUserListActionSuccess;
