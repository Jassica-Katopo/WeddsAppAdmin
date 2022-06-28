import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');
const Header = ({title, source}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../../assets/pictures/headeContent.jpg')}
        style={{
          width: width,
          height: 240,
          // marginLeft: 1,
          // marginTop: -5,
          position: 'absolute',
          // backgroundColor: 'red',
        }}
      />
      <Image
        source={source}
        style={{
          width: 70,
          height: 70,
          borderRadius: 70,
          marginLeft: 30,
          marginTop: 66,
        }}
      />
      <Text style={styles.nama}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 158,
    backgroundColor: '#FFD0EC',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  nama: {
    fontFamily: 'Poppins-Bold',
    marginTop: 67,
    color: 'black',
    fontSize: 18,
    marginLeft: 16,
    alignSelf: 'center'
  },
});