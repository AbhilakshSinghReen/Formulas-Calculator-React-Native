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
  Calculate_ElectrostaticForce_From_CoulombsConstant_Charge1_Charge2_Distance,
  Calculate_CoulombsConstant_From_Charge1_Charge2_Distance_ElectrostaticForce,
  Calculate_Charge1_From_CoulombsConstant_Charge2_Distance_ElectrostaticForce,
  Calculate_Charge2_From_CoulombsConstant_Charge1_Distance_ElectrostaticForce,
  Calculate_Distance_From_CoulombsConstant_Charge1_Charge2_ElectrostaticForce,
} from "../../calculators/Physics/ElectrostaticForce";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class ElectrostaticForce extends Component {
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
      var val = await AsyncStorage.getItem("CoulombsConstant_Units");
      if (val != null) {
        this.setState({ kUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Charge_Units");
      if (val != null) {
        this.setState({ q1Unit: val.toString() });
        this.setState({ q2Unit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ rUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Force_Units");
      if (val != null) {
        this.setState({ fUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem(
        "CoulombsConstant_Units",
        this.state.kUnit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Charge_Units", this.state.q1Unit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Distance_Units", this.state.rUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Force_Units", this.state.fUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    k: "",
    q1: "",
    q2: "",
    r: "",
    f: "",
    kUnit: "N·m²/C²",
    q1Unit: "C",
    q2Unit: "C",
    rUnit: "m",
    fUnit: "N",
    Steps: "",
  };

  Calculate_ElectrostaticForce() {
    if (
      this.state.k != "" &&
      this.state.q1 != "" &&
      this.state.q2 != "" &&
      this.state.r != ""
    ) {
      var Result = Calculate_ElectrostaticForce_From_CoulombsConstant_Charge1_Charge2_Distance(
        this.state.k,
        this.state.q1,
        this.state.q2,
        this.state.r,
        this.state.kUnit,
        this.state.q1Unit,
        this.state.q2Unit,
        this.state.rUnit,
        this.state.fUnit
      );
      this.setState({ f: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'F' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.f != "" &&
      this.state.q1 != "" &&
      this.state.q2 != "" &&
      this.state.r != ""
    ) {
      var Result = Calculate_CoulombsConstant_From_Charge1_Charge2_Distance_ElectrostaticForce(
        this.state.q1,
        this.state.q2,
        this.state.r,
        this.state.f,
        this.state.kUnit,
        this.state.q1Unit,
        this.state.q2Unit,
        this.state.rUnit,
        this.state.fUnit
      );
      this.setState({ k: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'k' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.f != "" &&
      this.state.k != "" &&
      this.state.q2 != "" &&
      this.state.r != ""
    ) {
      var Result = Calculate_Charge1_From_CoulombsConstant_Charge2_Distance_ElectrostaticForce(
        this.state.k,
        this.state.q2,
        this.state.r,
        this.state.f,
        this.state.kUnit,
        this.state.q1Unit,
        this.state.q2Unit,
        this.state.rUnit,
        this.state.fUnit
      );
      this.setState({ q1: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'Q₁' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.f != "" &&
      this.state.k != "" &&
      this.state.q1 != "" &&
      this.state.r != ""
    ) {
      var Result = Calculate_Charge2_From_CoulombsConstant_Charge1_Distance_ElectrostaticForce(
        this.state.k,
        this.state.q1,
        this.state.r,
        this.state.f,
        this.state.kUnit,
        this.state.q1Unit,
        this.state.q2Unit,
        this.state.rUnit,
        this.state.fUnit
      );
      this.setState({ q2: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'Q₂' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.f != "" &&
      this.state.k != "" &&
      this.state.q1 != "" &&
      this.state.q2 != ""
    ) {
      var Result = Calculate_Distance_From_CoulombsConstant_Charge1_Charge2_ElectrostaticForce(
        this.state.k,
        this.state.q1,
        this.state.q2,
        this.state.f,
        this.state.kUnit,
        this.state.q1Unit,
        this.state.q2Unit,
        this.state.rUnit,
        this.state.fUnit
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

  kValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ k: x[1].toString() });
      } else {
        ToastAndroid.show("'k' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  q1ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ q1: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  q2ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ q2: x[1].toString() });
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
  fValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ f: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  kUnitChanged(newUnit) {
    this.setState({ kUnit: newUnit });
  }
  q1UnitChanged(newUnit) {
    this.setState({ q1Unit: newUnit });
  }
  q2UnitChanged(newUnit) {
    this.setState({ q2Unit: newUnit });
  }
  rUnitChanged(newUnit) {
    this.setState({ rUnit: newUnit });
  }
  fUnitChanged(newUnit) {
    this.setState({ fUnit: newUnit });
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
            Electrostatic Force
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
            F = (k * Q₁ * Q₂) / r²
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
            quantityName={"Coulomb's constant"}
            quantitySymbol={"k"}
            textInputValue={this.state.k}
            onTextInputChangeText={(newText) => this.kValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.kUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.kUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"First charge"}
            quantitySymbol={"Q₁"}
            textInputValue={this.state.q1}
            onTextInputChangeText={(newText) => this.q1ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.q1Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.q1UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Second charge"}
            quantitySymbol={"Q₂"}
            textInputValue={this.state.q2}
            onTextInputChangeText={(newText) => this.q2ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.q2Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.q2UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Distance between the 2 charges"}
            quantitySymbol={"r"}
            textInputValue={this.state.r}
            onTextInputChangeText={(newText) => this.rValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.rUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.rUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Electrostatic force"}
            quantitySymbol={"F"}
            textInputValue={this.state.f}
            onTextInputChangeText={(newText) => this.fValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.fUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.fUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_ElectrostaticForce.bind(this)}
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
