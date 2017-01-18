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
import FetchConstants from "./FetchConstants"




import Ionicons from 'react-native-vector-icons/Ionicons';
// import FCM from 'react-native-fcm';




export default class FetchedList extends Component {
  _timer: Timer;
  constructor(props){
    super(props);
    this.state = {
      dataSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading : true
    };
  }
  componentDidMount() {
    this.setToggleTimeout();
  }
  setToggleTimeout() {
    this._timer = setTimeout(() => {
    this.setState({loading: false});
    }, 1);
  }
  fetchDetail(anncd){
    this.setState({loading:true});
    fetch(FetchConstants.DetailURL+"?anncd="+ancd)
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData==''){
          Alert.alert(
            '오류',
            '해당 번호의 데이터가 없습니다.',
            [
              {text:'확인'},
            ]
          )
          this.setState({loading: false});
        }else{
          this.setState({
            loading: false
          });
          Actions.detailInfo({
            FetchedData: responseData
          })
        }
      }
    )
    .done()
  }
  renderItems(fetchedItem){
    var anncd = fetchedItem.anncd;
    return(
      <TouchableOpacity onPress={ () =>{
          fetch(FetchConstants.DetailURL+"?anncd="+fetchedItem.anncd)
          .then((response) => response.json())
          .then((responseData) => {
            if(responseData==''){
              Alert.alert(
                '오류',
                '해당 번호의 데이터가 없습니다.',
                [
                  {text:'확인'},
                ]
              )
            }else{
            Actions.detailInfo({
              annname : fetchedItem.annname,
              FetchedData: responseData
            })
          }
        }
      )
      .done()
       }}>
        <View style={{margin:5}}>
          <Text style={styles.items}>번호 : {fetchedItem.annnum}</Text>
          <Text style={styles.items}>이름 : {fetchedItem.annname}</Text>
          <Text style={styles.items}>메모 : {fetchedItem.memo}</Text>
        </View>
        <View style={styles.separator}/>
      </TouchableOpacity>

    );
  }

  componentWillMount(){
    this.setState({
      dataSource :  this.state.dataSource.cloneWithRows(this.props.FetchedData)
    });
  }
  render(){
    console.log("Fetched Data : ",this.props.FetchedData,"Length : ",this.props.FetchedData.length);
    return(
      <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 40, marginLeft: 10,marginBottom: 50,marginRight:10}}>
        <Text style={{fontSize:25,color:'#909090',margin:20}}>Search Result</Text>
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
    backgroundColor: '#9E9E9E'
  },
  items:{
    color:'#606060',
    margin:2,
  }
});
