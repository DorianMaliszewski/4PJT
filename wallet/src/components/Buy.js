import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import AuthContext from '../contexts/AuthContext';
import BuyStepper from './BuyStepper';
import BuyStep1 from './Buy/BuyStep1';
import BuyStep2 from './Buy/BuyStep2';

const Buy = props => {
  const authContext = useContext(AuthContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [amountDesired, setAmountDesired] = React.useState();
  const [paymentInfomation, setPaymentInfomation] = React.useState();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const canNext = () => {
    switch (activeStep) {
      case 0:
        return !amountDesired;
      case 1:
        return true;
      default:
        return true;
    }
  };

  function getStepContent() {
    switch (activeStep) {
      case 0:
        return <BuyStep1 selected={amountDesired} handleChange={e => setAmountDesired(e.target.value)} />;
      case 1:
        return <BuyStep2 paymentInfomation={paymentInfomation} handleChange={e => setPaymentInfomation(e)} />;
      default:
        return <Typography>Erreur</Typography>;
    }
  }

  return <BuyStepper handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} stepContent={getStepContent()} canNext={canNext} />;
};

Buy.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
};

export default withStyles(styles)(Buy);
