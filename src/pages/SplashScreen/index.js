import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {LogoWedds, IllustrationWedding} from '../../assets/icons';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.pages}>
      <LogoWedds />
      <View style={styles.illustration}>
        <IllustrationWedding />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  illustration: {
    position: 'absolute',
    bottom: 0,
  },
});
