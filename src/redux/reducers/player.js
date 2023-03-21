import { ACTION_LOGIN_SUCCESS, SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  // isLoading: false,
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
      ...state, // sem o isLoading
    };

    // Sem o FetchStart
  default:
    return state;
  }
}

export default player;
