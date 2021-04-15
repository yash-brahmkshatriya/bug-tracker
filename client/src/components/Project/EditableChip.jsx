import React from 'react';
import { useStyles as projDetStyles } from './projDetStyles';
import { Chip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
function EditableChip({ mode, tag, editForm, idx, ...rest }) {
  const css = projDetStyles();
  const handleDelete = () => {
    let tags = editForm.values.tags;
    tags = [...tags.slice(0, idx), ...tags.slice(idx + 1)];
    editForm.setFieldValue('tags', tags);
  };
  return (
    <Chip
      color="secondary"
      label={tag}
      key={idx}
      size="small"
      clickable={mode === 'view'}
      deleteIcon={mode === 'edit' ? <CancelIcon /> : null}
      onDelete={handleDelete}
      className={css.chip}
      {...rest}
    />
  );
}

export default EditableChip;
