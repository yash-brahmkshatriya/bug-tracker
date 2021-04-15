import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const confirmationStyles = makeStyles((theme) => ({
  btnContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    margin: 8,
  },
}));

const ConfirmDialog = ({ onTrueEvent, onFalseEvent, showDialog, message }) => {
  const css = confirmationStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={showDialog}
      scroll="paper"
      onClose={onFalseEvent}
      aria-labelledby="confirmDelete"
    >
      <DialogTitle id="confirmDelete">Are you sure ?</DialogTitle>
      <DialogActions className={css.btnContainer}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={onTrueEvent}
        >
          {message}
        </Button>
        <Button autoFocus size="small" onClick={onFalseEvent}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
