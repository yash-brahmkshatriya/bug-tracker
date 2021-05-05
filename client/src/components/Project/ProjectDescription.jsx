import React from 'react';
import {
  Typography,
  Box,
  useMediaQuery,
  TextField,
  Paper,
} from '@material-ui/core';
import { useStyles as projDetStyles } from './projDetStyles';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { useStyles as threadStyles } from '../Threads/threadStyles';

function ProjectDescription({ mode, editForm, description }) {
  const css = projDetStyles();
  const threadCss = threadStyles();
  return (
    <Paper
      elevation={4}
      className={threadCss.paperSection}
      style={{ marginTop: '8px' }}
    >
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <DescriptionOutlinedIcon />
          <Typography variant="h5" style={{ marginLeft: '8px' }}>
            Description
          </Typography>
        </Box>
        <Box className={css.timeNameInfo} style={{ paddingLeft: '4px' }}>
          {mode === 'edit' ? (
            <TextField
              type="text"
              fullWidth
              multiline
              rowsMax={5}
              id="description"
              value={editForm.values.description}
              onChange={editForm.handleChange}
              onBlur={editForm.handleBlur}
              label="Project Description"
              InputProps={{ disableUnderline: true }}
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
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default ProjectDescription;
