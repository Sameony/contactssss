import React from 'react'
import {View, Text} from 'react-native'
import { Header } from '../Components'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useState, useEffect} from 'react'
const DisplayContacts = () => {
  return (
    <View>
        <Header />
        <Text>
        All Contacts comp    
        </Text>
    </View>
  )
}

export default DisplayContacts