import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Navbar from './Navbar/Navbar';
import LandingPage from './LangingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard';
import Project from './Project/Project';
import Footer from './Footer/Footer';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh',
  },
}));

const PrivateRoute = ({ children, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth != null ? (
          children
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: location } }} />
        )
      }
    />
  );
};

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

      <Box m={5} marginTop={15}>
        <Switch location={props.location}>
          <PrivateRoute path="/" exact>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute auth={user.user} path="/projects">
            <Project />
          </PrivateRoute>
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
