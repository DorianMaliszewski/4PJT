import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, withStyles, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const BuyStep1 = ({ handleChange, selected, classes }) => {
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Choisissez une offre</FormLabel>
      <RadioGroup aria-label="Choice" name="choice1" className={classes.group} value={selected} onChange={handleChange}>
        <FormControlLabel value="50" control={<Radio />} label="50 jetons" />
        <FormControlLabel value="100" control={<Radio />} label="100 jetons" />
        <FormControlLabel value="150" control={<Radio />} label="150 jetons" />
        <FormControlLabel value="300" control={<Radio />} label="300 jetons" />
      </RadioGroup>
    </FormControl>
  );
};

BuyStep1.propTypes = {};

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(BuyStep1);
