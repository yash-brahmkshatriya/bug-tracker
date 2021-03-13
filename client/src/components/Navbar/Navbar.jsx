import React from "react";
import useStyles from "./styles";
import PropTypes from 'prop-types';
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import logo from "../../images/test.png";

const Navbar = (props) => {
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
          <Button
            // component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
