export const ACESS_REQUEST = 'ACESS_REQUEST';
export const USERS_INFO_SAVED = 'USERS_INFO_SAVED';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const actionHandled = (action, payload) => ({
  type: action,
  payload,
});

export const acessUserRequest = () => async (dispatch) => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  localStorage.setItem('token', data.token);
  dispatch(actionHandled(ACESS_REQUEST, data.token));
};
