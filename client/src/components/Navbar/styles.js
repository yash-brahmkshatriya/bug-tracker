import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import { useMediaQuery, useTheme } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 50px",
    position:"fixed",
    zIndex:"20",
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  button: {
    color: theme.palette.primary.dark,
  },
  heading: {
    // color: "grey",
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: theme.palette.primary.dark,
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
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
}));
export const useStyles = makeStyles((theme) => {
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const appbarpadding = isSmall ? `0px 0px` : `8px 48px`;
  const imageMargin = isSmall ? `0px` : `15px`;
  return {
    appBar: {
      margin: "0 0 32px 0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      // padding: "8px 48px",
      color: "white",
      backgroundColor: theme.palette.secondary.main,
    },
    root: {
      flexGrow: 1,
    },
    title: {
      // flexGrow: 1,
    },
    button: {
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
      },
    },
    image: {
      marginLeft: imageMargin,
      maxHeight: "60px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
    },
    profile: {
      display: "flex",
      justifyContent: "space-between",
      width: "400px",
    },

    brandContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  };
});
