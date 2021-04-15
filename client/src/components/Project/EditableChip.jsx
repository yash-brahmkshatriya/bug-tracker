import React, { useState } from 'react';
import { useStyles as projDetStyles } from './projDetStyles';
import {
  Chip,
  Dialog,
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';

function EditableChip({ mode, tag, idx, onClick, setTags }) {
  const css = projDetStyles();
  const handleDelete = () => {
    setTags((tags) => [...tags.slice(0, idx), ...tags.slice(idx + 1)]);
  };
  return mode === 'view' ? (
    <Chip
      color="secondary"
      label={tag}
      key={idx}
      size="small"
      clickable
      className={css.chip}
      onClick={onClick}
    />
  ) : (
    <Chip
      color="secondary"
      label={tag}
      key={idx}
      size="small"
      onDelete={handleDelete}
      className={css.chip}
    />
  );
}

export const AddTagChip = ({ mode, setTags }) => {
  const css = projDetStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const addTagForm = useFormik({
    initialValues: {
      tag: '',
    },
    onSubmit: (values) => {
      addTag(values.tag);
      setDialogOpen(false);
    },
  });
  const addTag = (tag) =>
    setTags((tags) => {
      let newTags = [...tags];
      newTags.push(tag);
      addTagForm.setSubmitting(false);
      return newTags;
    });

  return mode === 'edit' ? (
    <>
      <Chip
        icon={<AddIcon />}
        color="secondary"
        variant="outlined"
        label="Add Tag"
        key="addTag"
        size="small"
        className={css.chip}
        clickable
        onClick={() => setDialogOpen(true)}
      />
      <Dialog open={dialogOpen} fullScreen={isSmall} id="addTag">
        <DialogTitle>Add Tag</DialogTitle>
        <DialogContent dividers={true}>
          <form onSubmit={addTagForm.handleSubmit}>
            <TextField
              id="tag"
              value={addTagForm.values.tag}
              onChange={addTagForm.handleChange}
              onBlur={addTagForm.handleBlur}
              fullWidth
              label="Tag Name"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={addTagForm.handleSubmit}
            disabled={!addTagForm.dirty || addTagForm.isSubmitting}
          >
            Add
          </Button>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  ) : null;
};

export default EditableChip;
