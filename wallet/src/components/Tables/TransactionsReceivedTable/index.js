import React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, withStyles, Typography } from '@material-ui/core';
import Proptypes from 'prop-types';
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
    return data.map(row => {
      return (
        <TableRow key={row.txOutId}>
          <TableCell numeric>{row.amount}</TableCell>
          <TableCell>{row.address}</TableCell>
          <TableCell>{row.txOutId}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric>Montant</TableCell>
            <TableCell>De</TableCell>
            <TableCell>Id de la transaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </Paper>
  );
};

TransactionsReceivedTable.propTypes = {
  transactions: Proptypes.array,
  isLoading: Proptypes.bool
};

export default withStyles(styles)(TransactionsReceivedTable);
