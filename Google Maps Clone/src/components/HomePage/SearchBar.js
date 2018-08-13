import React, { Component } from 'react';
import {
  Container, Header, Icon, InputGroup, Input, Item, Button as NativeBaseButton, Content, List, ListItem, Thumbnail, Text as NativeBaseText, Left, Body, Right
} from 'native-base';
import {
  View, Text, StatusBar, Platform, StyleSheet, TouchableHighlight, Image, Button, Keyboard, TextInput
} from 'react-native';
import TopTopics from './Topics';
// import IconButton from './Topics';
// import {BoxShadow} from 'react-native-shadow';
import PlaceItem from './PlaceItem';


// import images from '../config/images';
import RNGooglePlaces from "react-native-google-places";


// import Hamburger from 'react-native-hamburger';

class SearchBar extends Component {
  textInput = null;
  constructor(props) {
    super(props);
    this.state = {
      showSearchBar : false,
      temp : ''
    }
  }
  componentDidMount() {
    console.log(this.props.refNavigation);
  }

  componentWillMount() {
    console.log(this.props);
    if (Platform.OS === 'android') {
      // StatusBar.setTranslucent(true);
    }
  }

  // onSelectTopic = topic => {
  //   this.props.onSelectTopic(topic);
  //
  //   this.setState({
  //     searchInput : topic.queryString
  //   });
  //
  //   this.setDisplayTopSearchBar();
  //
  //   // Keyboard.dismiss();
  // };

  // setDisplayTopSearchBar() {
  //   if (this.props.displayTopSearchBar) {
  //     Keyboard.dismiss();
  //   }
  //   this.props.setSearchInput();
  // }


  onClickPlaces () {

  }
  // DOING
  // onPlaceItem (item) {
  //   // Khi mà click vào chỗ này thì cái MAP nó sẽ bay tới địa chỉ đó.
  //   this.props.onGetItemFromListPlace(item);
  //
  //   // Sau khi những cái đó xong xuôi thì mình sẽ tắt cái khung Top đi
  //   this.setDisplayTopSearchBar();
  // }


  onPressHamburgerMenu = () => {
    console.log('onPressHamburgerMenu');
  };

  onFocusTextInput = () => {
    this.refs.textInput.blur();
  };

  render() {
    const borderTopSearchInput = 5;
    return (
      <View style={[
        {
        flex : 1,
          // transparent
          // searchBar
      },]}>
        <Header searchBar noShadow style={[{
          height : 65 ,
          paddingTop : 10,
          backgroundColor: this.state.showSearchBar ? '#e6e6e6' : 'transparent',
          zIndex : 1
        }]}>
          <Item style={{
            height: 55,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: borderTopSearchInput
          }}>
            <NativeBaseButton transparent
                              style={{
                                height: 55,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: borderTopSearchInput,
                                borderBottomLeftRadius: borderTopSearchInput
                              }}
                              onPress={() => {
                                if (!this.state.showSearchBar) {
                                  this.props.navigation.openDrawer();
                                } else {
                                  // this.props.setDisplayTopSearchBar();
                                  console.log('Keyboard.dismiss');
                                  this.setState({
                                    showSearchBar : !this.state.showSearchBar
                                  });
                                  this.onFocusTextInput();
                                  // Keyboard.dismiss();
                                }
                              }}>
              <View style={{
                width: 55
              }}>
                {/*{this.props.displayTopSearchBar ? (*/}
                  {/*<Icon name='md-arrow-back'*/}
                        {/*type='Ionicons'*/}
                        {/*style={{*/}
                          {/*fontSize: 33,*/}
                          {/*color: '#000000'*/}
                          {/*// borderBottomLeftRadius : 20*/}
                        {/*}}/>*/}
                {/*) : (*/}
                  {/*<Icon name='ios-menu-outline'*/}
                        {/*ios='ios-menu' android="md-menu" style={{*/}
                    {/*// backgroundColor : 'red',*/}
                    {/*fontSize: 30, color: '#000000'}}/>*/}
                {/*)}*/}

                {this.state.showSearchBar ? (
                  <Icon name='md-arrow-back'
                        type='Ionicons'
                        style={{
                          fontSize: 33,
                          color: '#000000'
                          // borderBottomLeftRadius : 20
                        }}/>
                ) : (
                  <Icon name='ios-menu-outline'
                        ios='ios-menu' android="md-menu" style={{
                    // backgroundColor : 'red',
                    fontSize: 30, color: '#000000'}}/>
                )}
              </View>
            </NativeBaseButton>

            <Icon name="ios-search" style={{
              // backgroundColor : 'blue'
            }}/>
            <Input placeholder="Tìm kiếm"
                   ref='textInput'
                   // value={this.props.searchInput}
                   style={{
                     flex: 1,
                     borderTopRightRadius: borderTopSearchInput,
                     borderBottomRightRadius: borderTopSearchInput
                   }}
                   onBlur={() => {
                    // console.log('BLUR SEARCH BAR!');
                    //  this.props.setDisplayTopSearchBar();
                   }}
                   onFocus={() => {
                     this.setState({
                       showSearchBar : true
                     });

                     // console.log('TRUOC KHI CLICK');
                     // console.log(this.props.displayTopSearchBar);
                     //  // this.props.goDisplayRoute();
                     // this.props.setDisplayTopSearchBar();
                     // console.log('SAU KHI CLICK');
                     // console.log(this.props.displayTopSearchBar);
                     //
                     // if (this.props.searchInput) this.props.getDataFromAPI(this.props.searchInput);


                   }}

                   onChangeText={(text) => {
                     // TODO: Kiểm tra mỗi 4s rồi mới gọi API để ko bị crash
                     if (text) {
                       this.props.getDataFromAPI(text);
                     }
                     this.props.setSearchInput(text);
                   }}
              // onSubmitEditing={
              //   Keyboard.dismiss
              // }
            />
            {/*<Icon name="ios-people" />*/}
          </Item>
        </Header>

        {/** 5 buttons right here. */}
        {this.state.showSearchBar && (
          <View style={{
            // marginTop : 20,
            flex : 1,
            backgroundColor : 'white'
          }}>
            <TopTopics onSelectTopic={this.props.onSelectTopic()}/>

            <Content>
              <List>
                {/*{this.props.resultItems.length > && this.props.resultItems.map((item) => (*/}
                  {/*<PlaceItem onPress={this.onPlaceItem.bind(this)}*/}
                             {/*data={item}*/}
                             {/*key={item.key}/>*/}
                {/*))}*/}
              </List>
            </Content>
          </View>
        )}
      </View>
    );
  }
}
export default SearchBar;


const styles = StyleSheet.create({
  textInput : {
    // shadowColor : 'rgba(0,0,0,0.19)',
    shadowColor : '#000000',
    shadowOffset : {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    zIndex : 1
    // box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  },
  buttonContainer: {
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    margin: 10
  },
  topSearchBarColor : {
    backgroundColor: '#e6e6e6',
  }
});
