import React, { useState, useContext } from 'react';
import TransactionContext from '../contexts/TransactionContext';
import { AUTH_TOKEN } from '../constants';
import AuthContext from '../contexts/AuthContext';

const apiUrl = process.env.REACT_APP_BLOCKCHAIN_URL;

const TransactionProvider = props => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const findAll = () => {
    return fetch(apiUrl + '/blocks').then(res => {
      let data = res.json();
      setList(data);
      return data;
    });
  };

  const sendTransaction = (to, amount) => {
    return fetch(apiUrl + '/sendTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: to,
        amount
      })
    }).then(rep => rep.json());
  };

  const mineBlock = () => {
    return fetch(apiUrl + '/mineBlock', { method: 'POST' }).then(rep => rep.json());
  };

  const getMyHistory = () => {
    console.log('myHistory');
    return fetch(apiUrl + '/address/' + authContext.state.address).then(data => data.json());
  };

  const getMyUnspentTxOuts = () => {
    return fetch(apiUrl + '/myUnspentTransactionOutputs').then(data => data.json());
  };

  const getTransactions = () => {
    return list;
  };

  const getMyTransactions = () => {
    return fetch(apiUrl + '/myTransaction').then(data => data.json());
  };

  return (
    <TransactionContext.Provider value={{ findAll, getMyTransactions, getTransactions, getMyUnspentTxOuts, getMyHistory, sendTransaction, mineBlock, state: { isLoading, list } }}>
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
