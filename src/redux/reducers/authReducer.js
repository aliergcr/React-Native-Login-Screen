import {
  AUTH_USER_CREATE_INIT,
  AUTH_USER_CREATE_FAIL,
  AUTH_USER_CREATE_SUCCESS,
  AUTH_CHANGE_PASSWORD_INIT,
  AUTH_CHANGE_PASSWORD_FAIL,
  AUTH_CHANGE_PASSWORD_SUCCESS,
  AUTH_LOGOUT_INIT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_USER_LOGIN_FAIL,
  AUTH_USER_LOGIN_SUCCESS,
  AUTH_USER_LOGIN_INIT,
  AUTH_USER_INIT,
  AUTH_USER_FAIL,
  AUTH_USER_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  data: {
    userId: null,
    createdAt: null,
    email: null,
  },
  loading: false,
  error: null,
  login: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_CREATE_INIT:
      return {
        ...state,
        loading: true,
      };
    case AUTH_USER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        login: false,
      };
    case AUTH_USER_CREATE_SUCCESS:
      return {
        data: {
          userId: action.payload.uid,
          createdAt: action.payload.metadata.creationTime,
          email: action.payload.email,
        },
        loading: false,
        error: null,
        login: true,
      };
    case AUTH_USER_INIT:
      return {
        ...state,
        loading: true,
      };
    case AUTH_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        login: false,
      };
    case AUTH_USER_SUCCESS:
      return {
        data: {
          userId: action.payload.uid,
          createdAt: action.payload.metadata.creationTime,
          email: action.payload.email,
        },
        loading: false,
        error: null,
        login: true,
      };
    case AUTH_USER_LOGIN_INIT:
      return {
        ...state,
        loading: true,
      };
    case AUTH_USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        login: false,
      };
    case AUTH_USER_LOGIN_SUCCESS:
      return {
        data: {
          userId: action.payload.uid,
          createdAt: action.payload.metadata.createdAt,
          email: action.payload.email,
        },
        loading: false,
        error: null,
        login: true,
      };
    case AUTH_LOGOUT_INIT:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        data: {
          userId: null,
          createdAt: null,
          email: null,
        },
        loading: false,
        error: null,
        login: false,
      };
    case AUTH_CHANGE_PASSWORD_INIT:
      return {
        ...state,
      };
    case AUTH_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AUTH_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        login: false,
      };

    default:
      return state;
  }
};
