import React from "react";
import { Typography, Container, Grid } from "@material-ui/core";
import image1 from "../../images/img1.jpeg";
import image2 from "../../images/img2.jpeg";
import image3 from "../../images/img3.jpeg";
import useStyles from "./styles";

const LandingPage = (props) => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          align="center"
          alignItems="center"
        >
          <Grid item xs={5} sm={7}>
            <img src={image1} />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.content}>
            <Typography variant="h4">some text</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          align="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={4} className={classes.content}>
            <Typography variant="h4">
              some text is overlapping with images
            </Typography>
          </Grid>
          <Grid item xs={5} sm={7}>
            <img src={image2} />
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          align="center"
          alignItems="center"
        >
          <Grid item xs={5} sm={7}>
            <img src={image3} />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.content}>
            <Typography variant="h4">some text</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
