//imports - react, react-native.
import React, {Component} from 'react';

//imports - other APIs
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

import {
  Dimensions,
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

import CompaniesChart from './companiesChart'
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FCM from 'react-native-fcm';
/*
class ScoreInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  }
  componentWillMount(){
    this.setState({
      dataSource :  this.state.dataSource.cloneWithRows(this.props.inputData),
    });
  }
  renderItems(dataSource){
    return(
        <View style={{margin:5}}>
          <Text style={styles.items}>{dataSource.item}</Text>
          <Text style={styles.items}>{dataSource.avg}</Text>
        </View>
    );
  }
  render(){}
  return(
    <View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItems}
      />
    </View>
  );
}
*/
export default class DetailInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),

      loading : true
    };
  }
  componentWillMount(){
    this.setState({
      dataSource :  this.state.dataSource.cloneWithRows(this.props.FetchedData),
      //scoreSource :  this.state.scoreSource.cloneWithRows(this.props.FetchedData[0].score_json)
    });
  }
  renderItems(fetchedItem){
    // this.setState({
    //   scoreSource : this.state.scoreSource.cloneWithRows(fetchedItem.score_json)
    // });
    return(
        <View style={{margin:5}}>
          <TouchableOpacity onPress={() => { Actions.scoreInfo({detailScore: JSON.parse(fetchedItem.score_json)}) }}>
          <Text style={styles.items,{fontWeight:'bold'}}>업체명 : {fetchedItem.name}</Text>
          <Text style={styles.items}>입찰점수 : {fetchedItem.bid_num}</Text>
          <Text style={styles.items}>기술점수 : {fetchedItem.tec_num}</Text>
          <Text style={styles.items}>종합점수 : {fetchedItem.tot_num}</Text>
          </TouchableOpacity>
          <View style={styles.separator}/>
        </View>
    );
  }
  renderGraph(fetchedItem){
    var boldness = "normal";
    var barColor = "#909090";
    var fontSz = 11;
    if(fetchedItem.name=="앤시정보기술주식회사"){
      boldness = "bold"
      barColor = "#606060"
      fontSz = 15
    }
    return(
        <View style={{margin:5, flexDirection:'row'}}>
          <View style={{width : parseInt(fetchedItem.tot_num)*1.8, height: 5, backgroundColor:barColor,margin:5}}/>
          <Text style={{color:'#707070',fontSize:fontSz ,fontWeight:boldness}}>{fetchedItem.name}</Text>
        </View>
    );
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={{alignItems:'center',marginTop:20,marginBottom:15}}>
        <Text style={{fontSize:15,color:'#909090',marginTop:20}}>Detail Information</Text>
        <Text style={{fontSize:25,color:'#909090',marginTop:5, margin:10, alignItems:'center'}}>{this.props.annname}</Text>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', margin:10,marginBottom:5,flex:1}}>
            <ScrollView>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderGraph}
              />
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderItems}
              />

            </ScrollView>

          </View>
          <TouchableOpacity onPress={()=>{
              Actions.pop();
            } }>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Ionicons size={30} name="ios-arrow-back" color="#909090"/>
              <Text style={{color:"#909090", fontSize:20 ,margin:5,}}> Back</Text>
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
    backgroundColor: '#9E9E9E'
  },
  items:{
    color:'#606060',
    margin:2,
  }
});
