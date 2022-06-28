import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  IconHome,
  IconHomeAktif,
  IconOrder,
  IconOrderAktif,
  IconProfile,
  IconProfileAktif,
} from '../../assets/icons';
import {Home} from '../../pages';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? <IconHomeAktif /> : <IconHome />;
    }
    if (label === 'Profile') {
      return isFocused ? <IconProfileAktif /> : <IconProfile />;
    }
    if (label === 'Order') {
      return isFocused ? <IconOrderAktif /> : <IconOrder />;
    }
    return <Home />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.txt(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  txt: isFocused => ({
    color: isFocused ? '#FFD0EC' : '#666666',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  }),
});
