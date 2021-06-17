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
  Calculate_GravitationalPotentialEnergy_From_UniversalGravitationalConstant_Mass1_Mass2_Distance,
  Calculate_Mass1_From_UniversalGravitationalConstant_Mass2_Distance_GravitationalPotentialEnergy,
  Calculate_Mass2_From_UniversalGravitationalConstant_Mass1_Distance_GravitationalPotentialEnergy,
  Calculate_Distance_From_UniversalGravitationalConstant_Mass1_Mass2_GravitationalPotentialEnergy,
} from "../../calculators/Physics/GravitationalPotentialEnergy";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class GravitationalPotentialEnergy extends Component {
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
        this.setState({ m1Unit: val.toString() });
        this.setState({ m2Unit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ rUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Energy_Units");
      if (val != null) {
        this.setState({ uUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem("Mass_Units", this.state.m1Unit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Distance_Units", this.state.rUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Energy_Units", this.state.uUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    G: "6.67408e-11",
    m1: "",
    m2: "",
    r: "",
    u: "",
    G_Unit: "m³/(kg.s²)",
    m1Unit: "kg",
    m2Unit: "kg",
    rUnit: "m",
    uUnit: "J",
    Steps: "",
  };

  Calculate_GravitationalPotentialEnergy() {
    if (
      this.state.G != "" &&
      this.state.m1 != "" &&
      this.state.m2 != "" &&
      this.state.r != ""
    ) {
      var Result = Calculate_GravitationalPotentialEnergy_From_UniversalGravitationalConstant_Mass1_Mass2_Distance(
        this.state.G,
        this.state.m1,
        this.state.m2,
        this.state.r,
        this.state.G_Unit,
        this.state.m1Unit,
        this.state.m2Unit,
        this.state.rUnit,
        this.state.uUnit
      );
      this.setState({ u: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'Ug' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.f != "" &&
      this.state.G != "" &&
      this.state.m2 != "" &&
      this.state.r != ""
    ) {
      var Result = Calculate_Mass1_From_UniversalGravitationalConstant_Mass2_Distance_GravitationalPotentialEnergy(
        this.state.G,
        this.state.m2,
        this.state.r,
        this.state.u,
        this.state.G_Unit,
        this.state.m1Unit,
        this.state.m2Unit,
        this.state.rUnit,
        this.state.uUnit
      );
      this.setState({ m1: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'M₁' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.u != "" &&
      this.state.G != "" &&
      this.state.m1 != "" &&
      this.state.r != ""
    ) {
      var Result = Calculate_Mass2_From_UniversalGravitationalConstant_Mass1_Distance_GravitationalPotentialEnergy(
        this.state.G,
        this.state.m1,
        this.state.r,
        this.state.u,
        this.state.G_Unit,
        this.state.m1Unit,
        this.state.m2Unit,
        this.state.rUnit,
        this.state.uUnit
      );
      this.setState({ m2: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'M₂' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.u != "" &&
      this.state.G != "" &&
      this.state.m1 != "" &&
      this.state.m2 != ""
    ) {
      var Result = Calculate_Distance_From_UniversalGravitationalConstant_Mass1_Mass2_GravitationalPotentialEnergy(
        this.state.G,
        this.state.m1,
        this.state.m2,
        this.state.u,
        this.state.G_Unit,
        this.state.m1Unit,
        this.state.m2Unit,
        this.state.rUnit,
        this.state.uUnit
      );
      this.setState({ r: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'r' has been calculated.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "Atleast 4 values are required to calculate the fifth one!",
        ToastAndroid.LONG
      );
    }

    if (this.props.route.params.saveUnits) {
      this.saveUnits();
    }
  }

  G_ValueChanged(newValue) {}
  m1ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ m1: x[1].toString() });
      } else {
        ToastAndroid.show("'M₁' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  m2ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ m2: x[1].toString() });
      } else {
        ToastAndroid.show("'M₂' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  rValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ r: x[1].toString() });
      } else {
        ToastAndroid.show("'r' must be a positive value.", ToastAndroid.LONG);
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
      this.setState({ u: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  G_UnitChanged(newUnit) {}
  m1UnitChanged(newUnit) {
    this.setState({ m1Unit: newUnit });
  }
  m2UnitChanged(newUnit) {
    this.setState({ m2Unit: newUnit });
  }
  rUnitChanged(newUnit) {
    this.setState({ rUnit: newUnit });
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
            Gravitational Potential Energy
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
            Ug = - (G * M₁ * M₂) / r
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
            quantityName={"Universal gravitational constant"}
            quantitySymbol={"G"}
            textInputValue={this.state.G}
            onTextInputChangeText={(newText) => this.G_ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.G_Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.G_UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"First mass"}
            quantitySymbol={"M₁"}
            textInputValue={this.state.m1}
            onTextInputChangeText={(newText) => this.m1ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.m1Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.m1UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Second mass"}
            quantitySymbol={"M₂"}
            textInputValue={this.state.m2}
            onTextInputChangeText={(newText) => this.m2ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.m2Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.m2UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Distance between the 2 masses"}
            quantitySymbol={"r"}
            textInputValue={this.state.r}
            onTextInputChangeText={(newText) => this.rValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.rUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.rUnitChanged(newUnit)}
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
            buttonOnPress={this.Calculate_GravitationalPotentialEnergy.bind(
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
