import { StyleSheet, Text, View,TextInput as TextInputRN } from 'react-native'
import React from 'react'

const TextInput = ({title, placeholder, ...rest}) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <TextInputRN style={styles.input}
        placeholder={placeholder}
        {...rest}
        placeholderColor= '#6A6666'
      />
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginBottom: 5,
    
  },
  input: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#FFD0EC',
    borderRadius: 15,
    paddingLeft: 15,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 3,
  }
})