import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Gap from '../Gap';
import {Add, AddImage, AddImagePackage, Samantha} from '../../assets/icons';

const InputAddPackage = () => {
  return (
    <View>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Gap height={70} />
          <View style={styles.container}>
            <Image
              source={require('../../assets/pictures/samantha.jpg')}
              style={styles.image}
            />
            <TouchableOpacity activeOpacity={0.7}>
              <AddImagePackage />
              <Gap height={11} />
            </TouchableOpacity>
            <Text style={styles.txtAdd}>Add Image Package</Text>
          </View>
          <Gap height={39} />
          <TextInput
            placeholder="Package Name"
            style={styles.input}></TextInput>
          <Gap height={14} />
          <TextInput
            placeholder="Package Price"
            style={styles.input}></TextInput>
          <Gap height={14} />
          <TextInput
            placeholder="Details Package"
            style={styles.inputDetails}></TextInput>
          <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
            <Text style={styles.txtBtn}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default InputAddPackage;

const styles = StyleSheet.create({
  container: {
    width: 309,
    height: 161,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    borderRadius: 10,
    width: 309,
    height: 161,
    backgroundColor: 'pink',
  },
  txtAdd: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: 'black',
  },
  input: {
    width: 270,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
  },
  inputDetails: {
    width: 270,
    height: 111,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
  },
  btn: {
    width: 224,
    height: 36,
    backgroundColor: '#FF8BD0',
    marginTop: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  txtBtn: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 14,
  },
});
