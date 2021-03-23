/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import Navigation from './Navigation';
import { API_ROOT } from './env';
import configureStore from './src/redux/store';
import { Provider } from 'react-redux';
import { setConfiguration } from './src/utils/configuration';
type Props = {};


export default class App extends Component<Props> {


  componentDidMount() {
    setConfiguration('API_ROOT', API_ROOT);
  }

  componentWillUnmount() {

  }


  render() {
    const store = require('./src/redux/store').default;
    return (
      <View style={styles.container}>

        <Provider store={store}>
          <Navigation />
        </Provider>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
