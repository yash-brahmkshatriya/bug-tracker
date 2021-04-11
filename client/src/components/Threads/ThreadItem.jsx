import React from "react";
import {
  Box,
  ListItem,
  ListItemText,
  Grid,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useStyles } from "./threadStyles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";

const ThreadItem = ({ thread }) => {
  const css = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ListItem key={thread._id}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <RouterLink to={`/threads/${thread._id}`} className={css.link}>
            <ListItemText
              primary={thread.title}
              primaryTypographyProps={{ variant: "h5" }}
            />
          </RouterLink>
          <RouterLink
            to={`/projects/${thread.projectId._id}`}
            className={css.link}
          >
            <ListItemText secondary={thread.projectId.name} />
          </RouterLink>
          <Box display="flex" alignItems="center" className={css.timeNameInfo}>
            <Typography variant="inherit">{thread.contributor.name}</Typography>
            <FiberManualRecordIcon style={{ fontSize: 8 }} />
            <Typography variant="inherit">
              {getDateTimeString(thread.createdAt)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} style={{ alignItems: "flex-end" }}>
          <Box className={isSmall ? css.chipsBoxMobile : css.chipsBoxDesktop}>
            <Chip
              icon={
                thread.isClosed ? <HistoryOutlinedIcon /> : <InfoOutlinedIcon />
              }
              color="secondary"
              label={thread.isClosed ? "Closed" : "Open"}
              key={0}
              size="small"
              className={css.chip}
            />
            <Chip
              color="secondary"
              label={thread.bugType}
              key={1}
              size="small"
              className={css.chip}
            />
            <Chip
              color="secondary"
              label={thread.bugPriority}
              key={2}
              size="small"
              className={css.chip}
            />
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
};

function getDateTimeString(ISOString) {
  let date = new Date(ISOString);
  return `${date.toDateString()}`;
}

export default ThreadItem;
