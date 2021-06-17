import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

//Details
import { GetStepsScreenStylesFromTheme } from "./Details/StylesAndColors";

/*
"ToFind",
"GivenEntered",
"FormulaCalculationResult",
*/

function processStepsOutput(stepsOutputText) {
  var components = stepsOutputText.split(";");
  var componentNames = components[0].split(",");

  var toFind = "";
  var givenEntered = "";
  var formulaCalculationResult = "";

  if (componentNames.includes("ToFind")) {
    toFind = components[1];
  }
  if (componentNames.includes("GivenEntered")) {
    givenEntered = components[2];
  }
  if (componentNames.includes("FormulaCalculationResult")) {
    formulaCalculationResult = components[3];
  }

  toFind = toFind.replace(/,/g, ",\n");
  toFind = toFind.replace(/^ +/gm, "");
  toFind = toFind.replace("\n", "");

  givenEntered = givenEntered.replace(/,/g, ",\n");
  givenEntered = givenEntered.replace(/^ +/gm, "");
  givenEntered = givenEntered.replace("\n", "");

  formulaCalculationResult = formulaCalculationResult.replace(/,/g, ",\n");
  formulaCalculationResult = formulaCalculationResult.replace(/^ +/gm, "");
  formulaCalculationResult = formulaCalculationResult.replace("\n", "");

  return [toFind, givenEntered, formulaCalculationResult];
}

export default function StepsScreen({ route, navigation }) {
  const { stepsText } = route.params;

  const steps = processStepsOutput(stepsText);

  const styles = GetStepsScreenStylesFromTheme(route.params.theme);

  return (
    <View style={[styles[0].background, styles[1].background]}>
      <ScrollView style={[styles[0].scrollView, styles[1].scrollView]}>
        <Text style={[styles[0].toFindTextHeader, styles[1].toFindTextHeader]}>
          To find:{" "}
        </Text>
        <Text style={[styles[0].toFindText, styles[1].toFindText]}>
          {steps[0]}
        </Text>
        <Text
          style={[
            styles[0].givenEnteredTextHeader,
            styles[1].givenEnteredTextHeader,
          ]}
        >
          Given/Entered:{" "}
        </Text>
        <Text style={[styles[0].givenEnteredText, styles[1].givenEnteredText]}>
          {steps[1]}
        </Text>
        <Text
          style={[
            styles[0].formulaCalculationResultTextHeader,
            styles[1].formulaCalculationResultTextHeader,
          ]}
        >
          Calculations:
        </Text>
        <Text
          style={[
            styles[0].formulaCalculationResultText,
            styles[1].formulaCalculationResultText,
          ]}
        >
          {steps[2]}
        </Text>
      </ScrollView>
    </View>
  );
}
