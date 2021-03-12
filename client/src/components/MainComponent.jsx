import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.secondary.main,
  },
}));

function MainComponent() {
  const css = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      className={css.root}
    >
      <Box>
        <Typography variant="h4">Navbar</Typography>
      </Box>
      <Box flex={5}>
        <Typography variant="h4">Hello There!</Typography>
      </Box>
    </Box>
  );
}

export default MainComponent;
