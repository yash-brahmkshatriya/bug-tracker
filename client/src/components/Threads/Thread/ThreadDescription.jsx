import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Input,
  Button,
  IconButton,
} from '@material-ui/core';
import { useStyles } from '../threadStyles';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { updateThread } from '../../../redux/actions';
import EditIcon from '@material-ui/icons/Edit';

function ThreadDescription({ projectId, threadId, thread }) {
  const css = useStyles();
  const user = useSelector((state) => state.user.user);
  const [editing, setEditing] = useState(false);
  return (
    <Paper elevation={4} className={css.paperSection}>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <DescriptionOutlinedIcon />
            <Typography variant="h5" style={{ marginLeft: '8px' }}>
              Description
            </Typography>
          </Box>
          {user && user._id === thread.contributor._id && !editing ? (
            <IconButton
              className={css.editIcon}
              style={{ margin: '0px' }}
              onClick={() => setEditing(true)}
            >
              <EditIcon />
            </IconButton>
          ) : null}
        </Box>
        <Divider className={css.divider} />
        {editing ? (
          <DescriptionForm
            projectId={projectId}
            threadId={threadId}
            thread={thread}
            setEditing={setEditing}
          />
        ) : (
          <Typography
            variant="body1"
            style={{
              marginTop: '8px',
              whiteSpace: 'pre-line',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {thread.description}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

const DescriptionForm = ({ projectId, threadId, thread, setEditing }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.thread.loading);
  const css = useStyles();
  const discriptionForm = useFormik({
    initialValues: {
      description: thread.description,
    },
    validate: (values) => {
      const errors = {};
      let { description } = values;
      description = description.trim();
      if (!description) errors.description = 'description is Required';
      return errors;
    },
    onSubmit: (values) => {
      const str = values.description.trim();
      dispatch(
        updateThread(projectId, null, null, thread.title, str, null, threadId)
      );
      setEditing(false);
    },
  });

  useEffect(() => {
    discriptionForm.setSubmitting(false);
  }, [isLoading]);
  return (
    <form onSubmit={discriptionForm.handleSubmit}>
      <Input
        id="description"
        multiline
        placeholder="Leave a description"
        rowsMax={5}
        variant="outlined"
        value={discriptionForm.values.description}
        onChange={discriptionForm.handleChange}
        onBlur={discriptionForm.handleBlur}
        fullWidth
        disableUnderline
      />
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          type="submit"
          onClick={() => setEditing(false)}
          style={{ borderRadius: '24px', marginRight: '6px' }}
          disabled={discriptionForm.isSubmitting}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          type="submit"
          onClick={discriptionForm.handleSubmit}
          style={{ borderRadius: '24px' }}
          disabled={discriptionForm.isSubmitting}
        >
          <SaveIcon />
        </IconButton>
      </Box>
    </form>
  );
};

export default ThreadDescription;
