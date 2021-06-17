import React from "react";
import { View, Text, StyleSheet, StatusBar, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

//Details
import { GetTextDisplayerStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function TextDisplayer({ textToDisplay, theme }) {
  var styles = GetTextDisplayerStylesFromTheme(theme);
  return (
    <View style={[styles[0].backgroundView, styles[1].backgroundView]}>
      <ScrollView
        horizontal={true}
        style={[styles[0].scrollView, styles[1].scrollView]}
      >
        <Scaler_Unitless_Input
          textToDisplay="M = "
          textInputValue={this.state.NumberOfRows}
          onTextInputChangeText={(newText) => this.nValueChanged(newText)}
          theme={this.state.theme}
        />
        <Scaler_Unitless_Input
          textToDisplay="M = "
          textInputValue={this.state.NumberOfRows}
          onTextInputChangeText={(newText) => this.nValueChanged(newText)}
          theme={this.state.theme}
        />
      </ScrollView>
    </View>
  );
}
