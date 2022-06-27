import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const cabecalho = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    const { expenses } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            {cabecalho.map((item) => (
              <th key={ item }>
                {item}
              </th>))}
          </tr>
          {expenses.map((expense, index) => (
            <tr key={ index }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>
                {(
                  expense.exchangeRates[expense.currency].name)
                  .replace('/Real Brasileiro', '')}
              </td>
              <td>
                {parseFloat(
                  expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td>
                {parseFloat(
                  expense.exchangeRates[expense.currency].ask
                * expense.value,
                ).toFixed(2)}
              </td>
              <td>Real</td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);
