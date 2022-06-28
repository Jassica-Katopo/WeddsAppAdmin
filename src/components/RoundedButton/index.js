import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RoundedButton = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{title}</Text>
    </View>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  container: {
    height: 43,
    width: 73,
    backgroundColor: '#000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#fff',
  },
});
