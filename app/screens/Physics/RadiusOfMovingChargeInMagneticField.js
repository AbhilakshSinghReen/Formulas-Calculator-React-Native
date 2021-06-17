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
  Calculate_Radius_From_Mass_Velocity_Charge_MagneticField,
  Calculate_Mass_From_Velocity_Charge_MagneticField_Radius,
  Calculate_Velocity_From_Mass_Charge_MagneticField_Radius,
  Calculate_Charge_From_Mass_Velocity_MagneticField_Radius,
  Calculate_MagneticField_From_Mass_Velocity_Charge_Radius,
} from "../../calculators/Physics/RadiusOfMovingChargeInMagneticField";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsNonNegative,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class RadiusOfMovingChargeInMagneticField extends Component {
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
      var val = await AsyncStorage.getItem("Velocity_Units");
      if (val != null) {
        this.setState({ vUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Charge_Units");
      if (val != null) {
        this.setState({ qUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("MagneticField_Units");
      if (val != null) {
        this.setState({ bUnit: val.toString() });
      }
    } catch (err) {}

    try {
      var val = await AsyncStorage.getItem("Distance_Units");
      if (val != null) {
        this.setState({ rUnit: val.toString() });
      }
    } catch (err) {}
  };
  saveUnits = async () => {
    try {
      await AsyncStorage.setItem("Mass_Units", this.state.mUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Velocity_Units", this.state.vUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Charge_Units", this.state.qUnit.toString());
    } catch (err) {}

    try {
      await AsyncStorage.setItem(
        "MagneticField_Units",
        this.state.bUnit.toString()
      );
    } catch (err) {}

    try {
      await AsyncStorage.setItem("Distance_Units", this.state.rUnit.toString());
    } catch (err) {}
  };

  state = {
    theme: "",
    m: "",
    v: "",
    q: "",
    B: "",
    r: "",
    mUnit: "kg",
    vUnit: "m/s",
    qUnit: "C",
    bUnit: "T",
    rUnit: "m",
    Steps: "",
  };

  Calculate_RadiusOfRevolutionInMagneticField() {
    if (
      this.state.m != "" &&
      this.state.v != "" &&
      this.state.q != "" &&
      this.state.B != ""
    ) {
      var Result = Calculate_Radius_From_Mass_Velocity_Charge_MagneticField(
        this.state.m,
        this.state.v,
        this.state.q,
        this.state.B,
        this.state.mUnit,
        this.state.vUnit,
        this.state.qUnit,
        this.state.bUnit,
        this.state.rUnit
      );
      this.setState({ r: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'r' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.r != "" &&
      this.state.v != "" &&
      this.state.q != "" &&
      this.state.B != ""
    ) {
      var Result = Calculate_Mass_From_Velocity_Charge_MagneticField_Radius(
        this.state.v,
        this.state.q,
        this.state.B,
        this.state.r,
        this.state.mUnit,
        this.state.vUnit,
        this.state.qUnit,
        this.state.bUnit,
        this.state.rUnit
      );
      this.setState({ m: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'m' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.r != "" &&
      this.state.m != "" &&
      this.state.q != "" &&
      this.state.B != ""
    ) {
      var Result = Calculate_Velocity_From_Mass_Charge_MagneticField_Radius(
        this.state.m,
        this.state.q,
        this.state.B,
        this.state.r,
        this.state.mUnit,
        this.state.vUnit,
        this.state.qUnit,
        this.state.bUnit,
        this.state.rUnit
      );
      this.setState({ v: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'v' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.r != "" &&
      this.state.m != "" &&
      this.state.v != "" &&
      this.state.B != ""
    ) {
      var Result = Calculate_Charge_From_Mass_Velocity_MagneticField_Radius(
        this.state.m,
        this.state.v,
        this.state.B,
        this.state.r,
        this.state.mUnit,
        this.state.vUnit,
        this.state.qUnit,
        this.state.bUnit,
        this.state.rUnit
      );
      this.setState({ q: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'q' has been calculated.", ToastAndroid.LONG);
    } else if (
      this.state.r != "" &&
      this.state.m != "" &&
      this.state.v != "" &&
      this.state.q != ""
    ) {
      var Result = Calculate_MagneticField_From_Mass_Velocity_Charge_Radius(
        this.state.m,
        this.state.v,
        this.state.q,
        this.state.r,
        this.state.mUnit,
        this.state.vUnit,
        this.state.qUnit,
        this.state.bUnit,
        this.state.rUnit
      );
      this.setState({ B: Result[0].toString() });
      this.setState({ Steps: Result[1].toString() });
      ToastAndroid.show("'B' has been calculated.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "Atleast 4 values are required to calculate the fifth one!",
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
        this.setState({ m: x[1].toString() });
      } else {
        ToastAndroid.show("'m' must be a positive value.", ToastAndroid.LONG);
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
      this.setState({ v: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
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
  bValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ B: x[1].toString() });
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
        this.setState({ r: x[1].toString() });
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

  mUnitChanged(newUnit) {
    this.setState({ mUnit: newUnit });
  }
  vUnitChanged(newUnit) {
    this.setState({ vUnit: newUnit });
  }
  qUnitChanged(newUnit) {
    this.setState({ qUnit: newUnit });
  }
  bUnitChanged(newUnit) {
    this.setState({ bUnit: newUnit });
  }
  rUnitChanged(newUnit) {
    this.setState({ rUnit: newUnit });
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
            Radius Of A Moving Charge In A Magnetic Field
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
            r = (m * v) / (q * B)
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
            quantityName={"Mass of the particle"}
            quantitySymbol={"m"}
            textInputValue={this.state.m}
            onTextInputChangeText={(newText) => this.mValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.mUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.mUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Velocity of the particle"}
            quantitySymbol={"v"}
            textInputValue={this.state.v}
            onTextInputChangeText={(newText) => this.vValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.vUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.vUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Charge on the particle"}
            quantitySymbol={"q"}
            textInputValue={this.state.q}
            onTextInputChangeText={(newText) => this.qValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.qUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.qUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Magnitude of the magnetic field"}
            quantitySymbol={"B"}
            textInputValue={this.state.B}
            onTextInputChangeText={(newText) => this.bValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.bUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.bUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <Scaler_Input_With_Units
            quantityName={"Radius of revolution of the particle"}
            quantitySymbol={"r"}
            textInputValue={this.state.r}
            onTextInputChangeText={(newText) => this.rValueChanged(newText)}
            unitsPickerSelectedUnit={this.state.rUnit}
            onUnitsPickerUnitsChange={(newUnit) => this.rUnitChanged(newUnit)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_RadiusOfRevolutionInMagneticField.bind(
              this
            )}
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
