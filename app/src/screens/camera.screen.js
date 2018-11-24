import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from "react-native";

import Picker from "react-native-wheel-picker";
import LinearGradient from "react-native-linear-gradient";

import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";

const moment = require("moment");

const Color = require("color");

import { STYLES, VALUES } from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import { API } from "../config";

const { PickerItem } = Picker;
const { Text, View } = Animated;

export default class TypeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
      itemList: [],
      history: [],
      selectedCategory: 0
    };
  }

  componentDidMount() {
    this.loadItems();
    const values = [];
    const range = this.props.navigation.state.params.config.range;
    for (let i = range.from; i < range.to; i += range.step) {
      const k = Math.round(i * 10) / 10 + "";
      values.push(k.includes(".") ? k : k + ".0");
    }

    this.setState({
      itemList: values,
      selectedItem: values.length / 4
    });
  }

  onPickerSelect(index) {
    this.setState({
      selectedItem: index
    });
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  async loadItems() {
    const target = API.base + "measurements?type=";

    await fetch(target + this.props.navigation.state.params.config.url)
      .then(r => r.json())
      .then(r => {
        console.log(r);
        this.setState({
          history: r
        });
      })
      .catch(e => {
        console.log("szopol");
        console.log(e);
      });
  }

  render() {
    const { state, navigate, pop } = this.props.navigation;
    const {
      name,
      unit,
      categories,
      color,
      url,
      gradient
    } = state.params.config;

    return (
      <SafeAreaView style={{ ...styles.view }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            height: 500,
            backgroundColor: color,
            width: Dimensions.get("screen").width
          }}
        />
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              pop();
            }}
            style={{
              paddingLeft: VALUES.padding - 15,
              position: "absolute",
              top: 0
            }}
          >
            <Text style={{ color: "white" }}> ◂ back </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              navigate("camera", state.params.config);
            }}
          >
            <View
              style={{
                padding: 20,
                marginTop: 20,
                marginBottom: 40,
                color: VALUES.colors.black,
                backgroundColor: VALUES.colors.white,
                borderRadius: 100
              }}
            >
              <Text
                style={{
                  fontSize: VALUES.fontSizes.title,
                  textAlign: "center",
                  color: gradient.to,
                  paddingLeft: 30,
                  paddingRight: 30
                }}
              >
                Scan
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: VALUES.colors.white
  },
  container: {
    flex: 1
  },
  saveButton: {
    padding: VALUES.paddingSmall,
    backgroundColor: VALUES.colors.white,
    marginTop: -50,
    marginBottom: 35,
    shadowColor: VALUES.colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 100
  },
  saveButtonText: {
    flex: 1,
    height: 30,
    fontSize: 22,
    textAlign: "center",
    color: VALUES.colors.black
  },
});
