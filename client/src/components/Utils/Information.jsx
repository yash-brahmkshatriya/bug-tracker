import React from 'react';
import { Box, Typography, useTheme } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function Information({
  message = "How you doin'...",
  Icon = InfoOutlinedIcon,
  fontSize = 40,
  color = '#455A64',
  flexDirection = 'column',
  typographyVariant = 'h5',
}) {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flex={5}
      justifyContent="center"
      style={{ width: '100%' }}
    >
      <Box
        display="flex"
        flexDirection={flexDirection}
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" justifyContent="center" m={1}>
          <Icon style={{ fontSize, color }} />
        </Box>
        <Box display="flex" justifyContent="center" m={1}>
          <Typography
            variant={typographyVariant}
            component="h2"
            style={{ color }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Information;
