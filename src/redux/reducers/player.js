import { USERS_INFO_SAVED, ACESS_REQUEST, UPDATE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: '',
  score: 0,
  token: '',
  // isLoading: false,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USERS_INFO_SAVED:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case ACESS_REQUEST:
    return {
      ...state,
      token: action.payload, // sem o isLoading
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };

    // Sem o FetchStart
  default:
    return state;
  }
}

export default player;
