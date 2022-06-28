import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../Header';
import Gap from '../Gap';

const ContentOrder = () => {
  const [dataOrder, setDataOrder] = useState([
    {
      image: require('../../assets/pictures/pict1.jpg'),
      name: 'Park Hyung Sik',
      namePackage: 'Silver Package',
      packagePrice: '3.000.000',
      description: 'Warna sesuai tema musim dingin',
      key: 1,
      isPay: true,
      isApprove: false,
    },
    {
      image: require('../../assets/pictures/pict2.jpg'),
      name: 'Rick Abram',
      namePackage: 'Gold Package',
      packagePrice: '5.000.000',
      description: 'Warna sesuai tema musim gugur',
      key: 2,
      isPay: false,
      isApprove: true,
    },
    {
      image: require('../../assets/pictures/pict3.jpg'),
      name: 'Gerald Wuycang',
      namePackage: 'Platinum Package',
      packagePrice: '1.000.000',
      description: 'Warna sesuai tema musim panas',
      key: 3,
      isPay: true,
      isApprove: false,
    },
  ]);
  // const Order = () => {};
  return (
    <View style={{backgroundColor: 'white'}}>
    <Gap height={40} />
    {dataOrder.map(item => (
      <View style={styles.container} key={item.key}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.wrapperTxt}>
          <Text style={styles.nama}>{item.name}</Text>
          <Text>{item.namePackage}</Text>
          <Text>Rp. {item.packagePrice}</Text>
          <Text style={styles.txtOrder}>Desc: {item.description}</Text>
          {item.isApprove === true ? null : (
            <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                Approve
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', marginRight: 14}}>
          {item.isPay === true ? (
            <Text
              style={{marginTop: 14, fontSize: 9, flex: 1, color: '#E9D35F'}}>
              Waiting for approvall
            </Text>
          ) : null}
          {item.isApprove === true ? (
            <Text
              style={{marginTop: 14, fontSize: 9, flex: 1, color: '#5AD71F'}}>
              Approve
            </Text>
          ) : null}
        </View>
      </View>
    ))}
  </View>
  );
};

export default ContentOrder;

const styles = StyleSheet.create({
  btn: {
    width: 165,
    height: 40,
    backgroundColor: '#FFD0EC',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 170,
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: 'white',
    marginBottom: 30,
    borderRadius: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    elevation: 4,
    // marginTop: 148,
  },
  wrapperTxt: {
    marginLeft: 20,
    marginTop: 10,
    width: 190,
  },
  nama: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  image: {
    width: 64,
    height: 64,
    marginTop: 14,
    marginLeft: 14,
    borderRadius: 10,
  },
  txtOrder: {
    fontSize: 12,
  },
});
