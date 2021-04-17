import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useStyles } from '../threadStyles';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  Input,
  Button,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { getRandomColor } from '../../Project/projDetStyles';
import StyledChip from './../../Utils/StyledChip';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { userTypeColor } from './../../../shared/misc';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../../redux/actions';
import EditIcon from '@material-ui/icons/Edit';

function ThreadComment({ projectId, threadId, comment }) {
  const css = useStyles();
  const user = useSelector((state) => state.user.user);
  const [editing, setEditing] = useState(false);
  return (
    <Paper elevation={4} className={css.customBorderRadius} key={comment._id}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        className={css.customBorderRadiusBox}
      >
        <PersonDetails
          comment={comment}
          editBtn={user && user._id === comment.author._id}
          setEditing={setEditing}
        />
        {editing ? (
          <CommentForm
            projectId={projectId}
            threadId={threadId}
            oldComment={comment}
            setEditing={setEditing}
          />
        ) : (
          <Box
            flex={1}
            p={2}
            textAlign="justify"
            style={{ whiteSpace: 'pre-line' }}
          >
            {comment.comment}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

const PersonDetails = ({ comment, editBtn, setEditing }) => {
  const css = useStyles();
  const person = comment.author;
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
  let bgcolor = userTypeColor.cont;
  let icon = isXSmall ? (
    <PersonAddIcon htmlColor={bgcolor} />
  ) : (
    <PersonAddIcon />
  );

  if (comment.role === 'Developer') {
    bgcolor = userTypeColor.dev;
    icon = isXSmall ? <CodeIcon htmlColor={bgcolor} /> : <CodeIcon />;
  }
  if (comment.role === 'Project Manager') {
    bgcolor = userTypeColor.pm;
    icon = isXSmall ? <PersonIcon htmlColor={bgcolor} /> : <PersonIcon />;
  }

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

        <Box className={css.timeNameInfo}>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            commented {moment(comment.createdAt).fromNow()}
          </Typography>

          {editBtn && (
            <IconButton
              className={css.editIcon}
              onClick={() => setEditing(true)}
              style={{ transform: 'scale(0.8)', margin: '0px' }}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        {isXSmall ? (
          icon
        ) : (
          <StyledChip
            icon={icon}
            color="secondary"
            bgcolor={bgcolor}
            label={comment.role}
            key="isClosed"
            size="small"
            className={css.chipComment}
          />
        )}
      </Box>
    </Box>
  );
};

const CommentForm = ({ projectId, threadId, oldComment, setEditing }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.thread.loading);
  const css = useStyles();
  const commentForm = useFormik({
    initialValues: {
      comment: oldComment.comment,
    },
    validate: (values) => {
      const errors = {};
      let { comment } = values;
      comment = comment.trim();
      if (!comment) errors.comment = 'comment is Required';
      return errors;
    },
    onSubmit: (values) => {
      const str = values.comment.trim();
      dispatch(updateComment(projectId, threadId, str, oldComment._id));
      setEditing(false);
    },
  });

  useEffect(() => {
    commentForm.setSubmitting(false);
  }, [isLoading]);
  return (
    <form onSubmit={commentForm.handleSubmit} style={{ padding: '16px' }}>
      <Input
        id="comment"
        multiline
        placeholder="Leave a comment"
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
          //variant="outlined"
          type="submit"
          onClick={() => setEditing(false)}
          style={{ borderRadius: '24px', marginRight: '6px' }}
          disabled={commentForm.isSubmitting}
        >
          <CloseIcon />
        </Button>
        <Button
          //variant="outlined"
          type="submit"
          onClick={commentForm.handleSubmit}
          style={{ borderRadius: '24px' }}
          disabled={commentForm.isSubmitting}
        >
          <SaveIcon />
        </Button>
      </Box>
    </form>
  );
};

export default ThreadComment;
