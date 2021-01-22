import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Svg, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppStyles } from '../AppStyles';
import { changePassword, logoutUser } from '../redux/actions/authActions';
import ChangePassword from '../components/changePassword/ChangePassword';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state) => state);
  const [isModalVisible, setisModalVisible] = useState(false);
  const onSubmit = (password, newPassword) => {
    setisModalVisible(false);
    dispatch(changePassword(password, newPassword));
  };
  const profileImg = require('../../assets/profile_empty.png');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <StatusBar
        backgroundColor={AppStyles.secondaryColor}
        barStyle="light-content"
        translucent
      />
      <Svg
        //style={{ flex: 1, position: 'absolute', top: 0, right: 0 }}
        height={AppStyles.height * 0.4}
        width="100%"
      >
        <Circle
          cx={AppStyles.width / 2}
          //cy={AppStyles.width}
          r={AppStyles.height * 0.3}
          fill={AppStyles.primaryColor}
        />
      </Svg>
      <View style={styles.profilePic}>
        <Image source={profileImg} style={styles.profileImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.box}>
          <Icon
            style={styles.iconStyle}
            name="mail"
            color={AppStyles.primaryColor}
          />
          <Text style={styles.textStyle}>{auth.data.email}</Text>
        </View>
        <View style={styles.box}>
          <Icon
            style={styles.iconStyle}
            name="key"
            color={AppStyles.primaryColor}
          />
          <TouchableOpacity
            onPress={() => {
              setisModalVisible(true);
            }}
          >
            <Text style={styles.textStyle}>Şifreyi değiştir </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <MaterialIcon
            style={styles.iconStyle}
            name="alarm-light"
            color={AppStyles.primaryColor}
          />
          <Text style={styles.textStyle}>
            Cihaz id'si :{' '}
            {user?.deviceInfo?.deviceId
              ? user.deviceInfo.deviceId
              : 'Eşleşen cihaz yok'}
          </Text>
        </View>
        <View style={styles.box}>
          <Icon
            style={styles.iconStyle}
            name="power"
            color={AppStyles.primaryColor}
          />
          <TouchableOpacity onPress={() => dispatch(logoutUser())}>
            <Text style={styles.textStyle}>Çıkış yap</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ChangePassword
        isModalVisible={isModalVisible}
        submitInput={(password, newPassword) => onSubmit(password, newPassword)}
        closeDialog={() => setisModalVisible(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContent: {
    height: AppStyles.height * 0.2,
    backgroundColor: AppStyles.primaryColor,
    borderBottomLeftRadius: AppStyles.height * 0.3,
    borderBottomRightRadius: AppStyles.height * 0.3,
  },
  profilePic: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: AppStyles.secondaryColor,
    height: AppStyles.height * 0.2,
    width: AppStyles.height * 0.2,
    borderRadius: AppStyles.height * 0.1,
    top: AppStyles.height * 0.18,
    right: AppStyles.width / 2 - AppStyles.height * 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  profileImage: {
    flex: 1,
    height: AppStyles.height * 0.2,
    width: AppStyles.height * 0.2,
    borderRadius: AppStyles.height * 0.1,
    overflow: 'hidden',
    //resizeMode: 'contain',
  },
  box: {
    flexDirection: 'row',
    height: AppStyles.height * 0.1,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    //borderBottomWidth: 1,
    borderColor: AppStyles.primaryColor,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.6,
    // shadowRadius: 10,
    // elevation: 10,
  },
  textStyle: {
    fontSize: 18,
    color: AppStyles.primaryColor,
  },
  iconStyle: {
    margin: 10,
    fontSize: 24,
  },
});
