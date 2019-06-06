import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import Home from './components/Home';
import ConnectedSwitch from './components/Core/ConnectedSwitch';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { deepPurple, blue } from '@material-ui/core/colors/';
import AuthProvider from './providers/AuthProvider';
import TransactionProvider from './providers/TransactionProvider';
import Send from './components/Send';
import Receive from './components/Receive';
import Buy from './components/Buy';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: blue
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <TransactionProvider>
              <Switch>
                <Route path="/login" component={SignIn} />
                <ConnectedSwitch>
                  <Route path="/home" component={Home} />
                  <Route path="/send" component={Send} />
                  <Route path="/receive" component={Receive} />
                  <Route path="/buy" component={Buy} />
                  <Route component={Home} />
                </ConnectedSwitch>
              </Switch>
            </TransactionProvider>
          </AuthProvider>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
