import React from 'react'
import {View, Text, Button, PermissionsAndroid, FlatList} from 'react-native'
import {useState, useEffect} from 'react'
import Contacts from 'react-native-contacts'
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
            //   console.log(contacts);
              setContacts(contacts);
           }
        } catch (error) {
           console.log(error);
        }
     }
  return (
   <FlatList
   data={contacts}
   renderItem={({item, index}) =>  <ContactCard contact={item} />}
   keyExtractor={(item, idx) =>  item?.recordID?.toString() || idx.toString()}
   style={{flex:1}}/>
  )
}

export default DisplayContacts