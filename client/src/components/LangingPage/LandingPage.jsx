import React from 'react';
import { Typography, Grid, useTheme, useMediaQuery } from '@material-ui/core';
import { useStyles } from './styles';

const LandingPage = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      spacing={10}
      className={classes.root}
      justify="space-around"
    >
      <Grid item container sm={12} md={6} justify="center">
        <img src="/assets/images/img1.jpeg" className={classes.img} />
      </Grid>
      <Grid item container sm={12} md={6}>
        <Typography variant="h6" paragraph align="justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          voluptas aspernatur repudiandae labore explicabo ex asperiores facilis
          perferendis esse incidunt sunt, voluptatibus quis numquam sed aliquid
          animi quibusdam alias! Placeat. some text Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nihil, voluptas aspernatur repudiandae
          labore explicabo ex asperiores facilis perferendis esse incidunt sunt,
          voluptatibus quis numquam sed aliquid animi quibusdam alias! Placeat.
        </Typography>
      </Grid>
      {isSmall ? (
        <Grid item container sm={12} md={6} justify="center">
          <img src="/assets/images/img2.jpeg" className={classes.img} />
        </Grid>
      ) : null}
      <Grid item container sm={12} md={6}>
        <Typography variant="h6" paragraph align="justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          voluptas aspernatur repudiandae labore explicabo ex asperiores facilis
          perferendis esse incidunt sunt, voluptatibus quis numquam sed aliquid
          animi quibusdam alias! Placeat. some text Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nihil, voluptas aspernatur repudiandae
          labore explicabo ex asperiores facilis perferendis esse incidunt sunt,
          voluptatibus quis numquam sed aliquid animi quibusdam alias! Placeat.
        </Typography>
      </Grid>
      {isSmall ? null : (
        <Grid item container sm={12} md={6} justify="center">
          <img src="/assets/images/img2.jpeg" className={classes.img} />
        </Grid>
      )}
      <Grid item container sm={12} md={6} justify="center">
        <img src="/assets/images/img3.jpeg" className={classes.img} />
      </Grid>
      <Grid item container sm={12} md={6}>
        <Typography variant="h6" paragraph align="justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          voluptas aspernatur repudiandae labore explicabo ex asperiores facilis
          perferendis esse incidunt sunt, voluptatibus quis numquam sed aliquid
          animi quibusdam alias! Placeat. some text Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nihil, voluptas aspernatur repudiandae
          labore explicabo ex asperiores facilis perferendis esse incidunt sunt,
          voluptatibus quis numquam sed aliquid animi quibusdam alias! Placeat.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
