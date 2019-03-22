import React, {Component} from 'react';
import store from './src/store/index';
import {Provider} from 'react-redux';
import MainApp from './src/MainApp';
import LOADING from './src/screens/LoadingScreen';
import { Font } from 'expo';
  
export default class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      fontLoaded: false
    };
  }
  async componentDidMount(){
    await Font.loadAsync({
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf')
    }).then(() => {
      this.setState({
        fontLoaded: true
      })
      console.log('Loading....')
    });
  }

  render() {
    return (
      <Provider store={store}>
        {
          this.state.fontLoaded ? 
          <MainApp />
          :
          <LOADING />
        }

      </Provider>
    );
  }
}

