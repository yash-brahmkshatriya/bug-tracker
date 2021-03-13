import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(3, 2),
    // width: "50%",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
  },

  image: {
    padding: theme.spacing(3, 2),
    display: "flex",
    justifyContent: "center",
  },
}));
