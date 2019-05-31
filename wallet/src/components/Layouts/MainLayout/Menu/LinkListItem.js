import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

class LinkListItem extends Component {
  render() {
    return (
      <Link to={this.props.to} style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>{this.props.icon}</ListItemIcon>
          <ListItemText primary={this.props.text} />
        </ListItem>
      </Link>
    );
  }
}

export default LinkListItem;
