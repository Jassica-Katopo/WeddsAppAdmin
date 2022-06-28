import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {IllustrationWedding, LogoWedds} from '../../assets/icons';
import {Gap, TextInput, Button} from '../../../src';
import FIREBASE from '../../config/Firebase';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const onSubmit = () => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(res => {
  //       navigation.navigate('Home', {
  //         uid: res.user.uid,
  //       });
  //     })}

  const onSubmit = () => {
    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user.uid);
        navigation.navigate('MainApp', {uid: res.user.uid});
        setEmail('');
        setPassword('');
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.logoWrapper}>
        <LogoWedds />
      </View>

      <View style={styles.SignInWrapper}>
        <Gap height={10} />
        <TextInput
          title="Email Address"
          placeholder="Type your email address"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <Gap height={10} />
        <TextInput
          title="Password"
          placeholder="Type your password"
          secureTextEntry
          value={password}
          onChangeText={value => setPassword(value)}
        />
        <Gap height={25} />
      </View>
      <View style={styles.btnWrapper}>
        <Button onPress={onSubmit} />
      </View>
      <Gap height={25} />
      <View style={styles.textSignUp}>
        <Text>Don't have account ? Sign Up </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textHere}>here</Text>
        </TouchableOpacity>
      </View>
      {/* masih ta ka atas ini ilustrasi pas mo ba input text */}
      <View style={styles.illustration}>
        <IllustrationWedding />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  illustration: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 90,
  },
  SignInWrapper: {
    marginHorizontal: 30,
  },
  textSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnWrapper: {
    alignItems: 'center',
  },
  textHere: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  btnWrapper: {
    alignItems: 'center',
  },
});