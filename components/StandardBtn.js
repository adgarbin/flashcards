import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { blue, white } from '../utils/colors'

export default function StandardBtn ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity 
      style={Platform.OS === 'ios' ? [styles.iosStandardBtn, style] : [styles.AndroidStandardBtn, style]}
      onPress={onPress}>
      <Text style={styles.standardBtnText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosStandardBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidStandardBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginLeft: 10,
    marginRight: 10
  },
  standardBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})