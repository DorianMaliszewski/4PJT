import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const BuyStep2 = props => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Nom su rla crate" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Numéro" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Date d'expiration" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cvv" label="CVV" helperText="Les 3 chiffres au dos de votre cartes" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox color="secondary" name="saveCard" value="yes" />} label="Se souvenir de ma carte ?" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

BuyStep2.propTypes = {};

export default BuyStep2;
