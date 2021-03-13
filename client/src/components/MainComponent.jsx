import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import LandingPage from "./LangingPage/LandingPage";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
}));

function MainComponent() {
  const classes = useStyles();
  return (
    <div>
      <Box >
        <Navbar />
      </Box>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Box flex={5}>
        <LandingPage />
      </Box>
      </div>
  );
}

export default MainComponent;
