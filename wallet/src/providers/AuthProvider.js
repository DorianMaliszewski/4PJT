import { AUTH_TOKEN } from '../constants';
import AuthContext from '../contexts/AuthContext';
import React, { useState } from 'react';

const apiUrl = process.env.REACT_APP_BLOCKCHAIN_URL;

const AuthProvider = props => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState();
  const isAuthenticated = () => {
    return address ? true : false;
  };

  const logout = () => {
    setAddress(null);
    window.close();
  };

  const getAccount = () => {
    return fetch(apiUrl + '/address').then(data => {
      return data.json();
    });
  };

  const getBalance = () => {
    return fetch(apiUrl + '/balance').then(data => {
      let json = data.json();
      return json;
    });
  };

  return <AuthContext.Provider value={{ isAuthenticated, logout, getAccount, getBalance, state: { balance, address }, setAddress, setBalance }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
