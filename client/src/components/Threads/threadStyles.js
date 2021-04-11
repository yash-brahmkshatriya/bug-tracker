import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  results: {
    maxWidth: theme.breakpoints.values.md,
  },
  link: {
    textDecoration: "none",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
    color: theme.palette.secondary.main,
  },
  chipsBoxMobile: {
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  chipsBoxDesktop: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  timeNameInfo: {
    "& > *": {
      marginRight: theme.spacing(1),
      color: theme.palette.grey[800],
    },
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));
