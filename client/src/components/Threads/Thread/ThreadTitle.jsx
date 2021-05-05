import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  useTheme,
  Button,
  Input,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import { useFormik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StyledChip from '../../Utils/StyledChip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import BugReportIcon from '@material-ui/icons/BugReport';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import EditIcon from '@material-ui/icons/Edit';
import { updateThread } from '../../../redux/actions';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {
  bugPriorityColors,
  bugTypeColors,
  closedStatusColors,
} from '../../../shared/misc';
import { useStyles } from '../threadStyles';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { set } from 'mongoose';
import UpdateChip from './updateChip';

const ThreadTitle = ({ projectId, threadId, thread }) => {
  const css = useStyles();
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const user = useSelector((state) => state.user.user);
  const [editing, setEditing] = useState(false);
  const [editingPm, setEditingPm] = useState(false);
  return (
    <Paper
      elevation={4}
      className={css.paperSection}
      style={{ marginTop: '8px' }}
    >
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {editing ? (
            <>
              <TitleForm
                projectId={projectId}
                threadId={threadId}
                thread={thread}
                setEditing={setEditing}
              />
            </>
          ) : (
            <>
              <Typography variant="h5">{thread.title}</Typography>
              {user && user._id === thread.contributor._id ? (
                <IconButton
                  className={css.editIcon}
                  style={{ margin: '0px' }}
                  onClick={() => setEditing(true)}
                >
                  <EditIcon />
                </IconButton>
              ) : null}
            </>
          )}
        </Box>
        <Box className={isXSmall ? css.timeNameInfoMobile : css.timeNameInfo}>
          <Typography variant="body2">
            {`By ${thread.contributor.name}`}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Box className={css.timeNameInfo}>
            <WorkOutlineIcon fontSize="small" />
            <Typography variant="body2">
              <RouterLink
                to={`/projects/${thread.projectId._id}`}
                className={clsx(css.link, css.projectLinkDark)}
              >
                {thread.projectId.name}
              </RouterLink>
            </Typography>
          </Box>
        </Box>
        <Divider className={css.divider} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {!editingPm ? (
            <>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <StyledChip
                  icon={
                    thread.isClosed ? (
                      <HistoryOutlinedIcon />
                    ) : (
                      <InfoOutlinedIcon />
                    )
                  }
                  color="secondary"
                  bgcolor={
                    thread.isClosed
                      ? closedStatusColors.closed
                      : closedStatusColors.open
                  }
                  label={thread.isClosed ? 'Closed' : 'Open'}
                  key="isClosed"
                  size="small"
                  className={css.chipMR}
                />

                <StyledChip
                  color="secondary"
                  icon={
                    thread.bugType === 'Bug' ? (
                      <BugReportIcon />
                    ) : (
                      <HelpOutlineIcon />
                    )
                  }
                  bgcolor={
                    thread.bugType === 'Bug'
                      ? bugTypeColors.bug
                      : bugTypeColors.query
                  }
                  label={thread.bugType}
                  key="bugType"
                  size="small"
                  className={css.chipMR}
                />
                <StyledChip
                  color="secondary"
                  icon={<ArrowUpwardIcon />}
                  bgcolor={bugPriorityColors[thread.bugPriority.toLowerCase()]}
                  label={thread.bugPriority}
                  key="bugPriority"
                  size="small"
                  className={css.chipMR}
                />
              </Box>
              {user && user._id === thread.projectId.projectManager ? (
                <IconButton
                  className={css.editIcon}
                  style={{ margin: '0px' }}
                  onClick={() => setEditingPm(true)}
                >
                  <EditIcon />
                </IconButton>
              ) : null}
            </>
          ) : (
            <UpdateChip
              projectId={projectId}
              threadId={threadId}
              initialValues={[
                thread.isClosed ? 'Closed' : 'Open',
                thread.bugType,
                thread.bugPriority,
              ]}
              setEditingPm={setEditingPm}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

const TitleForm = ({ projectId, threadId, thread, setEditing }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.thread.loading);
  const css = useStyles();
  const titleForm = useFormik({
    initialValues: {
      title: thread.title,
    },
    validate: (values) => {
      const errors = {};
      let { title } = values;
      title = title.trim();
      if (!title) errors.title = 'Title is Required';
      return errors;
    },
    onSubmit: (values) => {
      const str = values.title.trim();
      dispatch(
        updateThread(
          projectId,
          null,
          null,
          str,
          thread.description,
          null,
          threadId
        )
      );
      setEditing(false);
    },
  });

  useEffect(() => {
    titleForm.setSubmitting(false);
  }, [isLoading]);
  return (
    <form onSubmit={titleForm.handleSubmit} style={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between">
        <Input
          id="title"
          placeholder="Title"
          variant="outlined"
          value={titleForm.values.title}
          onChange={titleForm.handleChange}
          onBlur={titleForm.handleBlur}
          disableUnderline
          style={{ width: '90%' }}
        />
        <Box display="flex" justifyContent="space-between">
          <IconButton
            type="submit"
            onClick={() => setEditing(false)}
            style={{ borderRadius: '24px', marginRight: '6px' }}
            disabled={titleForm.isSubmitting}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            type="submit"
            onClick={titleForm.handleSubmit}
            style={{ borderRadius: '24px' }}
            disabled={titleForm.isSubmitting}
          >
            <SaveIcon />
          </IconButton>
        </Box>
      </Box>
    </form>
  );
};
export default ThreadTitle;
