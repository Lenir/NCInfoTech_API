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
var gap = [];
export default class ScoreInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      annname: this.props.annname,
      name : this.props.companyName,
      dataSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      compareSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      gapSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isNC : false
    };

  }
  componentWillMount(){
    gap = [];
    if(this.state.name == "앤시정보기술주식회사"){
      this.setState({isNC:true})
    }
    if(!this.state.isNC){
      for(var i=0;i<(this.props.detailScore).length;i++){
        gap.push(Number(( ((parseFloat(this.props.detailScore[i].avg)) - (parseFloat(this.props.compareSource[i].avg))) ).toFixed(3)))
      }
    }
    this.setState({
      dataSource :  this.state.dataSource.cloneWithRows(this.props.detailScore),
      compareSource :  this.state.compareSource.cloneWithRows(this.props.compareSource),
      gapSource :  this.state.gapSource.cloneWithRows(gap)
    });
  }
  renderRowname(fetchedItem){
    var boldness = "normal";
    if(fetchedItem.item=="종합점수"){
      boldness = "bold"
    }
      return(
          <View style={{margin:5,height:20,flexDirection:'row'}}>
              <Text style={{color:'#606060',fontSize:16 ,fontWeight:boldness}}>{fetchedItem.item}</Text>
          </View>
      );
    }
  renderItems(fetchedItem){
    var boldness = "normal";
    if(fetchedItem.item=="종합점수"){
      boldness = "bold"
    }
      return(
          <View style={{margin:5,height:20,}}>
              <Text style={{color:'#606060',fontSize:16 ,fontWeight:boldness}}>{fetchedItem.avg}</Text>
          </View>
      );
    }
    renderCompares(fetchedItem){
      var boldness = "normal";
      if(fetchedItem.item=="종합점수"){
        boldness = "bold"
      }
        return(
            <View style={{margin:5,height:20,}}>
                <Text style={{color:'#858585',fontSize:16 ,fontWeight:boldness}}> {fetchedItem.avg}</Text>
            </View>
        );
    }
    renderGaps(fetchedItem){
      var boldness = "normal";
      var gapColor = '#F5FCFF';
      var icon = "ios-more";
      if(fetchedItem < 0){
        icon = "ios-arrow-round-up";
        gapColor = "#4286f4";
        fetchedItem = fetchedItem*(-1)
      }else if(fetchedItem>0){
        icon = "ios-arrow-round-down";
        gapColor = "#f44242";

      }
        return(
            <View style={{margin:5,flexDirection:'row',height:20,}}>
              <Ionicons size={18} name={icon} color={gapColor}/>
                <Text style={{color:gapColor,fontSize:16 ,fontWeight:boldness}}> {fetchedItem}</Text>
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
            <Text style={{color:'#707070',fontSize:fontSz ,fontWeight:boldness}} >{fetchedItem.name}</Text>
          </View>
      );
    }
    render(){
      if(this.state.isNC){
        return(
          <View style={styles.container}>
            <View style={{alignItems:'center',marginTop:20,marginBottom:15}}>
                <Text style={{fontSize:13,color:'#909090',marginTop:20}}>{this.state.annname}</Text>
                <Text style={{fontSize:25,color:'#909090',marginTop:5,marginBottom:50}}>{this.props.companyName}</Text>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', margin:10,marginBottom:20,flex:1}}>
                  <ScrollView>
                    <View style={{flexDirection:'row'}}>
                      <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRowname}
                      />
                      <Text>  </Text>
                      <View style={styles.separatorRow}></View>
                      <Text>  </Text>
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
                    <Text style={{color:"#909090", fontSize:20 ,margin:5}}> Back</Text>
                  </View>
                </TouchableOpacity>
            </View>
          </View>
        );
      }else{
      return(
        <View style={styles.container}>
          <View style={{alignItems:'center',marginTop:20,marginBottom:15}}>
              <Text style={{fontSize:13,color:'#909090',marginTop:20}}>{this.state.annname}</Text>
              <Text style={{fontSize:25,color:'#909090',marginTop:5,marginBottom:5,fontWeight:'bold'}}>{this.props.companyName}</Text>
              <View style={{alignItems: 'flex-start', justifyContent: 'center', margin:10,marginBottom:20,flex:1}}>
                <ScrollView>
                  <View style={{flexDirection:'row',marginTop:20}}>

                    <View style={{alignItems:'center'}}>
                      <Text style={{fontSize:15,color:'#808080',margin:8,fontWeight:'bold',height:20,}}>카테고리</Text>
                      <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRowname}
                      />
                    </View>
                    <View style={styles.separatorRow}></View>

                    <View style={{alignItems:'center'}}>
                      <Text style={{fontSize:15,color:'#808080',margin:8,fontWeight:'bold',height:20,}}>업체 점수</Text>
                      <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderItems}
                      />
                    </View>
                    <View style={styles.separatorRow}></View>

                    <View style={{alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:15,color:'#808080',margin:8,fontWeight:'bold',height:20,}}>NCI 점수</Text>
                      <ListView
                        dataSource={this.state.compareSource}
                        renderRow={this.renderCompares}
                      />
                    </View>
                    <View style={styles.separatorRow}></View>
                    <View style={{alignItems:'center'}}>
                      <Text style={{fontSize:15,color:'#808080',margin:8,fontWeight:'bold',height:20,}}>비교</Text>
                      <ListView
                        dataSource={this.state.gapSource}
                        renderRow={this.renderGaps}
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
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

      );}
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
    separatorRow:{
      width: StyleSheet.hairlineWidth,
      margin:4,
      backgroundColor: '#8E8E8E'
    },
    items:{
      color:'#606060',
      margin:1,
      fontSize:17
    }
  });
