//imports - react, react-native.
import React, {Component} from 'react';

//imports - other APIs
import {
  Scene,
  Router,
  Reducer,
  Actions,
  ActionConst
} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FCM from 'react-native-fcm';




//Component, Containers
import ApiMain from './apiMain'
import DetailInfo from './detailInfo'

//Reducer
/*
const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};
*/

//Main class.
export default class App extends Component {
  constructor(props) {
       super(props);
   }

  render() {
    console.log("Props", this.props, this.state);
    return (
      //Router, Scenes
        <Router >
          <Scene key="root"  hideNavBar hideTabBar>
            <Scene key="apiMain" component={ApiMain} initial animation="fade" />
            <Scene key="detailInfo" component={DetailInfo} />
          </Scene>
        </Router>
    );
  }
}
