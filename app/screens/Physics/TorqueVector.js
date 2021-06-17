import React, { Component } from "react";
import { Button, Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import Vector_Input_With_Units from "../../subScreenComponents/Vector_Input_With_Units";
import ScreenButton from "../../subScreenComponents/ScreenButton";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import { Calculate_Torque_From_LengthVector_Force } from "../../calculators/Physics/TorqueVector";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class TorqueVector extends Component {
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
    Lx: "",
    Ly: "",
    Lz: "",
    Fx: "",
    Fy: "",
    Fz: "",
    Tx: "",
    Ty: "",
    Tz: "",
    fUnit: "N",
    lUnit: "m",
    tUnit: "N.m",
    Steps: "",
  };

  CanCalculateTorque() {
    if (
      this.state.Lx == "" ||
      this.state.Ly == "" ||
      this.state.Lz == "" ||
      this.state.Fx == "" ||
      this.state.Fy == "" ||
      this.state.Fz == ""
    ) {
      return false;
    }
    return true;
  }

  Calculate_TorqueVector() {
    this.onNewClick();
    if (this.CanCalculateTorque()) {
      var X = Calculate_Torque_From_LengthVector_Force(
        this.state.Lx,
        this.state.Ly,
        this.state.Lz,
        this.state.Fx,
        this.state.Fy,
        this.state.Fz,
        this.state.fUnit,
        this.state.lUnit,
        this.state.tUnit
      );
      this.setState({ Tx: X[0][0].toString() });
      this.setState({ Ty: X[0][1].toString() });
      this.setState({ Tz: X[0][2].toString() });
      this.setState({ Steps: X[1] });
      ToastAndroid.show("'Torque' has been calculated.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "One or more entries other than the components of 'Torque' are empty. In this formula, you can only calculate 'Torque'.",
        ToastAndroid.LONG
      );
    }

    if (this.props.route.params.saveUnits) {
      this.saveUnits();
    }
  }

  FxValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Fx: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  FyValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Fy: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  FzValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Fz: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  LxValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Lx: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  LyValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Ly: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  LzValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Lz: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  TxValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Tx: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  TyValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Ty: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  TzValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Tz: x[1].toString() });
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
            Torque (Vector)
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
            T = L X F
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
          <Vector_Input_With_Units
            quantityName={"Length vector"}
            quantitySymbol={"L"}
            xTextInputValue={this.state.Lx}
            onXTextInputChangeText={(newText) => this.LxValueChanged(newText)}
            yTextInputValue={this.state.Ly}
            onYTextInputChangeText={(newText) => this.LyValueChanged(newText)}
            zTextInputValue={this.state.Lz}
            onZTextInputChangeText={(newText) => this.LzValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.lUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.lUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Vector_Input_With_Units
            quantityName={"Force"}
            quantitySymbol={"F"}
            xTextInputValue={this.state.Fx}
            onXTextInputChangeText={(newText) => this.FxValueChanged(newText)}
            yTextInputValue={this.state.Fy}
            onYTextInputChangeText={(newText) => this.FyValueChanged(newText)}
            zTextInputValue={this.state.Fz}
            onZTextInputChangeText={(newText) => this.FzValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.fUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.fUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Vector_Input_With_Units
            quantityName={"Torque"}
            quantitySymbol={"T"}
            xTextInputValue={this.state.Tx}
            onXTextInputChangeText={(newText) => this.TxValueChanged(newText)}
            yTextInputValue={this.state.Ty}
            onYTextInputChangeText={(newText) => this.TyValueChanged(newText)}
            zTextInputValue={this.state.Tz}
            onZTextInputChangeText={(newText) => this.TzValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.tUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.tUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_TorqueVector.bind(this)}
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
