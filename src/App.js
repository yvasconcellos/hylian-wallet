import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />);
  }
}

export default App;
