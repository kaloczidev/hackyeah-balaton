/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import TypeScreen from "./src/screens/type.screen";
import HomeScreen from "./src/screens/home.screen";
import CameraScreen from "./src/screens/camera.screen";
import { VALUES } from "./src/styles";

const Navigator = createStackNavigator(
  {
    //routing
    home: {
      screen: HomeScreen
    },
    type: {
      screen: TypeScreen
    },
    camera: {
      screen: CameraScreen
    }
  },
  {
    // config
    headerMode: "none",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        // easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.83, index],
          outputRange: [0, 1, 1]
        });

        return { 
          opacity,
          transform: [{ translateX }],
          shadowColor: VALUES.colors.black,
          shadowOffset: { width: 4, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
       };
      }
    })
  }
);
const Container = createAppContainer(Navigator);

export default class App extends Component {
  render() {
    return <Container />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
