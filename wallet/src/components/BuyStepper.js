import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ['Sélectionner le montant désiré', 'Entrer vos coordonnées bancaires'];
}

const BuyStepper = ({ activeStep, handleNext, handleBack, stepContent, classes, canNext }) => {
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Merci de votre achat nous vous livrerons vos jetons dans lesplus bref délais</Typography>
          </div>
        ) : (
          <div>
            {stepContent}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Précédent
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={canNext()} className={classes.button}>
                {activeStep === steps.length - 1 ? 'Terminé' : 'Suivant'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(BuyStepper);
