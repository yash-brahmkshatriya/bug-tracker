import React from 'react';
import {
  Box,
  ListItem,
  ListItemText,
  Grid,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { useStyles } from './threadStyles';
import { Link as RouterLink, useParams } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import BugReportIcon from '@material-ui/icons/BugReport';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {
  bugPriorityColors,
  bugTypeColors,
  closedStatusColors,
} from '../../shared/misc';
import StyledChip from '../Utils/StyledChip';
import clsx from 'clsx';
import LoadingComponent from '../Utils/Loading';

const ThreadItem = ({ thread, keepProjectNameHidden = false }) => {
  const css = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return thread ? (
    <ListItem key={thread._id}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <RouterLink
            to={`/projects/${thread.projectId._id}/threads/${thread._id}`}
            className={clsx(css.link, css.linkSecondary)}
          >
            <ListItemText
              primary={thread.title}
              primaryTypographyProps={{ variant: 'h5' }}
            />
          </RouterLink>
          {keepProjectNameHidden ? null : (
            <RouterLink
              to={`/projects/${thread.projectId._id}`}
              className={clsx(css.link, css.projectLink)}
            >
              <ListItemText
                secondary={thread.projectId.name}
                secondaryTypographyProps={{ variant: 'body1' }}
              />
            </RouterLink>
          )}
          <Box className={isSmall ? css.timeNameInfoMobile : css.timeNameInfo}>
            <Typography variant="inherit">{thread.contributor.name}</Typography>
            <FiberManualRecordIcon style={{ fontSize: 8 }} />
            <Typography variant="inherit">
              {getDateTimeString(thread.createdAt)}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          style={{ alignItems: 'flex-end', paddingLeft: 0, paddingRight: 0 }}
        >
          <Box className={isSmall ? css.chipsBoxMobile : css.chipsBoxDesktop}>
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
              label={thread.isClosed ? 'Closed' : 'Open'}
              key="isClosed"
              size="small"
              className={css.chip}
            />
            <StyledChip
              color="secondary"
              icon={
                thread.bugType === 'Bug' ? (
                  <BugReportIcon />
                ) : (
                  <HelpOutlineIcon />
                )
              }
              bgcolor={
                thread.bugType === 'Bug'
                  ? bugTypeColors.bug
                  : bugTypeColors.query
              }
              label={thread.bugType}
              key="bugType"
              size="small"
              className={css.chip}
            />
            <StyledChip
              color="secondary"
              bgcolor={bugPriorityColors[thread.bugPriority.toLowerCase()]}
              label={thread.bugPriority}
              key="bugPriority"
              size="small"
              className={css.chip}
            />
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  ) : (
    <LoadingComponent />
  );
};

function getDateTimeString(ISOString) {
  let date = new Date(ISOString);
  return `${date.toDateString()}`;
}

export default ThreadItem;
