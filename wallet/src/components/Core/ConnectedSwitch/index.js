import React, { useContext } from "react";
import { Switch, Redirect } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import MainLayout from "../../Layouts/MainLayout";

const ConnectedSwitch = props => {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated()) {
    return <Redirect to='/login' />;
  }

  return (
    <MainLayout>
      <Switch>{props.children}</Switch>
    </MainLayout>
  );
};

ConnectedSwitch.propTypes = {};

export default ConnectedSwitch;
