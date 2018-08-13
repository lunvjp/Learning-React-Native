import React, {
  Component
} from 'react';
import {
  View, StatusBar, ScrollView, StyleSheet, Text, Image
} from 'react-native';
import { Container, Header, Content, List, ListItem, Button, Icon, Left, Body, Right, Switch, Thumbnail } from 'native-base';
import images from './config/images';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import allReducers from './reducers';
import {NavigationActions} from 'react-navigation';

import MapScreen from "./containers/HomePage/MapScreen";

import ReportScreen from "./components/ReportScreen/ReportScreen";
import MenuScreen from "./components/Menu/MenuSreen";

import {createStackNavigator, StackNavigator, createDrawerNavigator,
  DrawerItems, SafeAreaView
} from "react-navigation";
import MapIssueScreen from "./components/ReportScreen/MapIssueScreen";
import { connect } from 'react-redux';
// import CustomDrawerContentComponent from "./testMenu";

const loggerMiddleware = createLogger();
const store = createStore(
  allReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const MapScreenNavigator = createStackNavigator({
  Home : {
    screen: MapScreen,
    navigationOptions : {
      header : null
    }
  },
  Police : {
    screen : ReportScreen,
    navigationOptions : {
      headerStyle : {
        // backgroundColor : 'grey'
      }
    }
  },
  // test : {
  //   screen : CustomDrawerContentComponent
  // }
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>

    <View style={{
      flex : 1,
      // backgroundColor : 'red'
    }}>
      {/*<Container>*/}
      <Header transparent style={{
        backgroundColor : '#BDBDBD',
        paddingTop : 10,
        paddingBottom : 10
      }}>
          <Left>
            {/*<Button transparent style={{*/}
              {/*// backgroundColor: "#FF9501"*/}
              {/*// backgroundColor: "red"*/}
            {/*}}>*/}
              {/*<Icon active name="google-maps" type='MaterialCommunityIcons'/>*/}
            {/*</Button>*/}

            <Thumbnail source={{ uri: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=350' }} />
          </Left>

          <Body>
            <Text style={{
              fontWeight : 'bold'
            }}>Phương Vũ</Text>
            <Text note>Jack</Text>
          </Body>
      </Header>


        {/*<Content>*/}

          <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>

            <ListItem {...props} icon onPress={() => {
              console.log(props);

              // let route = 'map';
              // const navigateAction = NavigationActions.navigate({
              //   routeName: route
              // });
              props.navigation.navigate('map');
            }}>
              <Left style={{
                // backgroundColor : 'red'
              }}>
                <Image style={{
                  width : 35,
                  height : 35
                }}
                       source={images.MenuScreen.mapIssue}/>
              </Left>
              <Body>
              <Text styles={{
                fontWeight : 'bold',
                color : '#000000'
              }}>LunVjp</Text>
              </Body>
            </ListItem>

            {/*<DrawerItems {...props}*/}
                         {/*getLabel = {(scene) => (*/}
                           {/*<ListItem icon onPress={() => {*/}
                             {/*console.log(this.props);*/}
                             {/*// this.props.navigation.navigate('Map')*/}
                           {/*}}>*/}
                             {/*<Left style={{*/}
                               {/*// backgroundColor : 'red'*/}
                             {/*}}>*/}
                               {/*<Image style={{*/}
                                 {/*width : 35,*/}
                                 {/*height : 35*/}
                               {/*}}*/}
                                      {/*source={images.MenuScreen.mapIssue}/>*/}
                             {/*</Left>*/}
                             {/*<Body>*/}
                             {/*<Text styles={{*/}
                               {/*fontWeight : 'bold',*/}
                               {/*color : '#000000'*/}
                             {/*}}>{props.getLabel(scene)}</Text>*/}
                             {/*</Body>*/}
                           {/*</ListItem>*/}
                         {/*)}*/}
            {/*/>*/}

            {/*<ListItem {...props} icon onPress={() => {*/}
              {/*console.log(this.props);*/}
              {/*// this.props.navigation.navigate('Map')*/}
            {/*}}>*/}
              {/*<Left style={{*/}
                {/*// backgroundColor : 'red'*/}
              {/*}}>*/}
                {/*<Image style={{*/}
                  {/*width : 35,*/}
                  {/*height : 35*/}
                {/*}}*/}
                       {/*source={images.MenuScreen.mapIssue}/>*/}
              {/*</Left>*/}
              {/*<Body>*/}
              {/*<Text styles={{*/}
                {/*fontWeight : 'bold',*/}
                {/*color : '#000000'*/}
              {/*}}>Vấn đề với bản đồ</Text>*/}
              {/*</Body>*/}
            {/*</ListItem>*/}

          </SafeAreaView>

        {/*</Content>*/}


    </View>

  </ScrollView>
);

const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen: MapScreenNavigator,
    navigationOptions : {
      header : null,
      title : 'LunVjp Map'
    }
  },
  Map : {
    screen : MapIssueScreen,
    navigationOptions : {
      header : null,
      // title : 'LunVjp Map'
    }
  }

}, {
  contentComponent : CustomDrawerContentComponent
});

const RootApp = () => (
  <View style={{
    flex : 1
  }}>
    <AppDrawerNavigator/>
  </View>
);

const App = () => (
  <Provider store={store}>
    <RootApp />
  </Provider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text : {
    color : '#000000',
    fontWeight : '600'
  }
});