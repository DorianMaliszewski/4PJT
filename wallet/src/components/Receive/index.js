import React, { useContext, useState, useEffect } from 'react';
import { Divider, Typography, withStyles } from '@material-ui/core';
import TransactionsReceivedTable from '../Tables/TransactionsReceivedTable';
import { styles } from './styles';
import TransactionContext from '../../contexts/TransactionContext';
import { AUTH_TOKEN } from '../../constants';
import AuthContext from '../../contexts/AuthContext';

const Receive = props => {
  const { classes } = props;
  const [data, setData] = useState();
  const transactionContext = useContext(TransactionContext);
  const authContext = useContext(AuthContext);

  const retrieveData = () => {
    transactionContext.getMyHistory().then(json => setData(json.unspentTxOuts.reverse()));
  };

  if (!data) {
    retrieveData();
  }
  return (
    <>
      <Typography variant="body1" component="p">
        Votre clef publique : {authContext.state.address}
      </Typography>
      <Divider />
      <Typography className={classes.pageHeader} variant="h4" gutterBottom component="h3">
        Transactions reçues
      </Typography>
      <TransactionsReceivedTable transactions={data} isLoading={data ? false : true} />
    </>
  );
};

export default withStyles(styles)(Receive);
