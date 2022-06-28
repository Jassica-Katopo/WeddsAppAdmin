import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';
import React from 'react';
import {PackageName, PackagePrice, Pencil} from '../../assets/icons';
import Gap from '../Gap';

const TextInput_EditPackage = ({
  icons = <PackageName />,
  title = 'Package Name',
  placeholder = '08981865951',
  height = 49,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconName}>
        {icons}
        <Gap width={13} />
        <Text style={styles.txt}>{title}</Text>
      </View>
      <TextInputRN
        style={styles.textInputStyle(height)}
        placeholder={placeholder}
        {...rest}></TextInputRN>
    </View>
  );
};

export default TextInput_EditPackage;

const styles = StyleSheet.create({
  txt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
  },
  iconName: {
    flexDirection: 'row',
  },
  textInputStyle: height => ({
    height: height,
    width: 286,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 13,
  }),
});
