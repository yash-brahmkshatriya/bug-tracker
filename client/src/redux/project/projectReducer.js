import * as ActionTypes from './ActionTypes';
import { sortByProperty } from '../../components/Utils/utilFuncs';
const initialstate = {
  loading: true,
  projects: [],
  dashBoard: {},
  project: {},
  err: null,
};

export const projectReducer = (state = initialstate, action) => {
  let project;

  switch (action.type) {
    case ActionTypes.GET_DASHBOARD_DETAILS_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_DASHBOARD_DETAILS_SUC:
      return {
        ...state,
        loading: false,
        dashBoard: action.payload,
        project: {},
        err: null,
      };
    case ActionTypes.GET_DASHBOARD_DETAILS_FAIL:
      return { ...state, loading: false, err: action.payload, dashBoard: [] };

    case ActionTypes.GET_PROJECT_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_PROJECT_SUC:
      return { ...state, loading: false, project: action.payload, err: null };
    case ActionTypes.GET_PROJECT_FAIL:
      return { ...state, loading: false, err: action.payload, project: {} };

    case ActionTypes.CREATE_PROJECT_REQ:
      return { ...state, loading: true };
    case ActionTypes.CREATE_PROJECT_SUC:
      return { ...state, loading: false, project: action.payload, err: null };
    case ActionTypes.CREATE_PROJECT_FAIL:
      return { ...state, loading: false, err: action.payload, project: {} };

    case ActionTypes.UPDATE_PROJECT_REQ:
      return { ...state, loading: true };
    case ActionTypes.UPDATE_PROJECT_SUC:
      project = {
        ...state.project,
        name: action.payload.name,
        description: action.payload.description,
        tags: action.payload.tags,
      };
      return { ...state, loading: false, project, err: null };
    case ActionTypes.UPDATE_PROJECT_FAIL:
      return { ...state, loading: false, err: action.payload };

    case ActionTypes.DELETE_PROJECT_REQ:
      return { ...state, loading: true };
    case ActionTypes.DELETE_PROJECT_SUC:
      return { ...state, loading: false, err: null, project: {} };
    case ActionTypes.DELETE_PROJECT_FAIL:
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
    case ActionTypes.EXPLORE_PROJECTS_REQ:
      return { ...state, loading: true };
    case ActionTypes.EXPLORE_PROJECTS_SUC:
      return { ...state, loading: false, projects: action.payload };
    case ActionTypes.EXPLORE_PROJECTS_FAIL:
      return { ...state, loading: false, err: action.payload, projects: [] };
    case ActionTypes.SORT_PROJECT:
      return {
        ...state,
        dashBoard: {
          ...state.dashBoard,
          projects: sortByProperty(
            state.dashBoard.projects,
            action.payload.byProperty,
            action.payload.direction
          ),
        },
      };
    default:
      return state;
  }
};
