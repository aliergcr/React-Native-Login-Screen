import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser, changePassword } from '../redux/actions/authActions';
import { AppStyles } from '../AppStyles';
import ChangePassword from '../components/changePassword/ChangePassword';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const submitInput = (password, newPassword) => {
    dispatch(changePassword(password, newPassword));
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => dispatch(logoutUser())}
      >
        <Text style={{ fontSize: 20 }}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 20 }}>Change Password</Text>
      </TouchableOpacity>
      <ChangePassword
        isModalVisible={modalVisible}
        closeDialog={() => setModalVisible(false)}
        submitInput={(password, newPassword) =>
          submitInput(password, newPassword)
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: AppStyles.buttonWidth,
    height: AppStyles.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.secondaryColor,
    borderRadius: AppStyles.borderRadiusMain,
    marginTop: 30,
  },
});
