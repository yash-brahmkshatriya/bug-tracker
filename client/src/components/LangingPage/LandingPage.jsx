import React from "react";
import { Typography, Container, Grid } from "@material-ui/core";
import image1 from "../../images/img1.jpeg";
import image2 from "../../images/img2.jpeg";
import image3 from "../../images/img3.jpeg";
import useStyles from "./styles";

const LandingPage = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={10}
      className={classes.root}
      justify="space-around"
    >
      <Grid item className={classes.image} xs={6}>
        <img src={image1} />
      </Grid>
      <Grid item className={classes.content} xs={6}>
        <Typography variant="h5" paragraph align="justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          voluptas aspernatur repudiandae labore explicabo ex asperiores facilis
          perferendis esse incidunt sunt, voluptatibus quis numquam sed aliquid
          animi quibusdam alias! Placeat. some text Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nihil, voluptas aspernatur repudiandae
          labore explicabo ex asperiores facilis perferendis esse incidunt sunt,
          voluptatibus quis numquam sed aliquid animi quibusdam alias! Placeat.
        </Typography>
      </Grid>

      <Grid item className={classes.content} xs={6}>
        <Typography variant="h5" paragraph align="justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          voluptas aspernatur repudiandae labore explicabo ex asperiores facilis
          perferendis esse incidunt sunt, voluptatibus quis numquam sed aliquid
          animi quibusdam alias! Placeat. some text Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nihil, voluptas aspernatur repudiandae
          labore explicabo ex asperiores facilis perferendis esse incidunt sunt,
          voluptatibus quis numquam sed aliquid animi quibusdam alias! Placeat.
        </Typography>
      </Grid>
      <Grid item className={classes.image} xs={6}>
        <img src={image1} />
      </Grid>

      <Grid item className={classes.image} xs={6}>
        <img src={image1} />
      </Grid>
      <Grid item className={classes.content} xs={6}>
        <Typography variant="h5" paragraph align="justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
          voluptas aspernatur repudiandae labore explicabo ex asperiores facilis
          perferendis esse incidunt sunt, voluptatibus quis numquam sed aliquid
          animi quibusdam alias! Placeat. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nihil, voluptas aspernatur repudiandae labore
          explicabo ex asperiores facilis perferendis esse incidunt sunt,
          voluptatibus quis numquam sed aliquid animi quibusdam alias! Placeat.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
