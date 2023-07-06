// Router
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AddContact, DisplayContacts, Favorites } from './Screens';
import { MD3LightTheme as DefaultTheme,PaperProvider} from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditContacts from './Screens/EditContacts';
function App(){
  const theme = {
    ...DefaultTheme
    // colors: {
    //   ...DefaultTheme.colors,
    //   primary: 'tomato',
    //   secondary: 'yellow',
    // },
  };
  const Tab = createBottomTabNavigator();

  return (
    <PaperProvider theme={theme}>
        <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator initialRouteName='Contacts' screenOptions={{
              headerStyle: { backgroundColor: '#663399' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}>
              <Tab.Screen name='Contacts' component={DisplayContacts} 
              options={{
                headerTitleAlign:"center",
                tabBarLabel: 'Contacts',
                tabBarStyle:{height:60},
                tabBarActiveTintColor:"#663399",
                tabBarLabelStyle:{fontSize:16, fontWeight:600},
                tabBarIcon: ({ color, size,  }) => (
                  <MaterialCommunityIcons name="phone" color={color} size={40} />
                ),
              }}/>
               <Tab.Screen name='AddUser' component={AddContact} 
              options={{
                headerTitleAlign:"center",
                tabBarLabel: 'Add user',
                tabBarStyle:{height:60},
                tabBarActiveTintColor:"#663399",
                tabBarLabelStyle:{fontSize:16, fontWeight:600},
                tabBarIcon: ({ color, size,  }) => (
                  <MaterialCommunityIcons name="plus" color={color} size={40} />
                ),
              }}/>
               <Tab.Screen name='EditContacts' component={EditContacts} 
              options={{
                headerTitleAlign:"center",
                tabBarLabel: 'edit user',
                tabBarStyle:{height:60},
                tabBarActiveTintColor:"#663399",
                tabBarLabelStyle:{fontSize:16, fontWeight:600},
                tabBarIcon: ({ color, size,  }) => (
                  <MaterialCommunityIcons name="pencil" color={color} size={40} />
                ),
              }}/>
              {/* <Tab.Screen name='Add Contact' component={AddContact} /> */}
              <Tab.Screen name='Favorites' component={Favorites} 
              options={{
                tabBarStyle:{height:60},
                headerTitleAlign:"center",
                tabBarLabel: 'Favourites',
                tabBarLabelStyle:{fontSize:16, fontWeight:600, color:"#808080"},
                tabBarActiveTintColor:"#FDDC5C",
                tabBarIcon: ({ color, size,  }) => (
                  <MaterialCommunityIcons name="star" color={color} size={40} />
                ),
              }}/>
            </Tab.Navigator>
          </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PaperProvider>
  );
}



export default App;
