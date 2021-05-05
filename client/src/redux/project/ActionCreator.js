import * as ActionTypes from './ActionTypes';
import Axios from '../apiCalls';
const getDashBoardDetailsReq = () => {
  return {
    type: ActionTypes.GET_DASHBOARD_DETAILS_REQ,
  };
};
const getDashBoardDetailsSuc = (projects) => {
  return {
    type: ActionTypes.GET_DASHBOARD_DETAILS_SUC,
    payload: projects,
  };
};
const getDashBoardDetailsFail = (err) => {
  return {
    type: ActionTypes.GET_DASHBOARD_DETAILS_FAIL,
    payload: err,
  };
};

const getProjectReq = () => {
  return {
    type: ActionTypes.GET_PROJECT_REQ,
  };
};
const getProjectSuc = (project) => {
  return {
    type: ActionTypes.GET_PROJECT_SUC,
    payload: project,
  };
};
const getProjectFail = (err) => {
  return {
    type: ActionTypes.GET_PROJECT_FAIL,
    payload: err,
  };
};

const createProjectReq = () => {
  return {
    type: ActionTypes.CREATE_PROJECT_REQ,
  };
};
const createProjectSuc = (project) => {
  return {
    type: ActionTypes.CREATE_PROJECT_SUC,
    payload: project,
  };
};
const createProjectFail = (err) => {
  return {
    type: ActionTypes.CREATE_PROJECT_FAIL,
    payload: err,
  };
};

const updateProjectReq = () => {
  return {
    type: ActionTypes.UPDATE_PROJECT_REQ,
  };
};
const updateProjectSuc = (projDetails) => {
  return {
    type: ActionTypes.UPDATE_PROJECT_SUC,
    payload: projDetails,
  };
};
const updateProjectFail = (err) => {
  return {
    type: ActionTypes.UPDATE_PROJECT_FAIL,
    payload: err,
  };
};

const deleteProjectReq = () => {
  return {
    type: ActionTypes.DELETE_PROJECT_REQ,
  };
};
const deleteProjectSuc = () => {
  return {
    type: ActionTypes.DELETE_PROJECT_SUC,
  };
};
const deleteProjectFail = (err) => {
  return {
    type: ActionTypes.DELETE_PROJECT_FAIL,
    payload: err,
  };
};

const manageDeveloperReq = () => {
  return {
    type: ActionTypes.MANAGE_DEVELOPER_REQ,
  };
};
const manageDeveloperSuc = (developers) => {
  return {
    type: ActionTypes.MANAGE_DEVELOPER_SUC,
    payload: developers,
  };
};
const manageDeveloperFail = (err) => {
  return {
    type: ActionTypes.MANAGE_DEVELOPER_FAIL,
    payload: err,
  };
};

const exploreProjectsReq = () => {
  return {
    type: ActionTypes.EXPLORE_PROJECTS_REQ,
  };
};
const exploreProjectsSuc = (projects) => {
  return {
    type: ActionTypes.EXPLORE_PROJECTS_SUC,
    payload: projects,
  };
};
const exploreProjectsFail = (err) => {
  return {
    type: ActionTypes.EXPLORE_PROJECTS_FAIL,
    payload: err,
  };
};

const sortProjectsFunction = (direction, byProperty) => {
  return {
    type: ActionTypes.SORT_PROJECT,
    payload: { direction, byProperty },
  };
};

const getDashBoardDetails = () => (dispatch) => {
  dispatch(getDashBoardDetailsReq());
  Axios.get('/api/project/')
    .then((data) => data.data)
    .then((data) => dispatch(getDashBoardDetailsSuc(data)))
    .catch((err) => dispatch(getDashBoardDetailsFail(err)));
};

const getProject = (projectId) => (dispatch) => {
  dispatch(getProjectReq());
  Axios.get(`/api/project/${projectId}`)
    .then((data) => data.data)
    .then((data) => dispatch(getProjectSuc(data)))
    .catch((err) => dispatch(getProjectFail(err)));
};

const createProject = (name, description) => (dispatch) => {
  dispatch(createProjectReq());
  Axios.post('/api/project/', { name, description })
    .then((data) => data.data)
    .then((data) => dispatch(createProjectSuc(data)))
    .catch((err) => dispatch(createProjectFail(err)));
};

const updateProject = (projectId, projDetails) => (dispatch) => {
  dispatch(updateProjectReq());
  Axios.put(`/api/project/${projectId}`, projDetails)
    .then((data) => data.data)
    .then((data) => dispatch(updateProjectSuc(projDetails)))
    .catch((err) => dispatch(updateProjectFail(err)));
};

const deleteProject = (projectId) => (dispatch) => {
  dispatch(deleteProjectReq());
  Axios.delete(`/api/project/${projectId}`)
    .then((data) => data.data)
    .then((data) => dispatch(deleteProjectSuc()))
    .then((data) => dispatch(getDashBoardDetails()))
    .catch((err) => dispatch(deleteProjectFail(err)));
};

const manageDev = (projectId, email, operation) => (dispatch) => {
  dispatch(manageDeveloperReq());
  Axios.post(
    `/api/project/${projectId}/manageDev`,
    { email },
    { params: { operation } }
  )
    .then((data) => data.data)
    .then((data) => dispatch(manageDeveloperSuc(data)))
    .catch((err) => dispatch(manageDeveloperFail(err)));
};

const exploreProjects = (searchString, options = 'all') => (dispatch) => {
  dispatch(exploreProjectsReq());
  Axios.get(`/api/project/explore`, { params: { searchString, options } })
    .then((data) => data.data)
    .then((data) => dispatch(exploreProjectsSuc(data)))
    .catch((err) =>
      dispatch(exploreProjectsFail(err?.request?.body || err.message))
    );
};

const sortProjects = (direction = 'descending', byProperty = 'createdAt') => (
  dispatch
) => {
  dispatch(sortProjectsFunction(direction, byProperty));
};

export {
  getDashBoardDetails,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  manageDev,
  exploreProjects,
  sortProjects,
};
