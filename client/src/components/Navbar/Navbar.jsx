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
import { Link as RouterLink } from 'react-router-dom';

const Navbar = (props) => {
  const theme = useTheme();
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
