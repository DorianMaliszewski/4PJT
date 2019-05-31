import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { styles } from "./styles";
import LastTransactions from "./LastTransactions";
import AuthContext from "../../contexts/AuthContext";

const Home = props => {
  const authContext = useContext(AuthContext);
  return (
    <>
      <Typography variant='h3' gutterBottom component='h3'>
        Tableau de bord
      </Typography>
      <Typography component='div' variant='body1' gutterBottom>
        Nombre de token : {authContext.state.user.tokens}
      </Typography>
      <LastTransactions />
    </>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
