import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import saveUserEmail from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledButton: true,
    redirect: false,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.ableBtn);
  }

  ableBtn = () => {
    const { email, password } = this.state;
    const lengthMin = 5;
    const mailformat = /\S+@\S+\.\S+/;
    if (password.length > lengthMin && email.match(mailformat)) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  redirectWallet = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { submitEmail } = this.props;
    const { email, disabledButton, redirect } = this.state;

    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="text"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            name="password"
            type="password"
            data-testid="password-input"
            minLength={ 6 }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ disabledButton }
          type="button"
          onClick={ () => { submitEmail(email); this.redirectWallet(); } }
        >
          Entrar
        </button>
        { redirect && <Redirect to="/carteira" /> }
      </form>
    );
  }
}

Login.propTypes = {
  submitEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (value) => {
    dispatch(saveUserEmail(value));
  },
});

export default connect(null, mapDispatchToProps)(Login);
