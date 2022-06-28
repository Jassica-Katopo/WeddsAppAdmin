import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FIREBASE from '../../config/Firebase';

const Order = ({route}) => {
  const {uid} = route.params;

  useEffect(() => {
    getUserID();
    getOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userIDD, setUserID] = useState('');
  console.log('ha', userIDD);
  const [dataUser, setDataUser] = useState({
    // userName: 'Jassica',
    // image: null,
    // phone: '085255419193',
    // price: '',
    // packageName: 'Gold Package',
    // desc: '20-08-2022',
    // isReserve: true,
  });
  console.log('aaa', dataUser);
  const [hasData, setHasData] = useState(false);
  console.log('datas', hasData);

  const getUserID = () => {
    const reference = FIREBASE.database().ref(`/vendors/${uid}`);
    reference.on('value', res => {
      if (!res.val().checklists) {
        console.log('valls', res.val().checklists);
        const userId = null;
        console.log('id', userId);
        setUserID(userId);
      } else {
        console.log('vallsa', res.val());
        const userId = res.val().checklists.userID.userID;
        console.log('id', userId);
        setUserID(userId);
      }
    });
  };

  const getOrderList = () => {
    const reference = FIREBASE.database().ref(
      `/vendors/${uid}/checklists/${userIDD}`,
    );
    console.log('data', reference);
    reference.on('value', res => {
      if (res.val()) {
        console.log('val', res.val());
        const userName = res.val().name;
        const image = res.val().image;
        const phone = res.val().phone;
        const price = res.val().price;
        const desc = res.val().description;
        const isReserve = res.val().isReserve;
        // const namePackage = res.val().productChecklist.namePackage;
        const isApprove = res.val().isApprove;

        setDataUser({
          userName: userName,
          image: image,
          phone: phone,
          price: price,
          desc: desc,
          isReserve: isReserve,
          // packageName: namePackage,
          isApprove: isApprove,
        });
        setHasData(true);
      }
    });
  };

  const approve = () => {
    const data = {
      isReserve: false,
      isApprove: true,
      userName: dataUser.userName,
      phone: dataUser.phone,
      // packageName: dataUser.packageName,
      price: dataUser.price,
      desc: dataUser.desc,
      image: dataUser.image,
    };
    console.log('xxx', data);
    // FIREBASE.database().ref;
    if (!dataUser) {
      console.log('bbb', dataUser);
    } else {
      FIREBASE.database()
        .ref(`vendors/${uid}/checklists/${userIDD}`)
        .update(data);
      FIREBASE.database().ref(`checklists/${userIDD}`).update(data);
      console.log('ccc', dataUser);
      getOrderList();
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 1,
        paddingHorizontal: 20,
      }}>
      {/* <Gap height={40} /> */}

      {!hasData && (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{color: '#FFD0EC', fontSize: 15}}>No Reservation!</Text>
        </View>
      )}
      {hasData && (
        <View>
          {dataUser.userName === undefined ? (
            <View style={{alignItems: 'center'}}>
            <Text style={{color: '#FFD0EC', fontSize: 15}}>No Reservation!</Text>
            <TouchableOpacity
              onPress={getOrderList}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                backgroundColor: '#FFD0EC',
                borderColor: '#FFD0EC',
                width: 80,
                borderRadius: 7,
                marginTop: 6
              }}>
              <Text style={{color: 'white',fontWeight: 'bold', fontSize: 15}}>Refesh</Text>
            </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <Image source={{uri: dataUser.image}} style={styles.image} />
              <View style={styles.wrapperTxt}>
                <Text style={styles.nama}>{dataUser.userName}</Text>
                <Text>{dataUser.phone}</Text>
                <View style={{flexDirection: 'row'}}>
                  {/* <Text>{dataUser.packageName}</Text> */}
                  <Text>Rp.{dataUser.price}</Text>
                </View>
                <Text style={styles.txtOrder}>
                  Wedding Date : {dataUser.desc}
                </Text>
                <View style={{alignItems: 'flex-start'}}>
                  {dataUser.isReserve === true ? (
                    <Text style={{fontSize: 12, color: '#E9D35F'}}>
                      Waiting for approvall
                    </Text>
                  ) : null}
                  {dataUser.isApprove === true ? (
                    <Text style={{fontSize: 12, color: '#5AD71F'}}>
                      Approve
                    </Text>
                  ) : null}
                </View>
                {dataUser.isApprove === true ? null : (
                  <TouchableOpacity
                    onPress={approve}
                    activeOpacity={0.7}
                    style={styles.btn}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Approve
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Order;

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
    width: '100%',
    marginHorizontal: 20,
    backgroundColor: 'white',
    paddingBottom: 20,
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