import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    bottom: "0",
    width: "100%",
    height: "50px",
    background: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  text: {
    color: "white",
  },
}));
const Footer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Typography variant="h6" className={classes.text}>
        <b>Arshit</b>
      </Typography>
      <Typography variant="h6" className={classes.text}>
        <b>Yash</b>
      </Typography>
      <Typography variant="h6" className={classes.text}>
        <b>Ayush</b>
      </Typography>
      <Typography variant="h6" className={classes.text}>
        <b>Deep</b>
      </Typography>
    </div>
  );
};

export default Footer;
