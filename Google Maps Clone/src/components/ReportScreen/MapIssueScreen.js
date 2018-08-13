import React, {
  Component
} from 'react';
import {
  View, Text, Image, TextInput, Button, TouchableNativeFeedback
} from 'react-native';
import images from '../../config/images';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  Button as ButtonNativeBase, Icon as IconNativeBase, Input
} from 'native-base';

import ImagePicker from 'react-native-image-picker';

class MapIssueScreen extends Component {
  state = {
    avatarSource: null
  };

  constructor(props) {
    super(props);
    this.takePhoto = this.takePhoto.bind(this);
    this.state = {
      avatarSource : null
    };
  }

  takePhoto () {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    // Launch Camera:
    ImagePicker.launchCamera(options, (response)  => {
      // const ReportScreenState = this;
      // Same code as in above section!
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return (
      <View style={{
        flex : 1,
        backgroundColor : '#ffffff'
      }}>
        {/** CHOICES **/}
        <View style={{
          flex : 2,
          flexDirection : 'row',

        }}>
          <ButtonItem image={images.ReportScreen.mapIssue} name='Giới hạn tốc độ'/>
          {/*<ButtonItem name='Ẩn nấp'/>*/}
          {/*<ButtonItem name='Bên đường'/>*/}
        </View>

        {/** Images and Comments **/}
        <View style={{
          flex : 5,
        }}>
          <TextInput style={{
            //  backgroundColor : 'red',
            flex : 1,
            fontSize : 25,
            color : '#000000',
            marginLeft : 10,
            marginRight : 10,
            // fontWeight : '300'
          }}
                     placeholder='Chia sẻ thông tin ở đây...'
                     multiline
                     textAlignVertical='top'
            // enablesReturnKeyAutomatically
          />
          {/*{ this.state.avatarSource === null ? <Text>Select a Photo</Text> :*/}
          {/*<Image style={styles.avatar} source={this.state.avatarSource} />*/}
          {/*}*/}

          {this.state.avatarSource !== null && (
            <View style={{
              height : 200
            }}>
              <Image
                style={{
                  flex : 1,
                  // backgroundColor : 'red'
                }}
                source={this.state.avatarSource}
              />
            </View>
          )}

          <View style={{
            // flex : 1,
            flexDirection : 'row',
            // backgroundColor : 'red'
          }}>
            <TouchableNativeFeedback
              style={{
                // flex : 1,
                borderColor : "#cccccc",
                borderWidth : 0.5,
                // backgroundColor : 'red'
              }}
              onPress={() => {
                this.takePhoto();
              }}
              // background={TouchableNativeFeedback.SelectableBackground()}
            >
              <View style={{
                flex : 1,
                padding : 10,
                flexDirection : 'row',
                alignItems : 'center',
                borderColor : "#cccccc",
                borderWidth : 1
              }}>
                <IconNativeBase name='camera'
                                type='Entypo'
                                style={{
                                  fontSize : 35,
                                  marginRight : 10
                                }}/>
                <Text style={{
                  fontSize : 18
                }}>Máy ảnh</Text>
              </View>
            </TouchableNativeFeedback>
          </View>



        </View>

        <View style={{
          // flex : 1,
          flexDirection : 'row',
          padding : 10,
          // backgroundColor : 'red'
        }}>

          <ButtonNativeBase style={{
            flex : 1,
            marginRight : 10,
            justifyContent : 'center',
          }} warning>
            <Text style={{
              fontWeight : 'bold',
              fontSize : 20
            }}>Chờ</Text></ButtonNativeBase>
          <ButtonNativeBase style={{
            flex : 3,
            justifyContent : 'center',
          }} success><Text style={{
            fontWeight : 'bold',
            fontSize : 20
          }}>Gửi</Text></ButtonNativeBase>

        </View>



      </View>
    );
  }
}
export default MapIssueScreen;

const SubmitButton = ({ title }) => (
  <ButtonNativeBase style={{
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  }} warning>
    <Text style={{
      fontWeight : 'bold',
      fontSize : 18
    }}>{title}</Text></ButtonNativeBase>
);

const ButtonItem = ({ name, image }) => (
  <View style={{
    flex : 1,
    borderColor : 'black',
    borderWidth : 0.5
  }}>
    <ButtonNativeBase large full transparent
                      active={true}
                      style={{
                        flex : 1,
                        flexDirection : 'column'
                      }}>
      <Image source={image ? image : images.ButtonScreen.police}
             style={{
               // backgroundColor : 'green',
               marginBottom : 10,
               width : 100,
               height : 60
             }}
             resizeMode='contain'

      />
      <Text style={{
        color : 'black'
      }}>{name}</Text>
    </ButtonNativeBase>
  </View>
);