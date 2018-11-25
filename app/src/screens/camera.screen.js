import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from "react-native";

import { RNCamera } from "react-native-camera";

import { STYLES, VALUES } from "../styles";

import { API } from "../config";

const { Text, View } = Animated;

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scannedValue: null
    };
    this.camera = React.createRef();
  }

  componentDidMount() {}

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, width: 300 };
      const data = await this.camera.takePictureAsync(options);
      this.sendPhoto(data.base64);
    }
  };

  sendPhoto(base64) {
    const { url } = this.props.navigation.state.params.config;
    const target = API.base + "measurements/";
    fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        image: base64,
        type: url
      })
    })
      .then(r => r.json())
      .then(r => {
        console.log(r);
        this.setState({
          scannedValue: r.value
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { state, navigate, pop } = this.props.navigation;
    const { color, url } = state.params.config;

    return (
      <SafeAreaView style={{ ...styles.view }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            height: 200,
            backgroundColor: color,
            width: Dimensions.get("screen").width
          }}
        />
        <Text
          style={{
            paddingTop: 20,
            fontSize: VALUES.fontSizes.text,
            color: VALUES.colors.white,
            textAlign: "center",
            paddingBottom: 20
          }}
        >
          Point the camera on the device
        </Text>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                width: Dimensions.get('window').width,
                borderWidth: 50,
                borderTopWidth: 100,
                borderBottomWidth: 100,
                borderColor: "rgba(0,0,0,0.7)"
              }}
            />
          </RNCamera>
        <TouchableOpacity
          onPress={() => {
            pop();
          }}
          style={{
            paddingLeft: VALUES.padding - 15,
            position: "absolute",
            top: 43
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
            this.takePicture();
          }}
        >
          <View
            style={{
              padding: 20,
              marginTop: -33,
              marginBottom: 40,
              backgroundColor: color,
              borderRadius: 100,
              shadowColor: VALUES.colors.black,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 4
            }}
          >
            <Text
              style={{
                fontSize: VALUES.fontSizes.title,
                textAlign: "center",
                color: VALUES.colors.white,
                paddingLeft: 30,
                paddingRight: 30
              }}
            >
              Scan
            </Text>
          </View>
        </TouchableOpacity>

            <Text style={{
              fontSize: 40,
              textAlign: 'center',
              color: 'red'
            }}> {this.state.scannedValue || 'KEFIR'} </Text>
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
  preview: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
