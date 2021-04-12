import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
  useRouteMatch,
  useParams,
  Switch,
  Route,
} from 'react-router';
import { getThread } from '../../redux/actions';
import StyledChip from '../Utils/StyledChip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import BugReportIcon from '@material-ui/icons/BugReport';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {
  bugPriorityColors,
  bugTypeColors,
  closedStatusColors,
} from '../../shared/misc';
import Loading from '../Utils/Loading';
import { useStyles } from './threadStyles';

const Threads = () => {
  const { path } = useRouteMatch();
  const { projectId } = useParams();
  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={`/projects/${projectId}`} />
      </Route>
      <Route path={`${path}/:threadId`}>
        <Thread />
      </Route>
    </Switch>
  );
};

const Thread = () => {
  const dispatch = useDispatch();
  const css = useStyles();
  const thread = useSelector((state) => state.thread);
  const { projectId, threadId } = useParams();
  useEffect(() => {
    dispatch(getThread(projectId, threadId));
  }, []);
  return thread.loading ? (
    <Loading />
  ) : (
    <Box>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: '8px' }}
      >
        <Grid item xs={12} sm={12} md={8} style={{ marginBottom: '8px' }}>
          <Typography variant="h5">{thread.thread.title}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <StyledChip
            icon={
              thread.thread.isClosed ? (
                <HistoryOutlinedIcon />
              ) : (
                <InfoOutlinedIcon />
              )
            }
            color="secondary"
            bgcolor={
              thread.thread.isClosed
                ? closedStatusColors.closed
                : closedStatusColors.open
            }
            label={thread.thread.isClosed ? 'Closed' : 'Open'}
            key="isClosed"
            size="small"
            className={css.chipMR}
          />
          <StyledChip
            color="secondary"
            icon={
              thread.thread.bugType === 'Bug' ? (
                <BugReportIcon />
              ) : (
                <HelpOutlineIcon />
              )
            }
            bgcolor={
              thread.thread.bugType === 'Bug'
                ? bugTypeColors.bug
                : bugTypeColors.query
            }
            label={thread.thread.bugType}
            key="bugType"
            size="small"
            className={css.chipMR}
          />
          <StyledChip
            color="secondary"
            bgcolor={bugPriorityColors[thread.thread.bugPriority.toLowerCase()]}
            label={thread.thread.bugPriority}
            key="bugPriority"
            size="small"
            className={css.chipMR}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Threads;
