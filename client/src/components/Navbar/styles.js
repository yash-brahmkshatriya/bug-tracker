import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { useMediaQuery, useTheme, fade } from '@material-ui/core';

export const useStyles = makeStyles((theme) => {
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const appbarpadding = isSmall ? `0px 0px` : `8px 48px`;
  const imageMargin = isSmall ? `0px` : `15px`;
  return {
    link: {
      textDecoration: 'none',
      '&:focus, &:visited, &:link, &:active,&:hover': {
        textDecoration: 'none',
      },
      color: 'rgba(255,255,255,0.7)',
    },
    navLinkActive: {
      color: theme.palette.primary.light,
    },
    appBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // padding: "8px 48px",
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
    },
    root: {
      // flex: 1,
    },
    title: {
      // flexGrow: 1,
    },
    button: {
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
      },
    },
    image: {
      marginLeft: imageMargin,
      maxHeight: '60px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    profile: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '400px',
    },

    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  };
});
