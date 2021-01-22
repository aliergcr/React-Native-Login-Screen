import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { AppStyles } from '../../AppStyles';
import { useSelector, useDispatch } from 'react-redux';
import { deviceSwitch } from '../../redux/actions/userActions';

export default function DeviceSwitch() {
  const { deviceInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    setIsEnabled(deviceInfo.onOfSwitch);
  }, [deviceInfo]);
  const toggleSwitch = () => {
    dispatch(deviceSwitch(!isEnabled));
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Cihaz {isEnabled ? 'Açık' : 'Kapalı'}
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#fff' }}
        thumbColor={isEnabled ? AppStyles.secondaryColor : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: AppStyles.height * 0.1,
  },
  textStyle: {
    fontSize: AppStyles.contentFontSize,
    width: AppStyles.width * 0.3,
    marginHorizontal: 15,
    color: AppStyles.titleColor,
  },
});
