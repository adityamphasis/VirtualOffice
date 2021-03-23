import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';

const ButtonOutline = ({ title, width, textColor, borderColor, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.buttonBox, { width: width ? width : '100%', borderColor: borderColor ? borderColor : 'grey' }]}>
    <Text style={[styles.text, { color: textColor ? textColor : 'black' }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    color: 'black',
    padding: 5,
  },
  buttonBox: {
    borderRadius: 50,
    borderWidth: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ButtonOutline;
