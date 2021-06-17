import React, { Component } from "react";
import { Button, Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import Scaler_Input_With_Units from "../../subScreenComponents/Scaler_Input_With_Units";
import ScreenButton from "../../subScreenComponents/ScreenButton";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import {
  Calculate_GravitationalPotentialEnergy_From_MassOfObject_GravitationalAcceleration_Height,
  Calculate_MassOfObject_From_GravitationalAcceleration_Height_GravitationalPotentialEnergy,
  Calculate_GravitationalAcceleration_From_MassOfObject_Height_GravitationalPotentialEnergy,
  Calculate_Height_From_MassOfObject_GravitationalAcceleration_GravitationalPotentialEnergy,
} from "../../calculators/Physics/GravitationalPotentialEnergyOnAPlanet";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class GravitationalPotentialEnergyOnAPlanet extends Component {
  constructor(props) {
    super();
    this.styles = GetFormulaScreenStylesFromTheme(props.route.params.theme);
    this.state.theme = props.route.params.theme;

    var adMobConfig = AdMobConfig();
    this.NumberOfClicksAfterWhichToShowAnInterstitialAd = adMobConfig[1];
    this.InterstitialAdIdToBeUsed = adMobConfig[2];
    this.AdMobServePersonalizedAds = adMobConfig[4];

    this.clicks = 0;
    this.loadOld();

    if (props.route.params.saveUnits) {
      this.loadUnits();
    }
  }

  async componentDidMount() {
    AdMobInterstitial.setAdUnitID(this.InterstitialAdIdToBeUsed);
    await AdMobInterstitial.requestAdAsync({
      servePersonalizedAds: this.AdMobServePersonalizedAds,
    });

    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => {});

    AdMobInterstitial.addEventListener("interstitialDidLoad", () => {});

    AdMobInterstitial.addEventListener("interstitialDidOpen", () => {});

    AdMobInterstitial.addEventListener("interstitialDidClose", () => {});

    AdMobInterstitial.addEventListener(
      "interstitialWillLeaveApplication",
      () => {}
    );

    this.setState({ E: "" });
  }

  loadOld = async () => {
    try {
      var val = await AsyncStorage.getItem("ClicksModx");

      if (val != null) {
        if (/^\d+$/.test(val) == false) {
          this.clicks = 1;
        } else {
          val = parseInt(val);
          this.clicks = val + 1;
        }
      } else {
        this.clicks = 1;
      }
    } catch (err) {
      this.clicks = 1;
    }
  };

  showAd = async () => {
    await AdMobInterstitial.requestAdAsync({
      servePersonalizedAds: this.AdMobServePersonalizedAds,
    });
    await AdMobInterstitial.showAdAsync();
    return;
  };

  onNewClick = async () => {
    var ClicksModx = this.clicks;
    ClicksModx += 1;
    if (ClicksModx >= this.NumberOfClicksAfterWhichToShowAnInterstitialAd) {
      this.showAd();
      ClicksModx =
        ClicksModx % this.NumberOfClicksAfterWhichToShowAnInterstitialAd;
    }
    this.clicks = ClicksModx;
    try {
      await AsyncStorage.setItem("ClicksModx", ClicksModx.toString());
    } catch (err) {}
  };

  styles = {};

  loadUnits = async () => {
    try {
      var val = await AsyncStorage.getItem("Mass_Units");
      if (val != null) {
        this.setState({ mUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Acceleration_Units");
      if (val != null) {
        this.setState({ gUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ hUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Energy_Units");
      if (val != null) {
        this.setState({ uUnit: val.toString() });
      }
    } catch (err) {}

    switch (this.state.gUnit) {
      case "ft/s²": {
        this.setState({ g: "32.1740485564" });
        break;
      }
      case "g": {
        this.setState({ g: "1" });
        break;
      }
      default: {
      }
    }
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem("Mass_Units", this.state.mUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem(
        "Acceleration_Units",
        this.state.gUnit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Distance_Units", this.state.hUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Energy_Units", this.state.uUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    m: "",
    g: "9.80665",
    h: "",
    u: "",
    mUnit: "kg",
    gUnit: "m/s²",
    hUnit: "m",
    uUnit: "J",
    Steps: "",
  };

  Calculate_GravitationalPotentialEnergyOnAPlanet() {
    if (this.state.m != "" && this.state.g != "" && this.state.h != "") {
      var Result = Calculate_GravitationalPotentialEnergy_From_MassOfObject_GravitationalAcceleration_Height(
        this.state.m,
        this.state.g,
        this.state.h,
        this.state.mUnit,
        this.state.gUnit,
        this.state.hUnit,
        this.state.uUnit
      );
      this.setState({ u: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'Ug' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.u != "" && this.state.g != "" && this.state.h != "") {
      var Result = Calculate_MassOfObject_From_GravitationalAcceleration_Height_GravitationalPotentialEnergy(
        this.state.g,
        this.state.h,
        this.state.u,
        this.state.mUnit,
        this.state.gUnit,
        this.state.hUnit,
        this.state.uUnit
      );
      this.setState({ m: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'m' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.u != "" && this.state.m != "" && this.state.h != "") {
      var Result = Calculate_GravitationalAcceleration_From_MassOfObject_Height_GravitationalPotentialEnergy(
        this.state.m,
        this.state.h,
        this.state.u,
        this.state.mUnit,
        this.state.gUnit,
        this.state.hUnit,
        this.state.uUnit
      );
      this.setState({ g: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'g' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.u != "" && this.state.m != "" && this.state.g != "") {
      var Result = Calculate_Height_From_MassOfObject_GravitationalAcceleration_GravitationalPotentialEnergy(
        this.state.m,
        this.state.g,
        this.state.u,
        this.state.mUnit,
        this.state.gUnit,
        this.state.hUnit,
        this.state.uUnit
      );
      this.setState({ h: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'h' has been calculated.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "Atleast 3 values are required to calculate the fourth one!",
        ToastAndroid.LONG
      );
    }

    if (this.props.route.params.saveUnits) {
      this.saveUnits();
    }
  }

  mValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ m: x[1].toString() });
      } else {
        ToastAndroid.show("'m' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  gValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ g: x[1].toString() });
      } else {
        ToastAndroid.show("'g' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  hValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ h: x[1].toString() });
      } else {
        ToastAndroid.show("'h' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  uValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ u: x[1].toString() });
      } else {
        ToastAndroid.show("'Ug' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  mUnitChanged(newUnit) {
    this.setState({ mUnit: newUnit });
  }
  gUnitChanged(newUnit) {
    this.setState({ gUnit: newUnit });
  }
  hUnitChanged(newUnit) {
    this.setState({ hUnit: newUnit });
  }
  uUnitChanged(newUnit) {
    this.setState({ uUnit: newUnit });
  }

  render() {
    return (
      <View
        style={[this.styles[0].backgroundView, this.styles[1].backgroundView]}
      >
        <View style={[this.styles[0].headingView, this.styles[1].headingView]}>
          <Text
            style={[this.styles[0].headingText, this.styles[1].headingText]}
          >
            Gravitational Potential Energy On A Planet
          </Text>
        </View>
        <View
          style={[
            this.styles[0].formulaDisplayView,
            this.styles[1].formulaDisplayView,
          ]}
        >
          <Text
            style={[
              this.styles[0].formulaDisplayText,
              this.styles[1].formulaDisplayText,
            ]}
          >
            Ug = m * g * h
          </Text>
        </View>

        <ScrollView
          style={[
            this.styles[0].inputOutputScrollView,
            this.styles[1].inputOutputScrollView,
          ]}
          contentContainerStyle={[
            this.styles[0].inputOutputScrollViewContentContainerStyle,
            this.styles[1].inputOutputScrollViewContentContainerStyle,
          ]}
        >
          <Scaler_Input_With_Units
            quantityName={"Mass of the object"}
            quantitySymbol={"m"}
            textInputValue={this.state.m}
            onTextInputChangeText={(newText) => this.mValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.mUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.mUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Gravitational acceleration"}
            quantitySymbol={"g"}
            textInputValue={this.state.g}
            onTextInputChangeText={(newText) => this.gValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.gUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.gUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Height"}
            quantitySymbol={"h"}
            textInputValue={this.state.h}
            onTextInputChangeText={(newText) => this.hValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.hUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.hUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Gravitational potential energy"}
            quantitySymbol={"Ug"}
            textInputValue={this.state.u}
            onTextInputChangeText={(newText) => this.uValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.uUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.uUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_GravitationalPotentialEnergyOnAPlanet.bind(
              this
            )}
            theme={this.props.route.params.theme}
          />

          <ShowStepsButton
            buttonText={"Show steps"}
            buttonOnPress={() => {
              this.onNewClick();
              this.props.navigation.navigate("StepsScreen", {
                stepsText: this.state.Steps,
                theme: this.props.route.params.theme,
              });
            }}
            theme={this.props.route.params.theme}
          />

          <View
            style={[
              this.styles[0].endingVerticalMarginView,
              this.styles[1].endingVerticalMarginView,
            ]}
          />
        </ScrollView>
      </View>
    );
  }
}
