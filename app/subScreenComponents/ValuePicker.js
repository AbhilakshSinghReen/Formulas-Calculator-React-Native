import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";

//Details
import { GetValuePickerStylesFromTheme } from "../screens/Details/StylesAndColors";

export default class ValuePicker extends Component {
  constructor(props) {
    super();

    this.styles = GetValuePickerStylesFromTheme(props.theme);
    //this.state.value = props.theme;

    this.stylesOverride = StyleSheet.create({
      backgroundView: {
        position: "relative",
      },
      pickerStyleOverride: {
        minWidth: "50%",
        minHeight: 50,
      },
    });
  }

  render() {
    return (
      <View
        style={[
          this.styles[0].backgroundView,
          this.styles[1].backgroundView,
          this.stylesOverride.backgroundView,
        ]}
      >
        <Picker
          selectedValue={this.props.value}
          style={[
            this.styles[0].picker,
            this.styles[1].picker,
            this.stylesOverride.pickerStyleOverride,
          ]}
          mode={"dropdown"}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ value: itemValue });
            this.props.onValueChange(itemValue);
          }}
        >
          <Picker.Item key={0} label={"Light Theme"} value={"Light Theme"} />
          <Picker.Item key={1} label={"Dark Theme"} value={"Dark Theme"} />
        </Picker>
      </View>
    );
  }
}
