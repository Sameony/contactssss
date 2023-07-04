import React from 'react'
import {View, PermissionsAndroid, FlatList} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import Contacts from 'react-native-contacts'
import { ContactCard } from '../Components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
const DisplayContacts = ({navigation}) => {
   const isFocused = useIsFocused();
    const [contacts, setContacts] = useState([]);
    useEffect(()=>{
        getAllContacts();
    },[isFocused])
    async function getAllContacts() {
        try {
           const permission = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CONTACTS
           );
           const permission2 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
         );
         console.log(permission2)
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
  <>
   <FlatList
   data={contacts}
   renderItem={({item, index}) =>  <TouchableOpacity  onPress={() => navigation.navigate('View Contact', {
      contactInfo: { id: item.recordID }
   })}>
      <ContactCard contact={item} />
   </TouchableOpacity>}
   keyExtractor={(item, idx) =>  item?.recordID?.toString() || idx.toString()}
   style={{flex:1}}/>
   <View style={{position:"absolute", right:40, bottom:60}}>
   <MaterialCommunityIcons onPress={()=>{navigation.navigate('Add Contact')}}  name="plus-circle" color={"#1E90ff"} size={70} />
   </View>
  </>
  )
}

export default DisplayContacts