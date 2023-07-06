import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   Alert,
   PermissionsAndroid,
   Button,
   Dimensions,
   Image,
   ScrollView
 } from 'react-native';
 import React, {useEffect, useState} from 'react';
 import {openDatabase} from 'react-native-sqlite-storage';
 import {useNavigation} from '@react-navigation/native';
 import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
 let db = openDatabase({name: 'UserDatabase.db'});
 const AddContact = () => {
   const navigation = useNavigation();
   const [name, setName] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [address, setAddress] = useState('');
   const [imagePath, setImagePath] = useState({})
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
           await launchCamera(options).then(res=>
              {
                 if(!res["didCancel"])
                 {
                    setImagePath({...imagePath,hasThumbnail:true, thumbnailPath:res["assets"][0].uri})
                 }else{
  
                    // console.log("=====",res.assets[0])
  
                    setImagePath({hasThumbnail:false, thumbnailPath:""})
                 }
  
              }).catch(err=>console.log(err,"-"))
        }
        // console.log(imagePath)
     }).catch(err=>
  
     console.log(err)
  
)
  };
   const saveUser = () => {
     const isstarred = false;
     console.log(name, email, address, imagePath.hasThumbnail, imagePath.thumbnailPath, phone, isstarred);
     db.transaction(function (tx) {
       tx.executeSql(
         'INSERT INTO table_user (name,phone, hasThumbnail, thumbnailPath, email, address, isstarred) VALUES (?,?,?,?,?,?,?)',
         [name, phone, imagePath.hasThumbnail, imagePath.thumbnailPath, email,address, isstarred],
         (tx, results) => {
           console.log('Results', results.rowsAffected);
           if (results.rowsAffected > 0) {
             Alert.alert(
               'Success',
               'You are Registered Successfully',
               [
                 {
                   text: 'Ok',
                   onPress: () => navigation.navigate('Home'),
                 },
               ],
               {cancelable: false},
             );
           } else alert('Registration Failed');
         },
         error => {
           console.log(error);
         },
       );
     });
   };
   useEffect(() => {
     db.transaction(txn => {
       txn.executeSql(
         "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
         [],
         (tx, res) => {
           console.log('item:', res.rows.length);
           if (res.rows.length == 0) {
             txn.executeSql('DROP TABLE IF EXISTS table_user', []);
             txn.executeSql(
               'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20),phone VARCHAR(10),hasthumbnail BOOLEAN, thumbnailpath VARCHAR(100), email VARCHAR(50), address VARCHAR(100), isstarred BOOLEAN)',
               [],
             );
           }
         },
         error => {
           console.log(error);
         },
       );
     });
   }, []);
   return (
     <ScrollView style={styles.container}>
 {imagePath?.hasThumbnail&&<TouchableOpacity style={styles.ImageStyle} onPress={selectFile}>
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

</TouchableOpacity>}
      {!imagePath.hasThumbnail&&<Button onPress={selectFile} title="click here"></Button>}
       <TextInput
         placeholder="Enter User Name"
         style={styles.input}
         value={name}
         onChangeText={txt => setName(txt)}
       />
         <TextInput
           placeholder="Enter Mobile"
           value={phone}
           onChangeText={txt => setPhone(txt)}
           style={[styles.input, {marginTop: 20}]}
         />
       <TextInput
         placeholder="Enter User Email"
         value={email}
         onChangeText={txt => setEmail(txt)}
         style={[styles.input, {marginTop: 20}]}
       />
       <TextInput
         placeholder="Enter User Address"
         value={address}
         onChangeText={txt => setAddress(txt)}
         style={[styles.input, {marginTop: 20}]}
       />
       <TouchableOpacity
         style={styles.addBtn}
         onPress={() => {
           saveUser();
         }}>
         <Text style={styles.btnText}>Save User</Text>
       </TouchableOpacity>
     </ScrollView>
   );
 };
 
 export default AddContact;
 
 const styles = StyleSheet.create({
   ImageStyle:{
  width: Dimensions.get('screen').width,

  height: Dimensions.get('screen').height/3,

  alignItems: 'center',

  justifyContent: 'center',

},
   container: {
     flex: 1,
   },
   input: {
     width: '80%',
     height: 50,
     borderRadius: 10,
     borderWidth: 0.3,
     alignSelf: 'center',
     paddingLeft: 20,
     marginTop: 100,
   },
   addBtn: {
     backgroundColor: 'purple',
     width: '80%',
     height: 50,
     borderRadius: 10,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 30,
     alignSelf: 'center',
   },
   btnText: {
     color: '#fff',
     fontSize: 18,
   },
 });
 