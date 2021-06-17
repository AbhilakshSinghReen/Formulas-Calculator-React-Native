import React, { Component } from "react";
import { Button, Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import Scaler_Input_With_Units from "../../subScreenComponents/Scaler_Input_With_Units";
import MultilineTextDisplayer from "../../subScreenComponents/MultilineTextDisplayer";
import ScreenButton from "../../subScreenComponents/ScreenButton";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import {
  Calculate_EscapeVelocity_From_Mass_Radius,
  Calculate_Mass_From_Radius_EscapeVelocity,
  Calculate_Radius_From_Mass_EscapeVelocity,
} from "../../calculators/Physics/EscapeVelocity";

import { Universal_Gravitational_Constant } from "../../calculators/Constants";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class EscapeVelocity extends Component {
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
        this.setState({ mUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ rUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Velocity_Units");
      if (val != null) {
        this.setState({ veUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem("Mass_Units", this.state.mUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Distance_Units", this.state.rUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem(
        "Velocity_Units",
        this.state.veUnit.toString()
      );
    } catch (err) {}
  };

  state = {
    theme: "",
    G: Universal_Gravitational_Constant[2],
    M: "",
    R: "",
    Ve: "",
    mUnit: "kg",
    rUnit: "m",
    veUnit: "m/s",
    Steps: "",
  };

  Calculate_EscapeVelocity() {
    if (this.state.M != "" && this.state.R != "") {
      var Result = Calculate_EscapeVelocity_From_Mass_Radius(
        this.state.M,
        this.state.R,
        this.state.mUnit,
        this.state.rUnit,
        this.state.veUnit
      );
      this.setState({ Ve: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'Vₑ' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.R != "" && this.state.Ve != "") {
      var Result = Calculate_Mass_From_Radius_EscapeVelocity(
        this.state.R,
        this.state.Ve,
        this.state.mUnit,
        this.state.rUnit,
        this.state.veUnit
      );
      this.setState({ M: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'M' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.M != "" && this.state.Ve != "") {
      var Result = Calculate_Radius_From_Mass_EscapeVelocity(
        this.state.M,
        this.state.Ve,
        this.state.mUnit,
        this.state.rUnit,
        this.state.veUnit
      );
      this.setState({ R: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'r' has been calculated.", ToastAndroid.LONG);
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

  mValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      if (IsNonNegative(parseFloat(x[1])) || x[2]) {
        this.setState({ M: x[1].toString() });
      } else {
        ToastAndroid.show("'M' must be a positive value.", ToastAndroid.LONG);
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
        this.setState({ R: x[1].toString() });
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
  veValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Ve: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  mUnitChanged(newUnit) {
    this.setState({ mUnit: newUnit });
  }
  rUnitChanged(newUnit) {
    this.setState({ rUnit: newUnit });
  }
  veUnitChanged(newUnit) {
    this.setState({ veUnit: newUnit });
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
            Escape Velocity
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
            Vₑ = sqrt((2 * G * M) / r)
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
          <MultilineTextDisplayer
            line1TextToDisplay={"Universal Gravitational Constant"}
            line2TextToDisplay={"G = " + this.state.G.toString()}
            theme={this.state.theme}
          />
          <Scaler_Input_With_Units
            quantityName={"Mass of the centre body"}
            quantitySymbol={"M"}
            textInputValue={this.state.M}
            onTextInputChangeText={(newText) => this.mValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.mUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.mUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Radius of the centre body"}
            quantitySymbol={"r"}
            textInputValue={this.state.R}
            onTextInputChangeText={(newText) => this.rValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.rUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.rUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Escape velocity"}
            quantitySymbol={"Vₑ"}
            textInputValue={this.state.Ve}
            onTextInputChangeText={(newText) => this.veValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.veUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.veUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_EscapeVelocity.bind(this)}
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
