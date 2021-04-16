import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  Button,
  Input,
} from '@material-ui/core';
import { useStyles } from '../threadStyles';
import { postComment } from '../../../redux/actions';
import { getRandomColor } from '../../Project/projDetStyles';
import Information from '../../Utils/Information';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';

const NewComment = ({ isClosed, projectId, threadId }) => {
  const css = useStyles();
  const user = useSelector((state) => state.user.user);
  let message = <Information message="Login to comment" />;
  if (isClosed)
    message = (
      <Information
        Icon={AnnouncementOutlinedIcon}
        message="Sorry, Thread is Closed"
        flexDirection="row"
        fontSize={36}
      />
    );
  return (
    <Paper elevation={4} className={css.customBorderRadius}>
      {user && !isClosed ? (
        <>
          <PersonDetails person={user} />
          <CommentForm projectId={projectId} threadId={threadId} />
        </>
      ) : (
        <Box p={2}>{message}</Box>
      )}
    </Paper>
  );
};

const PersonDetails = ({ person }) => {
  const css = useStyles();
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  let names = person.name.split(' ');
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1)
    initials += names[names.length - 1].charAt(0).toUpperCase();

  const avatarStyles = {
    color: theme.palette.getContrastText(getRandomColor()),
    backgroundColor: getRandomColor(),
    transform: 'scale(0.8)',
  };

  return (
    <Box className={css.commentPersonDetails}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Avatar style={avatarStyles}>{initials}</Avatar>
        <Typography variant="body1" style={{ marginLeft: '8px' }}>
          {person.name}
        </Typography>
      </Box>
    </Box>
  );
};

const CommentForm = ({ projectId, threadId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.thread.loading);
  const css = useStyles();
  const commentForm = useFormik({
    initialValues: {
      comment: '',
    },
    validate: (values) => {
      const errors = {};
      let { comment } = values;
      comment = comment.trim();
      if (!comment) errors.comment = 'Comment is Required';
      return errors;
    },
    onSubmit: (values) => {
      const str = values.comment.trim();
      dispatch(postComment(projectId, threadId, str));
    },
  });

  useEffect(() => {
    commentForm.setSubmitting(false);
  }, [isLoading]);
  return (
    <form
      style={{ padding: '8px 16px 16px 16px' }}
      onSubmit={commentForm.handleSubmit}
    >
      <Input
        id="comment"
        multiline
        placeholder="Leave a Comment"
        rows={4}
        variant="outlined"
        value={commentForm.values.comment}
        onChange={commentForm.handleChange}
        onBlur={commentForm.handleBlur}
        fullWidth
        disableUnderline
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          type="submit"
          color="secondary"
          onClick={commentForm.handleSubmit}
          style={{ borderRadius: '24px' }}
          disabled={!commentForm.dirty || commentForm.isSubmitting}
        >
          Post Comment
        </Button>
      </Box>
    </form>
  );
};

export default NewComment;
