import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';

const ButtonOutline = ({ title, width, textColor, borderColor, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
    style={[styles.buttonBox, { width: width ? width : '100%', borderColor: borderColor ? borderColor : 'grey', borderWidth: 1 }]}>
    {title === 'Get' && <Image style={[{ height: 15, width: 15, margin: 5 }]}
      resizeMode='contain'
      source={require('../assets/playstore.png')} />}
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
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ButtonOutline;
