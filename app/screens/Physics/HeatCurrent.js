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
  Calculate_HeatCurrent_From_ThermalConductivity_Area_Length_T1_T2,
  Calculate_ThermalConductivity_From_Area_Length_T1_T2_HeatCurrent,
  Calculate_Area_From_ThermalConductivity_Length_T1_T2_HeatCurrent,
  Calculate_Length_From_ThermalConductivity_Area_T1_T2_HeatCurrent,
  Calculate_T1_From_ThermalConductivity_Area_Length_T2_HeatCurrent,
  Calculate_T2_From_ThermalConductivity_Area_Length_T1_HeatCurrent,
} from "../../calculators/Physics/HeatCurrent";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class HeatCurrent extends Component {
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
      var val = await AsyncStorage.getItem("ThermalConductivity_Units");
      if (val != null) {
        this.setState({ kUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Area_Units");
      if (val != null) {
        this.setState({ aUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ lUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Temperature_Units");
      if (val != null) {
        this.setState({ t1Unit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Temperature_Units");
      if (val != null) {
        this.setState({ t2Unit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Power_Units");
      if (val != null) {
        this.setState({ ihUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem(
        "ThermalConductivity_Units",
        this.state.kUnit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Area_Units", this.state.aUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Distance_Units", this.state.lUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem(
        "Temperature_Units",
        this.state.t2Unit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Power_Units", this.state.ihUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    k: "",
    a: "",
    l: "",
    t1: "",
    t2: "",
    ih: "",
    kUnit: "W/(m.K)",
    aUnit: "m²",
    lUnit: "m",
    t1Unit: "K",
    t2Unit: "K",
    ihUnit: "W",
    Steps: "",
  };

  Calculate_HeatCurrent() {
    if (
      this.state.k != "" &&
      this.state.a != "" &&
      this.state.l != "" &&
      this.state.t1 != "" &&
      this.state.t2 != ""
    ) {
      var Result = Calculate_HeatCurrent_From_ThermalConductivity_Area_Length_T1_T2(
        this.state.k,
        this.state.a,
        this.state.l,
        this.state.t1,
        this.state.t2,
        this.state.kUnit,
        this.state.aUnit,
        this.state.lUnit,
        this.state.t1Unit,
        this.state.t2Unit,
        this.state.ihUnit
      );
      this.setState({ ih: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'Iₕ' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.ih != "" &&
      this.state.a != "" &&
      this.state.l != "" &&
      this.state.t1 != "" &&
      this.state.t2 != ""
    ) {
      var Result = Calculate_ThermalConductivity_From_Area_Length_T1_T2_HeatCurrent(
        this.state.a,
        this.state.l,
        this.state.t1,
        this.state.t2,
        this.state.ih,
        this.state.kUnit,
        this.state.aUnit,
        this.state.lUnit,
        this.state.t1Unit,
        this.state.t2Unit,
        this.state.ihUnit
      );
      this.setState({ k: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'K' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.ih != "" &&
      this.state.k != "" &&
      this.state.l != "" &&
      this.state.t1 != "" &&
      this.state.t2 != ""
    ) {
      var Result = Calculate_Area_From_ThermalConductivity_Length_T1_T2_HeatCurrent(
        this.state.k,
        this.state.l,
        this.state.t1,
        this.state.t2,
        this.state.ih,
        this.state.kUnit,
        this.state.aUnit,
        this.state.lUnit,
        this.state.t1Unit,
        this.state.t2Unit,
        this.state.ihUnit
      );
      this.setState({ a: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'A' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.ih != "" &&
      this.state.k != "" &&
      this.state.a != "" &&
      this.state.t1 != "" &&
      this.state.t2 != ""
    ) {
      var Result = Calculate_Length_From_ThermalConductivity_Area_T1_T2_HeatCurrent(
        this.state.k,
        this.state.a,
        this.state.t1,
        this.state.t2,
        this.state.ih,
        this.state.kUnit,
        this.state.aUnit,
        this.state.lUnit,
        this.state.t1Unit,
        this.state.t2Unit,
        this.state.ihUnit
      );
      this.setState({ l: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'l' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.ih != "" &&
      this.state.k != "" &&
      this.state.a != "" &&
      this.state.l != "" &&
      this.state.t2 != ""
    ) {
      var Result = Calculate_T1_From_ThermalConductivity_Area_Length_T2_HeatCurrent(
        this.state.k,
        this.state.a,
        this.state.l,
        this.state.t2,
        this.state.ih,
        this.state.kUnit,
        this.state.aUnit,
        this.state.lUnit,
        this.state.t1Unit,
        this.state.t2Unit,
        this.state.ihUnit
      );
      this.setState({ t1: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'T₁' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.ih != "" &&
      this.state.k != "" &&
      this.state.a != "" &&
      this.state.l != "" &&
      this.state.t1 != ""
    ) {
      var Result = Calculate_T2_From_ThermalConductivity_Area_Length_T1_HeatCurrent(
        this.state.k,
        this.state.a,
        this.state.l,
        this.state.t1,
        this.state.ih,
        this.state.kUnit,
        this.state.aUnit,
        this.state.lUnit,
        this.state.t1Unit,
        this.state.t2Unit,
        this.state.ihUnit
      );
      this.setState({ t2: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'T₂' has been calculated.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "Atleast 5 values are required to calculate the sixth one!",
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
  aValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ a: x[1].toString() });
      } else {
        ToastAndroid.show("'A' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  lValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ l: x[1].toString() });
      } else {
        ToastAndroid.show("'l' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  t1ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      var t = parseFloat(x[1]);
      if (
        (this.state.t1Unit == "K" && t < 0) ||
        (this.state.t1Unit == "°C" && t < -273.15) ||
        (this.state.t1Unit == "°F" && t < -459.666) ||
        (this.state.t1Unit == "°Ra" && t < 0) ||
        (this.state.t1Unit == "°Re" && t < -218.519)
      ) {
        ToastAndroid.show(
          "The entered value of 'T₁' is below absolute zero.",
          ToastAndroid.LONG
        );
      } else {
        this.setState({ t1: x[1].toString() });
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  t2ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      var t = parseFloat(x[1]);
      if (
        (this.state.t2Unit == "K" && t < 0) ||
        (this.state.t2Unit == "°C" && t < -273.15) ||
        (this.state.t2Unit == "°F" && t < -459.666) ||
        (this.state.t2Unit == "°Ra" && t < 0) ||
        (this.state.t2Unit == "°Re" && t < -218.519)
      ) {
        ToastAndroid.show(
          "The entered value of 'T₂' is below absolute zero.",
          ToastAndroid.LONG
        );
      } else {
        this.setState({ t2: x[1].toString() });
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  ihValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ ih: x[1].toString() });
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
  aUnitChanged(newUnit) {
    this.setState({ aUnit: newUnit });
  }
  lUnitChanged(newUnit) {
    this.setState({ lUnit: newUnit });
  }
  t1UnitChanged(newUnit) {
    if (
      (newUnit == "K" && this.state.t1 < 0) ||
      (newUnit == "°C" && this.state.t1 < -273.15) ||
      (newUnit == "°F" && this.state.t1 < -459.666) ||
      (newUnit == "°Ra" && this.state.t1 < 0) ||
      (newUnit == "°Re" && this.state.t1 < -218.519)
    ) {
      ToastAndroid.show(
        "The entered unit is such that 'T₁' is below absolute zero.",
        ToastAndroid.LONG
      );
    } else {
      this.setState({ t1Unit: newUnit });
    }
  }
  t2UnitChanged(newUnit) {
    if (
      (newUnit == "K" && this.state.t2 < 0) ||
      (newUnit == "°C" && this.state.t2 < -273.15) ||
      (newUnit == "°F" && this.state.t2 < -459.666) ||
      (newUnit == "°Ra" && this.state.t2 < 0) ||
      (newUnit == "°Re" && this.state.t2 < -218.519)
    ) {
      ToastAndroid.show(
        "The entered unit is such that 'T₂' is below absolute zero.",
        ToastAndroid.LONG
      );
    } else {
      this.setState({ t2Unit: newUnit });
    }
  }
  ihUnitChanged(newUnit) {
    this.setState({ ihUnit: newUnit });
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
            Heat Current
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
            Iₕ = K * (A / l) * (T₂ - T₁)
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
            quantityName={"Thermal conductivity of material"}
            quantitySymbol={"K"}
            textInputValue={this.state.k}
            onTextInputChangeText={(newText) => this.kValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.kUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.kUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Area of cross section"}
            quantitySymbol={"A"}
            textInputValue={this.state.a}
            onTextInputChangeText={(newText) => this.aValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.aUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.aUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Length"}
            quantitySymbol={"l"}
            textInputValue={this.state.l}
            onTextInputChangeText={(newText) => this.lValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.lUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.lUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Temperature at end 2"}
            quantitySymbol={"T₂"}
            textInputValue={this.state.t2}
            onTextInputChangeText={(newText) => this.t2ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.t2Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.t2UnitChanged(newUnit)}
            theme={this.state.theme}
          />
          <Scaler_Input_With_Units
            quantityName={"Temperature at end 1"}
            quantitySymbol={"T₁"}
            textInputValue={this.state.t1}
            onTextInputChangeText={(newText) => this.t1ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.t1Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.t1UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Heat current"}
            quantitySymbol={"Iₕ"}
            textInputValue={this.state.ih}
            onTextInputChangeText={(newText) => this.ihValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.ihUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.ihUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_HeatCurrent.bind(this)}
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
