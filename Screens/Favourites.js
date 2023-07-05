import React from 'react'
import {View, PermissionsAndroid, FlatList} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import Contacts from 'react-native-contacts'
import { ContactCard } from '../Components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
const Profile = ({navigation}) => {
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
              setContacts(contacts.filter(e=>e.isStarred));
                console.log(contacts.filter(e=>e.isStarred));
           }
        } catch (error) {
           console.log(error);
        }
     }
     const searchContacts = async (text) =>{
      const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
      if (text === "" || text === null) {
         await getAllContacts();
      } else if (phoneNumberRegex.test(text)) {
        Contacts.getContactsByPhoneNumber(text).then(contactss => {
          setContacts(contactss);
        });
      } else {
        Contacts.getContactsMatchingString(text).then(contactss => {
            setContacts( contactss);
        });
      }
    }
  return (
  <>
   <Searchbar
          placeholder={"Search Favorites"}
          onChangeText={searchContacts}/>
   <FlatList
   data={contacts}
   renderItem={({item, index}) =>  <TouchableOpacity  onPress={() => Contacts.viewExistingContact(item).then(getAllContacts())}>
      <ContactCard contact={item} />
   </TouchableOpacity>}
   keyExtractor={(item, idx) =>  item?.recordID?.toString() || idx.toString()}
   style={{flex:1}}/>
   <View style={{position:"absolute", right:40, bottom:60}}>
   <MaterialCommunityIcons onPress={()=>Contacts.openContactForm({}).then(newcontact=>setContacts([...contacts, newcontact]))}  name="plus-circle" color={"#663399"} size={70} />
   </View>
  </>
  )
}

export default Profile