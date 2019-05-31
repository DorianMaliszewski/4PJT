import ajax from "rxjs/ajax";

import { SERVER_URL } from "../constants";
import { Observable } from "rxjs";
import { tap, delay } from "rxjs/operators";

const state = {
  list: [],
  isLoading: false
};

function newTransaction(id) {
  return {
    id: id,
    createdAt: new Date(),
    validatedAt: new Date(),
    value: Math.round(Math.random() * 100),
    from: "Someone",
    to: "Blabla"
  };
}

const findAll = () => {
  state.isLoading = true;
  return new Observable(observer => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push(newTransaction(i));
    }
    observer.next(data);
    observer.complete();
  }).pipe(
    delay(2000),
    tap(data => {
      state.isLoading = false;
      state.list = data;
    })
  );
  //return ajax.get(SERVER_URL + "/api/transactions").pipe(res => res.response)
};

const sendTransaction = (from, to, amount) => {
  return new Observable(observer => {
    observer.next(true);
    observer.complete();
  }).pipe(delay(2000));
};

const getTransactions = () => {
  return state.list;
};

export default {
  findAll,
  getTransactions,
  state,
  sendTransaction
};
