import React, {Component} from 'react';
import {Platform, StyleSheet, Animated, SafeAreaView } from 'react-native';

import { STYLES, VALUES } from '../styles';
import ValueTypeCard from '../components/valueTypecard.component';
import { TYPECONFIG } from '../config';

const {Text, View} = Animated;



export default class HomeScreen extends Component {
  render () {

    return (
      <SafeAreaView style={{...styles.view}}>
        <View style={{...STYLES.container, ...styles.container}}>
          <Text style={{...STYLES.header, ...styles.header}}>HomeScreen</Text>

          <View>
          { TYPECONFIG.map( (item, index )=> {
            return <ValueTypeCard config={item} key={index}  open={ () => {
              this.props.navigation.navigate('type', {config: item});
            }}/>;
          })}
          </View>
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