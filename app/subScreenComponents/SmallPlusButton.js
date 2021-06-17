import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

//Details
import { GetSmallCrossButtonStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function ShowStepsButton({ buttonText, buttonOnPress, theme }) {
  var styles = GetSmallCrossButtonStylesFromTheme(theme);

  return (
    <View style={[styles[0].wrapperView, styles[1].wrapperView]}>
      <TouchableOpacity onPress={buttonOnPress}>
        <View
          style={[styles[0].showStepsButtonView, styles[1].showStepsButtonView]}
        >
          <Text style={[styles[0].text, styles[1].text]}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
