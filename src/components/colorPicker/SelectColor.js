import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';

import { AppStyles } from '../../AppStyles';
import Loading from '../loading/Loading';
import { changeColor } from '../../redux/actions/userActions';

export default function SelectColor() {
  const { sendColorLoading, deviceInfo } = useSelector((state) => state.user);
  const [colorInfo, setColorInfo] = useState(deviceInfo.color);

  const dispatch = useDispatch();
  const sendColorData = () => {
    dispatch(changeColor(colorInfo));
  };

  return (
    <View style={styles.contentContainer}>
      <ColorPicker
        defaultColor={colorInfo}
        // onColorSelected={(color) => {
        //   console.log(fromHsv(color));
        //   setColorInfo(color);
        // }}
        onColorChange={(color) => {
          setColorInfo(fromHsv(color));
        }}
        sliderComponent={Slider}
        style={{
          height: AppStyles.height * 0.5,
          width: AppStyles.width * 0.7,
        }}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => sendColorData()}
      >
        {sendColorLoading ? (
          <Loading />
        ) : (
          <Text style={styles.textStyle}>Gönder</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonStyle: {
    width: AppStyles.buttonWidth / 2,
    height: AppStyles.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.secondaryColor,
    borderRadius: AppStyles.borderRadiusMain,
    padding: 10,
    marginTop: 30,
  },
  textStyle: {
    color: AppStyles.titleColor,
    fontSize: AppStyles.contentFontSize,
  },
});
