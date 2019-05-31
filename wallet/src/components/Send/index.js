import React, { useContext, useState } from "react";
import TransactionContext from "../../contexts/TransactionContext";
import {
  Typography,
  Paper,
  Button,
  Input,
  InputLabel,
  FormControl,
  withStyles,
  InputAdornment,
  Divider,
  Snackbar
} from "@material-ui/core";
import TransactionsSentTable from "../Tables/TransactionsSentTable";
import { styles } from "./styles";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import ConfirmDialog from "../Core/ConfirmDialog";
import CustomSnackbar from "../Core/CustomSnackbar";

/**
 *
 *
 * @param {*} props
 * @returns
 */
const Send = props => {
  const transactionContext = useContext(TransactionContext);
  const [data, setData] = useState();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: "",
    variant: ""
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const { classes } = props;

  if (!data) {
    transactionContext.findAll().subscribe(transactions => {
      setData(transactions);
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setOpenConfirmDialog(true);
  };

  const closeSnackbar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleConfirmDialog = result => {
    setOpenConfirmDialog(false);
    setSnackbar({ ...snackbar, open: false });
    if (result) {
      transactionContext
        .sendTransaction("Me", recipient, amount)
        .subscribe(r => {
          if (r) {
            setSnackbar({
              text: "Opération réussie",
              variant: "success",
              open: true
            });
          } else {
            setSnackbar({
              text: "Opération échouée, veuillez recommencer",
              variant: "error",
              open: true
            });
          }
        });
    } else {
      console.log("Annuler");
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Typography variant='h4' component='div'>
          Envoyer de l'argent
        </Typography>
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin='normal' className={classes.input} required>
              <InputLabel htmlFor='recipient'>Destinataire</InputLabel>
              <Input
                id='recipient'
                name='recipient'
                onChange={e => setRecipient(e.target.value)}
                value={recipient}
                autoFocus
              />
            </FormControl>
            <FormControl margin='normal' className={classes.input} required>
              <InputLabel htmlFor='montant'>Montant</InputLabel>
              <Input
                id='montant'
                name='montant'
                type='number'
                inputProps={{ min: 0, step: 0.01 }}
                onChange={e => setAmount(parseFloat(e.target.value))}
                value={amount}
                endAdornment={
                  <InputAdornment position='start'>
                    <MonetizationOn />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              style={{ width: "50%" }}
              disabled={!(amount && recipient && amount !== 0)}>
              Envoyer
            </Button>
          </form>
        </Paper>
        <Divider />
        <Typography variant='h4' component='div' className={classes.title}>
          Historique de mes envois
        </Typography>

        <TransactionsSentTable
          transactions={data}
          isLoading={transactionContext.state.isLoading}
        />
      </div>
      <ConfirmDialog
        open={openConfirmDialog}
        toggleDisplay={toggleConfirmDialog}
        text={`Etes-vous sûr de vouloir envoyer ${amount} tokens ?`}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}>
        <CustomSnackbar
          onClose={closeSnackbar}
          variant={snackbar.variant}
          message={snackbar.text}
        />
      </Snackbar>
    </React.Fragment>
  );
};

export default withStyles(styles)(Send);
