export const TOKEN_NUMBER = 'TOKEN_NUMBER';
export const ACTION_LOGIN_SUCCESS = 'ACTION_LOGIN_SUCCESS';
export const ERROR_ACTION = 'ERROR_ACTION';
export const FETCHING_START = 'FETCHING_START';
export const SUCCESS = 'SUCCESS';

export const fetchingStart = () => ({

  type: FETCHING_START,
});

export const success = () => ({

  type: SUCCESS,
});
export const tokenNumber = (payload) => ({

  type: TOKEN_NUMBER,
  payload,
});

export const actionLoginSuccess = (payload) => ({
  type: ACTION_LOGIN_SUCCESS,
  payload,

});

export const errorAction = (payload) => ({

  type: ERROR_ACTION,
  payload,
});
