import React from 'react';

import { Typography, Box, useMediaQuery, TextField } from '@material-ui/core';
import { useStyles as projDetStyles } from './projDetStyles';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

function ProjectDescription({ mode, editForm, description }) {
  const css = projDetStyles();
  return (
    <>
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
            style={{ marginTop: '8px', whiteSpace: 'pre-line' }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </>
  );
}

export default ProjectDescription;
