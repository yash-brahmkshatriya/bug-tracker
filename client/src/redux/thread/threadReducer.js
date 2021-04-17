import * as ActionTypes from './ActionTypes';

const initialstate = {
  loading: true,
  threads: [],
  thread: {},
  err: null,
};

export const threadReducer = (state = initialstate, action) => {
  let newThreads, comments;
  switch (action.type) {
    case ActionTypes.CREATE_THREAD_REQ:
      return { ...state, loading: true };
    case ActionTypes.CREATE_THREAD_SUC:
      newThreads = [...state.threads];
      newThreads.unshift(action.payload);
      return {
        ...state,
        threads: newThreads,
        thread: action.payload,
        loading: false,
        err: null,
      };
    case ActionTypes.CREATE_THREAD_FAIL:
      return { ...state, loading: false, err: action.payload, thread: {} };
    case ActionTypes.GET_THREAD_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_THREAD_SUC:
      return { ...state, loading: false, thread: action.payload, err: null };
    case ActionTypes.GET_THREAD_FAIL:
      return { ...state, loading: false, err: action.payload, thread: {} };
    case ActionTypes.GET_ALL_THREADS_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_ALL_THREADS_SUC:
      return { ...state, loading: false, threads: action.payload, err: null };
    case ActionTypes.GET_ALL_THREADS_FAIL:
      return { ...state, loading: false, threads: [], err: action.payload };
    case ActionTypes.POST_COMMENT_REQ:
      return { ...state, loading: true };
    case ActionTypes.POST_COMMENT_SUC:
      return {
        ...state,
        loading: false,
        thread: { ...state.thread, comments: action.payload },
        err: null,
      };
    case ActionTypes.POST_COMMENT_FAIL:
      return { ...state, loading: false, err: action.payload, thread: {} };
    case ActionTypes.GET_COMMENTS_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_COMMENTS_SUC:
      return { ...state, loading: false, thread: action.payload, err: null };
    case ActionTypes.GET_COMMENTS_FAIL:
      return { ...state, loading: false, err: action.payload };
    case ActionTypes.UPDATE_COMMENT_REQ:
      return { ...state, loading: true };
    case ActionTypes.UPDATE_COMMENT_SUC:
      comments = state.thread.comments;
      let idx = comments.findIndex(
        (comment) => comment._id == action.payload.commentId
      );
      comments[idx].comment = action.payload.comment;
      return {
        ...state,
        loading: false,
        err: null,
        thread: { ...state.thread, comments: comments },
      };
    case ActionTypes.UPDATE_COMMENT_FAIL:
      return { ...state, loading: false, err: action.payload };
    case ActionTypes.UPDATE_THREAD_REQ:
      return { ...state, loading: true };
    case ActionTypes.UPDATE_THREAD_SUC:
      return { ...state, loading: false, err: null, thread: action.payload };
    case ActionTypes.UPDATE_THREAD_FAIL:
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};
