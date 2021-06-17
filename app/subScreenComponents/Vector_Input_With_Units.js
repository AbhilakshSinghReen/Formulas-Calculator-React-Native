import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Sub-screen components
import UnitsPicker from "./UnitsPicker";

//Details
import { GetScalerInputWithUnitsStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function Vector_Input_With_Units({
  quantityName,
  quantitySymbol,
  xTextInputValue,
  onXTextInputChangeText,
  yTextInputValue,
  onYTextInputChangeText,
  zTextInputValue,
  onZTextInputChangeText,
  unitsPickerSelectedUnit,
  onUnitsPickerUnitsChange,
  theme,
}) {
  var styles = GetScalerInputWithUnitsStylesFromTheme(theme);

  var finalQuantityName = quantityName;

  var row2TextRequiredWidth = "13%";
  if (quantitySymbol.length > 3) {
    row2TextRequiredWidth = "25%";
  } else if (quantitySymbol.length > 2) {
    row2TextRequiredWidth = "20%";
  } else if (quantitySymbol.length > 1) {
    row2TextRequiredWidth = "15%";
  }

  const stylesOverride = StyleSheet.create({
    backgroundViewOverride: {
      flexDirection: "column",
      alignItems: "center",
      width: "90%",
    },

    row2TextOverride: {
      width: row2TextRequiredWidth,
      fontSize: 25,
      position: "relative",
    },

    row1ViewOverride: {
      flexDirection: "row",
      alignItems: "center",
    },
    row2ViewOverride: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    xComponentViewOverride: {
      flexDirection: "row",
      width: "50%",
    },
    yComponentViewOverride: {
      flexDirection: "row",
      width: "50%",
    },
    row3ViewOverride: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    zComponentViewOverride: {
      flexDirection: "row",
      width: "50%",
    },
    unitsPickerComponentViewOverride: {
      flexDirection: "row",
      width: "50%",
    },
  });

  return (
    <View
      style={[
        styles[0].backgroundView,
        styles[1].backgroundView,
        stylesOverride.backgroundViewOverride,
      ]}
    >
      <View
        style={[
          styles[0].row1View,
          styles[1].row1View,
          stylesOverride.row1ViewOverride,
        ]}
      >
        <Text style={[styles[0].row1Text, styles[1].row1Text]}>
          {quantityName + " " + `(${quantitySymbol})`}
        </Text>
      </View>

      <View
        style={[
          styles[0].row2View,
          styles[1].row2View,
          stylesOverride.row2ViewOverride,
        ]}
      >
        <View style={[stylesOverride.xComponentViewOverride]}>
          <Text
            style={[
              styles[0].row2Text,
              styles[1].row2Text,
              stylesOverride.row2TextOverride,
            ]}
          >
            {"x = "}
          </Text>

          <TextInput
            style={[styles[0].textInput, styles[1].textInput]}
            onChangeText={onXTextInputChangeText}
            keyboardType="numeric"
            value={xTextInputValue}
          />
        </View>
        <View style={[stylesOverride.xComponentViewOverride]}>
          <Text
            style={[
              styles[0].row2Text,
              styles[1].row2Text,
              stylesOverride.row2TextOverride,
            ]}
          >
            {"y = "}
          </Text>

          <TextInput
            style={[styles[0].textInput, styles[1].textInput]}
            onChangeText={onYTextInputChangeText}
            keyboardType="numeric"
            value={yTextInputValue}
          />
        </View>
      </View>

      <View
        style={[
          styles[0].row2View,
          styles[1].row2View,
          stylesOverride.row3ViewOverride,
        ]}
      >
        <View style={[stylesOverride.xComponentViewOverride]}>
          <Text
            style={[
              styles[0].row2Text,
              styles[1].row2Text,
              stylesOverride.row2TextOverride,
            ]}
          >
            {"z = "}
          </Text>

          <TextInput
            style={[styles[0].textInput, styles[1].textInput]}
            onChangeText={onZTextInputChangeText}
            keyboardType="numeric"
            value={zTextInputValue}
          />
        </View>

        <UnitsPicker
          quantityName={quantityName}
          theme={theme}
          selectedUnit={unitsPickerSelectedUnit}
          onUnitsChange={(newUnits) => {
            onUnitsPickerUnitsChange(newUnits);
          }}
        />
      </View>
    </View>
  );
}
