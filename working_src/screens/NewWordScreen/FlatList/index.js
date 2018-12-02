import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Expo from 'expo';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;
// item size
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

// main
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Catalog',
    headerStyle: {
      backgroundColor: '#4DBCE9',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  };

  _keyExtractor = item => {
    return item.code_group;
  };

  _renderItem = data => {
    const item = data.item;
    return (
      <View style={styles.item}>
        {!item.image_url
          ? <View style={styles.itemImage}>
            <Text>No image</Text>
          </View>
          : <Image
            source={{ uri: item.image_url }}
            resizeMode={'cover'}
            style={styles.itemImage}
          />}
        <Text numberOfLines={3} style={styles.itemTitle}>
          {item.name_group_sp}
        </Text>
        <View style={styles.itemFooter}>
          <Text>Mínimo: {item.min_sale_amount_prod}</Text>
          <Text>UxB: {item.amount_prod}</Text>
          <Text
            style={
              !item.clearance ? styles.itemPrice : styles.itemPriceClearance
            }>
            {item.price_prod}
          </Text>
        </View>
      </View>
    );
  };

  _getItemLayout = (data, index) => {
    const productHeight = PRODUCT_ITEM_HEIGHT + PRODUCT_ITEM_MARGIN;
    return {
      length: productHeight,
      offset: productHeight * index,
      index,
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={this.props.screenProps.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

// router
const SimpleStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

// initial
export default class App extends React.Component {
  state = {
    appIsReady: false,
  };

  fetchData = async small => {
    const start_time = Date.now();
    try {
      // ~7700 records
      let uri = 'https://www.dropbox.com/s/dmrfa9b2043fa2t/catalog.json?raw=1';
      if (small === true) {
        // 5 records
        uri =
          'https://www.dropbox.com/s/txkz5gf755g6e4y/catalog_small.json?raw=1';
      }
      let response = await fetch(uri);
      console.log(
        'Download remote data took: ' + (Date.now() - start_time) + 'ms.'
      );
      // const data = await response.json();
      let data = await response.text();
      // https://github.com/facebook/react-native/issues/10377
      if (Platform.OS === 'android') {
        data = data.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
      }
      data = JSON.parse(data);
      console.log('Items in catalog: ' + data.length);
      this.setState({
        appIsReady: true,
        data: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentWillMount = () => {
    this.fetchData();
  };

  render() {
    if (this.state.appIsReady) {
      return <SimpleStack screenProps={{ data: this.state.data }} />;
    }
    return <Expo.AppLoading />;
  }
}

const colors = {
  snow: 'white',
  darkPurple: '#140034',
  placeholder: '#eee',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  listContainer: {
    flex: 1,
    padding: PRODUCT_ITEM_OFFSET,
  },
  item: {
    margin: PRODUCT_ITEM_OFFSET,
    overflow: 'hidden',
    borderRadius: 3,
    width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
      PRODUCT_ITEM_MARGIN,
    height: PRODUCT_ITEM_HEIGHT,
    flexDirection: 'column',
    backgroundColor: colors.snow,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  itemImage: {
    width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
      PRODUCT_ITEM_MARGIN,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    margin: PRODUCT_ITEM_OFFSET * 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: PRODUCT_ITEM_OFFSET * 2,
    borderWidth: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.15)',
    margin: PRODUCT_ITEM_OFFSET * 2,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  itemPriceClearance: {
    fontWeight: 'bold',
    color: 'red',
  },
});
