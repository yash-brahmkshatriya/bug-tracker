import React from "react";
import { Box, Grid, Typography, Paper, Divider } from "@material-ui/core";
import { useStyles } from "../threadStyles";
function ThreadDescription({ thread }) {
  const css = useStyles();
  return (
    <Paper elevation={4} className={css.paperSection}>
      <Box p={2}>
        <Typography variant="h5">Description</Typography>
        <Typography variant="body1">{thread.description}</Typography>
      </Box>
    </Paper>
  );
}

export default ThreadDescription;
