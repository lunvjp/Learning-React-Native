const Topics = [
  {
    key : 1,
    slug : 'atm',
    queryString : 'ATM',
    imageNameUrl : images.lookingForLogo.atm
  },
  {
    key : 2,
    slug : 'fuel',
    queryString : 'Xăng',
    imageNameUrl : images.lookingForLogo.petrol
  },
  {
    key : 3,
    slug : 'repair',
    queryString : 'Sửa xe',
    imageNameUrl : images.lookingForLogo.repair_store
  },
  {
    key : 4,
    slug : 'park',
    queryString : 'Đậu xe',
    imageNameUrl : images.lookingForLogo.park
  }
];
import React, {
  Component
} from 'react';
import {
  Button, Icon, Image, View, TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import {
  View as ShoutemView
} from '@shoutem/ui';
import images from '../../config/images';

const IconButton = ( {data, slug, imageNameUrl, onSelectTopic = () => {
  console.log('How to speak like a Native');
}}) => (
  <TouchableOpacity style={styles.button} onPress={() => onSelectTopic(data)}>
    <Image
      style={styles.topicButton}
      source={imageNameUrl}
    />
  </TouchableOpacity>
);

const TopTopics = ({onSelectTopic = () => {
  console.log('Default Function of TopTopics');
}}) => (
  <View style={styles.topTopicsContainer}>
    {Topics.map((item) => (
      <IconButton key={item.key} onSelectTopic={onSelectTopic} data={item} slug={item.slug} imageNameUrl={item.imageNameUrl}/>
    ))}
  </View>
);

const styles = StyleSheet.create({
  topicButton : {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  topTopicsContainer : {
    backgroundColor : '#e6e6e6',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'flex-start',
    paddingLeft : 30,
    paddingRight : 30,
    paddingTop : 15,
    paddingBottom : 15
  }
});

export default TopTopics;