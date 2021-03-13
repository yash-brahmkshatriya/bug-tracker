import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 2),
    maxHeight: 800,
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },

  image: {
    padding: theme.spacing(3, 2),
    width: "50%",
    display: "flex",
    justifyContent: "center",
  },
}));
