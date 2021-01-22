import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppStyles } from '../AppStyles';
import { useSelector } from 'react-redux';

export default function SettingsScreen({ navigation }) {
  const { deviceInfo } = useSelector((state) => state.user);
  return (
    <SafeAreaView style={styles.contentContainer}>
      <StatusBar
        backgroundColor={AppStyles.secondaryColor}
        barStyle="light-content"
      />

      {deviceInfo?.deviceId && (
        <>
          <Text
            style={[
              styles.textStyle,
              {
                margin: 5,
                fontSize: 22,
                alignSelf: 'center',
                color: AppStyles.secondaryColor,
              },
            ]}
          >
            Kayıtlı Cihazlar
          </Text>
          <View style={styles.box}>
            <MaterialIcon
              style={styles.iconStyle}
              name="alarm-light"
              color="#fff"
            />
            <Text style={styles.textStyle}>
              {' '}
              Cihaz id'si : {deviceInfo.deviceId}{' '}
            </Text>
          </View>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddDevice');
        }}
      >
        <Text style={styles.buttonText}>
          {deviceInfo?.deviceId ? 'Cihaz id Değiştir' : 'Yeni cihaz ekle'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#293462',
  },
  box: {
    flexDirection: 'row',
    height: AppStyles.height * 0.1,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    //borderBottomWidth: 1,
    borderColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.6,
    // shadowRadius: 10,
    // elevation: 10,
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
  },
  iconStyle: {
    margin: 10,
    fontSize: 24,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    alignSelf: 'center',
    width: AppStyles.buttonWidth,
    height: AppStyles.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.secondaryColor,
    borderRadius: AppStyles.borderRadiusMain,
    marginTop: 30,
  },
});
