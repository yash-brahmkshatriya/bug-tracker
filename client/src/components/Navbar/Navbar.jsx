
import React from "react";
import useStyles from "./styles";
import PropTypes from 'prop-types';
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import logo from "../../images/test.png";
import React from 'react';
import { useStyles } from './styles';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import React from "react";
import { useStyles } from "./styles";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const Navbar = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const user = false;

  return (
    <AppBar className={classes.appBar}  color="inherit">
      <img className={classes.image} src={logo} alt="icon" height="60" />
      <Typography
        // component={Link}
        to="/"
        className={classes.heading}
        variant="h4"
      >
    <AppBar className={classes.appBar} position="static" color="secondary">
      <img
        className={classes.image}
        src="/assets/images/test.png"
        alt="icon"
        height="60"
      />
      <Typography to="/" className={classes.heading} color="" variant="h2">
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
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <img
          className={classes.image}
          src="/assets/images/buglogo.png"
          alt="icon"
          //height="60"
          style={isSmall ? { transform: "scale(0.6)" } : {}}
        />
        <Typography
          variant={isSmall ? "h5" : "h3"}
          className={classes.title}
          fontWeight="fontWeightBold"
        >
          <b>Bug-Tracker</b>
        </Typography>

        <Toolbar className={classes.toolbar}>
          {user ? (
            <Button className={classes.button}>Logout</Button>
          ) : (
            <Button className={classes.button}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
