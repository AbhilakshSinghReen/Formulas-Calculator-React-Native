import React, { Component } from "react";
import { Button, Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import Scaler_Unitless_Input from "../../subScreenComponents/Scaler_Unitless_Input";
import ScreenButton from "../../subScreenComponents/ScreenButton";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import {
  TnOfAP__Calculate_TnOfAP_From_FirstTerm_CommonDifference_n,
  TnOfAP__Calculate_FirstTerm_From_CommonDifference_n_TnOfAP,
  TnOfAP__Calculate_CommonDifference_From_FirstTerm_n_TnOfAP,
  TnOfAP__Calculate_n_From_FirstTerm_CommonDifference_TnOfAP,
} from "../../calculators/Mathematics/TnOfAP";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsPositive,
  IsInteger,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class TnOfAP extends Component {
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

  state = {
    theme: "",
    a: "",
    d: "",
    n: "",
    Tn: "",
    Steps: "",
  };

  Calculate_TnOfAP() {
    if (this.state.a != "" && this.state.d != "" && this.state.n != "") {
      this.onNewClick();
      var Result = TnOfAP__Calculate_TnOfAP_From_FirstTerm_CommonDifference_n(
        this.state.a,
        this.state.d,
        this.state.n
      );
      ToastAndroid.show("'Tₙ' has been calculated.", ToastAndroid.LONG);
      this.setState({ Tn: Result[0] });
      this.setState({ Steps: Result[1] });
    } else if (
      this.state.d != "" &&
      this.state.n != "" &&
      this.state.Tn != ""
    ) {
      this.onNewClick();
      var Result = TnOfAP__Calculate_FirstTerm_From_CommonDifference_n_TnOfAP(
        this.state.d,
        this.state.n,
        this.state.Tn
      );
      ToastAndroid.show("'a' has been calculated.", ToastAndroid.LONG);
      this.setState({ a: Result[0] });
      this.setState({ Steps: Result[1] });
    } else if (
      this.state.a != "" &&
      this.state.n != "" &&
      this.state.Tn != ""
    ) {
      this.onNewClick();
      var Result = TnOfAP__Calculate_CommonDifference_From_FirstTerm_n_TnOfAP(
        this.state.a,
        this.state.n,
        this.state.Tn
      );
      ToastAndroid.show("'d' has been calculated.", ToastAndroid.LONG);
      this.setState({ d: Result[0] });
      this.setState({ Steps: Result[1] });
    } else if (
      this.state.a != "" &&
      this.state.d != "" &&
      this.state.Tn != ""
    ) {
      this.onNewClick();
      var Result = TnOfAP__Calculate_n_From_FirstTerm_CommonDifference_TnOfAP(
        this.state.a,
        this.state.d,
        this.state.Tn
      );

      if (parseInt(Result[0]) == parseFloat(Result[0])) {
        if (Result[0] > 0) {
          ToastAndroid.show("'n' has been calculated.", ToastAndroid.LONG);
        } else if (Result[0] < 0) {
          ToastAndroid.show(
            "'n' has been calculated. 'n' came out negative, are you sure you got the inputs correct?",
            ToastAndroid.LONG
          );
        } else if (Result[0] == 0) {
          ToastAndroid.show(
            "'n' has been calculated. 'n' came out to be '0', are you sure you got the inputs correct?",
            ToastAndroid.LONG
          );
        }
      } else {
        ToastAndroid.show(
          "'n' has been calculated. 'n' came out to be a floating point number, are you sure you got the inputs correct?",
          ToastAndroid.LONG
        );
      }

      this.setState({ n: Result[0] });
      this.setState({ Steps: Result[1] });
    } else {
      ToastAndroid.show(
        "Atleast 3 values are required to calculate the fourth one!",
        ToastAndroid.LONG
      );
    }
  }

  aValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ a: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  dValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ d: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  nValueChanged(newValue) {
    var y = IsInteger(newValue);
    if (!y[0]) {
      newValue = y[1];
    }

    if (!IsPositive(newValue)) {
      newValue = parseInt(newValue) * -1;
    }

    newValue = newValue.toString();
    var x = Format_Numeric_Input_Value(newValue);
    //FORMAT: IsValidNumber, OutputValue, IsEmpty, IsNegative, IsInteger

    if (x[2]) {
      this.setState({ n: x[1].toString() });
    } else if (x[0]) {
      if (x[3] || !x[4]) {
        ToastAndroid.show("n must be a positive integer.", ToastAndroid.LONG);
      } else {
        if (parseInt(x[1]) != 0) {
          this.setState({ n: x[1].toString() });
        } else {
          this.setState({ n: "1" });
          ToastAndroid.show("n must be a positive integer.", ToastAndroid.LONG);
        }
      }
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  tnValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Tn: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  render() {
    //console.log(this.navigation.getParam(log));
    return (
      <View
        style={[this.styles[0].backgroundView, this.styles[1].backgroundView]}
      >
        <View style={[this.styles[0].headingView, this.styles[1].headingView]}>
          <Text
            style={[this.styles[0].headingText, this.styles[1].headingText]}
          >
            Tₙ of A.P.
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
            Tₙ = a + (n - 1) * d
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
          <Scaler_Unitless_Input
            textToDisplay="a = "
            textInputValue={this.state.a}
            onTextInputChangeText={(newText) => this.aValueChanged(newText)}
            theme={this.state.theme}
          />
          <Scaler_Unitless_Input
            textToDisplay="d = "
            textInputValue={this.state.d}
            onTextInputChangeText={(newText) => this.dValueChanged(newText)}
            theme={this.state.theme}
          />
          <Scaler_Unitless_Input
            textToDisplay="n = "
            textInputValue={this.state.n}
            onTextInputChangeText={(newText) => this.nValueChanged(newText)}
            theme={this.state.theme}
          />
          <Scaler_Unitless_Input
            textToDisplay="Tₙ = "
            textInputValue={this.state.Tn}
            onTextInputChangeText={(newText) => this.tnValueChanged(newText)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_TnOfAP.bind(this)}
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
