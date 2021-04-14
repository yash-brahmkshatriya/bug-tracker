import React from "react";
import { Box, Grid, Typography, Paper, Divider } from "@material-ui/core";
import { useStyles } from "../threadStyles";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
function ThreadDescription({ thread }) {
  const css = useStyles();
  return (
    <Paper elevation={4} className={css.paperSection}>
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <DescriptionOutlinedIcon />
          <Typography variant="h5" style={{ marginLeft: "8px" }}>
            Description
          </Typography>
        </Box>
        <Divider className={css.divider} />
        <Typography variant="body1" style={{ marginTop: "8px" }}>
          {thread.description}
        </Typography>
      </Box>
    </Paper>
  );
}

export default ThreadDescription;
