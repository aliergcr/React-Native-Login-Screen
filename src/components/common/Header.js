import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppStyles } from '../../AppStyles';

export default function Header({ title }) {
  return (
    <View style={styles.headerComponent}>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  headerComponent: {
    height: 40,
    width: '100%',
    backgroundColor: AppStyles.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
