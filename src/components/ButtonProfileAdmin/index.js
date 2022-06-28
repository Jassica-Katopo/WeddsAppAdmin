import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Gap from '../Gap';

const ButtonProfileAdmin = ({
  title,
  iconKiri,
  iconKanan,
  gapKiri,
  gapKanan,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.card, styles.elevation]}
      activeOpacity={0.7}
      onPress={onPress}>
      {iconKiri}
      <Gap width={gapKiri} />
      <Text style={styles.txt}>{title}</Text>
      <Gap width={gapKanan} />
      {iconKanan}
    </TouchableOpacity>
  );
};

export default ButtonProfileAdmin;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    // width: '100%',
    height: 51,
    width: 333,
    // textAlign: 'center',
    // paddingHorizontal: 50,
    textAlign: 'center',
    //marginHorizontal: 30,
  },
  elevation: {
    elevation: 3,
    shadowColor: 'black',
  },
  txt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
});
