import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

import validation from '../validate/validate';
import { AppStyles } from '../../AppStyles';
import Loading from '../loading/Loading';

export default function LoginForm({
  data,
  onSubmit,
  isNewUser,
  navigation,
  resetPasswordModal,
}) {
  const { control, handleSubmit, errors, clearErrors, setError } = useForm({
    defaultValues: { ...data },
  });

  const { loading } = useSelector((state) => state.auth);

  const onSubmitHandler = (data) => {
    if (data.password !== data.confirmPassword && isNewUser) {
      return setError('confirmPassword', {
        type: 'validate',
        message: 'Passwords are not equal',
      });
    }
    onSubmit(data);
  };

  const isEmailValid = (email) => {
    let result = validation('email', email);
    if (result) {
      setError('email', result);
    }
  };

  return (
    <>
      <Text style={[styles.title]}>{isNewUser ? 'Sign Up' : 'Sign In'}</Text>
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <View style={styles.InputContainer}>
            <TextInput
              onEndEditing={(e) => {
                isEmailValid(e.nativeEvent.text);
              }}
              style={styles.body}
              placeholder="E-mail"
              onChangeText={(value) => onChange(value.trim())}
              value={value}
              autoCapitalize="none"
              textContentType="emailAddress"
              onFocus={() => clearErrors('email')}
              placeholderTextColor={AppStyles.solidColor}
              underlineColorAndroid="transparent"
              keyboardType="email-address"
            />
          </View>
        )}
        name="email"
        rules={{
          required: {
            value: true,
            message: 'Enter your e-mail address',
          },
        }}
      />
      {errors?.email && (
        <Text style={styles.errorText}>{errors?.email?.message}</Text>
      )}
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(value) => onChange(value.trim())}
              onFocus={() => clearErrors('password')}
              value={value}
              autoCapitalize="none"
              placeholderTextColor={AppStyles.solidColor}
              underlineColorAndroid="transparent"
            />
          </View>
        )}
        name="password"
        rules={{
          required: {
            value: true,
            message: 'Password is required.',
          },
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        }}
      />
      {errors?.password && (
        <Text style={styles.errorText}>{errors?.password?.message}</Text>
      )}

      {isNewUser && (
        <>
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <View style={styles.InputContainer}>
                <TextInput
                  style={styles.body}
                  secureTextEntry={true}
                  placeholder="Confirm password"
                  onChangeText={(value) => onChange(value.trim())}
                  onFocus={() => clearErrors('confirmPassword')}
                  value={value}
                  autoCapitalize="none"
                  placeholderTextColor={AppStyles.solidColor}
                  underlineColorAndroid="transparent"
                />
              </View>
            )}
            name="confirmPassword"
            rules={{
              required: {
                value: true,
                message: 'E-mail is required.',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            }}
          />
          {errors?.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </>
      )}
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={handleSubmit(onSubmitHandler)}
      >
        {loading ? (
          <Loading />
        ) : (
          <Text style={styles.loginText}>
            {isNewUser ? 'SIGN UP' : 'SIGN IN'}
          </Text>
        )}
      </TouchableOpacity>
      <View style={styles.footerStyle}>
        {!isNewUser && (
          <>
            <TouchableOpacity
              style={styles.subButton}
              onPress={() => resetPasswordModal()}
            >
              <Text style={styles.subText}> Forget Password</Text>
            </TouchableOpacity>
            <Text style={styles.subText}> / </Text>
          </>
        )}
        {isNewUser ? (
          <TouchableOpacity
            style={styles.subButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.subText}>Log In</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.subButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.subText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.primaryColor,
  },
  subText: {
    color: AppStyles.solidColor,
  },
  subButton: {},
  footerStyle: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpButton: {
    width: AppStyles.buttonWidth / 2,
    height: AppStyles.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.secondaryColor,
    borderRadius: AppStyles.borderRadiusMain,
    padding: 10,
    marginTop: 30,
  },
  signUpText: {
    color: AppStyles.textColor,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: AppStyles.defaultFontSize,
  },
  title: {
    fontSize: AppStyles.titleFontSize,
    fontWeight: 'bold',
    color: AppStyles.titleColor,
    marginTop: 20,
    marginBottom: 20,
  },
  loginContainer: {
    width: AppStyles.buttonWidth,
    height: AppStyles.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.secondaryColor,
    borderRadius: AppStyles.borderRadiusMain,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.textColor,
    fontWeight: 'bold',
  },
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.solidColor,
    borderRadius: AppStyles.borderRadiusMain,
    backgroundColor: AppStyles.textInputBackgroundColor,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.inputTextColor,
  },
});
