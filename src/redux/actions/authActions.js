import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { firebase, auth, database } from '../../config/config';
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
import { fetchUserData } from './userActions';

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
      dispatch(fetchUserData());
    } else {
      dispatch({
        type: AUTH_USER_FAIL,
        payload: {
          type: 'auth/user-not-login',
          message: 'Lütfen giriş yapın',
        },
      });
    }
  };
};

export const changePassword = (password, newPassword) => {
  return async (dispatch, getState) => {
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
        text1: 'HATA',
        text2: 'Şifre yanlış, lütfen şifrenizi kontrol edip tekrar deneyiniz.',
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
        text1: 'Başarılı',
        text2: 'Şifre değişirme işlemi başarıyla gerçekleştirildi.',
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
        text1: 'HATA',
        text2:
          'Lütfen uygulamadan çıkış yapıp e-mail ve şifrenizle tekrar giriş yaptıktan sonra deneyiniz.',
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
        text1: 'Dikkat',
        text2:
          'Şifre sıfırlama linki adresinize gönderildi, lütfen e-mail adresinizi kontrol edin.',
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
          text1: 'HATA',
          text2: 'E-mail adresiyle uyuşan hesap bulunamadı.',
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
          text1: 'HATA',
          text2: 'E-mail adresini kontrol edip tekrar deneyiniz.',
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
      switch (error.code) {
        case 'auth/invalid-email':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'HATA',
            text2: 'Lütfen geçerli bir e-mail adresi girin.',
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
              message: 'Lütfen geçerli bir e-mail adresi girin.',
            },
          });
          break;
        case 'auth/wrong-password':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'HATA',
            text2: 'Yanlış şifre, lütfen tekrar deneyin.',
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
              message: 'Yanlış şifre, lütfen tekrar deneyin',
            },
          });
          break;

        default:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'HATA',
            text2: 'Lütfen bilgileri kontrol ederek tekrar deneyin.',
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
              message: 'Lütfen bilgileri kontrol ederek tekrar deneyin.',
            },
          });
          break;
      }
    }
    dispatch({ type: AUTH_USER_LOGIN_SUCCESS, payload: userData });
    return dispatch(fetchUserData());
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
      await database().ref(`users/${user.uid}`).set({
        email: email,
        createdAt: user.metadata.creationTime,
        userId: user.uid,
        token: null,
        deviceId: null,
      });
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'HATA',
            text2:
              'E-mail kullanımda, daha önce kaydolduysanız giriş sayfasından giriş yapabilirsiniz.',
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
              message: 'Lütfen geçerli bir e-mail adresi girin.',
            },
          });
          break;
        case 'auth/invalid-email':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'HATA',
            text2: 'E-mail geçersiz, .',
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
              message: 'Lütfen geçerli bir e-mail adresi girin.',
            },
          });
          break;
        case 'auth/invalid-password':
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'HATA',
            text2: 'Geçersiz şifre, lütfen tekrar deneyin.',
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
              message: 'Yanlış şifre, lütfen tekrar deneyin',
            },
          });
          break;

        default:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'HATA',
            text2: 'Lütfen bilgileri kontrol ederek tekrar deneyin.',
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
              message: 'Lütfen bilgileri kontrol ederek tekrar deneyin.',
            },
          });
          break;
      }
    }

    return dispatch({ type: AUTH_USER_CREATE_SUCCESS, payload: userData });
  };
};
