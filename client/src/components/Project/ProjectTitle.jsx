import React, { useState } from 'react';
import {
  Typography,
  Box,
  useMediaQuery,
  IconButton,
  Icon,
  TextField,
  Input,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles as projDetStyles, getRandomColor } from './projDetStyles';
function ProjectTitle({ mode, editForm, setMode, projectName }) {
  const css = projDetStyles();
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
          />
          <IconButton onClick={() => setMode('view')}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4" className={css.projectTitle}>
            {projectName}
          </Typography>
          <IconButton onClick={() => setMode('edit')}>
            <CreateIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
}

export default ProjectTitle;
