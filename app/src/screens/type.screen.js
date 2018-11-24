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

const Color = require("color");

import { STYLES, VALUES } from "../styles";
import { ScrollView } from "react-native-gesture-handler";

const { PickerItem } = Picker;
const { Text, View } = Animated;

export default class TypeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
      itemList: []
    };
  }

  componentDidMount() {
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

  render() {
    const { state, navigate, pop } = this.props.navigation;
    console.log(state);
    const { name, unit, categories, color, url } = state.params.config;
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
          <LinearGradient
            style={{
              ...STYLES.container,
              ...styles.container,
              ...{
                backgroundColor: color,
                height: Dimensions.get("screen").height * 0.7
              }
            }}
            colors={[
              color,
              color,
              Color(color)
                .rotate(10)
                .darken(0.1)
            ]}
          >
            <Text style={{ ...STYLES.header, ...styles.header }}>{name}</Text>

            <Picker
              style={{ height: 143, overflow: "hidden" }}
              selectedValue={this.state.selectedItem}
              itemStyle={styles.value}
              onValueChange={index => this.onPickerSelect(index)}
            >
              {this.state.itemList.map((value, i) => (
                <Text label={value} value={i} key={"k" + i} />
              ))}
            </Picker>

            <View
              style={{
                position: "absolute",
                width: Dimensions.get("window").width,
                top: 76,
                height: 5,
                backgroundColor: color
              }}
            />

            <Text style={{ ...styles.unit }}>{unit}</Text>
          </LinearGradient>
          <View
            style={{
              ...STYLES.container,
              ...styles.container,
              ...{ backgroundColor: VALUES.colors.white }
            }}
          >
            <View style={styles.saveButton}>
              <TouchableOpacity
                onPress={() => {
                  pop();
                }}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: VALUES.colors.black,
                fontSize: VALUES.fontSizes.title,
                fontWeight: "900"
              }}
            >
              History
            </Text>
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
            <Text>6</Text>
          </View>
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
  header: {
    color: VALUES.colors.white
  },
  unit: {
    fontSize: VALUES.fontSizes.small,
    textAlign: "center",
    color: VALUES.colors.white
  },
  value: {
    fontSize: 114,
    height: 154,
    lineHeight: 154,
    textAlign: "center",
    color: VALUES.colors.white
  },
  saveButton: {
    padding: VALUES.paddingSmall,
    backgroundColor: VALUES.colors.white,
    marginTop: -45,
    marginBottom: 30,
    shadowColor: VALUES.colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 100
  },
  saveButtonText: {
    textAlign: "center",
    color: VALUES.colors.black
  }
});
