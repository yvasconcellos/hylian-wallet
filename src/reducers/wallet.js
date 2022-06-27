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
    return { ...state, currencies: action.payload };
  case 'GET_EXPENSES':
    return { ...state,
      expenses: [...state.expenses, {
        id: (state.expenses.length > 0)
          ? state.expenses[state.expenses.length - 1].id + 1 : 0,
        value: action.payload.valueinput,
        description: action.payload.descriptioninput,
        currency: action.payload.cambio,
        method: action.payload.pagamento,
        tag: action.payload.pagamentocategories,
        exchangeRates: action.payload.response,
      }] };
  case 'REMOVE_EXPENSE':
    return { ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== Number(action.payload)) };
  default:
    return state;
  }
};

export default wallet;
