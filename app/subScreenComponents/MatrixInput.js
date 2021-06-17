/*
  MATRIX STORAGE FORMAT
  Matrix is stored in row major
  Each value in a row is seperated by a comma
  Each row is seperated by a semi-colon
  */

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  MatrixTransform,
  Text,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-community/picker";

//Sub-screen componenets
import Scaler_Unitless_Input from "./Scaler_Unitless_Input";
import MatrixRowInput from "./MatrixRowInput";

//Details
import { GetUnitsPickerStylesFromTheme } from "../screens/Details/StylesAndColors";

export default class MatrixInput extends Component {
  constructor(props) {
    super();

    this.state.theme = props.theme;

    this.styles = GetUnitsPickerStylesFromTheme(props.theme);

    this.stylesOverride = StyleSheet.create({
      backgroundView: {
        position: "relative",
        backgroundColor: "dodgerblue",
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 300,
      },
      pickerStyleOverride: {
        minWidth: "50%",
        minHeight: 50,
      },
    });
  }

  state = {
    theme: "",
    NumberOfRows: "",
  };

  render() {
    return (
      <View
        style={[
          this.styles[0].backgroundView,
          this.styles[1].backgroundView,
          this.stylesOverride.backgroundView,
        ]}
      >
        <Text>Size = M x N</Text>
        <ScrollView nestedScrollEnabled={true}>
          <MatrixRowInput theme={this.state.theme} />
          <MatrixRowInput theme={this.state.theme} />
          <MatrixRowInput theme={this.state.theme} />
        </ScrollView>
      </View>
    );
  }
}
