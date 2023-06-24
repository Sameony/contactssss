import React from 'react'
import {View, Text, Button, PermissionsAndroid} from 'react-native'
import {useState, useEffect} from 'react'
import Contacts from 'react-native-contacts'
import { useIsFocused } from '@react-navigation/native';
import { ContactCard } from '../Components';
const DisplayContacts = ({History}) => {
    
    const [contacts, setContacts] = useState([]);
    useEffect(()=>{
        getAllContacts();
    },[])
    async function getAllContacts() {
        try {
           const permission = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CONTACTS
           );
           if(permission === 'granted') {
              const contacts = await Contacts.getAll();
              console.log(contacts);
              setContacts(contacts);
           }
        } catch (error) {
           console.log(error);
        }
     }
  return (
    <View>
        {contacts?.map(ele=>{
            return <ContactCard key={ele.rawContactId} name={ele.displayName}/>
        })}
        <Button title='to contact ' onPress={()=>{}}></Button>
    </View>
  )
}

export default DisplayContacts