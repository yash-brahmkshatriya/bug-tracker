import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  inpGrp: {
    display: 'flex',
    width: '100%',
    maxWidth: theme.breakpoints.values.md,
    alignItems: 'center',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.grey[800],
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  inp: {
    flex: 1,
    letterSpacing: '1px',
  },
  inpBtn: {
    marginLeft: theme.spacing(2),
    textTransform: 'none',
  },
  formDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    width: '100%',
  },
  search: {
    marginRight: theme.spacing(2),
    color: theme.palette.grey[800],
  },
}));
