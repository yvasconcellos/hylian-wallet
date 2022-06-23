import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  state = {
    despesa: 0,
    cambio: 'BRL',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { email, currencies } = this.props;
    const { despesa, cambio } = this.state;
    return (
      <>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ despesa }</p>
          <p data-testid="header-currency-field">{ cambio }</p>
        </header>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input type="text" name="value-input" data-testid="value-input" />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input type="text" name="description-input" data-testid="description-input" />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select name="currencies" id="currencies">
              {currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>
                  {currencie}
                </option>))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Pagamento:
            <select data-testid="method-input" id="pagamento">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categories">
            Categoria:
            <select id="categories" data-testid="tag-input" name="pagamentocategories">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(Wallet);
