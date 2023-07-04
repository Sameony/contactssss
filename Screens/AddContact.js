import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet, PermissionsAndroid, Dimensions,ScrollView, Alert} from 'react-native'
import Contacts from 'react-native-contacts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import { IconButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import img from "../assets/contact.png"
const AddContact = ({navigation}) => {
  const [contacts, setcontacts] = useState([''])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [company, setCompany] = useState("")
  const [selectedLabel, setselectedLabel] = useState([])
  const [imagePath, setImagePath] = useState({})
  const {check, setCheck} = useState()
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
//  useEffect(()=>{
//    console.log(imagePath,"ehere")
//  },[imagePath])
 const selectFile = async () => {
  var options = {
    title: 'Select Image',
    mediaType:"photo",
    storageOptions: {
      path: 'images',
      mediaType: 'photo',
  },
  };
   await PermissionsAndroid.requestMultiple(
     [ PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
   ).then(async result=>{
      console.log(result)
      if(result['android.permission.CAMERA'] ==='granted') {
         await launchCamera(options, setCheck).then(res=>
            {
               if(!res["didCancel"])
               {
                  setImagePath({...imagePath,hasThumbnail:true, thumbnailPath:res["assets"][0].uri})
               }else{
                  // console.log("=====",res.assets[0])
                  setImagePath({hasThumbnail:false, thumbnailPath:null})
                  
               }
            }).catch(err=>console.log(err,"-"))
      }
      // console.log(imagePath)
   }).catch(err=>
   console.log(err)
   )
   
   // const result = await launchCamera(options);
};
async function addContact() {
   // console.log(imagePath,"=++++++++++++++++++++")
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
       company:company,
       thumbnailPath:"content://com.android.contacts/display_photo/1",
       hasThumbnail:true
    }
    try {
       const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
          );
      if(permission === 'granted') {
        setTimeout(async () => {
         console.log(contactInfo,"ahuehue")
           await Contacts.addContact(contactInfo)
           navigation.navigate('Contacts')    
        }, 0);
      }
   } catch (error) {
      console.log(error);
   }
 }

  return (
   <ScrollView>
       {imagePath?.hasThumbnail&&<View style={styles.imagestyle}>
       <Image
         source={{ uri: imagePath?.thumbnailPath }}
         style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: 'black',
            alignSelf: 'center',
         }}
         />  
       </View>}
       <View style={styles.container}>
        <View style={{alignItems:"center"}}>
         <IconButton
            icon="camera-plus"
            color={"red"}
            size={100}
            onPress={selectFile}
            style={{margin:'auto'}}
            />
        </View>
         <View
         style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom:10,
            marginBottom:10
         }}
         />
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
    
      <View style={{display:"flex", alignItems:"center", backgroundColor:"#1E90ff", position:"absolute", bottom:0, right:0, left:0 }}>
         <Text onPress={addContact} style={{color:"white", fontSize:24, padding:10, fontWeight:600}}>Save</Text>
      </View>
    
    </View>
   </ScrollView>
 )
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: 'white',
   },
   imagestyle:{
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height/3,
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputContainer: {
     padding: 10,
     margin: 10
   },
   input: {
     borderBottomWidth: 0.5,
     borderBottomColor: 'gray',
     padding: 10,
     fontSize:19
   }
})
export default AddContact