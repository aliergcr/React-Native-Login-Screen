import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { AppStyles } from '../AppStyles';
import Loading from '../components/loading/Loading';
import SelectColor from '../components/colorPicker/SelectColor';
import DeviceSwitch from '../components/deviceSwitch/DeviceSwitch';
import '../components/mqtt/MqttConfig';
export default function HomeScreen({}) {
  const {
    deviceInfo: { deviceId },
    loading,
  } = useSelector((state) => state.user);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(loading);
  }, [loading]);
  console.info('deviceId', deviceId);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          // justifyContent: 'center',
          justifyContent: 'flex-start',
          backgroundColor: AppStyles.primaryColor,
        }}
      >
        <StatusBar
          backgroundColor={AppStyles.secondaryColor}
          barStyle="light-content"
        />
        {pageLoading ? (
          <Loading backgroundcolor={AppStyles.colorBackground} />
        ) : deviceId ? (
          <>
            <DeviceSwitch />
            <SelectColor />
          </>
        ) : (
          <>
            <Text style={styles.textStyle}>Cihaz eklenmemiş.</Text>
            <Text style={styles.textStyle}>
              Lütfen "Ayarlar" bölümünden cihaz ekleyiniz
            </Text>
          </>
        )}
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: AppStyles.titleFontSize,
    color: AppStyles.titleColor,
    textAlign: 'center',
    margin: 5,
  },
});
