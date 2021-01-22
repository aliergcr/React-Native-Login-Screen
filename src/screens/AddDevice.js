import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import { AppStyles } from '../AppStyles';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/loading/Loading';
import { addDevice } from '../redux/actions/userActions';

export default function AddDevice({ navigation }) {
  const { setDeviceIdLoading, deviceInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const onChange = (value) => {
    setId(value);
  };
  useEffect(() => {
    //if (deviceInfo.deviceId) navigation.goBack();
  }, [deviceInfo]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: AppStyles.primaryColor,
      }}
    >
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Ürün id"
          onChangeText={(value) => onChange(value.trim())}
          value={id}
          autoCapitalize="none"
          // onFocus={() => clearErrors('email')}
          placeholderTextColor={AppStyles.solidColor}
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          dispatch(addDevice(id));
          setId('');
        }}
      >
        {setDeviceIdLoading ? (
          <Loading />
        ) : (
          <Text style={styles.textStyle}>Kaydet</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
