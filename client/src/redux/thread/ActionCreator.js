import * as ActionTypes from './ActionTypes';
import Axios from '../apiCalls';
const createThreadReq = () => {
  return {
    type: ActionTypes.CREATE_THREAD_REQ,
  };
};
const createThreadSuc = (thread) => {
  return {
    type: ActionTypes.CREATE_THREAD_SUC,
    payload: thread,
  };
};
const createThreadFail = (err) => {
  return {
    type: ActionTypes.CREATE_THREAD_FAIL,
    payload: err,
  };
};

const getThreadReq = () => {
  return {
    type: ActionTypes.GET_THREAD_REQ,
  };
};
const getThreadSuc = (thread) => {
  return {
    type: ActionTypes.GET_THREAD_SUC,
    payload: thread,
  };
};
const getThreadFail = (err) => {
  return {
    type: ActionTypes.GET_THREAD_FAIL,
    payload: err,
  };
};

const getAllThreadsReq = () => {
  return {
    type: ActionTypes.GET_ALL_THREADS_REQ,
  };
};
const getAllThreadsSuc = (threads) => {
  return {
    type: ActionTypes.GET_ALL_THREADS_SUC,
    payload: threads,
  };
};
const getAllThreadsFail = (err) => {
  return {
    type: ActionTypes.GET_ALL_THREADS_FAIL,
    payload: err,
  };
};

const postCommentReq = () => {
  return {
    type: ActionTypes.POST_COMMENT_REQ,
  };
};
const postCommentSuc = (comments) => {
  return {
    type: ActionTypes.POST_COMMENT_SUC,
    payload: comments,
  };
};
const postCommentFail = (err) => {
  return {
    type: ActionTypes.POST_COMMENT_FAIL,
    payload: err,
  };
};

const getCommentsReq = () => {
  return {
    type: ActionTypes.GET_COMMENTS_REQ,
  };
};
const getCommentsSuc = (thread) => {
  return {
    type: ActionTypes.GET_COMMENTS_SUC,
    payload: thread,
  };
};
const getCommentsFail = (err) => {
  return {
    type: ActionTypes.GET_COMMENTS_FAIL,
    payload: err,
  };
};

const updateCommentReq = () => {
  return {
    type: ActionTypes.UPDATE_COMMENT_REQ,
  };
};
const updateCommentSuc = (commentId, comment) => {
  return {
    type: ActionTypes.UPDATE_COMMENT_SUC,
    payload: { commentId, comment },
  };
};
const updateCommentFail = (err) => {
  return {
    type: ActionTypes.UPDATE_COMMENT_FAIL,
    payload: err,
  };
};

const updateThreadReq = () => {
  return {
    type: ActionTypes.UPDATE_THREAD_REQ,
  };
};
const updateThreadSuc = (thread) => {
  return {
    type: ActionTypes.UPDATE_THREAD_SUC,
    payload: thread,
  };
};
const updateThreadFail = (err) => {
  return {
    type: ActionTypes.UPDATE_THREAD_FAIL,
    payload: err,
  };
};

const createThread = (projectId, thread) => (dispatch) => {
  dispatch(createThreadReq());
  Axios.post(`/api/project/${projectId}/threads`, thread)
    .then((data) => data.data)
    .then((data) => dispatch(createThreadSuc(data)))
    .catch((err) => dispatch(createThreadFail(err)));
};

const getThread = (projectId, threadId) => (dispatch) => {
  dispatch(getThreadReq());
  Axios.get(`/api/project/${projectId}/threads/${threadId}`)
    .then((data) => data.data)
    .then((data) => dispatch(getThreadSuc(data)))
    .catch((err) => dispatch(getThreadFail(err)));
};

const getAllThreads = (projectId) => (dispatch) => {
  dispatch(getAllThreadsReq());
  Axios.get(`/api/project/${projectId}/threads`)
    .then((data) => data.data)
    .then((data) => dispatch(getAllThreadsSuc(data)))
    .catch((err) => dispatch(getAllThreadsFail(err)));
};

const postComment = (projectId, threadId, comment) => (dispatch) => {
  dispatch(postCommentReq());
  Axios.post(`/api/project/${projectId}/threads/${threadId}/comments`, {
    comment,
  })
    .then((data) => data.data)
    .then((data) => dispatch(postCommentSuc(data)))
    .catch((err) => dispatch(postCommentFail(err)));
};

const getComments = (projectId, threadId) => (dispatch) => {
  dispatch(getCommentsReq());
  Axios.get(`/api/project/${projectId}/threads/${threadId}/comments`)
    .then((data) => data.data)
    .then((data) => dispatch(getCommentsSuc(data)))
    .catch((err) => dispatch(getCommentsFail(err)));
};

const updateComment = (projectId, threadId, comment, commentId) => (
  dispatch
) => {
  dispatch(updateCommentReq());
  Axios.put(
    `/api/project/${projectId}/threads/${threadId}/comments/${commentId}`,
    { comment }
  )
    .then((data) => data.data)
    .then((data) => dispatch(updateCommentSuc(commentId, comment)))
    .catch((err) => dispatch(updateCommentFail(err)));
};

const updateThread = (
  projectId,
  bugPriority,
  isClosed,
  title,
  description,
  bugType,
  threadId
) => (dispatch) => {
  const args = {};
  if (bugPriority !== null) args.bugPriority = bugPriority;
  if (isClosed !== null) args.isClosed = isClosed;
  if (title !== null) args.title = title;
  if (description !== null) args.description = description;
  if (bugType !== null) args.bugType = bugType;
  dispatch(updateThreadReq());
  Axios.put(`/api/project/${projectId}/threads/${threadId}`, args)
    .then((data) => data.data)
    .then((data) => dispatch(updateThreadSuc(data)))
    .catch((err) => dispatch(updateThreadFail(err)));
};

export {
  createThread,
  getThread,
  getAllThreads,
  postComment,
  getComments,
  updateComment,
  updateThread,
};
