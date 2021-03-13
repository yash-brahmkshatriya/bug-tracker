import React from "react";
import { Typography, Container, Grid } from "@material-ui/core";
import image1 from "../../images/img1.jpeg";
import image2 from "../../images/img2.jpeg";
import image3 from "../../images/img3.jpeg";
import useStyles from "./styles";

const LandingPage = (props) => {
  const classes = useStyles();
  return (
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
      </Grid>

      <Grid
        container
        justify="space-between"
        alignContent="space-between"
        spacing={3}
        align="center"
        alignItems="center"
      >
        <Grid item className={classes.content} flex={1}>
          <Typography variant="h5" paragraph>
            some text Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nihil, voluptas aspernatur repudiandae labore explicabo ex
            asperiores facilis perferendis esse incidunt sunt, voluptatibus quis
            numquam sed aliquid animi quibusdam alias! Placeat.
          </Typography>
        </Grid>
        <Grid item className={classes.image} flex={1}>
          <img src={image2} />
        </Grid>
      </Grid>

      <Grid
        container
        justify="space-between"
        alignContent="space-between"
        spacing={3}
        align="center"
        alignItems="center"
      >
        <Grid item className={classes.image} flex={1}>
          <img src={image3} />
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
      </Grid>
    </Container>
  );
};

export default LandingPage;
