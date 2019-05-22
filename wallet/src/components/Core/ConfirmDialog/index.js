import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

const ConfirmDialog = props => {
  const { fullScreen } = props;
  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={e => props.toggleDisplay(false)}
      aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='responsive-dialog-title'>
        {"Confirmation requise"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.text
            ? props.text
            : "Etes-vous sûr de vouloir réaliser cette opération ?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={e => props.toggleDisplay(false)} color='primary'>
          Annuler
        </Button>
        <Button
          onClick={e => props.toggleDisplay(true)}
          color='primary'
          autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ConfirmDialog);
