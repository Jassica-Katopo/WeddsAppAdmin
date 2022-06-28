import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import RoundedButton from '../RoundedButton';

const HomeContent = ({
  buttonTitle = 'Add',
  title = 'Add Package',
  subTitle = 'Add Package for your vendor',
  backgroundColor = '#FFD0EC',
  onPress,
}) => {
  return (
    <View style={styles.container(backgroundColor)}>
      <View style={styles.containerWrapper}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.subHeader}>{subTitle}</Text>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <RoundedButton title={buttonTitle} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeContent;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    height: 196,
    width: 330,
    backgroundColor: backgroundColor,
    borderRadius: 10,
  }),
  header: {
    marginTop: 41.34,
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#000',
  },
  subHeader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#000',
    marginTop: 8,
  },
  containerWrapper: {
    marginLeft: 21.34,
  },
  buttonStyle: {
    marginLeft: 240,
    marginTop: 13,
  },
});
