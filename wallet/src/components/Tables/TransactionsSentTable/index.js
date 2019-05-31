import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  Typography
} from "@material-ui/core";
import { styles } from "./styles";
import Loader from "../../Core/Loader";

const TransactionsReceivedTable = props => {
  const { classes } = props;
  const data = props.transactions;
  const isLoading = props.isLoading ? props.isLoading : false;

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={5} style={{ textAlign: "center" }}>
            <Loader />
          </TableCell>
        </TableRow>
      );
    }
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} style={{ textAlign: "center" }}>
            <Typography variant='body2' component='div'>
              Aucune transaction
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    return data.map(row => {
      return (
        <TableRow key={row.id}>
          <TableCell numeric>{row.id}</TableCell>
          <TableCell component='th' scope='row'>
            {row.createdAt.toLocaleString()}
          </TableCell>
          <TableCell>{row.to}</TableCell>
          <TableCell numeric>{row.value}</TableCell>
          <TableCell>{row.validatedAt.toLocaleString()}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric>#</TableCell>
            <TableCell>Date de la transaction</TableCell>
            <TableCell>A</TableCell>
            <TableCell>Montant</TableCell>
            <TableCell>Date de validation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(TransactionsReceivedTable);
