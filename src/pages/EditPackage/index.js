import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AddImage, PackageDetails, PackagePrice} from '../../assets/icons';
import {Button, Gap, TextInput_EditPackage, Header} from '../../components';
import FIREBASE from '../../config/Firebase';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

const EditPackage = ({route, navigation}) => {
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
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [photo1, setPhoto1] = useState('');
  const [photo2, setPhoto2] = useState('');
  const [photoBase641, setPhotoBase641] = useState('');
  const [photoBase642, setPhotoBase642] = useState('');
  const [hasPhoto1, setHasPhoto1] = useState(false);
  const [hasPhoto2, setHasPhoto2] = useState(false);

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

  const getPhoto1 = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
    });

    if (result.didCancel) {
      setHasPhoto1(false);
    } else {
      setPhoto1(result.assets[0].uri);
      setPhotoBase641(result.assets[0].base64);
      setHasPhoto1(true);
    }
  };
  const getPhoto2 = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
    });

    if (result.didCancel) {
      setHasPhoto2(false);
    } else {
      setPhoto2(result.assets[0].uri);
      setPhotoBase642(result.assets[0].base64);
      setHasPhoto2(true);
    }
  };

  const onSubmit = () => {
    if (!(name && price && details && photoBase641 && photoBase642)) {
      showMessage({
        message: 'Please insert all the data.',
        type: 'danger',
        duration: 1000,
      });
    } else {
      const data = {
        namePackage: name,
        packagePrice: price,
        description: details,
      };
      const imageData = {
        0: `data:image/jpeg;base64, ${photoBase641}`,
        1: `data:image/jpeg;base64, ${photoBase642}`,
      };

      FIREBASE.database().ref(`vendors/${uid}`).update(data);
      FIREBASE.database().ref(`vendors/${uid}/imagePackage`).update(imageData);
      showMessage({
        message: 'Successfully Change.',
        type: 'success',
        duration: 1000,
      });
      navigation.navigate('MainApp', {uid: uid});
    }
  };

  const {uid} = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        {profile.map(item => (
          <Header source={{uri: item.photo}} title={item.userName} key={uid} />
        ))}
        <Gap height={70} />
        <View style={styles.content}>
          <View style={styles.contentWrapper}>
            <Text style={styles.txtHeader}>Edit Package</Text>
            <Gap height={20} />
            <TouchableOpacity onPress={getPhoto1}>
              {hasPhoto1 && (
                <Image source={{uri: photo1}} style={styles.avatar} />
              )}
              {!hasPhoto1 && <AddImage />}
            </TouchableOpacity>
            <Gap height={20} />
            <TouchableOpacity onPress={getPhoto2}>
              {hasPhoto2 && (
                <Image source={{uri: photo2}} style={styles.avatar} />
              )}
              {!hasPhoto2 && <AddImage />}
            </TouchableOpacity>
            <Gap height={20} />
            <TextInput_EditPackage
              onChangeText={value => setName(value)}
              value={name}
              placeholder="Silver Package"
            />
            <Gap height={25} />
            <TextInput_EditPackage
              icons={<PackagePrice />}
              title="Package Price"
              placeholder="Rp. 0"
              keyboardType="numeric"
              onChangeText={value => setPrice(value)}
              value={price}
            />
            <Gap height={25} />
            <TextInput_EditPackage
              icons={<PackageDetails />}
              title="Details Package"
              placeholder="We offer..."
              //height={130}
              onChangeText={value => setDetails(value)}
              value={details}
            />
            <Gap height={25} />
            <View style={styles.buttonStyles}>
              <Button
                backgroundColor="#FF8BD0"
                width={261}
                title="Change"
                color="#000"
                onPress={onSubmit}
              />
            </View>
            <Gap height={15} />
            <View style={styles.buttonStyles2}>
              <TouchableOpacity
                style={styles.btnBckHome}
                onPress={() => navigation.navigate('MainApp', {uid: uid})}>
                <Text style={{color: 'black'}}>Back to home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditPackage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#FFD0EC',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  txtHeader: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginTop: 30,
  },
  contentWrapper: {
    //marginHorizontal: 28,
    alignItems: 'center',
  },
  buttonStyles: {
    //marginLeft: 15,
  },
  buttonStyles2: {
    // marginLeft: 15,
    marginBottom: 30,
  },
  btnBckHome: {
    borderColor: '#FF8BD0',
    borderWidth: 1,
    alignItems: 'center',
    width: 261,
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
  },
  avatar: {
    width: 292,
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});