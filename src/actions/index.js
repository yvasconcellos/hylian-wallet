// Coloque aqui suas actions
const saveUserEmail = (email) => ({ type: 'USER_EMAIL', payload: email });

export const getCurrencies = (currencie) => (
  { type: 'GET_CURRENCIE', payload: currencie });

export const fetchAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  delete result.USDT;
  const arrayCurrencies = Object.keys(result);
  return dispatch(getCurrencies(arrayCurrencies));
};

export default saveUserEmail;
