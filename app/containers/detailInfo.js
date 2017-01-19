//imports - react, react-native.
import React, {Component} from 'react';

//imports - other APIs
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
var annname_=""
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

import ChartBar from './chartBar';
import CompaniesChart from './companiesChart';
import Ionicons from 'react-native-vector-icons/Ionicons';

var i=0;
var compareSource:'';
export default class DetailInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : this.props.annname,
      memo : this.props.memo,
      dataSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading : true
    }
    annname_ = this.state.title;
    for(i=0;i<(this.props.FetchedData).length;i++){
      if(this.props.FetchedData[i].name=="앤시정보기술주식회사"){
        compareSource = JSON.parse(this.props.FetchedData[i].score_json);
      }else{}
    }
  }
  componentWillMount(){
    this.setState({
      dataSource :  this.state.dataSource.cloneWithRows(this.props.FetchedData),
    });
  }
  renderItems(fetchedItem){

    return(
      <View>
          <View style={{margin:5}}>
              <TouchableOpacity onPress={() => {
                Actions.scoreInfo({
                  detailScore: JSON.parse(fetchedItem.score_json),
                  companyName:(fetchedItem.name),
                  compareSource : compareSource,
                  annname: annname_,
                })
               }}>
              <Text style={styles.itemName}>{fetchedItem.name}</Text>
              <Text style={styles.items}>입찰점수 : {fetchedItem.bid_num}</Text>
              <Text style={styles.items}>기술점수 : {fetchedItem.tec_num}</Text>
              <Text style={styles.items}>종합점수 : {fetchedItem.tot_num}</Text>
              </TouchableOpacity>

          </View>
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
          <ChartBar barSize={fetchedItem.tot_num} barColor={barColor}/>
          <Text style={{color:'#707070',fontSize:fontSz ,fontWeight:boldness}} >{fetchedItem.name}</Text>
        </View>
    );
  }

  render(){

    return(

      <View style={styles.container}>
        <View style={{alignItems:'center',marginTop:20,marginBottom:15,margin:5}}>
        <Text style={{fontSize:13,color:'#909090',marginTop:20}}>Detail Information</Text>
        <Text numberOfLines={1} style={{fontSize:20,color:'#909090',marginTop:5, margin:10, alignItems:'center'}}>{this.state.title}</Text>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', margin:10,marginBottom:5,flex:1}}>
            <ScrollView>
              <Text style={{fontSize:15,color:'#606060',margin:5,marginBottom:0,fontWeight:'bold'}}>ㆍ종합 점수 개요</Text>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderGraph}
              />
              <View style={styles.separator}/>
              <View style={{margin:7}}>
                <Text style={{fontSize:15,color:'#606060',fontWeight:'bold',marginBottom:5}}>ㆍ메모</Text>
                <Text style={{fontSize:13,color:'#606060',marginLeft:5}}>{this.state.memo}</Text>
              </View>
              <View style={styles.separator}/>
              <View style={{margin:5}}>
                <Text style={{fontSize:15,color:'#606060',fontWeight:'bold',marginTop:5}}>ㆍ업체 리스트</Text>
              </View>
              <View style={{margin:2,marginTop:0}}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderItems}
                />
              </View>

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
  },
  itemName:{
    color:'#606060',
    margin:2,
    fontWeight:'bold'
  }
});
