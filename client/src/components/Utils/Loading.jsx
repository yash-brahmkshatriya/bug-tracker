import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

function LoadingComponent() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ width: '100%' }}
    >
      <CircularProgress size={25} />
    </Box>
  );
}

export default LoadingComponent;
