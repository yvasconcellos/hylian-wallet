import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  state = {
    despesa: 0,
    cambio: 'BRL',
  }

  render() {
    const { email } = this.props;
    const { despesa, cambio } = this.state;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ despesa }</p>
        <p data-testid="header-currency-field">{ cambio }</p>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
