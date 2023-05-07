import { Action } from '@ngrx/store';

export enum ActionTypes {
  DataLoadBegin = '[Data] Catalog Data Load',
  DataLoadSuccess = '[Data] Catalog Data Load Success',
  DataLoadFailure = '[Data] Catalog Data Load Fail',
}
export class DataLoadBegin implements Action {
  readonly type = ActionTypes.DataLoadBegin;
}
export class DataLoadSuccess implements Action {
  readonly type = ActionTypes.DataLoadSuccess;
  constructor(public payload: { data: any }) {}
}
export class DataLoadFailure implements Action {
  readonly type = ActionTypes.DataLoadFailure;
  constructor(public payload: { error: any }) {}
}
export type ActionsUnion = DataLoadBegin | DataLoadSuccess | DataLoadFailure;
