//imports - react, react-native.
import React, {Component} from 'react';

//imports - other APIs
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

import {
  ActivityIndicator,
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
  Platform,
  Navigator,
  PushNotificationIOS,
} from 'react-native';
import FetchConstants from "./FetchConstants"
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FCM from 'react-native-fcm';
var serializeJSON = function(data){
  return Object.keys(data).map(function (keyName){
    return encodeURIComponent(keyName)+'='+encodeURIComponent(data[keyName])
  }).join('&');
}




export default class ApiMain extends Component {
  _timer: Timer;
  constructor(props) {

       super(props);
       const numR = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
       const nameR = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
       const dateR = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
       const urlR = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
       const memoR = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
       this.state={
         //ListView DataSource
         numRow: numR.cloneWithRows(['num1','num2','num3','num4','num5']),
         nameRow: nameR.cloneWithRows(['name1','name2','name3','name4','name5']),
         dateRow: dateR.cloneWithRows(['date1','date2','date3','date4','date5']),
         urlRow: urlR.cloneWithRows(['url1','url2','url3','url4','url5']),
         memoRow: memoR.cloneWithRows(['memo1','memo2','memo3','memo4','memo5']),

         tmpMemo:'',
         //Search variable
         schBidNum: "",
         schBidName: "동래구" ,
         schBidSDate: "2014-01-01",
         schBidEDate: "2017-01-01",

         //Retrieved Json parse-variable
         bidNum:null,
         bidName:null,
         bidDate:null,
         bidUrl:null,
         bidMemo:null,

         token : "",
         pname : null,
         pheight : null,
         pmass : null,
         loading : true,
         iconSize : 25,
       };
  }

  componentDidMount() {
    if(Platform.OS == 'ios'){
        PushNotificationIOS.addEventListener('register',this._onRegistered);
        PushNotificationIOS.addEventListener('registrationError',this._onRegistrationError);
        PushNotificationIOS.addEventListener('notification',this._onRemoteNotification);
        PushNotificationIOS.addEventListener('localNotification',this._onLocalNotification);
        PushNotificationIOS.requestPermissions();
      };
      this.setToggleTimeout();
  }
  componentWillUnmount() {
    if(Platform.OS == 'ios'){
      PushNotificationIOS.removeEventListener('register',this._onRegistered);
      PushNotificationIOS.removeEventListener('registrationError',this._onRegistrationError);
      PushNotificationIOS.removeEventListener('notification',this._onRemoteNotification);
      PushNotificationIOS.removeEventListener('localNotification',this._onLocalNotification);
    };
    clearTimeout(this._timer);
  }

  setToggleTimeout() {
    this._timer = setTimeout(() => {
    this.setState({loading: false});
    }, 1);
  }

  _sendNotification(){
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived',{
      aps:{
        alert: 'Sample notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _sendLocalNotification(){
    require('RCTDeviceEventEmitter').emit('localNotificationReceived',{
      aps:{
        alert: 'Sample local notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _onRegistered(deviceToken){
    AlertIOS.alert(
      'Registered For Remote Push',
      `Device Token: ${deviceToken}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
  _onRegistrationError(error){
    AlertIOS.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}) : (${error.message})`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
  _onRemoteNotification(notification){
    AlertIOS.alert(
      'Push Notification Received',
      'Alert message' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onLocalNotification(notification){
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  fetchBid(){
    var params = {
        schAnnnum: this.state.schBidNum,
        schAnnname: this.state.schBidName,
        schSdate: this.state.schBidSDate,
        schEdate: this.state.schBidEDate
    };
    var formData = new FormData();
    for (var k in params) {
        formData.append(k, params[k]);
    }
    this.setState({loading: true});
    fetch(FetchConstants.ListURL+
      "?schAnnnum="+this.state.schBidNum+
      "&schSdate="+this.state.schBidSDate+
      "&schEdate="+this.state.schBidEDate+
      "&schAnnname="+this.state.schBidName,{
        method:'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formData
      })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData==''){
          Alert.alert(
            '오류',
            '해당 검색조건에 맞는 데이터가 없습니다.',
            [
              {text:'확인'},
            ]
          )
          this.setState({loading: false});
        }else{
        console.log(responseData);
        if(responseData==null){
            Alert.alert(
              '오류',
              '조건에 맞는 데이터가 없습니다.',
              [
                {text: '확인'},
              ]
            )
        }else{
          this.setState({
            // bidNum:responseData[0].annnum,
            // bidName:responseData[0].annname,
            // bidDate:responseData[0].anndate,
            // bidUrl:responseData[0].url,
            // bidMemo:responseData[0].memo,
            loading: false
          });
          Actions.fetchedList({
            FetchedData: responseData
          })
        }
        //
        // if(this.state.bidName == null){
        //   Alert.alert(
        //     '오류',
        //     '공고 이름이 없습니다.',
        //     [
        //       {text: '확인'},
        //     ]
        //   )
        //   this.setState({loading: false});
        // }else if(this.state.bidNum == null){
        //   Alert.alert(
        //     '오류',
        //     '공고 번호가 없습니다.',
        //     [
        //       {text: '확인'},
        //     ]
        //   )
        //   this.setState({loading: false});
        // }else{
        //   // Actions.detailInfo({
        //   //   name:this.state.pname,
        //   //   height: this.state.pheight,
        //   //   mass: this.state.pmass})
        //   this.setState({loading: false});
        // };
          //detailView Required
        }
      })

      .done()

  }
  render(){
    let { token } = this.state.token;
    return(
      <View style={styles.container}>
              <View style={{alignItems:'center', justifyContent:'center'}}>
                  <Text style={{
                    fontSize:25,
                    fontWeight: 'bold',
                    color:'#8e8e8e',
                    marginTop: 100
                  }}>NC Info Tech API
                  </Text>
                  <Text style={{color:'#9e9e9e'}}>
                    Simple API Call Tutorial
                  </Text>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize:15 ,color:'#9e9e9e',marginTop: 30}}>공고 번호</Text>
                    <TextInput style={{width:200,
                      height: 40,
                      color:'#7e7e7e',
                      alignItems:'center'
                      }}
                      keyboardType='phone-pad'
                      placeholder="공고 번호를 입력해 주세요."
                      onChangeText={(schBidNum) => {
                        this.setState({schBidNum}) }}
                      value={this.state.schBidNum}/>
                  </View>
                  <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize:15 ,color:'#9e9e9e'}}>공고 이름</Text>
                      <TextInput style={{width:200,
                        height: 40,
                        color:'#7e7e7e',
                        alignItems:'center'
                        }}
                        keyboardType='default'
                        placeholder="공고 이름을 입력해 주세요."
                        onChangeText={(schBidName) => {
                          this.setState({schBidName}) }}
                        value={this.state.schBidName}/>
                  </View>

                  <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize:15 ,color:'#9e9e9e'}}>공고 일자</Text>
                      <TextInput style={{width:110,
                        height: 40,
                        color:'#7e7e7e',
                        alignItems:'center'
                        }}
                        placeholder="공고 시작 일자를 입력해 주세요."
                        onChangeText={(schBidSDate) => {
                          this.setState({schBidSDate}) }}
                        value={this.state.schBidSDate}/>
                  </View>

                  <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize:15 ,color:'#9e9e9e'}}>공고 일자</Text>
                      <TextInput style={{width:110,
                        height: 40,
                        color:'#7e7e7e',
                        alignItems:'center'
                        }}
                        placeholder="공고 종료 일자를 입력해 주세요."
                        onChangeText={(schBidEDate) => {
                          this.setState({schBidEDate}) }}
                        value={this.state.schBidEDate}/>
                  </View>

                    <TouchableOpacity onPress={()=>{
                        this.fetchBid();
                      }
                    }>
                      <Ionicons size={30} name="ios-search" color="#909090"/>
                    </TouchableOpacity>
                    <ScrollView style={{height: 100}}>

                  <View style={{margin:10,alignItems:'center'}}>
                    <ActivityIndicator
                      animating={this.state.loading}
                      color="#aeaeae"
                      style={[{alignItems:'center'}, {height:30}]}
                      size="small"
                    />
                  </View>
                  <View>
                    <View style={styles.lists}>


                    </View>
                  </View>
                  </ScrollView>


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
  }
});
