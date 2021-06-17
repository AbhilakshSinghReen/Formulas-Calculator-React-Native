import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Sub-screen components
import UnitsPicker from "./UnitsPicker";

//Details
import { GetScalerInputWithUnitsStylesFromTheme } from "../screens/Details/StylesAndColors";

export default function Scaler_Input_With_Units({
  quantityName,
  quantitySymbol,
  textInputValue,
  onTextInputChangeText,
  unitsPickerSelectedUnit,
  onUnitsPickerUnitsChange,
  theme,
}) {
  var styles = GetScalerInputWithUnitsStylesFromTheme(theme);

  var canEditText = true;

  if (quantityName == "Universal gravitational constant") {
    canEditText = false;
  }

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
    row2ViewOverride: {
      flexDirection: "row",
      alignItems: "center",
    },
    row2TextOverride: {
      width: row2TextRequiredWidth,
      fontSize: 25,
      position: "relative",
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
      <View style={[styles[0].row1View, styles[1].row1View]}>
        <Text style={[styles[0].row1Text, styles[1].row1Text]}>
          {quantityName}
        </Text>
      </View>

      <View
        style={[
          styles[0].row2View,
          styles[1].row2View,
          stylesOverride.row2ViewOverride,
        ]}
      >
        <Text
          style={[
            styles[0].row2Text,
            styles[1].row2Text,
            stylesOverride.row2TextOverride,
          ]}
        >
          {quantitySymbol + " = "}
        </Text>

        <TextInput
          style={[styles[0].textInput, styles[1].textInput]}
          onChangeText={onTextInputChangeText}
          keyboardType="numeric"
          value={textInputValue}
          editable={canEditText}
        />
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
