import React, { useContext, useState } from "react";
import { Divider, Typography, withStyles } from "@material-ui/core";
import TransactionsReceivedTable from "../Tables/TransactionsReceivedTable";
import { styles } from "./styles";
import TransactionContext from "../../contexts/TransactionContext";

const MyTransactions = props => {
  const { classes } = props;
  const [data, setData] = useState([]);
  const transactionContext = useContext(TransactionContext);
  if (data.length === 0) {
    transactionContext.findAll().subscribe(transactions => {
      setData(transactions);
    });
  }
  return (
    <>
      <Divider />
      <Typography
        className={classes.pageHeader}
        variant='h4'
        gutterBottom
        component='h3'>
        Mes transactions
      </Typography>
      <TransactionsReceivedTable
        transactions={data}
        isLoading={transactionContext.state.isLoading}
      />
    </>
  );
};

export default withStyles(styles)(MyTransactions);
