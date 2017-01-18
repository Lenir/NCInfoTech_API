//imports - react, react-native.
import React, {Component} from 'react';

//imports - other APIs
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

import {
  AppRegistry,
  Animated,
  Alert,
  AlertIOS,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Keyboard,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  Timer,
  Navigator,
  // PushNotificationIOS,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ScoreInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }
  componentWillMount(){
    this.setState({
      dataSource :  this.state.dataSource.cloneWithRows(this.props.detailScore),
    });
  }
  renderItems(fetchedItem){
      return(
          <View style={{margin:5}}>
            <TouchableOpacity>
              <Text style={styles.items}>{fetchedItem.item} : {fetchedItem.avg}</Text>
            </TouchableOpacity>
          </View>
      );
    }
    render(){
      return(
        <View style={styles.container}>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20, marginBottom: 50, marginLeft:10, marginRight:10}}>
            <Text style={{fontSize:25,color:'#909090',margin:20}}>Detail Score Information</Text>
            <ScrollView>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderItems}
              />

            </ScrollView>
            <TouchableOpacity onPress={()=>{
                Actions.pop();
              } }>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Ionicons size={30} name="ios-arrow-back" color="#909090"/>
                <Text style={{color:"#909090", fontSize:20 ,margin:5}}> Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      flexDirection: 'row',
    },
    wrapper: {
      backgroundColor: 'white'
    },
    button: {
      padding: 5,
      backgroundColor: 'white'
    },
    lists:{
      flexDirection: 'row',
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    listItem:{
      margin: 7,
      alignItems:'center'
    },
    separator:{
      flex:1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E'
    },
    items:{
      color:'#606060',
      margin:2,
    }
  });
