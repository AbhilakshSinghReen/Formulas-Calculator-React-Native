import React, { Component } from "react";
import { Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import TextDisplayer from "../../subScreenComponents/TextDisplayer";
import Scaler_Unitless_Input from "../../subScreenComponents/Scaler_Unitless_Input";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import { Calculate__GpDetails__From__FirstTerm_CommonRatio_n } from "../../calculators/Mathematics/GpDetails";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsPositive,
  IsInteger,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class GPDetailsScreen extends Component {
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
    r: "",
    n: "",
    Tn: "",
    Sn: "",
    Sinf: "",
    GM: "",
    Steps: "",
  };

  Calculate_GpDetails() {
    if (this.state.a != "" && this.state.r != "" && this.state.n != "") {
      this.onNewClick();
      //Return Value: Tn,Sn,Sinf,GM,Steps
      var Result = Calculate__GpDetails__From__FirstTerm_CommonRatio_n(
        this.state.a,
        this.state.r,
        this.state.n
      );

      console.log(`Calculated: ${Result}`);

      ToastAndroid.show("The values have been calculated.", ToastAndroid.LONG);

      this.setState({ Tn: Result[0] });
      this.setState({ Sn: Result[1] });
      this.setState({ Sinf: Result[2] });
      this.setState({ GM: Result[3] });
      this.setState({ Steps: Result[4] });
    }
  }

  aValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ a: x[1].toString() }, this.Calculate_GpDetails);
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
      this.setState({ r: x[1].toString() }, this.Calculate_GpDetails);
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
      this.setState({ n: x[1].toString() }, this.Calculate_GpDetails);
    } else if (x[0]) {
      if (x[3] || !x[4]) {
        ToastAndroid.show("n must be a positive integer.", ToastAndroid.LONG);
      } else {
        if (parseInt(x[1]) != 0) {
          this.setState({ n: x[1].toString() }, this.Calculate_GpDetails);
        } else {
          this.setState({ n: "1" }, this.Calculate_GpDetails);
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

  render() {
    return (
      <View
        style={[this.styles[0].backgroundView, this.styles[1].backgroundView]}
      >
        <View style={[this.styles[0].headingView, this.styles[1].headingView]}>
          <Text
            style={[this.styles[0].headingText, this.styles[1].headingText]}
          >
            G.P. Details
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
            textToDisplay="r = "
            textInputValue={this.state.r}
            onTextInputChangeText={(newText) => this.rValueChanged(newText)}
            theme={this.state.theme}
          />
          <Scaler_Unitless_Input
            textToDisplay="n = "
            textInputValue={this.state.n}
            onTextInputChangeText={(newText) => this.nValueChanged(newText)}
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
            textToDisplay={"Tₙ = " + this.state.Tn}
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={"Sₙ = " + this.state.Sn}
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={"S(∞) = " + this.state.Sinf}
            theme={this.state.theme}
          />
          <TextDisplayer
            textToDisplay={"Geometric mean = " + this.state.GM}
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
