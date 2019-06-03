import React, { useState, useContext } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Drawer,
  Divider,
  List,
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import classNames from "classnames";

// Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import { mainListItems } from "./Menu";
import { styles } from "./styles";
import { withRouter } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";

const MainLayout = props => {
  const { classes } = props;
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext.logout();
    props.history.push("/");
  };

  const [open, setOpen] = useState(true);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={classNames(classes.appBar, open && classes.appBarShift)}>
        <Toolbar disableGutters={!open} className={classes.toolbar}>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={e => setOpen(true)}
            className={classNames(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}>
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}>
            Home
          </Typography>
          <IconButton color='inherit'>
            <Badge
              badgeContent={authContext.state.user.tokens}
              color='secondary'>
              <MonetizationOn />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose
          )
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={e => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </div>
        <div>
          <Divider />
          <ListItem button onClick={e => handleLogout()}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText primary='Se déconnecter' />
          </ListItem>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}
      </main>
    </div>
  );
};
export default withRouter(withStyles(styles)(MainLayout));
