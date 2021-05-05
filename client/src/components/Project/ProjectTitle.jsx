import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  TextField,
  CircularProgress,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { useStyles as projDetStyles } from './projDetStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles as threadStyles } from '../Threads/threadStyles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EditableChip, { AddTagChip } from './EditableChip';
import ConfirmDialog from '../Utils/ConfirmDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteProject } from '../../redux/actions';
import { useHistory } from 'react-router';

function ProjectTitle({
  mode,
  editForm,
  setMode,
  project,
  isProjectManager,
  setTags,
  handleChipClick,
  tags,
}) {
  const dispatch = useDispatch();
  const css = projDetStyles();
  const threadCss = threadStyles();
  const projectState = useSelector((state) => state.project);
  const isLoading = projectState.loading;
  const hasError = projectState.err;
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const [delProjDialog, setDelProjDialog] = useState(false);

  const openDialog = () => setDelProjDialog(true);
  const closeDialog = () => setDelProjDialog(false);

  const handleDeleteProject = () => {
    dispatch(deleteProject(project._id));
    closeDialog();
    history.replace('/');
  };

  useEffect(() => {
    if (!isLoading && !hasError) {
      setMode('view');
    }
    if (!isLoading) editForm.setSubmitting(false);
  }, [isLoading, hasError]);

  return (
    <Paper
      elevation={4}
      className={threadCss.paperSection}
      style={{ marginTop: '8px' }}
    >
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {mode === 'edit' ? (
            <>
              <TextField
                type="text"
                fullWidth
                id="name"
                value={editForm.values.name}
                onChange={editForm.handleChange}
                onBlur={editForm.handleBlur}
                label="Project Name"
                InputProps={{ disableUnderline: true }}
                style={{ flex: 1 }}
              />
              <IconButton onClick={() => setMode('view')}>
                <CloseIcon />
              </IconButton>

              {isLoading ? (
                <CircularProgress size={25} />
              ) : (
                <IconButton edge="end" aria-label="delete" onClick={openDialog}>
                  <DeleteIcon />
                </IconButton>
              )}
              {isLoading ? (
                <CircularProgress size={25} />
              ) : (
                <IconButton
                  onClick={() => {
                    editForm.handleSubmit();
                  }}
                  disabled={
                    !editForm.dirty ||
                    editForm.isSubmitting ||
                    Object.keys(editForm.errors).length > 0
                  }
                >
                  <SaveIcon />
                </IconButton>
              )}
            </>
          ) : (
            <>
              <Typography variant="h4" className={css.projectTitle}>
                {project.name}
              </Typography>
              {isProjectManager ? (
                <IconButton onClick={() => setMode('edit')}>
                  <CreateIcon />
                </IconButton>
              ) : null}
            </>
          )}
        </Box>
        <Box
          className={
            isXSmall ? threadCss.timeNameInfoMobile : threadCss.timeNameInfo
          }
        >
          <Typography variant="body2">
            {`By ${project.projectManager.name}`}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Box className={threadCss.timeNameInfo}>
            <MailOutlineIcon fontSize="small" />
            <Typography variant="body2">
              {project.projectManager.email}
            </Typography>
          </Box>
        </Box>
        <br />
        <Box className={isSmall ? css.chipsBoxMobile : css.chipsBoxDesktop}>
          <AddTagChip mode={mode} setTags={setTags} />
          {tags.map((tag, idx) => (
            <EditableChip
              idx={idx}
              tag={tag}
              mode={mode}
              onClick={handleChipClick(tag)}
              setTags={setTags}
            />
          ))}
        </Box>
      </Box>
      <ConfirmDialog
        onTrueEvent={handleDeleteProject}
        onFalseEvent={closeDialog}
        showDialog={delProjDialog !== false}
        message="Delete"
      />
    </Paper>
  );
}

export default ProjectTitle;
