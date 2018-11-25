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
    this.picker = React.createRef();

    this.setByCamera = this.setByCamera.bind(this);
  }
  
  setByCamera( value ){

    this.state.itemList.indexOf(value)
    this.setState({
      selectedItem: this.state.itemList.indexOf(value+'')
    });
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

  save () {
    console.log('saving...');
    const { state, navigate, pop } = this.props.navigation;
    const { config } = state.params;
    const {
      name,
      unit,
      url
    } = state.params.config;
    const target = API.base + "measurements";
    fetch(target, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        type: url,
        value: this.state.itemList[this.state.selectedItem],
        date: moment().unix()
      })
    })
      .then(r => r.json())
      .then(r => {
        console.log('added', r);
        this.loadItems();
      })
      .catch(e => {
        console.log("szopol");
        console.log(e);
      });
  }

  async loadItems() {
    const target = API.base + "measurements?type=";

    await fetch(target + this.props.navigation.state.params.config.url)
      .then(r => r.json())
      .then(r => {
        r.sort((a, b) => moment(a).unix() < moment(b).unix());
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
    const { config } = state.params;
    const {
      name,
      unit,
      categories,
      color,
      url,
      gradient
    } = state.params.config;
    const options = [...categories, '',"cancel"];
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
                // height: Dimensions.get("screen").height * 0.7
              }
            }}
            locations={[0, 0.3, 1]}
            colors={[gradient.from, gradient.from, gradient.to]}
          >
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
            <Text
              style={{
                ...STYLES.header,
                ...styles.header,
                ...{ marginBottom: 40 }
              }}
            >
              {name}
            </Text>

            <Picker
              ref={this.picker}
              style={{ height: 143, overflow: "hidden" }}
              selectedValue={this.state.selectedItem}
              itemStyle={styles.value}
              onValueChange={index => this.onPickerSelect(index)}
            >
              {this.state.itemList.map((value, i) => (
                <Text label={value} value={i} key={"k" + (i + Math.random()*100)} />
              ))}
            </Picker>

            <View
              style={{
                position: "absolute",
                width: Dimensions.get("window").width,
                top: 116,
                height: 5,
                backgroundColor: color
              }}
            />

            <Text style={{ ...styles.unit }}>{unit}</Text>

            <ActionSheet
              ref={o => (this.ActionSheet = o)}
              title={'Choose a category'}
              options={options}
              cancelButtonIndex={options.length-1}
              styles={{
                titleBox: {
                  borderRadius: VALUES.radius
                },
                body: { borderRadius: VALUES.radius, backgroundColor: '#fff'},
                cancelButtonBox: {
                  height: 80,
                  marginTop: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff'
                }
              }}
              onPress={index => {
                this.setState({
                  selectedCategory: index
                })
              }}
            />
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                this.showActionSheet();
              }}
            >
            <View  style={{
              borderBottomColor: VALUES.colors.white,
              borderBottomWidth: 1,
              paddingTop: 20
            }}>
              <Text
                style={{
                  textAlign: "center",
                  color: VALUES.colors.white,
                  borderBottomWidth: 1,
                  borderBottomColor: VALUES.colors.white,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                {options[this.state.selectedCategory]}
              </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                navigate('camera', {config: config, setByCamera: this.setByCamera});
              }}
            >
            <View  style={{
              padding: 20,
              marginTop: 20,
              marginBottom: 40,
              color: VALUES.colors.black,
              backgroundColor: VALUES.colors.white,
              borderRadius: 100,
            }}>
              <Text
                style={{
                  fontSize: VALUES.fontSizes.title,
                  textAlign: "center",
                  color: gradient.to,
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
              >
              Scan
              </Text>
              </View>
            </TouchableOpacity>
            
          </LinearGradient>
          <View
            style={{
              ...STYLES.container,
              ...styles.container,
              ...{ backgroundColor: VALUES.colors.white }
            }}
          >
            <TouchableOpacity onPress={() => {
              this.save();
              
            }}
            >
              <View style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: VALUES.colors.black,
                fontSize: VALUES.fontSizes.title,
                fontWeight: "900"
              }}
            >
              History
            </Text>
            {this.state.history.map((value, i) => {
              return (
                <View style={{ ...styles.historyItem }} key={"history"+value.value+ (i + Math.random()*100)}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500"
                    }}
                  >
                    {value.value}
                  </Text>
                  <Text style={{ opacity: 0.5 }}>
                    {moment(value.time).format("hh:mm ddd on DD MMM YYYY")}
                  </Text>
                </View>
              );
            })}
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
    fontSize: VALUES.fontSizes.text,
    paddingBottom: 50,
    textAlign: "center",
    color: VALUES.colors.white
  },
  value: {
    fontSize: 114,
    height: 154,
    lineHeight: 154,
    textAlign: "center",
    fontWeight: '100',
    color: VALUES.colors.white
  },
  saveButton: {
    zIndex: 111,
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
  historyItem: {
    borderBottomWidth: 1,
    borderBottomColor: VALUES.colors.gray,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
