/* eslint jsx-a11y/accessible-emoji: 0 */
import React from 'react';
import { Text } from 'react-native';
import NavBar, { NavTitle, NavButton } from 'react-native-nav';

export default function NavBarCustom() {
  return (
    <NavBar>
      <NavButton />
      <NavTitle>
        💬 Gifted Chat{'\n'}
      </NavTitle>
      <NavButton />
    </NavBar>
  );
}
