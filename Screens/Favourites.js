import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   FlatList,
   Alert,
   Image,
 } from 'react-native';
 import React, {useEffect, useState} from 'react';
 import {useIsFocused, useNavigation} from '@react-navigation/native';
 import {openDatabase} from 'react-native-sqlite-storage';
 let db = openDatabase({name: 'UserDatabase.db'});
 const Favorites = () => {
   const isFocused = useIsFocused();
   const navigation = useNavigation();
   const [userList, setUserList] = useState([]);
   useEffect(() => {
     getData();
   }, [isFocused]);
   const getData = () => {
     db.transaction(tx => {
       tx.executeSql('SELECT * FROM table_user WHERE isstarred=1', [], (tx, results) => {
         var temp = [];
         for (let i = 0; i < results.rows.length; ++i)
           temp.push(results.rows.item(i));
         setUserList(temp);
       });
     });
   };
   console.log(userList)
   return (
     <View style={styles.container}>
       <FlatList
         data={userList}
         renderItem={({item, index}) => {
           return (
             <TouchableOpacity style={styles.userItem}  onPress={() => {
              navigation.navigate('EditContacts', {
                data: {
                  name: item.name,
                  email: item.email,
                  address: item.address,
                  id: item.user_id,
                  hasthumbnail: item.hasthumbnail,
                  thumbnailpath:item.thumbnailpath,
                  phone:item.phone
                },
              });
            }}>
               <Image
                source={item.hasthumbnail?{ uri: item.thumbnailpath }:require('../images/edit.png')}
                style={{
                  height: 60,
                  width: 60,
                  marginRight:10,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: '#808080',
                  alignSelf: 'center',
                }}/> 
               <View>
               <Text style={styles.itemText}>{item.name}</Text>
               <Text style={styles.itemText}>{item.phone}</Text>
               {/* <Text style={styles.itemText}>{'Email: ' + item.email}</Text>
               <Text style={styles.itemText}>{'Address: ' + item.address}</Text> */}
               </View>
             </TouchableOpacity>
           );
         }}
       />
       <TouchableOpacity
         style={styles.addNewBtn}
         onPress={() => {
           navigation.navigate('AddUser');
         }}>
         <Text style={styles.btnText}>Add New User</Text>
       </TouchableOpacity>
     </View>
   );
 };
 
 export default Favorites;
 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   addNewBtn: {
     backgroundColor: '#663399',
     width: 150,
     height: 50,
     borderRadius: 20,
     position: 'absolute',
     bottom: 20,
     right: 20,
     justifyContent: 'center',
     alignItems: 'center',
   },
   btnText: {
     color: '#fff',
     fontSize: 18,
   },
   userItem: {
     width: '100%',
     backgroundColor: '#fff',
     padding: 10,
     display:"flex",
     flexDirection:"row",
     alignItems:"center",
     elevation:2,
     shadowColor:"black",
     shadowOffset:{width:10, height:10},
     shadowOpacity:0.5,
     marginBottom:5,
     marginTop:5,

   },
   itemText: {
     fontSize: 20,
    //  fontWeight: '600',
     color: '#000',
   },
   belowView: {
     flexDirection: 'row',
     width: '100%',
     alignItems: 'center',
     justifyContent: 'space-evenly',
     marginTop: 20,
     backgroundColor: '#f2f2f2',
     borderRadius: 10,
     height: 50,
   },
   icons: {
     width: 24,
     height: 24,
   },
 });
 