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
    <div>
      <Box >
        <Navbar />
      </Box>
<<<<<<< HEAD
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Box flex={5}>
=======

      <Box m={5}>
>>>>>>> 31e9190b523d38096af9150e9e8aab5d798d6786
        <LandingPage />
      </Box>
      </div>
  );
}

export default MainComponent;
