import { makeStyles } from "@material-ui/core";
import {
  blue,
  blueGrey,
  brown,
  deepOrange,
  indigo,
  pink,
  purple,
  red,
  teal,
} from "@material-ui/core/colors";

const colors = [
  blueGrey,
  blue,
  brown,
  deepOrange,
  indigo,
  pink,
  purple,
  red,
  teal,
];

export const getRandomColor = () => {
  let idx = parseInt(Math.random() * 9);
  return colors[idx][500];
};

export const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
    color: theme.palette.secondary.main,
  },
  chipsBoxMobile: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "noWrap",
    overflow: "auto",
  },
  chipsBoxDesktop: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 0,
  },
  timeNameInfo: {
    "& > *": {
      marginRight: theme.spacing(1),
      color: theme.palette.grey[800],
    },
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    color: theme.palette.getContrastText(getRandomColor()),
    backgroundColor: getRandomColor(),
  },
  projectTitle: {
    color: theme.palette.primary.dark,
  },
}));
