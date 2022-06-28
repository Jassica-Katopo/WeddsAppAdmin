import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, Header, HomeContent} from '../../components';
import FIREBASE from '../../config/Firebase';

const Home = ({navigation, route}) => {
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [profile, setProfile] = useState([
    {
      userName: '',
      photo: null,
      uid: uid,
    },
  ]);

  const getProfile = () => {
    const reference = FIREBASE.database().ref(`/vendors/${uid}`);
    console.log('data', reference);
    reference.on('value', res => {
      console.log('User data: ', res.val().image);
      const userName = res.val().name;
      console.log(userName);
      if (res.val().image == 'null') {
        const photo =
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png';
        setProfile([
          {
            userName: userName,
            photo: photo,
          },
        ]);
      } else {
        const photo = res.val().image;
        setProfile([
          {
            userName: userName,
            photo: photo,
          },
        ]);
      }
    });
  };

  // const uid = uID;
  const {uid} = route.params;
  console.log('uid:', uid);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#FFD0EC" />
      {profile.map(item => (
        <Header source={{uri: item.photo}} title={item.userName} key={uid} />
      ))}
      <Gap height={70} />
      <View style={styles.content}>
        <HomeContent
          onPress={() => navigation.navigate('AddPackage', {uid: uid})}
        />
        <Gap height={26} />
        <HomeContent
          title="Edit Package"
          subTitle="Edit your detail vendor"
          buttonTitle="Edit"
          backgroundColor="#FF8BD0"
          onPress={() => navigation.navigate('EditPackage', {uid: uid})}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  txt: {
    fontFamily: 'Poppins-Bold',
  },
  content: {
    marginLeft: 31,
  },
});
