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

const { Text, View } = Animated;

export default class ValueTypeCard extends Component {
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
            <View>
              <Text>5,6</Text>
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
    height: 110
  },
  header: {
    fontSize: VALUES.fontSizes.title,
    color: VALUES.colors.white
  }
});
