<<<<<<< HEAD
import React from "react";
import useStyles from "./styles";
import PropTypes from 'prop-types';
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import logo from "../../images/test.png";
=======
import React from 'react';
import { useStyles } from './styles';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
>>>>>>> 31e9190b523d38096af9150e9e8aab5d798d6786

const Navbar = (props) => {
  const classes = useStyles();
  const user = false;
  return (
<<<<<<< HEAD
    <AppBar className={classes.appBar}  color="inherit">
      <img className={classes.image} src={logo} alt="icon" height="60" />
      <Typography
        // component={Link}
        to="/"
        className={classes.heading}
        variant="h4"
      >
=======
    <AppBar className={classes.appBar} position="static" color="secondary">
      <img
        className={classes.image}
        src="/assets/images/test.png"
        alt="icon"
        height="60"
      />
      <Typography to="/" className={classes.heading} color="" variant="h2">
>>>>>>> 31e9190b523d38096af9150e9e8aab5d798d6786
        Bug-Tracker
      </Typography>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={() => {}}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button to="/" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
