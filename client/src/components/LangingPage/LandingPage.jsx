import React from 'react';
import { Typography, Grid, useTheme, useMediaQuery } from '@material-ui/core';
import { useStyles } from './styles';

const LandingPage = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
<<<<<<< HEAD
    <Container>
      <Grid
        container
        justify="space-between"
        alignContent="space-between"
        spacing={3}
        align="center"
        alignItem="center"
      >
        <Grid item className={classes.image} flex={1}>
          <img src={image1} />
        </Grid>
        <Grid item className={classes.content} flex={1}>
          <Typography variant="h5" paragraph>
            some text Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nihil, voluptas aspernatur repudiandae labore explicabo ex
            asperiores facilis perferendis esse incidunt sunt, voluptatibus quis
            numquam sed aliquid animi quibusdam alias! Placeat. some text Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptas
            aspernatur repudiandae labore explicabo ex asperiores facilis
            perferendis esse incidunt sunt, voluptatibus quis numquam sed
            aliquid animi quibusdam alias! Placeat.
          </Typography>
        </Grid>
=======
    <Grid
      container
      spacing={10}
      className={classes.root}
      justify="space-around"
    >
      <Grid item container sm={12} md={6} justify="center">
        <img src="/assets/images/img1.jpeg" className={classes.img} />
>>>>>>> 31e9190b523d38096af9150e9e8aab5d798d6786
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
      <Grid
        item
        container
        sm={12}
        md={6}
        style={{ background: theme.palette.secondary.main }}
      >
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
        <Grid
          item
          container
          sm={12}
          md={6}
          justify="center"
          style={{ background: theme.palette.secondary.main }}
        >
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
