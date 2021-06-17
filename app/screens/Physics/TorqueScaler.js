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
  Calculate_Torque_From_Force_PerpendicularDistance,
  Calculate_Force_From_PerpendicularDistance_Torque,
  Calculate_PerpendicularDistance_From_Force_Torque,
} from "../../calculators/Physics/TorqueScaler";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class TorqueScaler extends Component {
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
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ xUnit: val.toString() });
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
      await AsyncStorage.setItem("Distance_Units", this.state.xUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Velocity_Units", this.state.vUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    F: "",
    L: "",
    T: "",
    fUnit: "N",
    lUnit: "m",
    tUnit: "N.m",
    Steps: "",
  };

  Calculate_TorqueScaler() {
    this.onNewClick();
    if (this.state.F != "" && this.state.L != "") {
      var Result = Calculate_Torque_From_Force_PerpendicularDistance(
        this.state.F,
        this.state.L,
        this.state.fUnit,
        this.state.lUnit,
        this.state.tUnit
      );
      this.setState({ T: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'T' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.L != "" && this.state.T != "") {
      var Result = Calculate_Force_From_PerpendicularDistance_Torque(
        this.state.L,
        this.state.T,
        this.state.fUnit,
        this.state.lUnit,
        this.state.tUnit
      );
      this.setState({ F: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'F' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.T != "" && this.state.F != "") {
      var Result = Calculate_PerpendicularDistance_From_Force_Torque(
        this.state.F,
        this.state.T,
        this.state.fUnit,
        this.state.lUnit,
        this.state.tUnit
      );
      this.setState({ L: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'L' has been calculated.", ToastAndroid.LONG);
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

  fValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ F: x[1].toString() });
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
        this.setState({ L: x[1].toString() });
      } else {
        ToastAndroid.show("'L' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  tValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ T: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  fUnitChanged(newUnit) {
    this.setState({ fUnit: newUnit });
  }
  lUnitChanged(newUnit) {
    this.setState({ lUnit: newUnit });
  }
  tUnitChanged(newUnit) {
    this.setState({ tUnit: newUnit });
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
            Torque (Scaler)
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
            T = F * L
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
            quantityName={"Force"}
            quantitySymbol={"F"}
            textInputValue={this.state.F}
            onTextInputChangeText={(newText) => this.fValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.fUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.fUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={
              "Perpendicular distance between the force and the point of rotation"
            }
            quantitySymbol={"L"}
            textInputValue={this.state.L}
            onTextInputChangeText={(newText) => this.lValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.lUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.lUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Torque"}
            quantitySymbol={"T"}
            textInputValue={this.state.T}
            onTextInputChangeText={(newText) => this.tValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.tUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.tUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_TorqueScaler.bind(this)}
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
