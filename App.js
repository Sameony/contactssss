
import React from 'react';
import {Route, NativeRouter, Routes} from 'react-router-native'
import Screen1 from './Screen1';
function App(){
  return (
    <NativeRouter>
      <Routes>
        <Route path='/' Component={Screen1} />
      </Routes>
    </NativeRouter>
  );
}



export default App;
