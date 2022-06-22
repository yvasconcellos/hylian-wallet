// Esse reducer será responsável por tratar as informações da pessoa usuária
const INNITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

function user(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_EMAIL':
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
