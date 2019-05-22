import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import { login } from "../../actions/auth";
import { AUTH_TOKEN } from "../../constants";
import { withRouter } from "react-router-dom";

const SignIn = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { classes } = props;

  const handleLogin = e => {
    e.preventDefault();
    login(username, password, rememberMe).subscribe(data => {
      if (data.authToken) {
        localStorage.setItem(AUTH_TOKEN, data.authToken);
        props.history.push("/");
      }
    });
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Connexion - SupBank
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='username'>Identifiant</InputLabel>
            <Input
              id='username'
              name='username'
              autoComplete='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='password'>Mot de passe</InputLabel>
            <Input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                value='remember'
                color='primary'
                onChange={e => setRememberMe(e.target.checked)}
              />
            }
            label='Se souvenir de moi'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}>
            Se connecter
          </Button>
        </form>
      </Paper>
    </main>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
