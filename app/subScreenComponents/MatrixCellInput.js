import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Details
import { GetMatrixCellInputStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function MatrixCellInput({
  cellName,
  textInputValue,
  onTextInputChangeText,
  theme,
}) {
  var styles = GetMatrixCellInputStylesFromTheme(theme);

  return (
    <View
      style={[
        styles[0].backgroundView,
        styles[1].backgroundView,
        stylesOverride.backgroundOverride,
      ]}
    >
      <TextInput
        style={[styles[0].textInput, styles[1].textInput]}
        onChangeText={onTextInputChangeText}
        keyboardType="numeric"
        value={textInputValue}
        textAlign={"center"}
      />
    </View>
  );
}

const stylesOverride = StyleSheet.create({
  backgroundOverride: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    marginHorizontal: 1,
    width: 80,
  },
});
