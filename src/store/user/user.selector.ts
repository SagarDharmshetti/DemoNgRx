import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as model from './user.model';

export const getUserState = createFeatureSelector<model.UserState>('user');
export const getUserList = createSelector(
  getUserState,
  (state: model.UserState): model.User[] => state.users
);
