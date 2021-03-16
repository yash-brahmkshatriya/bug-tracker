import React from 'react';
import { useStyles } from './styles';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';

const Navbar = (props) => {
  const classes = useStyles();
  const user = false;
  return (
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
  );
};

export default Navbar;
