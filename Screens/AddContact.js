import React, {useState, useEffect} from 'react'
import {View, Button, TextInput, StyleSheet, PermissionsAndroid} from 'react-native'
import Contacts from 'react-native-contacts';
import {Picker} from '@react-native-picker/picker';
const AddContact = ({navigation}) => {
  const [contacts, setcontacts] = useState([''])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [company, setCompany] = useState("")
  const [selectedLabel, setselectedLabel] = useState([])
  useEffect(() => {
    if(contacts[contacts.length-1]?.length > 0) {
       setcontacts((prevState) => [...prevState, '']);
       setselectedLabel([...selectedLabel,"Mobile"])
    }
    try {
       if((contacts[contacts.length-2].length === 0) && (contacts.length >= 2)) {
          setcontacts((prevState) => {
             const newState = prevState.slice();
             newState.pop()
             return newState;
          })
       }
    } catch(err) {console.log()}
 }, [contacts])
  async function addContact() {
    if((!firstName && !lastName) || contacts.length === 1) {
       Alert.alert('Something went wrong', 'Please fill the all fields');
       return;
    }
    const mycontacts = contacts.map((ph,index) => {
       return { label: selectedLabel[index]?selectedLabel[index]:'Mobile', number: ph };
    });

    const contactInfo = {
       displayName: firstName + ' ' + lastName,
       givenName: firstName + ' ' + lastName,
       phoneNumbers: mycontacts,
       company:company
    }
    try {
      const permission = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
      );
      if(permission === 'granted') {
        await Contacts.addContact(contactInfo)
        navigation.navigate('Contacts')    
      }
   } catch (error) {
      console.log(error);
   }
 }

  return (
    <View style={styles.container}>
       <View style={styles.inputContainer}>
          <TextInput 
             style={styles.input}
             placeholder='FirstName'
             value={firstName}
             onChangeText={(text) => setFirstName(text)}
          />
          <TextInput 
             style={styles.input}
             placeholder='LastName'
             value={lastName}
             onChangeText={(text) => setLastName(text)}
          />
          <TextInput 
             style={styles.input}
             placeholder='Company'
             value={company}
             onChangeText={(text) => setCompany(text)}
          />
       </View>
       {contacts.map((phoneNumber, index) => (
          <View style={{ ...styles.inputContainer, marginVertical: 0}} key={index}>
             <TextInput 
             style={styles.input}
             placeholder='Phone Number'
             keyboardType='number-pad'
             value={phoneNumber}
             onChangeText={(text) => setcontacts((prevState) => {
                const newState = prevState.slice();
                newState[index] = text;
                return newState;
             })}
          />
          <Picker
            selectedValue={selectedLabel[index]}
            onValueChange={(itemValue, itemIndex) =>{
              let x=[...selectedLabel];
              // console.log(x,"----",index)
              x[index] = itemValue
              setselectedLabel(x)
            }
            }>
            <Picker.Item label="Mobile" value="Mobile" />
            <Picker.Item label="Home" value="Home" />
            <Picker.Item label="Work" value="Work" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          </View>
       ))}
       <Button 
          title='Save'
          onPress={() => addContact()}
       />
    </View>
 )
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: 'white'
   },
   inputContainer: {
     padding: 10,
     margin: 10
   },
   input: {
     borderBottomWidth: 0.5,
     borderBottomColor: 'gray',
     padding: 10
   }
})
export default AddContact