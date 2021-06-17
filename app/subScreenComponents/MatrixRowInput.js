import React, { Component } from "react";
import { Text, View, StyleSheet, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

//Details
import { GetTextDisplayerStylesFromTheme } from "../screens/Details/StylesAndColors";

//Sub-screen components
import MatrixCellInput from "./MatrixCellInput";

//Helpers
import { Format_Numeric_Input_Value } from "../helpers/Helpers";

export default class MatrixRowInput extends Component {
  constructor(props) {
    super();
    this.state.theme = props.theme;
    this.styles = GetTextDisplayerStylesFromTheme(props.theme);
  }

  state = {
    theme: "",
    rowName: "",
    NumberOfCells: 1,
    RowValue: ["1", "2", "3213"],
  };

  stylesOverride = StyleSheet.create({
    backgroundView: {
      backgroundColor: "white",
    },
    scrollView: {
      backgroundColor: "dodgerblue",
      flexDirection: "row",
    },
  });

  cellValueChanged(cellNumber, newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      var newRowValue = this.state.RowValue;

      newRowValue[cellNumber] = x[1].toString();

      this.setState({ RowValue: newRowValue });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  render() {
    /*
    cellName,
    textInputValue,
    onTextInputChangeText,
    theme,
    */
    return (
      <ScrollView
        horizontal={true}
        style={[
          this.styles[0].scrollView,
          this.styles[1].scrollView,
          this.stylesOverride.scrollView,
        ]}
      >
        {this.state.RowValue.map((aCell) => (
          <MatrixCellInput
            key={this.state.RowValue.indexOf(aCell)}
            cellName={
              this.state.rowName + this.state.RowValue.indexOf(aCell).toString()
            }
            textInputValue={
              this.state.RowValue[this.state.RowValue.indexOf(aCell)]
            }
            onTextInputChangeText={(newText) =>
              this.cellValueChanged(this.state.RowValue.indexOf(aCell), newText)
            }
            theme={this.state.theme}
          />
        ))}
      </ScrollView>
    );
  }
}
