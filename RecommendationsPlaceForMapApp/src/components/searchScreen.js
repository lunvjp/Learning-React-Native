import React, { Component } from 'react';
import {
  Container, Header, Icon, InputGroup, Input, Item, Button as NativeBaseButton, Content, List, ListItem, Thumbnail, Text as NativeBaseText, Left, Body, Right
} from 'native-base';
import {
  View, Text, StatusBar, Platform, StyleSheet, TouchableHighlight, Image, Button, Keyboard
} from 'react-native';
import TopTopics from './Topics';
import IconButton from './Topics';
// import {BoxShadow} from 'react-native-shadow';
import images from '../config/images';
import RNGooglePlaces from "react-native-google-places";
import Hamburger from 'react-native-hamburger';

// TODO: Lấy toạ độ hiện tại từ Cha truyền sang cho con: Truyền hẳn bằng {...this.state}
// Import thư viện react-native-google-places
// Tính khoảng cách đường đi từ vị trí hiện tại cho tới ví trí của những nơi mà API trả về.
// Zoom to Specified Markers

class ThemeSearchBarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading : Mình sẽ ko làm Loading để cho nó giống như Google Maps, nhìn như vậy thì trông nó sẽ nhanh hơn bình thường.
      searchInput : '',
      isLoading : false,
      resultItems : [],
      displayTopSearchBar : false,
    };
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
    }
  }
  // TODO
  getDistanceBetweenTwoLocations(location1, location2) {
    // Console.log();
  }
  getDataFromAPI (searchInput) {
    if (!searchInput) searchInput = this.state.searchInput;
    console.log(this.props.initialRegion);

    RNGooglePlaces.getAutocompletePredictions(searchInput, {
      type: 'establishments',
      latitude: this.props.initialRegion.latitude,
      longitude: this.props.initialRegion.longitude,
      radius: 100 // 100KM
    })
      .then((places) => {

        let listPlaces = [];
        places.map(async (place) => {
          // Lấy thông tin chi tiết của 1 nơi.
          let placeDetails = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.placeID}&key=AIzaSyAmTl7BhoPdiEhgF2kDeCX3TU-EWQQx6J8`
          );
          let json = JSON.parse(placeDetails._bodyText);
          let item = json.result;
          // console.log(json);
          listPlaces.push({
            latitude : item.geometry.location.lat,
            longitude : item.geometry.location.lng,
            name : item.name,
            address : item.formatted_address,
            phone : item.international_phone_number,
            key : item.placeID,
          });
        });

        // this.setState({
        //   resultItems : []
        // });
        // this.setState({
        //   resultItems : this.state.resultItems.concat(
        //     results.map(item => {
        //       return {
        //         latitude : item.latitude,
        //         longitude : item.longitude,
        //         name : item.name,
        //         address : item.address,
        //         key : item.placeID
        //       };
        //     })
        //   )
        // });

        // let placeIDs = places.map((place) => {
        //   console.log(place);
        //   // TODO
        //   console.log('Lấy thông tin bằng 1 hàm lấy thông tin');
        //   let placeDetails = await fetch(
        //     `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.placeID}&key=AIzaSyAmTl7BhoPdiEhgF2kDeCX3TU-EWQQx6J8`
        //   );
        //   // let json = JSON.parse(placeDetails._bodyText);
        //   console.log(placeDetails);
        //   return place.placeID;
        // });

        // RNGooglePlaces.lookUpPlacesByIDs(placeIDs)
        //   .then((results) => {
        //     // console.log(results);
        //     // Khi mà có dữ liệu mới thì lúc này xoá những dữ liệu cũ đi.
        //     this.setState({
        //       resultItems : []
        //     });
        //     this.setState({
        //       resultItems : this.state.resultItems.concat(
        //         results.map(item => {
        //           return {
        //             latitude : item.latitude,
        //             longitude : item.longitude,
        //             name : item.name,
        //             address : item.address,
        //             key : item.placeID
        //           };
        //         })
        //       )
        //     });
        //   })
        //   .catch((error) => console.log(error.message));
      })
      .catch(error => console.log(error.message));
  }
  onSelectTopic = topic => {
    this.props.onSelectTopic(topic);

    this.setState({
      searchInput : topic.queryString
    });

    this.setDisplayTopSearchBar();

    // Keyboard.dismiss();
  };
  setDisplayTopSearchBar() {
    // console.log('Thay đổi TopSearchBar');
    if (this.state.displayTopSearchBar) {
      Keyboard.dismiss();
    }
    this.setState({
      displayTopSearchBar : !this.state.displayTopSearchBar
    });
  }
  onClickPlaces () {

  }
  // DOING
  onPlaceItem (item) {
    // Khi mà click vào chỗ này thì cái MAP nó sẽ bay tới địa chỉ đó.
    this.props.onGetItemFromListPlace(item);

    // Sau khi những cái đó xong xuôi thì mình sẽ tắt cái khung Top đi
    this.setDisplayTopSearchBar();
  }
  onPressHamburgerMenu = () => {
    console.log('onPressHamburgerMenu');
  };
  render() {
    const borderTopSearchInput = 5;
    return (
      <View style={{
        flex : 1,
        // backgroundColor : 'red'
      }}>
        {/*<Container style={{*/}
          {/*// flex : 1,*/}
          {/*backgroundColor: 'transparent',*/}
          {/*paddingTop: 10,*/}
        {/*}}> transparent */}
          <Header searchBar rounded transparent style={[{marginTop : 10},this.state.displayTopSearchBar && {
            // topSearchBarColor
            // height: 70, // Default value : 70
            backgroundColor: '#e6e6e6'
          }]}>
            <Item style={{
              height: 55,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // borderColor: 'black',
              // backgroundColor : 'brown',
              borderRadius: borderTopSearchInput,
              // borderWidth: 2,
              // borderColor: '#000000',
            }}>
              {/** Button Back **/}
              <NativeBaseButton transparent
                                style={{
                height: 55,
                // flex : 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor : 'green',
                borderTopLeftRadius: borderTopSearchInput,
                borderBottomLeftRadius: borderTopSearchInput
              }}
                                onPress={() => {
                                  if (!this.state.displayTopSearchBar) {
                                    // TODO: Show Left Menu
                                  } else {
                                    this.setDisplayTopSearchBar();
                                  }
                                }}>
                <View style={{
                  // backgroundColor : 'pink',
                  width: 55
                  // paddingLeft : 10,
                  // paddingRight : 10,
                }}>
                  {this.state.displayTopSearchBar ? (
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
                  {/*<Hamburger active={true}*/}
                             {/*// this.state.displayTopSearchBar*/}
                             {/*type='arrow'*/}
                             {/*onPress={() => {*/}
                               {/*console.log('Hamburger');*/}
                             {/*}}*/}
                             {/*style={{*/}
                               {/*backgroundColor:'red'*/}
                             {/*}}*/}
                  {/*/>*/}
                </View>
              </NativeBaseButton>

              <Icon name="ios-search" style={{
                // backgroundColor : 'blue'
              }}/>
              <Input placeholder="Tìm kiếm"
                     value={this.state.searchInput}
                     style={{
                flex: 1,
                // backgroundColor : 'black',
                borderTopRightRadius: borderTopSearchInput,
                borderBottomRightRadius: borderTopSearchInput
              }}
                 onBlur={() => {

                 }}
                 // onFocus={this.props.onDisplaySearchScreen}
                 onFocus={() => {
                   if (this.state.searchInput) this.getDataFromAPI(this.state.searchInput);
                   this.setDisplayTopSearchBar();
                 }}
                 onChangeText={(text) => {
                   // TODO: Kiểm tra mỗi 4s rồi mới gọi API để ko bị crash.
                   // Khi mà search liên tục thì nó sẽ bị Crash
                   if (text) {
                     this.getDataFromAPI(text);
                   }
                   // Nếu lấy dữ liệu thành công thì mình sẽ gán qua biến State của nó.
                   this.setState({ searchInput : text });
                 }}
                     // onSubmitEditing={
                     //   Keyboard.dismiss
                     // }
              />
              {/*<Icon name="ios-people" />*/}
            </Item>
          </Header>
          {/** 5 buttons right here. */}
          {this.state.displayTopSearchBar && (
            <View style={{
              flex : 1,
              backgroundColor : 'white'
            }}>
              <TopTopics key={1} onSelectTopic={this.onSelectTopic.bind(this)}/>
              <Content>
                <List>
                  {this.state.resultItems.map((item) => (
                    <PlaceItem onPress={this.onPlaceItem.bind(this)}
                               data={item}
                               key={item.key}/>
                  ))}
                </List>
              </Content>
            </View>
          )}
        {/*</Container>*/}
      </View>
    );
  }
}
export default ThemeSearchBarExample;

const PlaceItem = ({ data, onPress}) => (
  <ListItem avatar
            onPress={() => onPress(data)}>
    <Left style={{
      alignItems : 'center',
      flexDirection : 'column'
    }}>
      <Thumbnail source={images.lookingForLogo.location} style={{
        width : 20,
        height : 20
      }}/>
      {/*<Text>{distance} km</Text>*/}
      {/*<Icon type="Octicons" name="location" style={{fontSize : 20}}/>*/}
    </Left>
    <Body>
    <Text style={{
      fontWeight : 'bold',
      fontSize : 17
    }}>{data.name}</Text>
    <Text note numberOfLines={1}>{data.address}</Text>
    </Body>

    {/*<Right>*/}
      {/*<NativeBaseButton transparent>*/}
        {/*<Text>View</Text>*/}
      {/*</NativeBaseButton>*/}
    {/*</Right>*/}
  </ListItem>
);

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
