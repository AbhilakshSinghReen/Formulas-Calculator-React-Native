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
  Calculate_Friction_From_CoefficientOfFriction_NormalReaction,
  Calculate_CoefficientOfFriction_From_NormalReaction_Friction,
  Calculate_NormalReaction_From_CoefficientOfFriction_Friction,
} from "../../calculators/Physics/Friction";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class Friction extends Component {
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
      var val = await AsyncStorage.getItem("Force_Units");
      if (val != null) {
        this.setState({ nUnit: val.toString() });
        this.setState({ fUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem("Force_Units", this.state.fUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    u: "",
    N: "",
    F: "",
    uUnit: "N/N",
    nUnit: "N",
    fUnit: "N",
    Steps: "",
  };

  Calculate_Friction() {
    if (this.state.u != "" && this.state.N != "") {
      var Result = Calculate_Friction_From_CoefficientOfFriction_NormalReaction(
        this.state.u,
        this.state.N,
        this.state.uUnit,
        this.state.nUnit,
        this.state.fUnit
      );
      this.setState({ F: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'F' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.N != "" && this.state.F != "") {
      var Result = Calculate_CoefficientOfFriction_From_NormalReaction_Friction(
        this.state.N,
        this.state.F,
        this.state.uUnit,
        this.state.nUnit,
        this.state.fUnit
      );
      this.setState({ u: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'u' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.u != "" && this.state.F != "") {
      var Result = Calculate_NormalReaction_From_CoefficientOfFriction_Friction(
        this.state.u,
        this.state.F,
        this.state.uUnit,
        this.state.nUnit,
        this.state.fUnit
      );
      this.setState({ N: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'N' has been calculated.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "Atleast 2 values are required to calculate the third one!",
        ToastAndroid.LONG
      );
    }

    if (this.props.route.params.saveUnits) {
      this.saveUnits();
    }
  }

  uValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ u: x[1].toString() });
      } else {
        ToastAndroid.show("'u' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  nValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ N: x[1].toString() });
      } else {
        ToastAndroid.show("'N' must be a positive value.", ToastAndroid.LONG);
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
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ F: x[1].toString() });
      } else {
        ToastAndroid.show("'F' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  uUnitChanged(newUnit) {}
  nUnitChanged(newUnit) {
    this.setState({ nUnit: newUnit });
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
            Friction
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
            F = u * N
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
            quantityName={"Coefficient of friction"}
            quantitySymbol={"u"}
            textInputValue={this.state.u}
            onTextInputChangeText={(newText) => this.uValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.uUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.uUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Normal reaction"}
            quantitySymbol={"N"}
            textInputValue={this.state.N}
            onTextInputChangeText={(newText) => this.nValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.nUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.nUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Friction"}
            quantitySymbol={"F"}
            textInputValue={this.state.F}
            onTextInputChangeText={(newText) => this.fValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.fUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.fUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_Friction.bind(this)}
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
