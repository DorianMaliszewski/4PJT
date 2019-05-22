import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LinkListItem from "./LinkListItem";

export const mainListItems = (
  <div>
    <LinkListItem icon={<DashboardIcon />} to='/' text='Tableau de bord' />
    <LinkListItem
      icon={<ShoppingCartIcon />}
      to='/my-transactions'
      text='Mes transactions'
    />
    <LinkListItem icon={<PeopleIcon />} to='/send' text='Envoyer' />
    <LinkListItem icon={<BarChartIcon />} to='/receive' text='Recevoir' />
    <LinkListItem icon={<LayersIcon />} to='/buy' text='Acheter des tokens' />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItem>
  </div>
);
