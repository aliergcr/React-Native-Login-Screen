import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import validation from '../validate/validate';

export default function ChangePassword({
  isModalVisible,
  closeDialog,
  submitInput,
}) {
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [newPasswordError, setnewPasswordError] = useState('');
  const [passwordError, setpasswordError] = useState('');

  var cancelText = 'Çıkış';
  var submitText = 'Onay';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        closeDialog();
        setpassword('');
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={() => {
            closeDialog();
          }}
        >
          <View style={styles.modal_container}>
            <View style={styles.modal_body}>
              <Text style={styles.title_modal}>Şifre Değiştirme</Text>
              <Text>
                Lütfen yeni şifrenizi girin (En az 6 karakterden oluşmalıdır).
              </Text>
              <TextInput
                style={styles.input_container}
                placeholder="Şu an kullanılan şifre"
                // keyboardType="number-pad"
                secureTextEntry={true}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={(value) => {
                  setpassword(value.trim());
                  setpasswordError(validation('password', value.trim()));
                }}
                value={password}
              />
              <TextInput
                style={styles.input_container}
                placeholder="Yeni şifre"
                // keyboardType="number-pad"
                secureTextEntry={true}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={(value) => {
                  setnewPassword(value.trim());
                  setnewPasswordError(validation('password', value.trim()));
                }}
                value={newPassword}
              />
              <TextInput
                style={styles.input_container}
                placeholder="Yeni şifreyi doğrulayın"
                //keyboardType="number-pad"
                secureTextEntry={true}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={(value) => {
                  setconfirmPassword(value.trim());
                }}
                value={confirmPassword}
              />
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.touch_modal}
                onPress={() => {
                  closeDialog();
                  setpassword('');
                  setnewPassword('');
                  setconfirmPassword('');
                }}
              >
                <Text style={styles.btn_modal_left}>{cancelText}</Text>
              </TouchableOpacity>
              <View style={styles.divider_btn}></View>
              <TouchableOpacity
                style={styles.touch_modal}
                onPress={() => {
                  if (
                    newPasswordError == null &&
                    passwordError == null &&
                    newPassword === confirmPassword &&
                    password !== '' &&
                    newPassword !== ''
                  ) {
                    submitInput(password, newPassword);
                    setpassword('');
                    setnewPassword('');
                    setconfirmPassword('');
                  } else {
                    Alert.alert(
                      '',
                      'Lütfen şifreyi kontrol edip tekrar deneyiniz.'
                    );
                  }
                }}
              >
                <Text style={styles.btn_modal_right}>{submitText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        backgroundColor: 'rgba(0,0,0,0.62)',
      },
    }),
  },
  modal_container: {
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor: '#E3E6E7',
        borderRadius: 10,
        minWidth: 300,
      },
      android: {
        backgroundColor: '#fff',
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
      },
    }),
  },
  modal_body: {
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 24,
      },
    }),
  },
  title_modal: {
    fontWeight: 'bold',
    fontSize: 20,
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 5,
      },
      android: {
        textAlign: 'left',
      },
    }),
  },
  message_modal: {
    fontSize: 16,
    ...Platform.select({
      ios: {
        textAlign: 'center',
        marginBottom: 10,
      },
      android: {
        textAlign: 'left',
        marginTop: 20,
      },
    }),
  },
  input_container: {
    textAlign: 'left',
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#B0B0B0',
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: '#009688',
      },
    }),
  },
  btn_container: {
    flex: 1,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#B0B0B0',
        maxHeight: 48,
      },
      android: {
        alignSelf: 'flex-end',
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
      },
    }),
  },
  divider_btn: {
    ...Platform.select({
      ios: {
        width: 1,
        backgroundColor: '#B0B0B0',
      },
      android: {
        width: 0,
      },
    }),
  },
  touch_modal: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android: {
        paddingRight: 8,
        minWidth: 64,
        height: 36,
      },
    }),
  },
  btn_modal_left: {
    ...Platform.select({
      fontWeight: 'bold',
      ios: {
        fontSize: 18,
        color: '#408AE2',
        textAlign: 'center',
        borderRightWidth: 5,
        borderColor: '#B0B0B0',
        padding: 10,
        height: 48,
        maxHeight: 48,
      },
      android: {
        textAlign: 'right',
        color: '#009688',
        padding: 8,
      },
    }),
  },
  btn_modal_right: {
    ...Platform.select({
      fontWeight: 'bold',
      ios: {
        fontSize: 18,
        color: '#408AE2',
        textAlign: 'center',
        padding: 10,
      },
      android: {
        textAlign: 'right',
        color: '#009688',
        padding: 8,
      },
    }),
  },
});
