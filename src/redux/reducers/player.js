import { ACTION_LOGIN_SUCCESS, SUCCESS, FETCHING_START } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  isLoading: false,

};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTION_LOGIN_SUCCESS:
    return {
      ...state,
      ...action.payload,
    };
  case SUCCESS:
    return {
      ...state, isLoading: false,
    };

  case FETCHING_START:
    return {
      ...state, isLoading: true,
    };
  default:
    return state;
  }
}

export default player;
