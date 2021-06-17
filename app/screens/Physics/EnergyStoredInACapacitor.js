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
  Calculate_EnergyStoredInACapacitor_From_Capacitance_Voltage,
  Calculate_Voltage_From_Capacitance_EnergyStoredInACapacitor,
  Calculate_Capacitance_From_Voltage_EnergyStoredInACapacitor,
} from "../../calculators/Physics/EnergyStoredInACapacitor";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class EnergyStoredInACapacitor extends Component {
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
      var val = await AsyncStorage.getItem("Capacitance_Units");
      if (val != null) {
        this.setState({ cUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Voltage_Units");
      if (val != null) {
        this.setState({ vUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Energy_Units");
      if (val != null) {
        this.setState({ eUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem(
        "Capacitance_Units",
        this.state.cUnit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Voltage_Units", this.state.vUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Energy_Units", this.state.eUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    C: "",
    V: "",
    E: "",
    cUnit: "uF",
    vUnit: "V",
    eUnit: "J",
    Steps: "",
  };

  Calculate_EnergyStoredInACapacitor() {
    if (this.state.C != "" && this.state.V != "") {
      var Result = Calculate_EnergyStoredInACapacitor_From_Capacitance_Voltage(
        this.state.C,
        this.state.V,
        this.state.cUnit,
        this.state.vUnit,
        this.state.eUnit
      );
      this.setState({ E: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'E' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.C != "" && this.state.E != "") {
      var Result = Calculate_Voltage_From_Capacitance_EnergyStoredInACapacitor(
        this.state.C,
        this.state.E,
        this.state.cUnit,
        this.state.vUnit,
        this.state.eUnit
      );
      this.setState({ V: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'V' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.V != "" && this.state.E != "") {
      var Result = Calculate_Capacitance_From_Voltage_EnergyStoredInACapacitor(
        this.state.V,
        this.state.E,
        this.state.cUnit,
        this.state.vUnit,
        this.state.eUnit
      );
      this.setState({ C: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'C' has been calculated.", ToastAndroid.LONG);
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

  cValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ C: x[1].toString() });
      } else {
        ToastAndroid.show("C must be a positive value.", ToastAndroid.LONG);
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
  eValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ E: x[1].toString() });
      } else {
        ToastAndroid.show("E must be a positive value.", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  cUnitChanged(newUnit) {
    this.setState({ cUnit: newUnit });
  }
  vUnitChanged(newUnit) {
    this.setState({ vUnit: newUnit });
  }
  eUnitChanged(newUnit) {
    this.setState({ eUnit: newUnit });
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
            Energy Stored In A Capacitor
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
            E = 0.5 * C * V²
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
            quantityName={"Capacitance"}
            quantitySymbol={"C"}
            textInputValue={this.state.C}
            onTextInputChangeText={(newText) => this.cValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.cUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.cUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Voltage"}
            quantitySymbol={"V"}
            textInputValue={this.state.V}
            onTextInputChangeText={(newText) => this.vValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.vUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.vUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Energy"}
            quantitySymbol={"E"}
            textInputValue={this.state.E}
            onTextInputChangeText={(newText) => this.eValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.eUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.eUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_EnergyStoredInACapacitor.bind(this)}
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
