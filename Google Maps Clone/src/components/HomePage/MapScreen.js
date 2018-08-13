import React , {
  Component
} from 'react';
import {
  View, StyleSheet, Image, Text, StatusBar, Button
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { ManeuverView } from 'react-native-maps-navigation';

import Map from '../../containers/HomePage/MapView';
import SearchBar from '../../containers/HomePage/SearchBar';
import CurrentLocationButton from '../../containers/HomePage/CurrentLocationButton';
import ButtonScreen from '../../containers/HomePage/ButtonScreen';
import images from '../../config/images';

class MapScreen extends Component {
  // static navigationOptions = {
  //   drawerLabel: 'Home',
  //   drawerIcon: ({ tintColor }) => (
  //     <Image
  //       source={{uri : 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg'}}
  //       style={{
  //         width : 20,
  //         height : 20
  //       }}
  //     />
  //   ),
  // };
  dropDown = null;
  constructor(props) {
    super(props);
  }

  onError = error => {
    if (error) {
      this.dropDown.alertWithType('error', 'Error', error);
    }
  };

  componentWillMount() {
    StatusBar.setHidden(true);
  }
  componentDidMount() {
    this.props.setDropDown(this.dropDown);
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <View style={{flex:1}}>
        {/*<StatusBar hidden={true} />*/}
        {/*<ManeuverView*/}
          {/*style={{*/}
            {/*backgroundColor : 'red',*/}
          {/*}}*/}
          {/*step={true}*/}
          {/*// fontFamily={AppFonts.light}*/}
          {/*// fontFamilyBold={AppFonts.bold}*/}
        {/*/>*/}
        <Map dropDownFromMapScreen={this.dropDown}/>
        <SearchBar navigation={this.props.navigation}/>

        <CurrentLocationButton/>
        <ButtonScreen navigation={this.props.navigation}
                      style={{
                        backgroundColor : 'red'
                      }}
        />

        <DropdownAlert ref={ref => this.dropDown = ref}
                       closeInterval={5000}
                       successColor='#353a48'
                       defaultContainer={
                         {
                           flexDirection : 'row',
                           flex : 1,
                           backgroundColor : 'yellow',
                           justifyContent : 'center',
                           alignItems : 'center',
                           padding: 12,
                           margin : 20,
                           borderRadius : 8,
                           shadowColor : 'rgba(0,0,0,1)',
                           shadowOffset : {
                             width : 0,
                             height : 5
                           },
                           shadowRadius : 10,
                           shadowOpacity : 0.5
                         }
                       }
                       messageStyle={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', color: 'white',
                         // backgroundColor : 'red',
                         // flex : 6
                       }}
                       imageStyle={{
                         marginTop : 10,
                         marginLeft : 3,
                         marginRight : 5,
                         // flex : 1,
                         alignItems : 'center',
                         // backgroundColor : 'red',
                         height : 44 // 44
                       }}
                       onClose={(data) => {
                         console.log(data);
                       }}
                       successImageSrc={images.ReportScreen.policeSuccess}
                       // errorImageSrc={}
                      //  imageSrc={'https://facebook.github.io/react-native/docs/assets/favicon.png'}
                       // renderImage={(props) => this.renderImage(props)}
        />

        {/*<DropdownAlert*/}
          {/*ref={ref => this.dropdown = ref}*/}
          {/*containerStyle={{*/}
            {/*backgroundColor: MAIN_CUSTOM_COLOR,*/}
          {/*}}*/}
          {/*showCancel={true}*/}
          {/*onClose={data => this.handleClose(data)}*/}
          {/*onCancel={data => this.handleCancel(data)}*/}
          {/*imageSrc={'https://facebook.github.io/react-native/docs/assets/favicon.png'}*/}
          {/*renderImage={(props) => this.renderImage(props)}*/}
          {/*renderCancel={(props) => this.renderImage(props)}*/}
        {/*/>*/}
      </View>
    );
  }
}

export default MapScreen;