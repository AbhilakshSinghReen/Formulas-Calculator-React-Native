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
  Calculate_ElasticPotentialEnergy_From_SpringConstant_Extension,
  Calculate_SpringConstant_From_Extension_ElasticPotentialEnergy,
  Calculate_Extension_From_SpringConstant_ElasticPotentialEnergy,
} from "../../calculators/Physics/ElasticPotentialEnergy";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class ElasticPotentialEnergy extends Component {
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
      var val = await AsyncStorage.getItem("SpringConstant_Units");
      if (val != null) {
        this.setState({ kUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ xUnit: val.toString() });
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
      await AsyncStorage.setItem(
        "SpringConstant_Units",
        this.state.kUnit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Distance_Units", this.state.xUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Energy_Units", this.state.uUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    k: "",
    x: "",
    U: "",
    kUnit: "N/m",
    xUnit: "m",
    uUnit: "J",
    Steps: "",
  };

  Calculate_ElasticPotentialEnergy() {
    if (this.state.k != "" && this.state.x != "") {
      var Result = Calculate_ElasticPotentialEnergy_From_SpringConstant_Extension(
        this.state.k,
        this.state.x,
        this.state.kUnit,
        this.state.xUnit,
        this.state.uUnit
      );
      this.setState({ U: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'U' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.k != "" && this.state.U != "") {
      var Result = Calculate_Extension_From_SpringConstant_ElasticPotentialEnergy(
        this.state.k,
        this.state.U,
        this.state.kUnit,
        this.state.xUnit,
        this.state.uUnit
      );
      this.setState({ x: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'x' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.x != "" && this.state.U != "") {
      var Result = Calculate_SpringConstant_From_Extension_ElasticPotentialEnergy(
        this.state.x,
        this.state.U,
        this.state.kUnit,
        this.state.xUnit,
        this.state.uUnit
      );
      this.setState({ k: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'k' has been calculated.", ToastAndroid.LONG);
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
  xValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ x: x[1].toString() });
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
        this.setState({ U: x[1].toString() });
      } else {
        ToastAndroid.show("'U' must be a positive value.", ToastAndroid.LONG);
      }
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
  xUnitChanged(newUnit) {
    this.setState({ xUnit: newUnit });
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
            Elastic Potential Energy
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
            U = 0.5 * k * x²
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
            quantityName={"Spring constant"}
            quantitySymbol={"k"}
            textInputValue={this.state.k}
            onTextInputChangeText={(newText) => this.kValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.kUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.kUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Extension"}
            quantitySymbol={"x"}
            textInputValue={this.state.x}
            onTextInputChangeText={(newText) => this.xValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.xUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.xUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Potential energy"}
            quantitySymbol={"U"}
            textInputValue={this.state.U}
            onTextInputChangeText={(newText) => this.uValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.uUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.uUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_ElasticPotentialEnergy.bind(this)}
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
