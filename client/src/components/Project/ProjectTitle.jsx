import React from 'react';
import {
  Typography,
  Box,
  IconButton,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { useStyles as projDetStyles } from './projDetStyles';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject } from '../../redux/actions';

function ProjectTitle({
  mode,
  editForm,
  setMode,
  projectName,
  projectId,
  isProjectManager,
}) {
  const dispatch = useDispatch();
  const css = projDetStyles();
  const projectState = useSelector((state) => state.project);
  const isLoading = projectState.loading;
  const hasError = projectState.err;

  return (
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
            <IconButton
              onClick={() => {
                if (!isLoading && !hasError) {
                  setMode('view');
                }
                dispatch(updateProject(projectId, editForm.values));
              }}
            >
              <SaveIcon />
            </IconButton>
          )}
        </>
      ) : (
        <>
          <Typography variant="h4" className={css.projectTitle}>
            {projectName}
          </Typography>
          {isProjectManager ? (
            <IconButton onClick={() => setMode('edit')}>
              <CreateIcon />
            </IconButton>
          ) : null}
        </>
      )}
    </Box>
  );
}

export default ProjectTitle;
