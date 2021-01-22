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

export default function ResePassword({
  isDialogVisible,
  closeDialog,
  submitInput,
}) {
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');

  var cancelText = 'Çıkış';
  var submitText = 'Gönder';
  cancelText = Platform.OS === 'ios' ? cancelText : cancelText.toUpperCase();
  submitText = Platform.OS === 'ios' ? submitText : submitText.toUpperCase();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isDialogVisible}
      onRequestClose={() => {
        closeDialog();
        setemail('');
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={() => {
            closeDialog();
            this.setState({ inputModal: '', openning: true });
          }}
        >
          <View style={styles.modal_container}>
            <View style={styles.modal_body}>
              <Text style={styles.title_modal}>Şifre Sıfırlama</Text>
              <Text>Lütfen kayıt olduğunuz E-mail adresini girin.</Text>
              <TextInput
                style={styles.input_container}
                placeholder="E-mail"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={(value) => {
                  setemail(value.trim());
                  setemailError(validation('email', value.trim()));
                }}
                onBlur={() => {
                  setemailError(validation('email', email));
                }}
                value={email}
              />
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.touch_modal}
                onPress={() => {
                  closeDialog();
                  setemail('');
                }}
              >
                <Text style={styles.btn_modal_left}>{cancelText}</Text>
              </TouchableOpacity>
              <View style={styles.divider_btn}></View>
              <TouchableOpacity
                style={styles.touch_modal}
                onPress={() => {
                  if (emailError == null) {
                    submitInput(email);
                  } else {
                    Alert.alert(
                      '',
                      'Lütfen E-mail adresini kontrol edip tekrar deneyiniz.'
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
