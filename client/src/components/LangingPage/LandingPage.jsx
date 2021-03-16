import React from "react";
import { Typography, Grid, useTheme, useMediaQuery } from "@material-ui/core";
import { useStyles } from "./styles";
import Footer from "../Footer/Footer";

const LandingPage = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid
        container
        spacing={10}
        className={classes.root}
        justify="space-around"
      >
        <Grid item container sm={12} md={6} justify="center">
          <img
            src="/assets/images/code_inspection_1.svg"
            className={classes.img}
          />
        </Grid>
        <Grid item container sm={12} md={6} alignItems="center">
          <Typography variant="h6" paragraph align="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
            voluptas aspernatur repudiandae labore explicabo ex asperiores
            facilis perferendis esse incidunt sunt, voluptatibus quis numquam
            sed aliquid animi quibusdam alias! Placeat. some text Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nihil, voluptas
            aspernatur repudiandae labore explicabo ex asperiores facilis
            perferendis esse incidunt sunt, voluptatibus quis numquam sed
            aliquid animi quibusdam alias! Placeat.
          </Typography>
        </Grid>
        {isSmall ? (
          <Grid item container sm={12} md={6} justify="center">
            <img
              src="/assets/images/bug_report_2.svg"
              className={classes.img}
            />
          </Grid>
        ) : null}
        <Grid
          item
          container
          sm={12}
          md={6}
          // style={{ background: theme.palette.secondary.main }}
          style={{ background: "white" }}
          alignItems="center"
        >
          <Typography variant="h6" paragraph align="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
            voluptas aspernatur repudiandae labore explicabo ex asperiores
            facilis perferendis esse incidunt sunt, voluptatibus quis numquam
            sed aliquid animi quibusdam alias! Placeat. some text Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nihil, voluptas
            aspernatur repudiandae labore explicabo ex asperiores facilis
            perferendis esse incidunt sunt, voluptatibus quis numquam sed
            aliquid animi quibusdam alias! Placeat.
          </Typography>
        </Grid>
        {isSmall ? null : (
          <Grid
            item
            container
            sm={12}
            md={6}
            justify="center"
            style={{ background: "white" }}
            // style={{ background: theme.palette.secondary.main }}
          >
            <img
              src="/assets/images/bug_report_2.svg"
              className={classes.img}
            />
          </Grid>
        )}
        <Grid item container sm={12} md={6} justify="center">
          <img src="/assets/images/fixing_bugs_3.svg" className={classes.img} />
        </Grid>
        <Grid item container sm={12} md={6} alignItems="center">
          <Typography variant="h6" paragraph align="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
            voluptas aspernatur repudiandae labore explicabo ex asperiores
            facilis perferendis esse incidunt sunt, voluptatibus quis numquam
            sed aliquid animi quibusdam alias! Placeat. some text Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nihil, voluptas
            aspernatur repudiandae labore explicabo ex asperiores facilis
            perferendis esse incidunt sunt, voluptatibus quis numquam sed
            aliquid animi quibusdam alias! Placeat.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
