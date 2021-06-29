import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import { NavigationContainer } from '@react-navigation/native';
import { Block, GalioProvider } from 'galio-framework';

import Screen from './navigation/Screens';
import {nowTheme} from './constants';


export default class App extends Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };
  
  render() {
    
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      
      return (
        <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
              <StatusBar style='auto' />
              <Screen />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }
  
  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'arial-regular': require('./assets/fonts/ArialCE.ttf'),
      'arial-bold': require('./assets/fonts/ArialCEBold.ttf')
    });

    this.setState({ fontLoaded: true });
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
