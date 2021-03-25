import * as ActionTypes from "./ActionTypes";
import Axios from "../apiCalls";
const getAllProjectsReq = () => {
  return {
    type: ActionTypes.GET_ALL_PROJECTS_REQ,
  };
};
const getAllProjectsSuc = (projects) => {
  return {
    type: ActionTypes.GET_ALL_PROJECTS_SUC,
    payload: projects,
  };
};
const getAllProjectsFail = (err) => {
  return {
    type: ActionTypes.GET_ALL_PROJECTS_FAIL,
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
const updateProjectSuc = (name, description) => {
  return {
    type: ActionTypes.UPDATE_PROJECT_SUC,
    payload: { name, description },
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

const getAllProjects = () => (dispatch) => {
  dispatch(getAllProjectsReq());
  Axios.get("/api/project/")
    .then((data) => dispatch(getAllProjectsSuc(data)))
    .catch((err) => dispatch(getAllProjectsFail(err)));
};

const getProject = (projectId) => (dispatch) => {
  dispatch(getProjectReq());
  Axios.get(`/api/project/${projectId}`)
    .then((data) => dispatch(getProjectSuc(data)))
    .catch((err) => dispatch(getProjectFail(err)));
};

const createProject = (name, description) => (dispatch) => {
  dispatch(createProjectReq());
  Axios.post("/api/project/", { name, description })
    .then((data) => dispatch(createProjectSuc(data)))
    .catch((err) => dispatch(createProjectFail(err)));
};

const updateProject = (projectId, name, description) => (dispatch) => {
  dispatch(updateProjectReq());
  Axios.put(`/api/project/${projectId}`, { name, description })
    .then((data) => dispatch(updateProjectSuc(name, description)))
    .catch((err) => dispatch(updateProjectFail(err)));
};

const deleteProject = (projectId) => (dispatch) => {
  dispatch(deleteProjectReq());
  Axios.delete(`/api/project/${projectId}`)
    .then((data) => dispatch(deleteProjectSuc()))
    .catch((err) => dispatch(deleteProjectFail(err)));
};

const manageDev = (projectId, email, operation) => (dispatch) => {
  dispatch(manageDeveloperReq());
  Axios.post(
    `/api/project/${projectId}/manageDev`,
    { email },
    { params: { operation } }
  )
    .then((data) => dispatch(manageDeveloperSuc(data)))
    .catch((err) => dispatch(manageDeveloperFail(err)));
};

export {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  manageDev,
};
