import React from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles';
import { devLogin } from '../../redux/actions';
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Navbar = (props) => {
  const theme = useTheme();
  const routerPath = useLocation().pathname;
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const user = false;
  const dispatch = useDispatch();
  const devTestLogin = () => {
    const email = prompt('enter test email');
    if (email && email.endsWith('@test.com')) {
      dispatch(devLogin(email));
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <RouterLink to="/">
          <img
            className={classes.image}
            src="/assets/images/buglogo.png"
            alt="icon"
            style={
              isSmall ? { transform: 'scale(0.6)', marginLeft: '0px' } : {}
            }
          />
        </RouterLink>

        <Typography
          variant={isSmall ? 'h5' : 'h3'}
          className={classes.title}
          fontWeight="fontWeightBold"
        >
          <b>Bug-Tracker</b>
        </Typography>

        <Toolbar className={classes.toolbar}>
          <Typography variant="body1" style={{ marginRight: '8px' }}>
            <RouterLink
              to="/projects"
              className={
                routerPath === '/projects'
                  ? clsx(classes.link, classes.navLinkActive)
                  : classes.link
              }
            >
              Explore
            </RouterLink>
          </Typography>
          {user ? (
            <Button className={classes.button}>Logout</Button>
          ) : (
            <Button className={classes.button}>Login</Button>
          )}
          <Button className={classes.button} onClick={devTestLogin}>
            DevLogin
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
