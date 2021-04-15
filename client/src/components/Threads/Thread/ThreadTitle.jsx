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
} from '@material-ui/core';
import { useFormik } from 'formik';
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
import {
  bugPriorityColors,
  bugTypeColors,
  closedStatusColors,
} from '../../../shared/misc';
import { useStyles } from '../threadStyles';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { set } from 'mongoose';

const ThreadTitle = ({ projectId, threadId, thread }) => {
  const css = useStyles();
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const user = useSelector((state) => state.user.user);
  const [editing, setEditing] = useState(false);
  return (
    <Paper
      elevation={4}
      className={css.paperSection}
      style={{ marginTop: '8px' }}
    >
      <Box p={2}>
        <Box display="flex" alignItems="center">
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
              {/* {user._id === thread.contributor._id ? (
            <EditIcon style={{ margin: '8px' }} />
          ) : null} */}
              {true ? (
                <EditIcon
                  className={css.editIcon}
                  onClick={() => setEditing(true)}
                />
              ) : null}
            </>
          )}
        </Box>
        <Box className={isXSmall ? css.timeNameInfoMobile : css.timeNameInfo}>
          <Typography variant="body2">
            {`By ${thread.contributor.name}`}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Box
            // display="flex"
            className={css.timeNameInfo}
          >
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
        <StyledChip
          icon={
            thread.isClosed ? <HistoryOutlinedIcon /> : <InfoOutlinedIcon />
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
            thread.bugType === 'Bug' ? <BugReportIcon /> : <HelpOutlineIcon />
          }
          bgcolor={
            thread.bugType === 'Bug' ? bugTypeColors.bug : bugTypeColors.query
          }
          label={thread.bugType}
          key="bugType"
          size="small"
          className={css.chipMR}
        />
        <StyledChip
          color="secondary"
          bgcolor={bugPriorityColors[thread.bugPriority.toLowerCase()]}
          label={thread.bugPriority}
          key="bugPriority"
          size="small"
          className={css.chipMR}
        />
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
        updateThread(projectId, null, null, str, thread.description, threadId)
      );
      setEditing(false);
    },
  });

  useEffect(() => {
    titleForm.setSubmitting(false);
  }, [isLoading]);
  return (
    <form
      // style={{ padding: '8px 16px 16px 16px' }}
      onSubmit={titleForm.handleSubmit}
    >
      <Box display="flex">
        <Input
          id="title"
          placeholder="Title"
          variant="outlined"
          value={titleForm.values.title}
          onChange={titleForm.handleChange}
          onBlur={titleForm.handleBlur}
          disableUnderline
        />

        <Button
          variant="outlined"
          type="submit"
          color="secondary"
          onClick={titleForm.handleSubmit}
          style={{ borderRadius: '24px' }}
          disabled={!titleForm.dirty || titleForm.isSubmitting}
        >
          Save
        </Button>
      </Box>
    </form>
  );
};
export default ThreadTitle;
