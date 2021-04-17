import { Box, Grid, Typography, Paper, Divider } from '@material-ui/core';
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
import Loading from '../Utils/Loading';
import { useStyles } from './threadStyles';
import ThreadTitle from './Thread/ThreadTitle';
import ThreadDescription from './Thread/ThreadDescription';
import ThreadComments from './Thread/ThreadComments';
import Information from '../Utils/Information';
import NewComment from './Thread/NewComment';
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
  ) : Object.keys(thread.thread).length > 0 ? (
    <>
      <ThreadTitle
        thread={thread.thread}
        projectId={projectId}
        threadId={threadId}
      />
      <ThreadDescription
        thread={thread.thread}
        projectId={projectId}
        threadId={threadId}
      />
      <ThreadComments
        projectId={projectId}
        threadId={threadId}
        comments={thread.thread.comments}
      />
      <NewComment
        isClosed={thread.thread?.isClosed}
        projectId={projectId}
        threadId={threadId}
      />
    </>
  ) : (
    <Information message={thread.err} />
  );
};

export default Threads;
