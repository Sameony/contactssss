import React from 'react'
import { Appbar } from 'react-native-paper';
const Header = () => {
  return (
    <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="WOW" />
        {/* <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} /> */}
    </Appbar.Header>
  )
}

export default Header