// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INNITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCIE':
    return { ...state, currencies: [action.payload] };
  default:
    return state;
  }
};

export default wallet;
