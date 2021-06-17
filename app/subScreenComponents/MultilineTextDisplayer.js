import React from "react";
import { View, Text, StyleSheet, StatusBar, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

//Details
import { GetMultilineTextDisplayerStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function MultilineTextDisplayer({
  line1TextToDisplay,
  line2TextToDisplay,
  theme,
}) {
  var styles = GetMultilineTextDisplayerStylesFromTheme(theme);
  return (
    <View style={[styles[0].backgroundView, styles[1].backgroundView]}>
      <ScrollView
        horizontal={true}
        style={[styles[0].line1ScrollView, styles[1].line1ScrollView]}
      >
        <Text style={[styles[0].line1Text, styles[1].line1Text]}>
          {line1TextToDisplay}
        </Text>
      </ScrollView>
      <ScrollView
        horizontal={true}
        style={[styles[0].line2ScrollView, styles[1].line2ScrollView]}
      >
        <Text style={[styles[0].line2Text, styles[1].line2Text]}>
          {line2TextToDisplay}
        </Text>
      </ScrollView>
    </View>
  );
}
