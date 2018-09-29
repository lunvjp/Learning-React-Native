import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaView } from 'react-navigation';

// import Login from '../../components/login/components/Main';
// import Chat from '../../components/chat';
// import RemindMeButton from '../../components/RemindMeButton';
// import RemindMeButton from '../../components/SocialMediaButton';
// import topicItem from '../../components/topicItem';
// import topicList from '../../components/topicList';

import styles from './styles';
import { ExampleRoutes } from '../../config/nav';

/**
 * Main,
    Chat,
    RemindMeButton,
    SocialMediaButton,
    TalkInfo,
 */

const ExampleInfo = {
  Main : {
    name : 'Login'
  },
  ChatUI : {
    name : 'Chat'
  },
  RemindMeButton : {
    name : 'RemindMeButton'
  },
  SocialMediaButton : {
    name : 'RemindMeButton'
  },
  TalkInfo : {
    name : 'topicItem'
  },
  // topicList : {
  //   name : 'topicList'
  // }
};

class HomeScreen extends Component {

  componentDidMount() {
    console.log(ExampleRoutes);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView forceInset={{ bottom: 'always', horizontal: 'never' }}>
            <View style={{ backgroundColor: '#fff' }}>
              {Object.keys(ExampleRoutes).map((routeName) => (
                <TouchableOpacity
                  key={routeName}
                  onPress={() => {
                    let route = ExampleRoutes[routeName];
                    if (route.screen || route.path || route.params) {
                      const { path, params, screen } = route;
                      const { router } = screen;
                      const action =
                        path && router.getActionForPathAndParams(path, params);
                      navigation.navigate(routeName, {}, action);
                    } else {
                      navigation.navigate(routeName);
                    }
                  }}
                >
                  <SafeAreaView
                    style={styles.itemContainer}
                    forceInset={{ veritcal: 'never', bottom: 'never' }}
                  >
                    <View style={styles.item}>
                      <Text style={styles.title}>
                        {ExampleInfo[routeName].name}
                      </Text>
                    </View>
                  </SafeAreaView>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
      </View>
    );
  }
}

export default HomeScreen;