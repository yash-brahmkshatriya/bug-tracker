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
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <img
          className={classes.image}
          src="/assets/images/buglogo.png"
          alt="icon"
          style={isSmall ? { transform: "scale(0.6)", marginLeft: "0px" } : {}}
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
