import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import ConnectedSwitch from "./components/Core/ConnectedSwitch";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { deepPurple, blue } from "@material-ui/core/colors/";
import AuthContext from "./contexts/AuthContext";
import MyTransactions from "./components/MyTransactions";
import authProvider from "./providers/authProvider";
import TransactionContext from "./contexts/TransactionContext";
import transactionProvider from "./providers/transactionProvider";
import Send from "./components/Send";

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
          <AuthContext.Provider value={authProvider}>
            <TransactionContext.Provider value={transactionProvider}>
              <Switch>
                <Route path='/login' component={SignIn} />
                <ConnectedSwitch>
                  <Route path='/home' component={Home} />
                  <Route path='/send' component={Send} />
                  <Route path='/my-transactions' component={MyTransactions} />
                  <Route component={Home} />
                </ConnectedSwitch>
              </Switch>
            </TransactionContext.Provider>
          </AuthContext.Provider>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
