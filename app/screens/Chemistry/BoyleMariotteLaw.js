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
  Calculate_P1_From_V1_P2_V2,
  Calculate_V1_From_P1_P2_V2,
  Calculate_P2_From_P1_V1_V2,
  Calculate_V2_From_P1_V1_P2,
} from "../../calculators/Chemistry/BoyleMariotteLaw";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class BoylesMariotteLaw extends Component {
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
      var val = await AsyncStorage.getItem("Pressure_Units");
      if (val != null) {
        this.setState({ p1Unit: val.toString() });
        this.setState({ p2Unit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Volume_Units");
      if (val != null) {
        this.setState({ v1Unit: val.toString() });
        this.setState({ v2Unit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem(
        "Pressure_Units",
        this.state.p1Unit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Volume_Units", this.state.v1Unit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    P1: "",
    V1: "",
    P2: "",
    V2: "",
    p1Unit: "Pa",
    v1Unit: "m³",
    p2Unit: "Pa",
    v2Unit: "m³",
    Steps: "",
  };

  Calculate_BolyeMariotteLaw() {
    if (this.state.V1 != "" && this.state.P2 != "" && this.state.V2 != "") {
      var Result = Calculate_P1_From_V1_P2_V2(
        this.state.V1,
        this.state.P2,
        this.state.V2,
        this.state.p1Unit,
        this.state.v1Unit,
        this.state.p2Unit,
        this.state.v2Unit
      );
      this.setState({ P1: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'P₁' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.P1 != "" &&
      this.state.P2 != "" &&
      this.state.V2 != ""
    ) {
      var Result = Calculate_V1_From_P1_P2_V2(
        this.state.P1,
        this.state.P2,
        this.state.V2,
        this.state.p1Unit,
        this.state.v1Unit,
        this.state.p2Unit,
        this.state.v2Unit
      );
      this.setState({ V1: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'V₁' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.P1 != "" &&
      this.state.V1 != "" &&
      this.state.V2 != ""
    ) {
      var Result = Calculate_P2_From_P1_V1_V2(
        this.state.P1,
        this.state.V1,
        this.state.V2,
        this.state.p1Unit,
        this.state.v1Unit,
        this.state.p2Unit,
        this.state.v2Unit
      );
      this.setState({ P2: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'P₂' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.P1 != "" &&
      this.state.V1 != "" &&
      this.state.P2 != ""
    ) {
      var Result = Calculate_V2_From_P1_V1_P2(
        this.state.P1,
        this.state.V1,
        this.state.P2,
        this.state.p1Unit,
        this.state.v1Unit,
        this.state.p2Unit,
        this.state.v2Unit
      );
      this.setState({ V2: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'V₂' has been calculated.", ToastAndroid.LONG);
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

  p1ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ P1: x[1].toString() });
      } else {
        ToastAndroid.show("'P₁' must be a positive value.", ToastAndroid.LONG);
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
  p2ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ P2: x[1].toString() });
      } else {
        ToastAndroid.show("'P₂' must be a positive value.", ToastAndroid.LONG);
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

  p1UnitChanged(newUnit) {
    this.setState({ p1Unit: newUnit });
  }
  v1UnitChanged(newUnit) {
    this.setState({ v1Unit: newUnit });
  }
  p2UnitChanged(newUnit) {
    this.setState({ p2Unit: newUnit });
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
            Boyle–Mariotte Law: Pressure-Volume relationship
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
            P₁ * V₁ = P₂ * V₂{"\n"}T = constant
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
            quantityName={"Initial pressure"}
            quantitySymbol={"P₁"}
            textInputValue={this.state.P1}
            onTextInputChangeText={(newText) => this.p1ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.p1Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.p1UnitChanged(newUnit)}
            theme={this.state.theme}
          />

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
            quantityName={"Final pressure"}
            quantitySymbol={"P₂"}
            textInputValue={this.state.P2}
            onTextInputChangeText={(newText) => this.p2ValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.p2Unit}
            onUnitsPickerUnitsChange={(newUnit) => this.p2UnitChanged(newUnit)}
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

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_BolyeMariotteLaw.bind(this)}
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
