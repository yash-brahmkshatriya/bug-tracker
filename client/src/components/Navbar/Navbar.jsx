import React from "react";
import useStyles from "./styles";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";

const Navbar = (props) => {
  const classes = useStyles();
  const user = false;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          // component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Bug-Tracker
        </Typography>
        {/* put logo here */}
        {/* <img className={classes.image} alt="icon" height="60" /> */}
      </div>
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

// Line 8:6:    'AppBar' is not defined      react/jsx-no-undef
// Line 10:10:  'Typography' is not defined  react/jsx-no-undef
// Line 11:22:  'Link' is not defined        no-undef
// Line 22:8:   'Toolbar' is not defined     react/jsx-no-undef
// Line 25:14:  'Typography' is not defined  react/jsx-no-undef
// Line 28:14:  'Button' is not defined      react/jsx-no-undef
// Line 32:24:  'logout' is not defined      no-undef
// Line 38:12:  'Button' is not defined      react/jsx-no-undef
// Line 38:30:  'Link' is not defined        no-undef
