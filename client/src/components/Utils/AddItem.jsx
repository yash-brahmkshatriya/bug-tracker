import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
} from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";

const AddItem = ({ addThreadForm }) => {
  const theme = useTheme();
  const [addDevDialog, setAddDevDialog] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <IconButton
        onClick={() => {
          setAddDevDialog(true);
        }}
      >
        <PostAddIcon />
      </IconButton>
      <Dialog open={addDevDialog} fullScreen={isSmall} id="addThread">
        <DialogTitle>Add Thread</DialogTitle>
        <DialogContent dividers={true}>
          <form onSubmit={addThreadForm.handleSubmit}>
            <TextField
              id="title"
              value={addThreadForm.values.title}
              onChange={addThreadForm.handleChange}
              onBlur={addThreadForm.handleBlur}
              fullWidth
              label="Thread Title"
              helperText={
                addThreadForm.errors.title && addThreadForm.touched.title
                  ? addThreadForm.errors.title
                  : null
              }
              error={
                addThreadForm.errors.title && addThreadForm.touched.title
                  ? true
                  : false
              }
            />
            <TextField
              id="description"
              multiline
              rows={4}
              value={addThreadForm.values.description}
              onChange={addThreadForm.handleChange}
              onBlur={addThreadForm.handleBlur}
              fullWidth
              label="Thread description"
              helperText={
                addThreadForm.errors.description &&
                addThreadForm.touched.description
                  ? addThreadForm.errors.description
                  : null
              }
              error={
                addThreadForm.errors.description &&
                addThreadForm.touched.description
                  ? true
                  : false
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              addThreadForm.handleSubmit();
              //addThreadForm.setSubmitting(false);
              setAddDevDialog(false);
            }}
            disabled={!addThreadForm.dirty || addThreadForm.isSubmitting}
          >
            Add
          </Button>
          <Button onClick={() => setAddDevDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddItem;
