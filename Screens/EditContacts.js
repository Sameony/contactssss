import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert, PermissionsAndroid
  } from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {launchCamera} from 'react-native-image-picker'
import { IconButton } from 'react-native-paper';
  let db = openDatabase({name: 'UserDatabase.db'});
  const EditContacts = () => {
    const route = useRoute();
    console.log(route.params.data);
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
    const navigation = useNavigation();
    const [imagePath, setImagePath] = useState({})
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [isstarred, setisstarred] = useState(false)
    const [email, setEmail] = useState(route.params.data.email);
    const [address, setAddress] = useState(route.params.data.address);
    const updateUser = () => {
      console.log("pressed")
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE table_user set name=?, phone=?, isstarred=?, hasthumbnail=?, thumbnailpath=?, email=? , address=? where user_id=?',
          [name,phone,isstarred,imagePath.hasThumbnail, imagePath.thumbnailPath, email, address, route.params.data.id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'User updated successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Contacts'),
                  },
                ],
                {cancelable: false},
              );
            } else alert('Updation Failed');
          },
        );
      });
    };
    const setFav = () =>{
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE table_user set isstarred=? where user_id=?',
          [!isstarred, route.params.data.id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Contact added to Favourites',
                [{text: 'Ok'}]);
            } else alert('Updation Failed');
          },
        );
      });
      setisstarred(!isstarred)
    }
    let deleteUser = id => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  table_user where user_id=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'User deleted successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      getData();
                    },
                  },
                ],
                {cancelable: false},
              );
            } else {
              alert('Please insert a valid User Id');
            }
          },
        );
      });
    };
    useEffect(() => {
      setName(route.params.data.name);
      setEmail(route.params.data.email);
      setAddress(route.params.data.address);
      setPhone(route.params.data.phone)
      setImagePath({hasThumbnail:route.params.data.hasthumbnail, thumbnailPath:route.params.data.thumbnailpath})
    }, []);
  
    return (
      <View style={styles.container}>
        <IconButton icon={isstarred?'star':'star-outline'} 
          onPress={()=>setFav()} size={35} iconColor={"gold"}
            style={{position:'absolute', right:0, top:0, zIndex:999999}}></IconButton>
         {<TouchableOpacity style={{marginTop:10}} onPress={selectFile}>
            <Image
              source={imagePath.hasThumbnail?{ uri: imagePath.thumbnailPath }:require('../images/edit.png')}
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
        <TextInput
          placeholder="Enter User Name"
          style={styles.input}
          value={name}
          onChangeText={txt => setName(txt)}
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
         <TextInput
           placeholder="Enter Mobile"
           value={phone}
           onChangeText={txt => setPhone(txt)}
           style={[styles.input, {marginTop: 20}]}
         />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            updateUser();
          }}>
          <Text style={styles.btnText}>Save User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delBtn}
          onPress={()=>deleteUser(item.user_id)}>
          <Text style={styles.btnText}>Delete User</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default EditContacts;
  const styles = StyleSheet.create({
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
      marginTop: 30,
    },
    addBtn: {
      backgroundColor: '#663399',
      width: '80%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 35,
      alignSelf: 'center',
    },
    delBtn: {
      backgroundColor: 'red',
      width: '80%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      alignSelf: 'center',
    },
    btnText: {
      color: '#fff',
      fontSize: 18,
    },
  });
  