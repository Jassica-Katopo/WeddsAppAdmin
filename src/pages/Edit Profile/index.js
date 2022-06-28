import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderEditProfile from '../../components/HeaderEditProfile';
import {Gap, Button, TextInput} from '../../components';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ProfileKosong, RectangleEditProfile} from '../../assets/icons';
import FIREBASE from '../../config/Firebase';

const EditProfile = ({navigation, route}) => {
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {uid} = route.params;
  console.log('uid', uid);

  const [profile, setProfile] = useState([
    {
      userName: '',
      photo: '',
      phoneNumber: '',
      address: '',
    },
  ]);
  const [photo, setPhoto] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');

  const getPhoto = async () => {
    const result = await launchImageLibrary({
      maxHeight: 140,
      maxWidth: 140,
      includeBase64: true,
    });

    if (result.didCancel) {
      setHasPhoto(false);
    } else {
      setPhoto(result.assets[0].uri);
      setPhotoBase64(result.assets[0].base64);
      setHasPhoto(true);
    }
  };
  const getProfile = () => {
    const reference = FIREBASE.database().ref(`/vendors/${uid}`);
    console.log('data', reference);
    reference.on('value', res => {
      console.log('User data: ', res.val().image);
      const userName = res.val().name;
      const phoneNumber = res.val().phoneNumber;
      const address = res.val().address;
      console.log(userName);
      setProfile([
        {
          userName: userName,
          phoneNumber: phoneNumber,
          address: address,
        },
      ]);
    });
  };

  const onSubmit = () => {
    if (!(fullName && phoneNum && address && photoBase64)) {
      showMessage({
        message: 'Please insert all the data.',
        type: 'danger',
        duration: 1000,
      });
    } else {
      const data = {
        name: fullName,
        phoneNumber: phoneNum,
        address: address,
        image: `data:image/jpeg;base64, ${photoBase64}`,
      };

      FIREBASE.database().ref(`vendors/${uid}`).update(data);
      showMessage({
        message: 'Successfully Change.',
        type: 'success',
        duration: 1000,
      });
      navigation.navigate('MainApp', {uid: uid});
    }
  };
  return (
    <View style={styles.container}>
      <HeaderEditProfile
        onPress={() => navigation.navigate('MainApp', {uid: uid})}
      />
      <Gap height={23} />
      {/* Content */}
      <View style={styles.contentWrapper}>
        <TouchableOpacity onPress={getPhoto}>
          {!hasPhoto && (
            <View
              style={{
                borderRadius: 10,
                height: 140,
                width: 140,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RectangleEditProfile />
              <View style={{position: 'absolute'}}>
                <ProfileKosong />
              </View>
            </View>
          )}
          {hasPhoto && (
            <Image
              source={{uri: photo}}
              style={{borderRadius: 10, height: 140, width: 140}}
            />
          )}
        </TouchableOpacity>
        <Gap height={56} />
        {/* <Button
        width={244}
        height={43}
        title={'Change Profile Picture'}
        fontWeight={'normal'}
      /> */}
        <Gap height={39} />
        {profile.map(item => (
          <View key={uid}>
            <TextInput
              title={'Vendor Name'}
              placeholder={item.userName}
              height={45}
              width={323}
              value={fullName}
              onChangeText={value => setFullName(value)}
            />
            <Gap height={27} />
            <TextInput
              title={'Phone Number'}
              placeholder={item.phoneNumber}
              height={45}
              width={323}
              keyboardType="numeric"
              value={phoneNum}
              onChangeText={value => setPhoneNum(value)}
            />
            <Gap height={27} />
            <TextInput
              title={'Address'}
              placeholder={item.address}
              height={45}
              width={323}
              value={address}
              onChangeText={value => setAddress(value)}
            />
          </View>
        ))}

        <Gap height={33} />
      </View>
      {/* Footer */}
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title={'Save Change'}
          height={43}
          width={233}
          fontWeight={'normal'}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});