import React from 'react';
import {
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Box,
} from '@material-ui/core';
import { useStyles } from './styles';
import { appDescription } from '../../shared/appDescription';

const LandingPage = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box display="flex" flexDirection="column" flex={1} marginTop={5}>
      {appDescription.map((item, idx) => (
        <Grid
          container
          spacing={10}
          justify="space-around"
          className={idx % 2 === 1 ? classes.itemReverse : classes.item}
          key={idx}
        >
          <Grid
            item
            container
            sm={12}
            md={6}
            justify="center"
            className={classes.imgContainer}
          >
            <img src={item.imgSrc} alt={item.alt} className={classes.img} />
          </Grid>
          <Grid item sm={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              style={{ height: '100%' }}
            >
              <Typography
                variant={isSmall ? 'h5' : 'h3'}
                className={classes.heading}
                color="secondary"
              >
                {item.heading}
              </Typography>
              <Typography variant={isSmall ? 'inherit' : 'h6'} align="justify">
                {item.text}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default LandingPage;
