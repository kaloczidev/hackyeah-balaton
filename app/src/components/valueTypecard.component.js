import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { STYLES, VALUES } from "../styles";
import { API } from "../config";

const { Text, View } = Animated;

export default class ValueTypeCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recent: 0,
      avarage: 0,
    }
  }

  componentDidMount () {
    fetch(API.base+'measurements'+'?type='+this.props.config.url)
    .then(r => r.json())
    .then( r => {
      let s = 0;
      r.forEach(i => s+=i.value);
      this.setState({
        recent: r[0].value,
        avarage: Math.round(s / r.length * 10) / 10
      });
    })
    .catch(e => {
      console.log(e);
    });
  }
  render() {
    const { name, unit, categories, color, gradient } = this.props.config;
    return (
      <View
        style={{ ...STYLES.container, ...styles.container, ...{ padding: 0 } }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.open();
          }}
        >
          <LinearGradient
            style={{ ...STYLES.container, ...styles.container }}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={[gradient.from, gradient.to]}
          >
            <Text style={{ ...styles.header }}>{name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={styles.recent}>{this.state.avarage}</Text>
              <Text style={{color: VALUES.colors.white, paddingBottom: 10}}> {unit} </Text>
            </View>
            <View>
              <Text style={styles.avarage}>recent: {this.state.recent}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: VALUES.paddingSmall,
    borderRadius: VALUES.radius,
    shadowColor: VALUES.colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    height: 110,
    position: 'relative'
  },
  header: {
    fontSize: VALUES.fontSizes.title,
    color: VALUES.colors.white
  },
  recent: {
    fontSize: 56,
    color: VALUES.colors.white
  },
  avarage: {
    opacity: .7,
    color: VALUES.colors.white,
    position: 'absolute',
    right: 0,
    top: -90
  }
});
