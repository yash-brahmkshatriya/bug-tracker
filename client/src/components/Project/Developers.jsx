import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
} from '@material-ui/core';
import PersonItem from './PersonItem';
import CodeIcon from '@material-ui/icons/Code';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { manageDev } from '../../redux/actions';
import ConfirmDialog from '../Utils/ConfirmDialog';
import { useFormik } from 'formik';

function Developers({ developers, projectId, isProjectManager }) {
  const dispatch = useDispatch();
  const [devEmail, setDevEmail] = useState(false);

  const openDialog = (devEmail) => setDevEmail(devEmail);
  const closeDialog = () => setDevEmail(false);

  const deleteDev = () => {
    dispatch(manageDev(projectId, devEmail, 'delete'));
    closeDialog();
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <CodeIcon />
          <Typography variant="h5" style={{ marginLeft: '8px' }}>
            Developers
          </Typography>
        </Box>
        {isProjectManager ? (
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <AddDev dispatch={dispatch} projectId={projectId} />
          </Box>
        ) : null}
      </Box>
      <List>
        {developers.map((developer, idx) => (
          <>
            <PersonItem
              person={developer}
              deletable={isProjectManager}
              key={idx}
              openDialog={openDialog}
            />
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
      <ConfirmDialog
        onTrueEvent={deleteDev}
        onFalseEvent={closeDialog}
        showDialog={devEmail !== false}
        message="Delete"
      />
    </>
  );
}

const AddDev = ({ dispatch, projectId }) => {
  const [addDevDialog, setAddDevDialog] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const addDevForm = useFormik({
    initialValues: {
      email: '',
    },
    validate: (values) => {
      let errors = {};
      let { email } = values;
      email = email.trim();
      if (!email) errors.email = 'Email is Required';
      let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(email.toLowerCase())) {
        errors.email = 'Invalid Email';
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(manageDev(projectId, values.email, 'add'));
    },
  });

  return (
    <>
      <IconButton onClick={() => setAddDevDialog(true)}>
        <AddIcon />
      </IconButton>
      <Dialog open={addDevDialog} fullScreen={isSmall} id="addDev">
        <DialogTitle>Add Developer</DialogTitle>
        <DialogContent dividers={true}>
          <form onSubmit={addDevForm.handleSubmit}>
            <TextField
              id="email"
              value={addDevForm.values.email}
              onChange={addDevForm.handleChange}
              onBlur={addDevForm.handleBlur}
              fullWidth
              label="Developer Email"
              helperText={
                addDevForm.errors.email ? addDevForm.errors.email : null
              }
              error={addDevForm.errors.email ? true : false}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              addDevForm.handleSubmit();
              addDevForm.setSubmitting(false);
              setAddDevDialog(false);
            }}
            disabled={!addDevForm.dirty || addDevForm.isSubmitting}
          >
            Add
          </Button>
          <Button onClick={() => setAddDevDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Developers;
