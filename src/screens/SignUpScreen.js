import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import LoginForm from '../components/loginForm/LoginForm';
import { AppStyles } from '../AppStyles';
import { createUser } from '../redux/actions/authActions';

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(createUser(data.email, data.password));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LoginForm
        isNewUser={true}
        data={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={onSubmit}
        navigation={navigation}
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
