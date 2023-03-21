export const TOKEN_NUMBER = 'TOKEN_NUMBER';
export const ACTION_LOGIN_SUCCESS = 'ACTION_LOGIN_SUCCESS';
export const ERROR_ACTION = 'ERROR_ACTION';
export const SUCCESS = 'SUCCESS';
export const QUESTIONS_RECEIVED = 'QUESTIONS_RECEIVED';
export const FETCHING_QUESTIONS = 'FETCHING_QUESTIONS';

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

export const questionsReceived = (questions) => ({

  type: QUESTIONS_RECEIVED,
  payload: { questions },
});

export const fetchingQuestions = () => ({

  type: FETCHING_QUESTIONS,
});

export const errorAction = (payload) => ({

  type: ERROR_ACTION,
  payload,
});
