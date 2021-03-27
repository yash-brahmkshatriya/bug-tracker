import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Navbar from './Navbar/Navbar';
import LandingPage from './LangingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard';
import Project from './Project/Project';
import Footer from './Footer/Footer';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './Utils/PrivateRouter';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh',
  },
}));

function MainComponent(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      className={classes.root}
    >
      <Box>
        <Navbar />
      </Box>

      <Box m={5} marginTop={10} flex={1}>
        <Switch location={props.location}>
          <PrivateRoute path="/" exact>
            <Dashboard />
          </PrivateRoute>
          <Route auth={user.user} path="/projects">
            <Project />
          </Route>
          <Route path="/home" component={LandingPage} />
        </Switch>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default withRouter(MainComponent);
