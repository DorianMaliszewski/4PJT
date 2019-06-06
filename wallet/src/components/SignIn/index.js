import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { AUTH_TOKEN } from '../../constants';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const SignIn = props => {
  const { classes } = props;
  const authContext = useContext(AuthContext);

  if (!authContext.state.address) {
    authContext.getAccount().then(data => {
      console.log(data);
      if (data) {
        authContext.setAddress(data.address);
        authContext.getBalance().then(data => {
          authContext.setBalance(data.balance);
          props.history.push('/');
        });
      }
    });
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>Récupération de votre compte ...</Paper>
    </main>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
