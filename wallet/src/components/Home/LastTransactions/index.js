import React, { useContext, useState } from 'react';
import { Typography, withStyles, Divider } from '@material-ui/core';
import { styles } from './styles';
import TransactionsReceivedTable from '../../Tables/TransactionsReceivedTable';
import TransactionContext from '../../../contexts/TransactionContext';

const LastTransaction = props => {
  const { classes } = props;
  const [data, setData] = useState();
  const transactionContext = useContext(TransactionContext);

  if (!data) {
    transactionContext.getMyHistory().then(json => setData(json.unspentTxOuts.reverse().slice(0, 10)));
  }
  return (
    <>
      <Divider />
      <Typography className={classes.pageHeader} variant="h4" gutterBottom component="h3">
        Mes dernières transactions recu
      </Typography>
      <TransactionsReceivedTable transactions={data} isLoading={data ? false : true} />
    </>
  );
};

export default withStyles(styles)(LastTransaction);
