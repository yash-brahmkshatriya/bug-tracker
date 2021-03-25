import * as ActionTypes from "./ActionTypes";

const initialstate = {
  loading: true,
  projects: [],
  project: {},
  err: null,
};

export const projectReducer = (state = initialstate, action) => {
  let project;

  switch (action.type) {
    case ActionTypes.GET_ALL_PROJECTS_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_ALL_PROJECTS_SUC:
      return { ...state, loading: false, projects: action.payload, err: null };
    case ActionTypes.GET_ALL_PROJECTS_FAIL:
      return { ...state, loading: false, err: action.payload, projects: [] };

    case ActionTypes.GET_PROJECT_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_PROJECT_SUC:
      return { ...state, loading: false, project: action.payload, err: null };
    case ActionTypes.GET_PROJECT_FAIL:
      return { ...state, loading: false, err: action.payload, project: {} };

    case ActionTypes.UPDATE_PROJECT_REQ:
      return { ...state, loading: true };
    case ActionTypes.UPDATE_PROJECT_SUC:
      project = {
        ...state.project,
        name: action.payload.name,
        description: action.payload.description,
      };
      return { ...state, loading: false, project, err: null };
    case ActionTypes.UPDATE_PROJECT_FAIL:
      return { ...state, loading: false, err: action.payload };

    case ActionTypes.DELETE_PROJECT_REQ:
      return { ...state, loading: true };
    case ActionTypes.DELETE_PROJECT_SUC:
      return { ...state, loading: false, project: {}, err: null };
    case ActionTypes.DELETE_PROJECT_FAIL:
      return { ...state, loading: false, err: action.payload };

    case ActionTypes.UPDATE_PROJECT_FAIL:
      return { ...state, loading: false, err: action.payload };

    case ActionTypes.MANAGE_DEVELOPER_REQ:
      return { ...state, loading: true };
    case ActionTypes.MANAGE_DEVELOPER_SUC:
      return {
        ...state,
        loading: false,
        project: { ...state.project, developers: action.payload },
        err: null,
      };
    case ActionTypes.MANAGE_DEVELOPER_FAIL:
      return { ...state, loading: false, err: action.payload };
  }
};
