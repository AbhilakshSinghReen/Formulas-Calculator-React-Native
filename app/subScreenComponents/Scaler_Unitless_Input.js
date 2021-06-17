import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Details
import { GetScalerUnitlessInputStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function Scaler_Unitless_Input({
  textToDisplay,
  textInputValue,
  onTextInputChangeText,
  theme,
}) {
  var styles = GetScalerUnitlessInputStylesFromTheme(theme);
  return (
    <View
      style={[
        styles[0].backgroundView,
        styles[1].backgroundView,
        stylesOverride.backgroundOverride,
      ]}
    >
      <Text style={[styles[0].text, styles[1].text]}>{textToDisplay}</Text>
      <TextInput
        style={[styles[0].textInput, styles[1].textInput]}
        onChangeText={onTextInputChangeText}
        keyboardType="numeric"
        value={textInputValue}
      />
    </View>
  );
}

const stylesOverride = StyleSheet.create({
  backgroundOverride: {
    flexDirection: "row",
    alignItems: "center",
  },
});
