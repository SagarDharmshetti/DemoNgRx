import * as model from './user.model';
import * as actions from './user.action';

const userInitialState = (function (): model.UserState {
  const state: model.UserState = {
    users: [],
  };
  return state;
})();

export function reducer(state = userInitialState, action: actions.Actions) {
  switch (action.type) {
    case actions.actionType.GET_USER_LIST_SUCCESS: {
      return Object.assign({}, state, { users: action.payload });
    }
    default: {
      return state;
    }
  }
}
