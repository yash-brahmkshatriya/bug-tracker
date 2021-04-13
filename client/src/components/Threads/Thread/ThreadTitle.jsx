import { Box, Grid, Typography, Paper, Divider } from "@material-ui/core";
import React from "react";
import StyledChip from "../../Utils/StyledChip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import BugReportIcon from "@material-ui/icons/BugReport";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {
  bugPriorityColors,
  bugTypeColors,
  closedStatusColors,
} from "../../../shared/misc";
import { useStyles } from "../threadStyles";

const ThreadTitle = ({ thread }) => {
  const css = useStyles();
  return (
    <Paper
      elevation={4}
      className={css.paperSection}
      style={{ marginTop: "8px" }}
    >
      <Box p={2}>
        <Typography variant="h5">{thread.title}</Typography>
        <Divider className={css.divider} />
        <StyledChip
          icon={
            thread.isClosed ? <HistoryOutlinedIcon /> : <InfoOutlinedIcon />
          }
          color="secondary"
          bgcolor={
            thread.isClosed
              ? closedStatusColors.closed
              : closedStatusColors.open
          }
          label={thread.isClosed ? "Closed" : "Open"}
          key="isClosed"
          size="small"
          className={css.chipMR}
        />
        <StyledChip
          color="secondary"
          icon={
            thread.bugType === "Bug" ? <BugReportIcon /> : <HelpOutlineIcon />
          }
          bgcolor={
            thread.bugType === "Bug" ? bugTypeColors.bug : bugTypeColors.query
          }
          label={thread.bugType}
          key="bugType"
          size="small"
          className={css.chipMR}
        />
        <StyledChip
          color="secondary"
          bgcolor={bugPriorityColors[thread.bugPriority.toLowerCase()]}
          label={thread.bugPriority}
          key="bugPriority"
          size="small"
          className={css.chipMR}
        />
      </Box>
    </Paper>
  );
};
export default ThreadTitle;
