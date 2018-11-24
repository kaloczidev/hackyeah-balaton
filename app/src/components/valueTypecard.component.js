import React, {Component} from 'react';
import {Platform, StyleSheet, Animated, SafeAreaView , TouchableOpacity} from 'react-native';
import { STYLES, VALUES } from '../styles';

const {Text, View} = Animated;

export default class ValueTypeCard extends Component {
  render () {
    const {name, unit, categories, color} = this.props.config;
    return (
        <View style={{...STYLES.container, ...styles.container}}>
        <TouchableOpacity onPress={()=> {
          this.props.open();
        }}>
          <Text style={{...styles.header}}>
            {name}
          </Text>
          <View>
            <Text>5,6 </Text>
          </View>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderColor: VALUES.colors.gray,
    borderWidth: 1,
    padding: VALUES.paddingSmall,
    borderRadius: VALUES.radius,
  },
  header: {
    fontSize: VALUES.fontSizes.title,
    color: VALUES.colors.black
  }
});