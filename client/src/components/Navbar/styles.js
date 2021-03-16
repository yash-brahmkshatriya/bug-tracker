import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: "0 0 30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
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
    marginLeft: "15px",
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
}));
