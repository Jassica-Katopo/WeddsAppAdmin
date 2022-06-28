import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ButtonProfileAdmin, Gap} from '../../components';
import {
  EditProfile,
  Go,
  Locations,
  SignOUt,
  Whatsapp,
} from '../../assets/icons';
import FIREBASE from '../../config/Firebase';

const ProfileAdmin = ({navigation, route}) => {
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {uid} = route.params;
  console.log('ky', uid);

  const [profile, setProfile] = useState([
    {
      userName: '',
      image: null,
      phoneNumber: '',
      address: '',
      uid: uid,
    },
  ]);
  console.log('name', profile[0].userName);
  const [photoBase64, setPhotoBase64] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState('');

  const getProfile = () => {
    const reference = FIREBASE.database().ref(`/vendors/${uid}`);
    console.log('data', reference);
    reference.on('value', res => {
      console.log('User data: ', res.val().image);
      const name = res.val().name;
      const phoneNumber = res.val().phoneNumber;
      const address = res.val().address;
      const defaultPhoto ='https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png';
      
      console.log('default', defaultPhoto);
      if (res.val().image == 'null') {
        setProfile([
          {
            userName: name,
            phoneNumber: phoneNumber,
            address: address,
            image: defaultPhoto,
          },
        ]);
      } else {
        const photo = res.val().image;
        console.log('image', photo);
        setProfile([
          {
            userName: name,
            phoneNumber: phoneNumber,
            address: address,
            image: photo,
          },
        ]);
      }

    });
  };

  const signOut = () => {
    FIREBASE.auth().signOut().then(() => {
      navigation.navigate('SignIn', {uid: uid})
    }).catch((error) => {
      // An error happened.
    });
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {profile.map(item => (
          <View style={{alignItems: 'center',}} key={uid}>
              <Image source={{uri: item.image}} style={styles.image} />  
              <Gap height={30} />         
            <Text style={styles.title}>{item.userName}</Text>
            <Gap height={11} />
            <View style={{flexDirection: 'row'}}>
              <Whatsapp />
              <Gap width={14} />
              <Text style={styles.txt}>{item.phoneNumber}</Text>
            </View>
            <Gap height={14} />
            <View style={{flexDirection: 'row'}}>
              <Locations />
              <Gap width={14} />
              <Text style={styles.txt}>{item.address}</Text>
            </View>
            <Gap height={24} />
            <ButtonProfileAdmin
              title={'Edit Profile'}
              iconKiri={<EditProfile />}
              iconKanan={<Go />}
              gapKiri={75}
              gapKanan={75}
              onPress={() => navigation.navigate('EditProfile', {uid: uid})}
            />
            <Gap height={37} />
            <ButtonProfileAdmin
              title={'Sign Out'}
              iconKiri={<SignOUt />}
              iconKanan={<Go />}
              gapKiri={87.5}
              gapKanan={87.5}
              onPress={signOut}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProfileAdmin;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFD0EC',
  },
  contentWrapper: {
    backgroundColor: 'white',
    marginTop: 165,
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#575758',
  },
  txt: {
    fontSize: 15,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
    color: '#575758',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 30,
    marginTop: -75
  }
});
