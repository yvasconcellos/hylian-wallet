import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, getCurrencies, getExpenses } from '../actions';
import Table from './Table';

const alimentacao = 'Alimentação';

class Wallet extends React.Component {
  state = {
    cambio: 'USD',
    valueinput: 0,
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
      valueinput: 0,
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

  render() {
    const { email, currencies } = this.props;
    const { cambio, valueinput,
      descriptioninput, pagamento,
      pagamentocategories } = this.state;
    return (
      <>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{parseFloat(this.somaTotal()).toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="valueinput">
            Valor:
            <input
              type="text"
              name="valueinput"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ valueinput }
            />
          </label>
          <label htmlFor="descriptioninput">
            Descrição:
            <input
              type="text"
              name="descriptioninput"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ descriptioninput }
            />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select
              name="cambio"
              id="currencies"
              value={ cambio }
              onChange={ this.handleChange }
            >
              {currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>
                  {currencie}
                </option>))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Pagamento:
            <select
              data-testid="method-input"
              id="pagamento"
              name="pagamento"
              onChange={ this.handleChange }
              value={ pagamento }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categories">
            Categoria:
            <select
              id="categories"
              data-testid="tag-input"
              name="pagamentocategories"
              onChange={ this.handleChange }
              value={ pagamentocategories }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.dispatchExpenses }>
            Adicionar despesa
          </button>
        </form>
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Wallet);
