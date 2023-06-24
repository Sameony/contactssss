import React from 'react'
import {View, Text, Button} from 'react-native'
import { Header } from '../Components'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useState, useEffect} from 'react'
const DisplayContacts = ({History}) => {
    useEffect(()=>{
        getContacts();
    },[])
    const getContacts = async () =>{

    }
  return (
    <View>
        <Text>
        All Contacts comp    
        </Text>
        <Button title='to contact ' onPress={()=>{}}></Button>
    </View>
  )
}

export default DisplayContacts