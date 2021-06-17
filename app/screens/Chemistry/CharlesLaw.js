import React, { Component } from "react";
import { Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import Scaler_Input_With_Units from "../../subScreenComponents/Scaler_Input_With_Units";
import ScreenButton from "../../subScreenComponents/ScreenButton";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import {
  Calculate_V1_From_T1_V2_T2,
  Calculate_T1_From_V1_V2_T2,
  Calculate_V2_From_V1_T1_T2,
  Calculate_T2_From_V1_T1_V2,
} from "../../calculators/Chemistry/CharlesLaw";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class CharlesLaw extends Component {
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
      var val = await AsyncStorage.getItem("Time_Units");
      if (val != null) {
        this.setState({ tUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Acceleration_Units");
      if (val != null) {
        this.setState({ aUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Velocity_Units");
      if (val != null) {
        this.setState({ vUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem("Time_Units", this.state.tUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem(
        "Acceleration_Units",
        this.state.aUnit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Velocity_Units", this.state.vUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    V1: "",
    T1: "",
    V2: "",
    T2: "",
    v1Unit: "m³",
    t1Unit: "K",
    v2Unit: "m³",
    t2Unit: "K",
    Steps: "",
  };

  Calculate_CharlesLaw() {
    if (this.state.T1 != "" && this.state.V2 != "" && this.state.T2 != "") {
      var Result = Calculate_V1_From_T1_V2_T2(
        this.state.T1,
        this.state.V2,
        this.state.T2,
        this.state.v1Unit,
        this.state.t1Unit,
        this.state.v2Unit,
        this.state.t2Unit
      );
      this.setState({ V1: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'V₁' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.V1 != "" &&
      this.state.V2 != "" &&
      this.state.T2 != ""
    ) {
      var Result = Calculate_T1_From_V1_V2_T2(
        this.state.V1,
        this.state.V2,
        this.state.T2,
        this.state.v1Unit,
        this.state.t1Unit,
        this.state.v2Unit,
        this.state.t2Unit
      );
      this.setState({ T1: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'T₁' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.V1 != "" &&
      this.state.T1 != "" &&
      this.state.T2 != ""
    ) {
      var Result = Calculate_V2_From_V1_T1_T2(
        this.state.V1,
        this.state.T1,
        this.state.T2,
        this.state.v1Unit,
        this.state.t1Unit,
        this.state.v2Unit,
        this.state.t2Unit
      );
      this.setState({ V2: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'V₂' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.V1 != "" &&
      this.state.T1 != "" &&
      this.state.V2 != ""
    ) {
      var Result = Calculate_T2_From_V1_T1_V2(
        this.state.V1,
        this.state.T1,
        this.state.V2,
        this.state.v1Unit,
        this.state.t1Unit,
        this.state.v2Unit,
        this.state.t2Unit
      );
      this.setState({ T2: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'T₂' has been calculated.", ToastAndroid.LONG);
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
        this.setState({ T1: x[1].toString() });
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  v1ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ V1: x[1].toString() });
      } else {
        ToastAndroid.show("'V₁' must be a positive value.", ToastAndroid.LONG);
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
        this.setState({ T2: x[1].toString() });
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  v2ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ V2: x[1].toString() });
      } else {
        ToastAndroid.show("'V₂' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  t1UnitChanged(newUnit) {
    if (
      (newUnit == "K" && this.state.T1 < 0) ||
      (newUnit == "°C" && this.state.T1 < -273.15) ||
      (newUnit == "°F" && this.state.T1 < -459.666) ||
      (newUnit == "°Ra" && this.state.T1 < 0) ||
      (newUnit == "°Re" && this.state.T1 < -218.519)
    ) {
      ToastAndroid.show(
        "The entered unit is such that 'T₁' is below absolute zero.",
        ToastAndroid.LONG
      );
    } else {
      this.setState({ t1Unit: newUnit });
    }
  }
  v1UnitChanged(newUnit) {
    this.setState({ v1Unit: newUnit });
  }
  t2UnitChanged(newUnit) {
    if (
      (newUnit == "K" && this.state.T2 < 0) ||
      (newUnit == "°C" && this.state.T2 < -273.15) ||
      (newUnit == "°F" && this.state.T2 < -459.666) ||
      (newUnit == "°Ra" && this.state.T2 < 0) ||
      (newUnit == "°Re" && this.state.T2 < -218.519)
    ) {
      ToastAndroid.show(
        "The entered unit is such that 'T₂' is below absolute zero.",
        ToastAndroid.LONG
      );
    } else {
      this.setState({ t2Unit: newUnit });
    }
  }
  v2UnitChanged(newUnit) {
    this.setState({ v2Unit: newUnit });
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
            Charles's Law: Temperature-Volume relationship
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
            V₁ / T₁ = V₂ / T₂{"\n"}P = constant
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
            quantityName={"Initial volume"}
            quantitySymbol={"V₁"}
            textInputValue={this.state.V1}
            onTextInputChangeText={(newText) => this.v1ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.v1Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.v1UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Initial temperature"}
            quantitySymbol={"T₁"}
            textInputValue={this.state.T1}
            onTextInputChangeText={(newText) => this.t1ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.t1Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.t1UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Final volume"}
            quantitySymbol={"V₂"}
            textInputValue={this.state.V2}
            onTextInputChangeText={(newText) => this.v2ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.v2Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.v2UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Final temperature"}
            quantitySymbol={"T₂"}
            textInputValue={this.state.T2}
            onTextInputChangeText={(newText) => this.t2ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.t2Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.t2UnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_CharlesLaw.bind(this)}
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
