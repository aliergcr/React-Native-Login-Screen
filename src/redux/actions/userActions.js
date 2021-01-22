import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import Amplify from 'aws-amplify';

import { database } from '../../config/config';
import {
  USER_FETCH_DEVICE_INFO_FAIL,
  USER_FETCH_DEVICE_INFO_SUCCESS,
  USER_FETCH_DEVICE_INFO_INIT,
  USER_DEVICE_SWITCH_INIT,
  USER_DEVICE_SWITCH_FAIL,
  USER_DEVICE_SWITCH_SUCCESS,
  USER_CHANGE_COLOR_INIT,
  USER_CHANGE_COLOR_FAIL,
  USER_CHANGE_COLOR_SUCCESS,
  USER_ADD_DEVICE_FAIL,
  USER_ADD_DEVICE_INIT,
  USER_ADD_DEVICE_SUCCESS,
} from './actionTypes';

export const addDevice = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_ADD_DEVICE_INIT });

    const {
      auth: { data },
    } = getState();
    const databaseRef = database().ref(`users/${data.userId}`);

    try {
      await databaseRef.update({
        deviceInfo: {
          deviceId: id,
          color: '#ff0000',
          onOfSwitch: false,
        },
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'HATA',
        text2: 'Cihaz bilgileri kaydedilemedi. Lütfen tekrar deneyiniz.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS == 'ios' ? 40 : 30,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
      return dispatch({
        type: USER_ADD_DEVICE_FAIL,
        payload: error.code,
      });
    }
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Bilgi',
      text2: 'Cihaz bilgileri başarılı bir şekilde kaydedildi.',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: Platform.OS == 'ios' ? 40 : 30,
      onShow: () => {},
      onHide: () => {},
      onPress: () => {},
    });

    return dispatch({
      type: USER_ADD_DEVICE_SUCCESS,
      payload: id,
    });
  };
};

export const changeColor = (colorData) => {
  console.log('send', colorData);
  return async (dispatch, getState) => {
    dispatch({ type: USER_CHANGE_COLOR_INIT });

    const {
      auth: { data },
      user: { deviceInfo },
    } = getState();

    const databaseRef = database()
      .ref(`users/${data.userId}`)
      .child('deviceInfo');
    try {
      await databaseRef.update({
        color: colorData,
      });
      await Amplify.PubSub.publish(`color/${deviceInfo.deviceId}`, {
        color: colorData,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'HATA',
        text2: 'Cihaza renk bilgileri gönderilemedi. Lütfen tekrar deneyiniz.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS == 'ios' ? 40 : 30,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
      return dispatch({
        type: USER_CHANGE_COLOR_FAIL,
        payload: error.code,
      });
    }
    return dispatch({
      type: USER_CHANGE_COLOR_SUCCESS,
      payload: colorData,
    });
  };
};

export const deviceSwitch = (status) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_DEVICE_SWITCH_INIT });

    const {
      auth: { data },
      user: { deviceInfo },
    } = getState();

    const databaseRef = database()
      .ref(`users/${data.userId}`)
      .child('deviceInfo');

    try {
      await databaseRef.update({
        onOfSwitch: status,
      });
      await Amplify.PubSub.publish(`switch/${deviceInfo.deviceId}`, {
        switch: status,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'HATA-',
        text2: 'Cihaz bilgileri alınamadı uygulamayı kapatıp tekrar açın.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS == 'ios' ? 40 : 30,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
      return dispatch({
        type: USER_DEVICE_SWITCH_FAIL,
        payload: error.code,
      });
    }
    return dispatch({
      type: USER_DEVICE_SWITCH_SUCCESS,
      payload: status,
    });
  };
};

export const fetchUserData = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_FETCH_DEVICE_INFO_INIT });
    const {
      auth: { data },
    } = getState();
    const databaseRef = database().ref(`users/${data.userId}`);
    try {
      await databaseRef
        .once('value')
        .then((snapshot) => {
          if (snapshot.val().deviceInfo) {
            return dispatch({
              type: USER_FETCH_DEVICE_INFO_SUCCESS,
              payload: snapshot.val().deviceInfo,
            });
          }
          return dispatch({
            type: USER_FETCH_DEVICE_INFO_SUCCESS,
            payload: null,
          });
        })
        .catch((error) => {
          // Toast.show({
          //   type: 'error',
          //   position: 'top',
          //   text1: 'HATA',
          //   text2: 'Cihaz bilgileri alınamadı uygulamayı kapatıp tekrar açın.',
          //   visibilityTime: 3000,
          //   autoHide: true,
          //   topOffset: Platform.OS == 'ios' ? 40 : 30,
          //   onShow: () => {},
          //   onHide: () => {},
          //   onPress: () => {},
          // });
          return dispatch({
            type: USER_FETCH_DEVICE_INFO_FAIL,
            payload: error.code,
          });
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'HATA',
        text2: 'Cihaz bilgileri alınamadı uygulamayı kapatıp tekrar açın.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: Platform.OS == 'ios' ? 40 : 30,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
      return dispatch({
        type: USER_FETCH_DEVICE_INFO_FAIL,
        payload: error.code,
      });
    }
  };
};
