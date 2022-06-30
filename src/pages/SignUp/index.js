import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Bridal,
  Catering,
  Photographer,
  SignUpIllustration,
  Venue,
  WO,
} from '../../assets/icons';
import {Button, Gap, TextInput} from '../../components';
import FIREBASE from '../../config/Firebase';

const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('null');

  const [vendor, setVendor] = useState([
    {icon: <Bridal />, id: '1', vendorName:'Bridal'},
    {icon: <Catering />, id: '2', vendorName:'Catering'},
    {icon: <Photographer />, id: '3', vendorName:'Photographer'},
    {icon: <Venue />,id: '4', vendorName:'Venue'},
    {icon: <WO />,id: '5', vendorName:'WO'} 
  ]);
  console.log('vendorName', vendor);

  const [selectVendor, setSelectVendor] = useState({
    id: '1',
  });
  console.log('id', selectVendor);

  const onSubmit = () => {
    FIREBASE.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const uid = res.user.uid;
        const data = {
          name: userName,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          vendor: selectVendor.id,
          image: image,
          vendorId : uid
        };
        FIREBASE.database().ref(`vendors/${uid}`).set(data);
        setUserName('');
        setPhoneNumber('');
        setAddress('');
        setEmail('');
        setPassword('');
        navigation.navigate('SignIn')
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.page}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={10} />
          <View style={styles.illustration}>
            <SignUpIllustration />
            <Gap height={20} />
            <Text style={styles.textFillProfile}>Please Fill Your Profile</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.txtContainer}>Select Vendor Type</Text>
            <Text style={{fontStyle: 'italic'}}>Avialable 5 Category</Text>
          </View>
          <View style={styles.vendorListWrapper}>
            <View>
              <FlatList
                data={vendor}
                //dataName={vendorName}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  //borderRadius: 10,
                  borderWidth: 1,
                  //borderColor: '#FFD0EC',
                  borderRightColor: 'white',
                  borderLeftColor: 'white',
                  borderTopColor: '#FFD0EC',
                  borderBottomColor: '#FFD0EC',
                }}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        selectVendor.id == item.id ? '#FFD0EC' : 'white',
                      width: 80,
                      height: 80,
                      marginRight: 17,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 15,
                      elevation: 6,
                      marginVertical: 7,
                      padding: 3,
                    }}
                    onPress={() => setSelectVendor(item)}>
                    {item.icon}
                    <Text style={styles.textNameVendor}>{item.vendorName}</Text>
                  </TouchableOpacity>
                 
                )}
              />
            </View>
          </View>
          
          <View style={styles.input}>
            <TextInput
              title="Vendor Name"
              placeholder="Type your vendor name"
              value={userName}
              onChangeText={value => setUserName(value)}
            />
            <Gap height={20} />
            <TextInput
              title="Phone Number"
              placeholder="Type your phone number or Whatsapp number"
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={value => setPhoneNumber(value)}
            />
            <Gap height={20} />
            <TextInput
              title="Address"
              placeholder="Type your address"
              value={address}
              onChangeText={value => setAddress(value)}
            />
            <Gap height={20} />
            <TextInput
              title="Email Address"
              placeholder="Type your email address"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <Gap height={20} />
            <TextInput
              title="Password"
              placeholder="Type your password"
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry
            />
            <Gap height={40} />
            <View style={styles.btnWrapper}>
              <Button title="Sign Up" onPress={onSubmit} />
            </View>
            <Gap height={30} />
          </View>
          <View style={styles.footer}>
            <Text>Already have account ? Sign In </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                style={styles.textHere}
                onPress={() => navigation.navigate('SignIn')}>
                here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginTop: 10,
    //marginLeft: 30,
    marginBottom: 15,
    //backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtContainer: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  illustration: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  textFillProfile: {
    fontSize: 18,
    color: '#FFD0EC',
    fontWeight: 'bold',
  },
  input: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  btnWrapper: {
    alignItems: 'center',
  },
  vendorListWrapper: {
    marginHorizontal: 30,
    marginBottom: 10,
  },
  vendorWrapper: {
    marginBottom: 20,
  },
  vendor: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 6,
  },
  bridal: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 6,
  },
  txtVendor: {
    alignSelf: 'center',
    marginTop: 6,
    fontSize: 12,
    color: 'black',
  },
  viewKosong: {
    width: 70,
    height: 70,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  textHere: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  textNameVendor: {
    alignSelf: 'center',
    marginTop: 6,
    fontSize: 11,
    color: 'black',
  }
});