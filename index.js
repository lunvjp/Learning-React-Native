/** @format */
import React from 'react'
import {AppRegistry, View, Text} from 'react-native';
import App from './src/App';
// import App from './test/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
