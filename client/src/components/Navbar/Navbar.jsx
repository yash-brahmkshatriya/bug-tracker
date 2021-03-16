import React from "react";
import { useStyles } from "./styles";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";

const Navbar = (props) => {
  const classes = useStyles();
  const user = true;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <img
          className={classes.image}
          src="/assets/images/buglogo.png"
          alt="icon"
          height="60"
        />
        <Typography
          variant="h3"
          className={classes.title}
          fontWeight="fontWeightBold"
        >
          <b>Bug-Tracker</b>
        </Typography>

        <Toolbar className={classes.toolbar}>
          {user ? (
            <Button variant="outlined" className={classes.button}>
              Logout
            </Button>
          ) : (
            <Button variant="outlined" className={classes.button}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
