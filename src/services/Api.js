import { tokenNumber, fetchingStart, success } from '../redux/actions/index';

export const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

export const tokenEndpoint = () => async (dispatch) => {
  dispatch(fetchingStart);
  const url = await (await fetch(ENDPOINT)).json();
  localStorage.setItem('token', url.token);
  dispatch(tokenNumber(url.token));
  dispatch(success());
};
