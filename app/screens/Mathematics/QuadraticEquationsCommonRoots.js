import React, { Component } from "react";
import { Text, View, ToastAndroid, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import MultilineTextDisplayer from "../../subScreenComponents/MultilineTextDisplayer";
import Scaler_Unitless_Input from "../../subScreenComponents/Scaler_Unitless_Input";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import { Calculate_QuadraticEquationsCommonRoots_From_A1_B1_C1_A2_B2_C2 } from "../../calculators/Mathematics/QuadraticEquationsCommonRoots";

//Helpers
import { Format_Numeric_Input_Value } from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class QuadraticEquationsCommonRoots extends Component {
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
    a1: "",
    b1: "",
    c1: "",
    a2: "",
    b2: "",
    c2: "",
    NumberOfRootsInCommon: "",
    CommonRoot1: "",
    CommonRoot2: "",
    Equation1UncommonRoot1: "",
    Equation1UncommonRoot2: "",
    Equation2UncommonRoot1: "",
    Equation2UncommonRoot2: "",
    Steps: "",
  };

  Calculate_QuadraticEquationsCommonRoots() {
    if (
      this.state.a1 != "" &&
      this.state.b1 != "" &&
      this.state.c1 != "" &&
      this.state.a2 != "" &&
      this.state.b2 != "" &&
      this.state.c2 != ""
    ) {
      this.onNewClick();
      var Result = Calculate_QuadraticEquationsCommonRoots_From_A1_B1_C1_A2_B2_C2(
        parseFloat(this.state.a1),
        parseFloat(this.state.b1),
        parseFloat(this.state.c1),
        parseFloat(this.state.a2),
        parseFloat(this.state.b2),
        parseFloat(this.state.c2),
        200
      );
      ToastAndroid.show("The values have been calculated.", ToastAndroid.LONG);

      this.setState({ NumberOfRootsInCommon: Result[0] });
      this.setState({ CommonRoot1: Result[1] });
      this.setState({ CommonRoot2: Result[2] });
      this.setState({ Equation1UncommonRoot1: Result[3] });
      this.setState({ Equation1UncommonRoot2: Result[4] });
      this.setState({ Equation2UncommonRoot1: Result[5] });
      this.setState({ Equation2UncommonRoot2: Result[6] });
      this.setState({ Steps: Result[7] });
    }
  }

  a1ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState(
        { a1: x[1].toString() },
        this.Calculate_QuadraticEquationsCommonRoots
      );
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  b1ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState(
        { b1: x[1].toString() },
        this.Calculate_QuadraticEquationsCommonRoots
      );
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  c1ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState(
        { c1: x[1].toString() },
        this.Calculate_QuadraticEquationsCommonRoots
      );
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  a2ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState(
        { a2: x[1].toString() },
        this.Calculate_QuadraticEquationsCommonRoots
      );
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  b2ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState(
        { b2: x[1].toString() },
        this.Calculate_QuadraticEquationsCommonRoots
      );
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  c2ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState(
        { c2: x[1].toString() },
        this.Calculate_QuadraticEquationsCommonRoots
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
            Quadratic equations common roots
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
              this.styles[1].headingText,
            ]}
          >
            Equation 1:{"\n"}a₁x² + b₁x + c₁ = 0
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
            Equation 2:{"\n"}a₂x² + b₂x + c₂ = 0
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
            textToDisplay="a₁ = "
            theme={this.state.theme}
            textInputValue={this.state.a1}
            onTextInputChangeText={(newText) => this.a1ValueChanged(newText)}
          />

          <Scaler_Unitless_Input
            textToDisplay="b₁ = "
            theme={this.state.theme}
            textInputValue={this.state.b1}
            onTextInputChangeText={(newText) => this.b1ValueChanged(newText)}
          />

          <Scaler_Unitless_Input
            textToDisplay="c₁ = "
            theme={this.state.theme}
            textInputValue={this.state.c1}
            onTextInputChangeText={(newText) => this.c1ValueChanged(newText)}
          />

          <Scaler_Unitless_Input
            textToDisplay="a₂ = "
            theme={this.state.theme}
            textInputValue={this.state.a2}
            onTextInputChangeText={(newText) => this.a2ValueChanged(newText)}
          />

          <Scaler_Unitless_Input
            textToDisplay="b₂ = "
            theme={this.state.theme}
            textInputValue={this.state.b2}
            onTextInputChangeText={(newText) => this.b2ValueChanged(newText)}
          />

          <Scaler_Unitless_Input
            textToDisplay="c₂ = "
            theme={this.state.theme}
            textInputValue={this.state.c2}
            onTextInputChangeText={(newText) => this.c2ValueChanged(newText)}
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

          <MultilineTextDisplayer
            line1TextToDisplay={"Number of roots in common = "}
            line2TextToDisplay={this.state.NumberOfRootsInCommon}
            theme={this.state.theme}
          />

          <MultilineTextDisplayer
            line1TextToDisplay={"Common root 1 = "}
            line2TextToDisplay={this.state.CommonRoot1}
            theme={this.state.theme}
          />

          <MultilineTextDisplayer
            line1TextToDisplay={"Common root 2 = "}
            line2TextToDisplay={this.state.CommonRoot2}
            theme={this.state.theme}
          />

          <MultilineTextDisplayer
            line1TextToDisplay={"Equation 1 uncommon root 1 = "}
            line2TextToDisplay={this.state.Equation1UncommonRoot1}
            theme={this.state.theme}
          />

          <MultilineTextDisplayer
            line1TextToDisplay={"Equation 1 uncommon root 2 = "}
            line2TextToDisplay={this.state.Equation1UncommonRoot2}
            theme={this.state.theme}
          />

          <MultilineTextDisplayer
            line1TextToDisplay={"Equation 2 uncommon root 1 = "}
            line2TextToDisplay={this.state.Equation2UncommonRoot1}
            theme={this.state.theme}
          />

          <MultilineTextDisplayer
            line1TextToDisplay={"Equation 2 uncommon root 2 = "}
            line2TextToDisplay={this.state.Equation2UncommonRoot2}
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
