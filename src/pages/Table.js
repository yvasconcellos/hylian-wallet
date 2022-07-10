import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';
import remove from '../images/delete.png';
import edit from '../images/edit.png';

class Table extends React.Component {
  removeItem = (e) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(e.target.id));
  }

  render() {
    const cabecalho = [
      'Description',
      'Category',
      'Payment',
      'Count', 'Currency', 'Exchange',
      'Value', 'Local Currency', '',
    ];
    const { expenses, editItem, editor } = this.props;
    return (
      <table className="table-auto">
        <tbody>
          <tr className="flex justify-around my-2 ">
            {cabecalho.map((item) => (
              <th
                key={ item }
                className="w-1/12 text-center self-center"
              >
                {item}
              </th>))}
          </tr>
          <hr className="w-screen mb-2" />
          {expenses.map((expense) => (
            <tr key={ expense.id } className="flex justify-around my-1">
              <td className="w-1/12 text-center text-sm">{expense.description}</td>
              <td className="w-1/12 text-center text-sm">{expense.tag}</td>
              <td className="w-1/12 text-center text-sm">{expense.method}</td>
              <td className="w-1/12 text-center text-sm">
                {Number(expense.value).toFixed(2)}
              </td>
              <td className="w-1/12 text-center text-sm">
                {(
                  expense.exchangeRates[expense.currency].name)
                  .replace('/Real Brasileiro', '')}
              </td>
              <td className="w-1/12 text-center text-sm">
                {parseFloat(
                  expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td className="w-1/12 text-center text-sm">
                {parseFloat(
                  expense.exchangeRates[expense.currency].ask
                * expense.value,
                ).toFixed(2)}
              </td>
              <td className="w-1/12 text-center text-sm">Real</td>

              <td className="w-1/12 text-center text-sm">
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ editItem }
                  disabled={ editor }
                >
                  <img
                    src={ edit }
                    alt="Edit"
                    id={ expense.id }
                    className="w-5"
                  />
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.removeItem }
                  disabled={ editor }
                >
                  <img
                    src={ remove }
                    alt="Remove"
                    id={ expense.id }
                    className="w-5"
                  />
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps, null)(Table);
