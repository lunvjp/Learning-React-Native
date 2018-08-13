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
/**
 * 1. fuel: Chỗ đổ xăng (Cửa hàng bán xăng lớn), chỗ bán xăng nhỏ lẻ.
 * 2. garage: Tiệm sửa xe.
 * 3. remote-fix: Sửa xe lưu động
 * => 2, 3 chung lại thành 1.
 * 4. park: Chỗ đậu xe, không cần cung cấp lượng xe (Có SDT users sẽ tự gọi điện thoại đến)
 * */
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
import images from '../config/images';

const IconButton = ( {data, slug, imageNameUrl, onSelectTopic}) => (
  <TouchableOpacity style={styles.button} onPress={() => onSelectTopic(data)}>
    <Image
      style={styles.topicButton}
      source={imageNameUrl}
    />
  </TouchableOpacity>
);

const TopTopics = ({onSelectTopic}) => (
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