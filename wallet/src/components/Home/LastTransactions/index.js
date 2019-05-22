import React, { useContext, useState } from "react";
import { Typography, withStyles, Divider } from "@material-ui/core";
import { styles } from "./styles";
import TransactionsReceivedTable from "../../Tables/TransactionsReceivedTable";
import TransactionContext from "../../../contexts/TransactionContext";

const LastTransaction = props => {
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
        Mes dernières transactions
      </Typography>
      <TransactionsReceivedTable
        transactions={data}
        isLoading={transactionContext.state.isLoading}
      />
    </>
  );
};

export default withStyles(styles)(LastTransaction);
