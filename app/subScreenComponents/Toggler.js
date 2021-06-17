import React, { Component } from "react";
import { Text, View, Switch } from "react-native";

//Details
import { GetTogglerStylesFromTheme } from "../screens/Details/StylesAndColors";

export default class Toggler extends Component {
  constructor(props) {
    super();
    this.styles = GetTogglerStylesFromTheme(props.route.params.theme);
  }
  render() {
    return (
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={this.state.saveUnits ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={this.toggleSaveUnits}
          value={this.state.saveUnits}
        />
      </View>
    );
  }
}
