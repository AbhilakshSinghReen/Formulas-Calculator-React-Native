import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

//Details
import { GetMenuButtonStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function MenuButton({ buttonText, buttonOnPress, theme }) {
  var styles = GetMenuButtonStylesFromTheme(theme);

  return (
    <View style={[styles[0].wrapperView, styles[1].wrapperView]}>
      <TouchableOpacity onPress={buttonOnPress}>
        <View style={[styles[0].menuButtonView, styles[1].menuButtonView]}>
          <Text style={[styles[0].text, styles[1].text]}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
