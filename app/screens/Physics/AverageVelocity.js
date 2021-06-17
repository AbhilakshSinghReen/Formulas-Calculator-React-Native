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
  Calculate_AverageVelocity_From_Displacement_Time,
  Calculate_Displacement_From_Time_AverageVelocity,
  Calculate_Time_From_Displacement_AverageVelocity,
} from "../../calculators/Physics/AverageVelocity";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class AverageVelocity extends Component {
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
    X: "",
    T: "",
    V: "",
    xUnit: "m",
    tUnit: "s",
    vUnit: "m/s",
    Steps: "",
  };

  Calculate_AverageVelocity() {
    if (this.state.X != "" && this.state.T != "") {
      var Result = Calculate_AverageVelocity_From_Displacement_Time(
        this.state.X,
        this.state.T,
        this.state.xUnit,
        this.state.tUnit,
        this.state.vUnit
      );
      this.setState({ V: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'v' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.T != "" && this.state.V != "") {
      var Result = Calculate_Displacement_From_Time_AverageVelocity(
        this.state.T,
        this.state.V,
        this.state.xUnit,
        this.state.tUnit,
        this.state.vUnit
      );
      this.setState({ X: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'x' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.X != "" && this.state.V != "") {
      var Result = Calculate_Time_From_Displacement_AverageVelocity(
        this.state.X,
        this.state.V,
        this.state.xUnit,
        this.state.tUnit,
        this.state.vUnit
      );
      this.setState({ T: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'t' has been calculated.", ToastAndroid.LONG);
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

  xValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ X: x[1].toString() });
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
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ T: x[1].toString() });
      } else {
        ToastAndroid.show("'t' must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  vValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ V: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  xUnitChanged(newUnit) {
    this.setState({ xUnit: newUnit });
  }
  tUnitChanged(newUnit) {
    this.setState({ tUnit: newUnit });
  }
  vUnitChanged(newUnit) {
    this.setState({ vUnit: newUnit });
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
            Average Velocity
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
            v = x / t
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
            quantityName={"Total displacement"}
            quantitySymbol={"x"}
            textInputValue={this.state.X}
            onTextInputChangeText={(newText) => this.xValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.xUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.xUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Time taken"}
            quantitySymbol={"t"}
            textInputValue={this.state.T}
            onTextInputChangeText={(newText) => this.tValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.tUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.tUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Average velocity"}
            quantitySymbol={"v"}
            textInputValue={this.state.V}
            onTextInputChangeText={(newText) => this.vValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.vUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.vUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_AverageVelocity.bind(this)}
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
