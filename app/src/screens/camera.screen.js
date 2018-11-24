import React, {Component} from 'react';
import {Platform, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { STYLES, VALUES } from '../styles';

const {Text, View} = Animated;

export default class CameraScreen extends Component {
  render () {
    return (
      <SafeAreaView style={{...styles.view}}>
        <View style={{...STYLES.container, ...styles.container}}>
          <Text style={{...STYLES.header, ...styles.header}}> Camera Screen </Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: VALUES.colors.white,
    flex: 1
  },
  container: {
    backgroundColor: VALUES.colors.white,
    flex: 1
  },
  header: {
    color: VALUES.colors.black
  }
});