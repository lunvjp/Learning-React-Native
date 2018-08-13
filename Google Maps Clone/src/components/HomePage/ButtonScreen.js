import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Image
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import {
  Fonts
} from '../../config/Fonts';
import images from '../../config/images';
import ButtonItem from './ButtonItem';
import ButtonRequest from './ButtonRequest';

import ReportScreen from '../ReportScreen/ReportScreen';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
/**
 * 1. Tạo 1 cái Navigation ở đây.
 */

class ButtonScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log('jack');
    // console.log(this.props);
  }
  render() {
    return (
      <View style={[
        StyleSheet.absoluteFillObject,
        styles.mainLayout,
        {
          // backgroundColor : 'white'
        }
      ]}>

        <View style={{
          // flex:1,

          flexDirection:'row',alignItems: 'stretch',
          backgroundColor:'transparent'
        }}>

          <View style={{justifyContent:'flex-end'}}>
            <Text style={styles.currentCityLabel}>Vị trí hiện tại</Text>
            <Text style={styles.currentCity}>TP. Đà Nẵng</Text>
          </View>

        </View>

        <View style={styles.speedContainer}>
          <ButtonItem speed={this.props.currentSpeed ? this.props.currentSpeed : 0} label={'Tốc độ hiện tại'} ImageUrl={images.ButtonScreen.greenSpeed} />
          <ButtonItem speed={90} label={'Tốc độ cho phép'} ImageUrl={images.ButtonScreen.redSpeed} CustomStyle={{color :'#e64255'}} />
        </View>

        {/*<View style={{*/}
          {/*backgroundColor : 'green'*/}
        {/*}}>*/}
          {/**/}
          {/*<LottieView*/}
            {/*source={require('../../assets/animations/speech_bubble/ModernPictogramsForLottie_SpeechBubble.json')}*/}
            {/*autoPlay*/}
            {/*loop*/}
            {/*style={{*/}
              {/*width : 100,*/}
              {/*backgroundColor : 'red'*/}
            {/*}}>*/}
            {/*<Image souce={images.ReportScreen.policeSuccess}/>*/}
          {/*</LottieView>*/}
          {/**/}
          {/*<Animatable.Text animation="bounceIn" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*</View>*/}

        <View style={styles.buttonContainer}>
          <View style={{flexDirection:'row'}}>
            {/*<LottieView*/}
              {/*source={require('../../assets/animations/speech_bubble/ModernPictogramsForLottie_SpeechBubble.json')}*/}
              {/*autoPlay*/}
              {/*loop*/}
              {/*style={{*/}
                {/*backgroundColor : 'red'*/}
              {/*}}*/}
            {/*/>*/}
            <ButtonRequest ImageUrl={images.ButtonScreen.help} label={'Tìm kiếm Giúp đỡ'}/>
            <ButtonRequest onPress={() => {
              // this.props.navigate("Police");
              this.props.sendPoliceReport();
              // this.props.navigation.navigate("Police");
            }} ImageUrl={images.ButtonScreen.police} label={'Báo Trạm Công An'}/>
          </View>
          <View style={{flexDirection:'row'}}>
            <ButtonRequest onPress={() => {
              this.props.sendTrafficCarReport();
            }} ImageUrl={images.ButtonScreen.trafficLight} label={'Báo Kẹt Đường'}/>
            <ButtonRequest onPress={() => {
              console.log('Click Radio Button');

              // this.props.navigation.navigate("test");
            }} ImageUrl={images.ButtonScreen.radio} label={'Nghe Radio'}/>
          </View>
        </View>

      </View>
    );
  }
}
export default ButtonScreen;

const styles = StyleSheet.create({
  container : {
    flex:1,
  },
  mainLayout : {
    padding : 20,
    justifyContent: 'flex-end',
    flex : 1
  },
  currentCityLabel : {
    fontFamily:Fonts.HelveticaNeue,
    fontSize:14,
    letterSpacing:0.4,
    color:'#a0a3ab',
    fontWeight : 'bold'
  },
  currentCity : {
    fontFamily:Fonts.HelveticaNeue,
    fontSize: 30,
    letterSpacing: 0.4,
    color : '#ffffff',
    fontWeight : 'bold',
    marginBottom: 20
  },
  speedContainer : {
    flexDirection : 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fdfdff'
  }
  ,buttonContainer : {
    flexDirection: 'column',
    backgroundColor : '#f7f7f9'
  },
  buttonItem : {
    // padding : 15,
    paddingTop: 5,
    paddingBottom: 5,
    flex:1,
    borderColor:'#f4f4f4',
    borderWidth:1,
    justifyContent: 'center'
  },
  buttonItemImage : {
    flex:40,
    alignItems:'center'
  },
  buttonItemText : {
    fontFamily:Fonts.HelveticaNeue,
    fontSize:14,
    fontWeight:'bold',
    letterSpacing:0.2,
    color:'#353a48',
    flex: 60
  },
  buttonRowItems : {
    flexDirection:'row',
    alignItems : 'center',
    justifyContent: 'center'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'black',
  },
  currentLocationButton : {
    // position: 'absolute',
    // top: 0,
    // right: 0
  },
  searchBar : {
    paddingTop : 20,
    marginTop : 20
  },
  icon: {
    width: 24,
    height: 24,
  },
});