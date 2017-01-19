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

export default class ChartBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      barColor_prop: this.props.barColor,
      barSz_prop : parseInt(this.props.barSize)*1.8,
      barSz : new Animated.Value(0),
      loading : true
    }
  }
  componentDidMount() {
    Animated.timing(
      this.state.barSz,
      {toValue: this.state.barSz_prop}
    ).start();
  }
  render(){
    var boldness = "normal";
    var barColor = "#909090";
    var fontSz = 11;

    return(
      <Animated.View style={{ width: this.state.barSz, height: 5, backgroundColor: this.state.barColor_prop ,margin:5}}/>
    );
  }
}
