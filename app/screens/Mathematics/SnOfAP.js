import React, { Component } from "react";
import { Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import Scaler_Unitless_Input from "../../subScreenComponents/Scaler_Unitless_Input";
import ScreenButton from "../../subScreenComponents/ScreenButton";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import {
  SnOfAP__Calculate_SnOfAP_From_FirstTerm_n_TnOfAP,
  SnOfAP__Calculate_FirstTerm_From_n_TnOfAP_SnOfAP,
  SnOfAP__Calculate_n_From_FirstTerm_TnOfAP_SnOfAP,
  SnOfAP__Calculate_SnOfAP_From_FirstTerm_n_CommonDifference,
  SnOfAP__Calculate_FirstTerm_From_n_CommonDifference_SnOfAP,
  SnOfAP__Calculate_n_From_FirstTerm_CommonDifference_SnOfAP,
  SnOfAP__Calculate_CommonDifference_Tn_From_FirstTerm_n_SnOfAP,
} from "../../calculators/Mathematics/SnOfAP";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsPositive,
  IsInteger,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class SnOfAP extends Component {
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
    n: "",
    d: "",
    Tn: "",
    Sn: "",
    Steps: "",
  };

  Calculate_SnOfAP() {
    //console.log(this.state);
    if (this.state.d != "") {
      if (this.state.a != "" && this.state.n != "") {
        this.onNewClick();
        var Result = SnOfAP__Calculate_SnOfAP_From_FirstTerm_n_CommonDifference(
          this.state.a,
          this.state.n,
          this.state.d
        );
        ToastAndroid.show(
          "'Sₙ' and 'Tₙ' have been calculated.",
          ToastAndroid.LONG
        );
        this.setState({ Sn: Result[0] });
        this.setState({ Tn: Result[1] });
        this.setState({ Steps: Result[2] });
      } else if (this.state.n != "" && this.state.Sn != "") {
        this.onNewClick();
        var Result = SnOfAP__Calculate_FirstTerm_From_n_CommonDifference_SnOfAP(
          this.state.n,
          this.state.d,
          this.state.Sn
        );
        ToastAndroid.show(
          "'a' and 'Tₙ' have been calculated.",
          ToastAndroid.LONG
        );
        this.setState({ a: Result[0] });
        this.setState({ Tn: Result[1] });
        this.setState({ Steps: Result[2] });
      } else if (this.state.a != "" && this.state.Sn != "") {
        this.onNewClick();
        var Result = SnOfAP__Calculate_n_From_FirstTerm_CommonDifference_SnOfAP(
          this.state.a,
          this.state.d,
          this.state.Sn
        );

        if (parseInt(Result[0]) == parseFloat(Result[0])) {
          if (Result[0] > 0) {
            ToastAndroid.show(
              "'n' and 'Tₙ' have been calculated.",
              ToastAndroid.LONG
            );
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
        this.setState({ Tn: Result[1] });
        this.setState({ Steps: Result[2] });
      }
    } else if (this.state.Tn != "") {
      if (this.state.a != "" && this.state.n != "") {
        this.onNewClick();
        var Result = SnOfAP__Calculate_SnOfAP_From_FirstTerm_n_TnOfAP(
          this.state.a,
          this.state.n,
          this.state.Tn
        );
        ToastAndroid.show(
          "'Sₙ' and 'd' have been calculated.",
          ToastAndroid.LONG
        );
        this.setState({ Sn: Result[0] });
        this.setState({ d: Result[1] });
        this.setState({ Steps: Result[2] });
      } else if (this.state.n != "" && this.state.Sn != "") {
        this.onNewClick();
        var Result = SnOfAP__Calculate_FirstTerm_From_n_TnOfAP_SnOfAP(
          this.state.n,
          this.state.Tn,
          this.state.Sn
        );
        ToastAndroid.show(
          "'a' and 'd' have been calculated.",
          ToastAndroid.LONG
        );
        this.setState({ a: Result[0] });
        this.setState({ d: Result[1] });
        this.setState({ Steps: Result[2] });
      } else if (this.state.a != "" && this.state.Sn != "") {
        this.onNewClick();
        var Result = SnOfAP__Calculate_n_From_FirstTerm_TnOfAP_SnOfAP(
          this.state.a,
          this.state.Tn,
          this.state.Sn
        );

        if (parseInt(Result[0]) == parseFloat(Result[0])) {
          if (Result[0] > 0) {
            ToastAndroid.show(
              "'n' and 'd' have been calculated.",
              ToastAndroid.LONG
            );
          } else if (Result[0] < 0) {
            ToastAndroid.show(
              "'n' and 'd' have been calculated. 'n' came out negative, are you sure you got the inputs correct?",
              ToastAndroid.LONG
            );
          } else if (Result[0] == 0) {
            ToastAndroid.show(
              "'n' and 'd' have been calculated. 'n' came out to be '0', are you sure you got the inputs correct?",
              ToastAndroid.LONG
            );
          }
        } else {
          ToastAndroid.show(
            "'n' and 'd' have been calculated. 'n' came out to be a floating point number, are you sure you got the inputs correct?",
            ToastAndroid.LONG
          );
        }

        this.setState({ n: Result[0] });
        this.setState({ d: Result[1] });
        this.setState({ Steps: Result[2] });
      }
    } else if (
      this.state.a != "" &&
      this.state.n != "" &&
      this.state.Sn != ""
    ) {
      this.onNewClick();
      var Result = SnOfAP__Calculate_CommonDifference_Tn_From_FirstTerm_n_SnOfAP(
        this.state.a,
        this.state.n,
        this.state.Sn
      );
      ToastAndroid.show(
        "'d' and 'Tₙ' have been calculated.",
        ToastAndroid.LONG
      );
      this.setState({ d: Result[0] });
      this.setState({ Tn: Result[1] });
      this.setState({ Steps: Result[2] });
    } else {
      ToastAndroid.show(
        "Atleast 3 values, including only one of 'd' or 'Tₙ', are required to perform the calculations!",
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
  snValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Sn: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
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
            Sₙ of A.P.
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
            Sₙ = (n / 2)(2 * a + (n-1) * d){"\n"}Or{"\n"}Sₙ = (n / 2)(a + Tₙ)
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
            textToDisplay="n = "
            textInputValue={this.state.n}
            onTextInputChangeText={(newText) => this.nValueChanged(newText)}
            theme={this.state.theme}
          />

          <View
            style={[
              this.styles[0].inputContainer1,
              this.styles[1].inputContainer1,
            ]}
          >
            <Text style={[this.styles[0].textH3, this.styles[1].textH3]}>
              Only one value, either 'd' or 'Tₙ' is required for the
              calculation.
            </Text>
            <Scaler_Unitless_Input
              textToDisplay="d = "
              textInputValue={this.state.d}
              onTextInputChangeText={(newText) => this.dValueChanged(newText)}
              theme={this.state.theme}
            />
            <Scaler_Unitless_Input
              textToDisplay="Tₙ = "
              textInputValue={this.state.Tn}
              onTextInputChangeText={(newText) => this.tnValueChanged(newText)}
              theme={this.state.theme}
            />
          </View>
          <Scaler_Unitless_Input
            textToDisplay="Sₙ = "
            textInputValue={this.state.Sn}
            onTextInputChangeText={(newText) => this.snValueChanged(newText)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_SnOfAP.bind(this)}
            theme={this.props.route.params.theme}
          />

          <Text style={[this.styles[0].textH5, this.styles[1].textH5]}>
            The entire series can be seen in the steps.
          </Text>

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
