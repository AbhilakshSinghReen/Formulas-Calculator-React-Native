import React, { Component } from "react";
import { View, Text, ScrollView, ToastAndroid } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

//Sub-screen components
import MenuButton from "../subScreenComponents/MenuButton";

//Calculators

//Details
import { GetMainScreenStylesFromTheme } from "./Details/StylesAndColors";

//ONLY FOR TESTING
import {} from "../calculators/Conversions";

import { Get_FormulasVersionAndDetails } from "../helpers/SubjectManager";

export default class MainScreen extends Component {
  constructor() {
    super();
    this.theme = "Light Theme";
    this.saveUnits = false;

    this.loadSaveUnits();
    this.loadTheme();

    console.log(Get_FormulasVersionAndDetails());
  }

  loadSaveUnits = async () => {
    try {
      var val = await AsyncStorage.getItem("SaveUnits");

      if (val != null) {
        this.saveUnits = val == "true";
      } else {
        this.saveUnits = false;
      }
    } catch (err) {
      this.saveUnits = false;
    }

    this.render();
  };

  loadTheme = async () => {
    this.theme = "Light Theme";
    return;
    try {
      var val = await AsyncStorage.getItem("Theme");

      if (val != null) {
        this.theme = val.toString();
      } else {
        this.theme = "Light Theme";
      }
    } catch (err) {
      this.theme = "Light Theme";
    }

    this.render();
  };

  render() {
    const styles = GetMainScreenStylesFromTheme(this.theme);

    return (
      <View style={[styles[0].backgroundView, styles[1].backgroundView]}>
        <View style={[styles[0].headingView, styles[1].headingView]}>
          <Text style={[styles[0].headingText, styles[1].headingText]}>
            Formulas Calculator
          </Text>
        </View>

        <ScrollView
          style={styles[0].contentScrollView}
          contentContainerStyle={
            styles[0].contentScrollViewContentContainerStyle
          }
        >
          <MenuButton
            key={1}
            buttonText={"Mathematics"}
            buttonOnPress={() => {
              this.props.navigation.navigate("MathematicsScreen", {
                theme: this.theme,
                saveUnits: this.saveUnits,
              });
            }}
            theme={this.theme}
          />

          <MenuButton
            key={2}
            buttonText={"Physics"}
            buttonOnPress={() => {
              this.props.navigation.navigate("PhysicsScreen", {
                theme: this.theme,
                saveUnits: this.saveUnits,
              });
            }}
            theme={this.theme}
          />

          <MenuButton
            key={3}
            buttonText={"Chemistry"}
            buttonOnPress={() => {
              this.props.navigation.navigate("ChemistryScreen", {
                theme: this.theme,
                saveUnits: this.saveUnits,
              });
            }}
            theme={this.theme}
          />
          <MenuButton
            key={4}
            buttonText={"Search"}
            buttonOnPress={() => {
              this.props.navigation.navigate("SearchScreen", {
                theme: this.theme,
              });
            }}
            theme={this.theme}
          />

          <MenuButton
            key={5}
            buttonText={"Settings"}
            buttonOnPress={() => {
              this.props.navigation.navigate("SettingsScreen", {
                theme: this.theme,
                saveUnits: this.saveUnits,
              });
            }}
            theme={this.theme}
          />

          <View style={styles[0].endingVarticalMarginView} />
        </ScrollView>
      </View>
    );
  }
}
