import {
  USER_FETCH_DEVICE_INFO_FAIL,
  USER_FETCH_DEVICE_INFO_SUCCESS,
  USER_FETCH_DEVICE_INFO_INIT,
  USER_DEVICE_SWITCH_FAIL,
  USER_DEVICE_SWITCH_SUCCESS,
  USER_DEVICE_SWITCH_INIT,
  USER_CHANGE_COLOR_FAIL,
  USER_CHANGE_COLOR_SUCCESS,
  USER_CHANGE_COLOR_INIT,
  USER_ADD_DEVICE_INIT,
  USER_ADD_DEVICE_FAIL,
  USER_ADD_DEVICE_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  deviceInfo: {
    deviceId: null,
    onOfSwitch: false,
    color: null,
  },
  sendColorLoading: false,
  sendDeviceSwitchLoading: false,
  setDeviceIdLoading: false,
  loading: false,
  error: null,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_DEVICE_INFO_INIT:
      return {
        ...state,
        loading: true,
      };
    case USER_FETCH_DEVICE_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_FETCH_DEVICE_INFO_SUCCESS:
      return {
        deviceInfo: {
          deviceId: action.payload.deviceId,
          onOfSwitch: action.payload.onOfSwitch,
          color: action.payload.color,
        },
        loading: false,
        error: null,
      };
    case USER_DEVICE_SWITCH_INIT:
      return {
        ...state,
      };
    case USER_DEVICE_SWITCH_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case USER_DEVICE_SWITCH_SUCCESS:
      return {
        deviceInfo: {
          ...state.deviceInfo,
          onOfSwitch: action.payload,
        },
        error: null,
      };

    case USER_CHANGE_COLOR_INIT:
      return {
        ...state,
        sendColorLoading: true,
      };
    case USER_CHANGE_COLOR_FAIL:
      return {
        ...state,
        sendColorLoading: false,
        error: action.payload,
      };
    case USER_CHANGE_COLOR_SUCCESS:
      return {
        deviceInfo: {
          ...state.deviceInfo,
          color: action.payload,
        },
        sendColorLoading: false,
        error: null,
      };

    case USER_ADD_DEVICE_INIT:
      return {
        ...state,
        setDeviceIdLoading: true,
      };
    case USER_ADD_DEVICE_FAIL:
      return {
        ...state,
        setDeviceIdLoading: false,
        error: action.payload,
      };
    case USER_ADD_DEVICE_SUCCESS:
      return {
        deviceInfo: {
          deviceId: action.payload,
          onOfSwitch: false,
          color: '#ff0000',
        },
        setDeviceIdLoading: false,
        error: null,
      };

    default:
      return state;
  }
};
