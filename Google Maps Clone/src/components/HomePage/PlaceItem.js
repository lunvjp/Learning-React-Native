import React from 'react';
import {
  Text
} from 'react-native';
import {
  Container, Header, Icon, InputGroup, Input, Item, Button as NativeBaseButton, Content, List, ListItem, Thumbnail, Text as NativeBaseText, Left, Body, Right
} from 'native-base';
import images from '../../config/images';


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
export default PlaceItem;