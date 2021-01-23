import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { auth } from '../../config/config';
import {
  AUTH_USER_CREATE_FAIL,
  AUTH_USER_CREATE_SUCCESS,
  AUTH_USER_CREATE_INIT,
  AUTH_USER_INIT,
  AUTH_USER_FAIL,
  AUTH_USER_SUCCESS,
  AUTH_USER_LOGIN_INIT,
  AUTH_USER_LOGIN_FAIL,
  AUTH_USER_LOGIN_SUCCESS,
  AUTH_LOGOUT_INIT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_CHANGE_PASSWORD_FAIL,
  AUTH_CHANGE_PASSWORD_INIT,
  AUTH_CHANGE_PASSWORD_SUCCESS,
} from './actionTypes';

export const authUser = () => {
  return async (dispatch) => {
    dispatch({ type: AUTH_USER_INIT });
    let user;
    try {
      await auth().onAuthStateChanged((res) => (user = res));
    } catch (error) {
      dispatch({ type: AUTH_USER_FAIL, payload: error });
    }
    if (user) {
      dispatch({ type: AUTH_USER_SUCCESS, payload: user });
    } else {
      dispatch({
        type: AUTH_USER_FAIL,
        payload: {
          type: 'auth/user-not-login',
          message: 'Please Log in',
        },
      });
    }
  };
};

export const changePassword = (password, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_CHANGE_PASSWORD_INIT });
    let firebaseUser = await auth().currentUser;
    let user;
    try {
      let response = await firebaseUser.reauthenticateWithCredential(
        auth.EmailAuthProvider.credential(firebaseUser.email, password)
      );
      user = response.user;
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Wrong password, Please check your password and try again.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS == 'ios' ? 40 : 30,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
      return dispatch({ type: AUTH_CHANGE_PASSWORD_FAIL, payload: error });
    }
    try {
      await firebaseUser
        .updatePassword(newPassword)
        .then((res) => {})
        .catch((error) => {});
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Password changed successfully.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS == 'ios' ? 40 : 30,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please first logout and try again.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS == 'ios' ? 40 : 30,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
      return dispatch({ type: AUTH_CHANGE_PASSWORD_FAIL, payload: error });
    }
    logoutUser();
    return dispatch({ type: AUTH_CHANGE_PASSWORD_SUCCESS });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    try {
      await auth().sendPasswordResetEmail(email);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Attention',
        text2:
          'Your password reset link send to your e-mail address, check your e-mail.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS == 'ios' ? 40 : 30,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    } catch (error) {
      if (error.code == 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'E-mail address is not found.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: Platform.OS == 'ios' ? 40 : 30,
          onShow: () => {},
          onHide: () => {},
          onPress: () => {},
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Please check your e-mail address.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: Platform.OS == 'ios' ? 40 : 30,
          onShow: () => {},
          onHide: () => {},
          onPress: () => {},
        });
      }
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: AUTH_LOGOUT_INIT });
    try {
      await auth().signOut();
    } catch (error) {
      return dispatch({ type: AUTH_LOGOUT_FAIL, payload: error });
    }
    return dispatch({ type: AUTH_LOGOUT_SUCCESS });
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_USER_LOGIN_INIT });
    let userData;
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      userData = user;
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/invalid-email':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'E-mail address is invalid.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: AUTH_USER_LOGIN_FAIL,
            payload: {
              type: 'auth/invalid-email',
              message: 'invalid e-mail.',
            },
          });
        case 'auth/user-not-found':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'User not found, please first sign up.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: AUTH_USER_LOGIN_FAIL,
            payload: {
              type: 'auth/invalid-email',
              message: 'invalid e-mail.',
            },
          });
        case 'auth/wrong-password':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Wrong password, please try again.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: AUTH_USER_LOGIN_FAIL,
            payload: {
              type: 'auth/wrong-password',
              message: 'Wrong password, please try again.',
            },
          });
        default:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2:
              'Please check your e-mail address and password then try again.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: AUTH_USER_LOGIN_FAIL,
            payload: {
              type: 'auth/',
              message:
                'Please check your e-mail address and password then try again.',
            },
          });
      }
    }
    return dispatch({ type: AUTH_USER_LOGIN_SUCCESS, payload: userData });
  };
};

export const createUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_USER_CREATE_INIT });
    let userData;
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      userData = user;
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'E-mail address is already in use.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: AUTH_USER_CREATE_FAIL,
            payload: {
              type: 'auth/email-already-in-use',
              message: 'E-mail address is already in use.',
            },
          });
        case 'auth/invalid-email':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Invalid E-mail address',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: AUTH_USER_CREATE_FAIL,
            payload: {
              type: 'auth/invalid-email',
              message: 'Invalid E-mail address.',
            },
          });
        case 'auth/invalid-password':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Wrong password.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: AUTH_USER_CREATE_FAIL,
            payload: {
              type: 'auth/wrong-password',
              message: 'Wrong Password',
            },
          });

        default:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2:
              'Please check your e-mail address and password then try again.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: Platform.OS == 'ios' ? 40 : 30,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
          return dispatch({
            type: AUTH_USER_CREATE_FAIL,
            payload: {
              type: 'auth/',
              message:
                'Please check your e-mail address and password then try again.',
            },
          });
      }
    }

    return dispatch({ type: AUTH_USER_CREATE_SUCCESS, payload: userData });
  };
};
