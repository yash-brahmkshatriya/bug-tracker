import Axios from "../apiCalls";
import * as ActionTypes from "./ActionTypes";

const signInUserReq = () => {
  return {
    type: ActionTypes.USER_SIGNIN_REQ,
  };
};

const signInUserSuccess = (user) => {
  return {
    type: ActionTypes.USER_SIGNIN_SUCCESS,
    payload: user,
  };
};

const signInUserFail = (error) => {
  return {
    type: ActionTypes.USER_SIGNIN_FAILURE,
    payload: error,
  };
};

export const signOutUser = () => {
  return {
    type: ActionTypes.USER_SIGNOUT,
  };
};

export const devLogin = (email) => (dispatch) => {
  dispatch(signInUserReq());
  Axios.post("/api/user/devTest", { email })
    .then((data) => data.data)
    .then((data) => dispatch(signInUserSuccess(data)))
    .catch((err) =>
      dispatch(signInUserFail(err?.request?.body || err.message))
    );
};
export const googleLogin = (response) => (dispatch) => {
  dispatch(signInUserReq());
  Axios.post("/api/user/googleLogin", { response })
    .then((data) => data.data)
    .then((data) => dispatch(signInUserSuccess(data)))
    .catch((err) =>
      dispatch(signInUserFail(err?.request?.body || err.message))
    );
};
