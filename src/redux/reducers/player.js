import { USERS_INFO_SAVED, ACESS_REQUEST, UPDATE_SCORE,
  ASSERTIONS_NUMBER } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
  token: '',
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
  case ASSERTIONS_NUMBER:
    return {
      ...state,
      assertions: state.assertions + action.assertions,
    };

    // Sem o FetchStart
  default:
    return state;
  }
}

export default player;
