import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

//Details
import { GetScreenButtonStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function ScreenButton({ buttonText, buttonOnPress, theme }) {
  var styles = GetScreenButtonStylesFromTheme(theme);

  return (
    <View style={[styles[0].wrapperView, styles[1].wrapperView]}>
      <TouchableOpacity onPress={buttonOnPress}>
        <View style={[styles[0].screenButtonView, styles[1].screenButtonView]}>
          <Text style={[styles[0].text, styles[1].text]}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
