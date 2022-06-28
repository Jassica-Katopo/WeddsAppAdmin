import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconBack} from '../../assets/icons';

const HeaderEditProfile = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <IconBack />
    </TouchableOpacity>
  );
};

export default HeaderEditProfile;

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginTop: 23,
  },
});
