import React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, withStyles, Typography } from '@material-ui/core';
import { styles } from './styles';
import Loader from '../../Core/Loader';

const TransactionsReceivedTable = props => {
  const { classes } = props;
  const data = props.transactions;
  const isLoading = props.isLoading ? props.isLoading : false;

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={3} style={{ textAlign: 'center' }}>
            <Loader />
          </TableCell>
        </TableRow>
      );
    }
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} style={{ textAlign: 'center' }}>
            <Typography variant="body2" component="div">
              Aucune transaction
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    return data.map((row, index) => {
      return (
        <TableRow key={index}>
          <TableCell numeric>{row.amount}</TableCell>
          <TableCell>{row.address}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Montant</TableCell>
            <TableCell>A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(TransactionsReceivedTable);
