/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, fetchAPI, getCurrencies, getEdit, getExpenses } from '../actions';
import Table from './Table';
import triforce from '../images/triforce.png';
import addIcon from '../images/icon-add.png';
import logout from '../images/logout.png';
import Footer from '../components/Footer';

const alimentacao = 'Food';

class Wallet extends React.Component {
  state = {
    cambio: 'USD',
    valueinput: '',
    descriptioninput: '',
    pagamento: 'Dinheiro',
    pagamentocategories: alimentacao,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const response = await fetchAPI();
    dispatch(getCurrencies(Object.keys(response)));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  dispatchExpenses = async () => {
    const { cambio, valueinput, descriptioninput,
      pagamento, pagamentocategories } = this.state;
    const { dispatch } = this.props;
    const response = await fetchAPI();
    dispatch(getExpenses({ cambio,
      valueinput,
      descriptioninput,
      pagamento,
      pagamentocategories,
      response,
    }));
    this.setState({
      cambio: 'USD',
      valueinput: '',
      descriptioninput: '',
      pagamento: 'Dinheiro',
      pagamentocategories: alimentacao,
    });
  }

  dispatchEdit = async () => {
    const { cambio, valueinput, descriptioninput,
      pagamento, pagamentocategories } = this.state;
    const { dispatch } = this.props;
    dispatch(getEdit({ cambio,
      valueinput,
      descriptioninput,
      pagamento,
      pagamentocategories,
    }));
    this.setState({
      cambio: 'USD',
      valueinput: '',
      descriptioninput: '',
      pagamento: 'Dinheiro',
      pagamentocategories: alimentacao,
    });
  }

  somaTotal = () => {
    const { expenses } = this.props;
    const soma = expenses.reduce((acc, current) => {
      acc += (current.value) * current.exchangeRates[current.currency].ask;
      return acc;
    }, 0);
    return soma;
  }

  editItem = (e) => {
    const { expenses, dispatch } = this.props;
    const itemSelect = expenses.find((item) => item.id === Number(e.target.id));
    this.setState({
      cambio: itemSelect.currency,
      valueinput: itemSelect.value,
      descriptioninput: itemSelect.description,
      pagamento: itemSelect.method,
      pagamentocategories: itemSelect.tag,
    });
    dispatch(editExpense(itemSelect.id));
  }

  render() {
    const { email, currencies, editor, history } = this.props;
    const { cambio, valueinput,
      descriptioninput, pagamento,
      pagamentocategories } = this.state;
    return (
      <div className=" flex flex-col">
        <header className='flex justify-between'>
          <div className=' flex w-2/5 justify-start h-20'>
            <img
              src={ triforce }
              alt='triforce'
              className='mr-4 '
            />
            <p className='text-5xl self-center title text-login'>HYLIAN WALLET</p>
          </div>
          <div className='flex self-center w-1/3 justify-around'>

            <p data-testid="header-currency-field" className='text-white'>
              TOTAL:
              {' '}
              R$
              {' '}
              {parseFloat(this.somaTotal()).toFixed(2)}
            </p>
            <p data-testid="email-field" className='mr-4 text-white'>{ email }</p>
            <button
              type='button'
              className='button-form'
              onClick={ () => history.push('./') }
            >
              <img src={ logout } alt='logout' />
            </button>
          </div>
        </header>
        <form
          className='
          formInput rounded-b-lg
          flex justify-around items-center
        h-24'

        >
          <label htmlFor="valueinput" className='flex flex-col'>
            Cost:
            <input
              type="text"
              name="valueinput"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ valueinput }
              className='rounded-md p-1'
              placeholder='Type Here...'

            />
          </label>
          <label htmlFor="descriptioninput" className='flex flex-col'>
            Description:
            <input
              type="text"
              name="descriptioninput"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ descriptioninput }
              className='rounded-md p-1'
              placeholder='Type Here...'
              maxLength={ 20 }

            />
          </label>
          <label htmlFor="currencies" className='flex flex-col'>
            Currency:
            <select
              name="cambio"
              id="currencies"
              value={ cambio }
              onChange={ this.handleChange }
              className='rounded-md p-1 bg-white'

            >
              {currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>
                  {currencie}
                </option>))}
            </select>
          </label>
          <label htmlFor="pagamento" className='flex flex-col'>
            Payment:
            <select
              data-testid="method-input"
              id="pagamento"
              name="pagamento"
              onChange={ this.handleChange }
              value={ pagamento }
              className='rounded-md p-1 bg-white'

            >
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
            </select>
          </label>
          <label htmlFor="categories" className='flex flex-col'>
            Category:
            <select
              id="categories"
              data-testid="tag-input"
              name="pagamentocategories"
              onChange={ this.handleChange }
              value={ pagamentocategories }
              className='rounded-md p-1 bg-white'

            >
              <option>Food</option>
              <option>Wellness</option>
              <option>Work</option>
              <option>Transport</option>
              <option>Health</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ editor ? this.dispatchEdit : this.dispatchExpenses }
            className='button-form'
          >
            <img
              src={ addIcon }
              alt='Add-Icon'
            />
          </button>
        </form>
        <Table editItem={ this.editItem } />
        <Footer />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editor: PropTypes.bool.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps, null)(Wallet);
