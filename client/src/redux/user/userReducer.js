import * as ActionTypes from "./ActionTypes";
import localStorageService from "../../shared/localStorageService";

const initialUserState = {
  loading: true,
  user: null,
  error: null,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ActionTypes.USER_SIGNIN_REQ:
      return { ...state, loading: true };

    case ActionTypes.USER_SIGNIN_SUCCESS:
      localStorageService.setToken(action.payload.token);
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        error: null,
      };

    case ActionTypes.USER_SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case ActionTypes.USER_SIGNOUT:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
