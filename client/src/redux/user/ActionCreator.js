import * as ActionTypes from './ActionTypes';

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

const signInUserFailure = (error) => {
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
