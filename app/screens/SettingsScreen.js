import React, { Component } from "react";
import { View, Text, ScrollView, Switch, ToastAndroid } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

//Sub-screen components
import MenuButton from "../subScreenComponents/MenuButton";
import Scaler_Input_With_Units from "../subScreenComponents/Scaler_Input_With_Units";

//Calculators
import ValuePicker from "../subScreenComponents/ValuePicker";

//Details
import { GetSettingsScreenStylesFromTheme } from "./Details/StylesAndColors";

export default class SettingsScreen extends Component {
  constructor(props) {
    super();

    this.state.theme = props.route.params.theme;
    this.state.saveUnits = props.route.params.saveUnits;

    //this.loadTheme();
    this.loadSaveUnits();
  }

  state = {
    theme: "",
    saveUnits: false,
  };

  loadSaveUnits = async () => {
    try {
      var val = await AsyncStorage.getItem("SaveUnits");

      if (val != null) {
        console.log(`Loaded saveunits = ${val}`);
        this.setState({ saveUnits: val == "true" }, this.render);
      } else {
        this.setState({ saveUnits: false }, this.render);
      }
    } catch (err) {
      this.setState({ saveUnits: false }, this.render);
    }
  };

  loadTheme = async () => {
    try {
      var val = await AsyncStorage.getItem("Theme");

      if (val != null) {
        console.log(`Loaded Theme = ${val}`);
        this.setState({ theme: val.toString() }, this.render);
      } else {
        this.setState({ theme: "Light Theme" }, this.render);
      }
    } catch (err) {
      this.setState({ theme: "Light Theme" }, this.render);
    }
  };

  saveTheme = async () => {
    try {
      await AsyncStorage.setItem("Theme", this.state.theme);
    } catch (err) {
      //console.log("Error while saving theme");
    }
  };

  saveSaveUnits = async () => {
    try {
      await AsyncStorage.setItem("SaveUnits", this.state.saveUnits.toString());
    } catch (err) {
      //console.log("Error while saving saveUnits");
    }
  };

  render() {
    var styles = GetSettingsScreenStylesFromTheme(
      this.props.route.params.theme
    );

    if (this.state.theme != "") {
      styles = GetSettingsScreenStylesFromTheme(this.state.theme);
    }

    console.log(`SaveUnits = ${this.state.saveUnits}`);
    console.log(`Theme = ${this.state.theme}`);

    return (
      <View style={[styles[0].backgroundView, styles[1].backgroundView]}>
        <View style={[styles[0].headingView, styles[1].headingView]}>
          <Text style={[styles[0].headingText, styles[1].headingText]}>
            Settings
          </Text>
        </View>

        <ScrollView
          style={styles[0].contentScrollView}
          contentContainerStyle={
            styles[0].contentScrollViewContentContainerStyle
          }
        >
          <View style={[styles[0].settingsRowView, styles[1].settingsRowView]}>
            <Text>Save Units: </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.saveUnits ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                this.setState(
                  { saveUnits: !this.state.saveUnits },
                  this.saveSaveUnits
                );
                ToastAndroid.show(
                  "New settings have been saved. Changes will take place when you restart the appliction.",
                  ToastAndroid.LONG
                );
              }}
              value={this.state.saveUnits}
            />
          </View>

          <View style={[styles[0].settingsRowView, styles[1].settingsRowView]}>
            <Text>
              Save units will save the units of all quantities in a formula
              whenever a calculation is performed. The selected units will
              remain selected even after the application is reloaded. The units
              will reset if this setting is turned off.
            </Text>
          </View>
          <View style={styles[0].smallVerticalMarginView} />
        </ScrollView>
      </View>
    );
  }
}
