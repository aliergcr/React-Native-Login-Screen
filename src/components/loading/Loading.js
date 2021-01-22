import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = ({ backgroundcolor }) => (
  <View
    style={[
      styles.container,
      styles.horizontal,
      { backgroundColor: backgroundcolor },
    ]}
  >
    <ActivityIndicator color="#fff" size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loading;
