import * as React from 'react';
import Camera from 'react-native-openalpr';

export class CameraModule extends React.Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
      },
      plate: 'xxx',
      confidence: 'default',
      recordStarted: false,
      result: '...'
    };
    this.recordedValues = [];
  }

  recordedValues = [];

  cleanResult = (plate) => {
    return plate.replace(/\D/g, '');
  };

  progressInput = (plate) => {
    const result = this.cleanResult(plate);
    this.recordedValues.push(result);
  };

  calculateRecord = () => {
    let counts = {};
    let compare = -1;
    let max = ((array) => {
      let mostFrequent;
      for (let i = 0, len = array.length; i < len; i++) {
        let word = array[i];
        if (counts[word] === undefined) {
          counts[word] = 1;
        } else {
          counts[word] = counts[word] + 1;
        }
        if (counts[word] > compare) {
          compare = counts[word];
          mostFrequent = array[i];
        }
      }
      return mostFrequent;
    })(this.recordedValues);
    this.recordedValues = [];
    const value = max * 1 / 10;
    this.setState({result: value});
    this.props.dispatch(createSetValueAction(value))
  };

  onPlateRecognized = ({plate, confidence}) => {
    // non recording session should not record values
    if (confidence > 0) {
      this.progressInput(plate);
      if (this.recordedValues.length > 10) {
        this.calculateRecord();
      }
    }
  };

  render() {
    return (
      <Camera
        style={{flex: 1 width: 300, height: 300}}
        captureQuality={Camera.constants.CaptureQuality["1080p"]}
        ref={(cam) => {
          this.camera = cam;
        }}
        onPlateRecognized={this.onPlateRecognized}
        plateOutlineColor="#00de00"
        showPlateOutline
      />
    )
  }
}
