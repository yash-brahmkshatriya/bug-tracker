import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Navbar from './Navbar/Navbar';
import LandingPage from './LangingPage/LandingPage';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh',
  },
}));

function MainComponent() {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      className={classes.root}
    >
      <Box>
        <Navbar />
      </Box>

      <Box m={5}>
        <LandingPage />
      </Box>
    </Box>
  );
}

export default MainComponent;
