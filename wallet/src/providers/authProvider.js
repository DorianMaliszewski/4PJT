import { AUTH_TOKEN } from "../constants";

const isAuthenticated = () => {
  return localStorage.getItem(AUTH_TOKEN) ? true : false;
};

const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

const state = {
  user: {
    tokens: 50
  }
};

export default {
  isAuthenticated,
  logout,
  state
};
