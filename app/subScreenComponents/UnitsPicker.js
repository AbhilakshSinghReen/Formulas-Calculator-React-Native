import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";

//Calculators
import { Get_Units_From_QuantityName } from "../calculators/Conversions";

//Details
import { GetUnitsPickerStylesFromTheme } from "../screens/Details/StylesAndColors";

export default class UnitsPicker extends Component {
  constructor(props) {
    super();

    this.styles = GetUnitsPickerStylesFromTheme(props.theme);

    this.units = Get_Units_From_QuantityName(props.quantityName);

    if (this.units.length == 0) {
      this.units = ["-"];
    }

    var maxUnitStringLength = 0;
    this.units.forEach((element) => {
      if (element.length > maxUnitStringLength) {
        maxUnitStringLength = element.length;
      }
    });
    var requiredWidth = "30%";
    if (maxUnitStringLength > 8) {
      requiredWidth = "40%";
    } else if (maxUnitStringLength > 4) {
      requiredWidth = "35%";
    }

    this.state.selectedUnit = this.units[0];
    //props.onUnitsChange(this.units[0]);

    this.stylesOverride = StyleSheet.create({
      backgroundView: {
        position: "relative",
      },
      pickerStyleOverride: {
        minWidth: requiredWidth,
        minHeight: 50,
      },
    });
  }

  state = {
    selectedUnit: "",
  };

  render() {
    return (
      <View
        style={[
          this.styles[0].backgroundView,
          this.styles[1].backgroundView,
          this.stylesOverride.backgroundView,
        ]}
      >
        <Picker
          selectedValue={this.props.selectedUnit}
          style={[
            this.styles[0].picker,
            this.styles[1].picker,
            this.stylesOverride.pickerStyleOverride,
          ]}
          mode={"dropdown"}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ selectedUnit: itemValue });
            this.props.onUnitsChange(itemValue);
          }}
        >
          {this.units.map((aUnit) => (
            <Picker.Item
              key={this.units.indexOf(aUnit)}
              label={aUnit}
              value={aUnit}
            />
          ))}
        </Picker>
      </View>
    );
  }
}
