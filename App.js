// Router
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AddContact, DisplayContacts } from './Screens';
import { MD3LightTheme as DefaultTheme,PaperProvider} from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App(){
  const theme = {
    ...DefaultTheme
    // colors: {
    //   ...DefaultTheme.colors,
    //   primary: 'tomato',
    //   secondary: 'yellow',
    // },
  };
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider theme={theme}>
        <SafeAreaProvider>
        {/* <GestureHandlerRootView> */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Contacts'>
              <Stack.Screen name='Contacts' component={DisplayContacts} />
              <Stack.Screen name='Add Contact' component={AddContact} />
            </Stack.Navigator>
          </NavigationContainer>
        {/* </GestureHandlerRootView> */}
        </SafeAreaProvider>
      </PaperProvider>
  );
}



export default App;
