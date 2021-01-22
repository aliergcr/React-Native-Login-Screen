import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import LoginForm from '../components/loginForm/LoginForm';
import { AppStyles } from '../AppStyles';
import { loginUser, resetPassword } from '../redux/actions/authActions';
import ResetPassword from '../components/resetPassword/ResetPassword';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setmodalVisible] = useState(false);

  const onSubmit = (data) => {
    dispatch(loginUser(data.email, data.password));
  };

  const sendResetPasswordLink = (email) => {
    dispatch(resetPassword(email));
    setmodalVisible(false);
  };
  const resetPasswordModal = () => {
    setmodalVisible(!modalVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LoginForm
        isNewUser={false}
        data={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={onSubmit}
        navigation={navigation}
        resetPasswordModal={resetPasswordModal}
      />
      <ResetPassword
        isDialogVisible={modalVisible}
        closeDialog={resetPasswordModal}
        submitInput={sendResetPasswordLink}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.primaryColor,
  },
});
