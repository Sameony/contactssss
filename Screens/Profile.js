import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import Contacts from 'react-native-contacts';
const Profile = ({route}) => {
  useEffect(() => {
    console.log(route.params.contactInfo.id)
  // getContact(route.params.contactInfo.id);
}, [])
  return (
    <View>
        <Text>
        Profile Screen    
        </Text>
    </View>
  )
}

export default Profile