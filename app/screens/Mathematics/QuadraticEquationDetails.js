import React, { Component } from "react";
import { Button, Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import TextDisplayer from "../../subScreenComponents/TextDisplayer";
import Scaler_Unitless_Input from "../../subScreenComponents/Scaler_Unitless_Input";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import { Calculate_QuadraticEquationDetails_From_A_B_C } from "../../calculators/Mathematics/QuadraticEquationDetails";

//Helpers
import { Format_Numeric_Input_Value } from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class QuadraticEquationDetailsScreen extends Component {
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
    A: "",
    B: "",
    C: "",
    FirstRoot: "",
    SecondRoot: "",
    SumOfRoots: "",
    ProductOfRoots: "",
    DifferenceOfRoots: "",
    Minima: "",
    Maxima: "",
    Steps: "",
  };

  Calculate_QuadraticEquationDetails() {
    if (this.state.A != "" && this.state.B != "" && this.state.C != "") {
      this.onNewClick();
      var Result = Calculate_QuadraticEquationDetails_From_A_B_C(
        parseFloat(this.state.A),
        parseFloat(this.state.B),
        parseFloat(this.state.C),
        200
      );
      ToastAndroid.show("The values have been calculated.", ToastAndroid.LONG);

      this.setState({ FirstRoot: Result[0] });
      this.setState({ SecondRoot: Result[1] });
      this.setState({ SumOfRoots: Result[2] });
      this.setState({ ProductOfRoots: Result[3] });
      this.setState({ DifferenceOfRoots: Result[4] });
      this.setState({ Minima: Result[5] });
      this.setState({ Maxima: Result[6] });
      this.setState({ Steps: Result[7] });
    }
  }

  aValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState(
        { A: x[1].toString() },
        this.Calculate_QuadraticEquationDetails
      );
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
      this.setState(
        { B: x[1].toString() },
        this.Calculate_QuadraticEquationDetails
      );
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  cValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState(
        { C: x[1].toString() },
        this.Calculate_QuadraticEquationDetails
      );
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
            Quadratic equation details
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
            ax² + bx + c = 0
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
            textInputValue={this.state.A}
            onTextInputChangeText={(newText) => this.aValueChanged(newText)}
            theme={this.state.theme}
          />
          <Scaler_Unitless_Input
            textToDisplay="b = "
            textInputValue={this.state.B}
            onTextInputChangeText={(newText) => this.bValueChanged(newText)}
            theme={this.state.theme}
          />
          <Scaler_Unitless_Input
            textToDisplay="c = "
            textInputValue={this.state.C}
            onTextInputChangeText={(newText) => this.cValueChanged(newText)}
            theme={this.state.theme}
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

          <TextDisplayer
            textToDisplay={"First root = " + this.state.FirstRoot}
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={"Second root = " + this.state.SecondRoot}
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={"Sum of roots = " + this.state.SumOfRoots}
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={"Product of roots = " + this.state.ProductOfRoots}
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={
              "Difference of roots = " + this.state.DifferenceOfRoots
            }
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={"Minima = " + this.state.Minima}
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={"Maxima = " + this.state.Maxima}
            theme={this.state.theme}
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
