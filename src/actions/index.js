// Coloque aqui suas actions
const saveUserEmail = (email) => ({ type: 'USER_EMAIL', payload: email });

export const getCurrencies = (currencie) => (
  { type: 'GET_CURRENCIE', payload: currencie });

export const getExpenses = (expense) => (
  { type: 'GET_EXPENSES', payload: expense }
);

export const removeExpense = (expense) => (
  { type: 'REMOVE_EXPENSE', payload: expense }
);

export const fetchAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  delete result.USDT;
  return result;
};

export default saveUserEmail;
