// Coloque aqui suas actions
const saveUserEmail = (email) => ({ type: 'USER_EMAIL', payload: email });

const getCurrences = (currencie) => ({ type: 'GET_CURRENCIE', payload: currencie });

export default (saveUserEmail, getCurrences);
