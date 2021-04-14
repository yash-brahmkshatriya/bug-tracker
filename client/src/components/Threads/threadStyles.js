import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  results: {
    maxWidth: theme.breakpoints.values.md,
  },
  link: {
    textDecoration: "none",
    "&:focus, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "inherit",
    },
    color: theme.palette.secondary.main,
  },
  projectLink: {
    textDecoration: "none",
    "&:focus, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "inherit",
    },
    color: theme.palette.grey[500],
  },
  chipsBoxMobile: {
    display: "flex",
    justifyContent: "flex-start",
    // alignItems: "center",
  },
  chipsBoxDesktop: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  timeNameInfo: {
    display: "flex",
    // flexWrap: "wrap",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1),
      color: theme.palette.grey[600],
    },
  },
  timeNameInfoMobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& > nth-child(even)": {
      display: "none",
    },
    "& > *": {
      color: theme.palette.grey[600],
    },
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  chipMR: {
    marginRight: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paperSection: {
    marginBottom: theme.spacing(3),
  },
  chipComment: {
    margin: theme.spacing(0),
  },
  commentPersonDetails: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1),
    borderTopRightRadius: theme.spacing(3),
  },
  customBorderRadius: {
    borderTopRightRadius: theme.spacing(3),
    borderBottomLeftRadius: theme.spacing(3),
    borderBottomRightRadius: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  noBorder: {
    border: "none",
  },
}));
