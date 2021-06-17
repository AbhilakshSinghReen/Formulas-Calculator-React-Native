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
  Calculate_DipoleMoment_From_Charge_Length,
  Calculate_Charge_From_Length_DipoleMoment,
  Calculate_Length_From_Charge_DipoleMoment,
} from "../../calculators/Physics/DipoleMomentScaler";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class DipoleMomentScaler extends Component {
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
      var val = await AsyncStorage.getItem("Charge_Units");
      if (val != null) {
        this.setState({ qUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ lUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("DipoleMoment_Units");
      if (val != null) {
        this.setState({ pUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem("Charge_Units", this.state.qUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Distance_Units", this.state.lUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem(
        "DipoleMoment_Units",
        this.state.pUnit.toString()
      );
    } catch (err) {}
  };

  state = {
    theme: "",
    q: "",
    l: "",
    P: "",
    qUnit: "C",
    lUnit: "m",
    pUnit: "C.m",
    Steps: "",
  };

  Calculate_DipoleMomentScaler() {
    if (this.state.q != "" && this.state.l != "") {
      var Result = Calculate_DipoleMoment_From_Charge_Length(
        this.state.q,
        this.state.l,
        this.state.qUnit,
        this.state.lUnit,
        this.state.pUnit
      );
      this.setState({ P: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'P' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.l != "" && this.state.P != "") {
      var Result = Calculate_Charge_From_Length_DipoleMoment(
        this.state.l,
        this.state.P,
        this.state.qUnit,
        this.state.lUnit,
        this.state.pUnit
      );
      this.setState({ q: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'q' has been calculated.", ToastAndroid.LONG);
    } else if (this.state.q != "" && this.state.P != "") {
      var Result = Calculate_Length_From_Charge_DipoleMoment(
        this.state.q,
        this.state.P,
        this.state.qUnit,
        this.state.lUnit,
        this.state.pUnit
      );
      this.setState({ l: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'l' has been calculated.", ToastAndroid.LONG);
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

  qValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ q: x[1].toString() });
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
  pValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ P: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  qUnitChanged(newUnit) {
    this.setState({ qUnit: newUnit });
  }
  lUnitChanged(newUnit) {
    this.setState({ lUnit: newUnit });
  }
  pUnitChanged(newUnit) {
    this.setState({ pUnit: newUnit });
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
            Dipole Moment (Scaler)
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
            P = q * l
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
            quantityName={"Charge at each end"}
            quantitySymbol={"q"}
            textInputValue={this.state.q}
            onTextInputChangeText={(newText) => this.qValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.qUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.qUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Distance between the 2 charges"}
            quantitySymbol={"l"}
            textInputValue={this.state.l}
            onTextInputChangeText={(newText) => this.lValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.lUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.lUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Magnitude of dipole moment"}
            quantitySymbol={"P"}
            textInputValue={this.state.P}
            onTextInputChangeText={(newText) => this.pValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.pUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.pUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_DipoleMomentScaler.bind(this)}
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
