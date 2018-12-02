import React, { Component } from 'react';
import { TextInput, FlatList, View, Text, Dimensions } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Right, Icon,
  Button, CheckBox, Body
} from 'native-base';
import Collapsible from 'react-native-collapsible';
import uuid from 'uuidv4';
import { connect } from 'react-redux'

const { width } = Dimensions.get('window');
/**
 * 1. name
 * 2. description
 * 3.
 */
const task = (title) => ({
  id : uuid(),
  title : title,
  checked : false
});

const word = (id) => {
  // name
  // index
  //
}

class ListView extends Component {
  state = {
    checkAllTopics : false,
    isOpenTopicSettings : false,
    text : '',
    todoList : [],
    topicCheckedList : []
  }
  onSubmitEditing = () => {
    const val = this.state.text;
    /* Add new To do task to the List */
    this.setState({
      todoList : [
        ...this.state.todoList,
        task(val)
      ]
    });
  }
  onPressDelete = (taskID) => {
    // TODO: We need ID to delete one Task
    // We can use filter from Array for this Working.
    this.setState({
      todoList : this.state.todoList.filter((item) => {
        return item.id !== taskID;
      })
    });
  }
  renderItem = ({item}) => {
    console.log(item)
    return (
      <ListItem noIndent style={{ backgroundColor: "#cde1f9" }}>
        <Left>
          <Text>{item.title}</Text>
        </Left>
        <Right>
          <Button light
                  onPress={() => this.onPressDelete(item.id)}
          ><Text>Delete</Text></Button>
        </Right>
      </ListItem>
    );
  }

  renderItemNew = () => {

  }

  renderListTopic = () => {
    return this.props.topics.map((topic) => {
      topic.checked = true;
      return (
        <ListItem
                  key={topic.id}
        >
          <CheckBox checked={this.state.topicCheckedList.includes(topic.id)}
                    onPress={(check) => {
                      console.log(check)
                      this.onTopicClick(topic)
                    }}
          />
          <Body>
            <Text>{topic.title}</Text>
          </Body>
        </ListItem>
      )
    })
  }

  renderTopicItem = (topic) => {
    return (
      <ListItem
        key={topic.id}
      >
        <CheckBox checked={this.state.topicCheckedList.includes(topic.id)}
                  onPress={(topic) => {
                    console.log(topic)
                    // this.onTopicClick(topic)
                    // todo right here.
                    // console.log( 'check box' )
                  }}
        />
        <Body>
        <Text>{topic.title}</Text>
        </Body>
      </ListItem>
    );
  }

  renderListTopicVersion2 = () => {
    return (
      <FlatList
        data={this.props.topics}
        renderItem={this.renderTopicItem}
        keyExtractor={item => item.id}
      />
    );
  }

  onTopicClick = (item) => {
    // console.log(item);

    // return;
    // this.setState({
    //   topicCheckedList : this.state.topicCheckedList.map((topic) => {
    //     if (topic.id === item.id) {
    //       console.log( topic )
    //       // Update checked Status
    //       topic.checked = !topic.checked
    //     }
    //     return topic;
    //   })
    // }, () => {
    //   console.log('after updated')
    //   console.log( this.state.topicCheckedList )
    // })

    // topicCheckedList
    // console.log( item );
    if (this.state.topicCheckedList.includes(item.id)) {
      // Update current state
      let topicCheckedList = this.state.topicCheckedList;
      topicCheckedList.splice( topicCheckedList.indexOf( item.id ), 1 );

      this.setState({
        topicCheckedList : topicCheckedList
      }, () => {
        console.log('after update new List')
      })
    } else {
      this.setState({
        topicCheckedList : this.state.topicCheckedList.push(item.id)
      }, () => {
        console.log('create new List');
        console.log( this.state.topicCheckedList )
      });
    }
  }
  componentDidMount () {
    // TODO: fetch todoList of by Topic.
    // const topics = this.props.topics;
    // // console.log(topics);
    // this.setState({
    //   topicCheckedList : this.props.topics.map((topic) => ({
    //     id : topic.id,
    //     title : topic.title,
    //     checked : true,
    //   }))
    // });
    this.setState({
      topicCheckedList : this.props.topics.map((topic) => {
        return topic.id;
      })
    });
  }
  componentWillMount() {
    console.log( 'componentWillMount' )
    this.setState({
      topicCheckedList : this.props.topics.map((topic) => {
        return topic.id;
      })
    });
  }
  renderListTopicWithFlatList = () => {
    return (
      <FlatList
        horizontal={false}
        numColumns={2}
        data={this.props.topics}
        renderItem={({item}) => {
          let topic = item;
          // console.log( topic )
          // topic.checked = true;
          // console.log( topic.id )
          console.log( this.state.topicCheckedList )

          return (
            <ListItem
              key={topic.id}
            >
              <CheckBox checked={this.state.topicCheckedList.includes(topic.id)}
                        onPress={(check) => {
                          this.onTopicClick(topic)
                        }}/>
              <Body>
              <Text>{topic.title}</Text>
              </Body>
            </ListItem>
          )
        }}
        keyExtractor={() => uuid()}
      />
    );
  }
  render() {
    return (
      <Container style={{
        flex : 1,
        // backgroundColor : 'red'
      }}>
        {/*<Header/>*/}
        <Content>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={this.onSubmitEditing}
          />
          {/*<Button onPress={() => {*/}
            {/*// add new Item to the List new words*/}
          {/*}}>*/}
          {/*</Button>*/}
          {/*Settings Topic*/}
          <View>
            <ListItem>
              <CheckBox checked={this.state.checkAllTopics}
                        onPress={() => {
                          this.setState({
                            checkAllTopics : !this.state.checkAllTopics,

                          });
                        }}
              />
                <Body>
                  <Text>All Topics</Text>
                </Body>
            </ListItem>
            <Collapsible collapsed={this.state.checkAllTopics}
                         style={{
                           backgroundColor : 'red',
                           // width : width / 2,
                           // flex : 1
                         }}
            >
              {/*{this.renderListTopic()}*/}
              {this.renderListTopicWithFlatList()}
            </Collapsible>
          </View>
          {/*END: Settings Topic*/}
          {/*<FlatList*/}
            {/*// data={this.state.todoList}*/}
            {/*data={this.props.topics}*/}
            {/*renderItem={this.renderItem}*/}
            {/*keyExtractor={item => item.id}*/}
          {/*/>*/}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state.question;

export default connect(mapStateToProps)(ListView);
