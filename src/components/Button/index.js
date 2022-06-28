import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({
  title = 'Sign In',
  backgroundColor = '#FFD0EC',
  height = 45,
  onPress,
  width = 250,
  borderRadius = 10,
  fontSize = 17,
  fontWeight = 'bold',
  color = 'white',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container(backgroundColor, height, width, borderRadius)}
      onPress={onPress}>
      <Text style={styles.txt(fontSize, fontWeight, color)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (backgroundColor, height, width, borderRadius) => ({
    height: height,
    width: width,
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  txt: (fontSize, fontWeight, color) => ({
    color: color,
    fontWeight: fontWeight,
    fontSize: fontSize,
  }),
});
