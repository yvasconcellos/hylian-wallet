/* eslint-disable jsx-quotes */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import saveUserEmail from '../actions';
import triforce from '../images/triforce.png';
import rupee from '../images/rupee.png';

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
      <div className='flex'>

        <div
          className='
        flex
        flex-col
        bgSide
        w-1/2
        h-screen
        justify-center
        '
        >
          <div
            className='
            paragraph
            text-white
            justify-center
            self-center
            '
          >
            <p className='text-7xl'>MY RUPEES,</p>
            <p className='text-8xl'>MY PROBLEMS</p>
          </div>
          <div className='absolute bottom-4 left-0'>

            <img
              className='w-1/6'
              src={ rupee }
              alt='rupee'
            />
          </div>
        </div>
        <form className='w-1/2 h-screen flex flex-col justify-center'>
          <div>

            <p className='text-6xl text-center title'>HYLIAN WALLET</p>
          </div>
          <div className='flex justify-center'>
            <img
              src={ triforce }
              alt='triforce'
              className='w-1/4'
            />
          </div>
          <div
            className=" flex flex-col
           self-center justify-evenly
           h-2/5
           "
          >
            <div>

              <input
                name="email"
                type="text"
                data-testid="email-input"
                onChange={ this.handleChange }
                placeholder="Login"
              />

            </div>
            <div>

              <input
                name="password"
                type="password"
                data-testid="password-input"
                minLength={ 6 }
                onChange={ this.handleChange }
                placeholder="Password"
              />

            </div>
            <div>

              <button
                disabled={ disabledButton }
                type="button"
                className='bg-white rounded-xl w-full p-2'
                onClick={ () => { submitEmail(email); this.redirectWallet(); } }
              >
                Entrar
              </button>
            </div>
            { redirect && <Redirect to="/carteira" /> }
          </div>
        </form>
      </div>
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
