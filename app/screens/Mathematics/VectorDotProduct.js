import React, { Component } from "react";
import { Button, Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import Scaler_Unitless_Input from "../../subScreenComponents/Scaler_Unitless_Input";
import Vector_Unitless_Input from "../../subScreenComponents/Vector_Unitless_Input";
import ScreenButton from "../../subScreenComponents/ScreenButton";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";

//Calculators
import {
  Calculate_x_From_Vectors,
  Calculate_xComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_yComponentOfVector_zComponentOfVector,
  Calculate_yComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_xComponentOfVector_zComponentOfVector,
  Calculate_zComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_xComponentOfVector_yComponentOfVector,
} from "../../calculators/Mathematics/VectorDotProduct";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsPositive,
  IsInteger,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class VectorDotProduct extends Component {
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
    x: "",
    Ax: "",
    Ay: "",
    Az: "",
    Bx: "",
    By: "",
    Bz: "",
    Steps: "",
  };

  Calculate_VectorDotProduct() {
    if (this.state.x != "") {
      if (
        this.state.Ay != "" &&
        this.state.Az != "" &&
        this.state.By != "" &&
        this.state.Bz != ""
      ) {
        if (this.state.Ax != "") {
          var Result = Calculate_xComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_yComponentOfVector_zComponentOfVector(
            this.state.x,
            this.state.Ax,
            this.state.Ay,
            this.state.Az,
            this.state.By,
            this.state.Bz,
            2
          );
          this.setState({ Bx: Result[0].toString() });
          this.setState({ Steps: Result[1] });
          ToastAndroid.show("'Bx' has been calculated.", ToastAndroid.LONG);
        } else if (this.state.Bx != "") {
          var Result = Calculate_xComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_yComponentOfVector_zComponentOfVector(
            this.state.x,
            this.state.Bx,
            this.state.By,
            this.state.Bz,
            this.state.Ay,
            this.state.Az,
            1
          );
          this.setState({ Ax: Result[0].toString() });
          this.setState({ Steps: Result[1] });
          ToastAndroid.show("'Ax' has been calculated.", ToastAndroid.LONG);
        } else {
          ToastAndroid.show(
            "More than one entries are empty! To calculate you can have only one empty.",
            ToastAndroid.LONG
          );
        }
      } else if (
        this.state.Ax != "" &&
        this.state.Bx != "" &&
        this.state.Az != "" &&
        this.state.Bz != ""
      ) {
        if (this.state.Ay != "") {
          var Result = Calculate_yComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_xComponentOfVector_zComponentOfVector(
            this.state.x,
            this.state.Ax,
            this.state.Ay,
            this.state.Az,
            this.state.Bx,
            this.state.Bz,
            2
          );
          this.setState({ By: Result[0].toString() });
          this.setState({ Steps: Result[1] });
          ToastAndroid.show("'By' has been calculated.", ToastAndroid.LONG);
        } else if (this.state.By != "") {
          var Result = Calculate_yComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_xComponentOfVector_zComponentOfVector(
            this.state.x,
            this.state.Bx,
            this.state.By,
            this.state.Bz,
            this.state.Ax,
            this.state.Az,
            1
          );
          this.setState({ Ay: Result[0].toString() });
          this.setState({ Steps: Result[1] });
          ToastAndroid.show("'Ay' has been calculated.", ToastAndroid.LONG);
        } else {
          ToastAndroid.show(
            "More than one entries are empty! To calculate you can have only one empty.",
            ToastAndroid.LONG
          );
        }
      } else if (
        this.state.Ax != "" &&
        this.state.Bx != "" &&
        this.state.Ay != "" &&
        this.state.By != ""
      ) {
        if (this.state.Az != "") {
          var Result = Calculate_zComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_xComponentOfVector_yComponentOfVector(
            this.state.x,
            this.state.Ax,
            this.state.Ay,
            this.state.Az,
            this.state.Bx,
            this.state.By,
            2
          );
          this.setState({ Bz: Result[0].toString() });
          this.setState({ Steps: Result[1] });
          ToastAndroid.show("'Bz' has been calculated.", ToastAndroid.LONG);
        } else if (this.state.Bz != "") {
          var Result = Calculate_zComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_xComponentOfVector_yComponentOfVector(
            this.state.x,
            this.state.Bx,
            this.state.By,
            this.state.Bz,
            this.state.Ax,
            this.state.Ay,
            1
          );
          this.setState({ Az: Result[0].toString() });
          this.setState({ Steps: Result[1] });
          ToastAndroid.show("'Az' has been calculated.", ToastAndroid.LONG);
        } else {
          ToastAndroid.show(
            "More than one entries are empty! To calculate you can have only one empty.",
            ToastAndroid.LONG
          );
        }
      } else {
        ToastAndroid.show(
          "More than one entries are empty! To calculate you can have only one empty.",
          ToastAndroid.LONG
        );
      }
    } else if (
      this.state.Ax != "" &&
      this.state.Ay != "" &&
      this.state.Az != "" &&
      this.state.Bx != "" &&
      this.state.By != "" &&
      this.state.Bz != ""
    ) {
      var Result = Calculate_x_From_Vectors(
        this.state.Ax,
        this.state.Ay,
        this.state.Az,
        this.state.Bx,
        this.state.By,
        this.state.Bz
      );
      this.setState({ x: Result[0].toString() });
      this.setState({ Steps: Result[1] });
      ToastAndroid.show("'x' has been calculated.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "More than one entries are empty! To calculate you can have only one empty.",
        ToastAndroid.LONG
      );
    }
  }

  xValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ x: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  AxValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Ax: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  AyValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Ay: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  AzValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Az: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  BxValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Bx: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  ByValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ By: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  BzValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Bz: x[1].toString() });
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
            Vector Dot Product
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
            <Text>x = </Text>
            <Text style={{ fontWeight: "bold" }}>A</Text>
            <Text>.</Text>
            <Text style={{ fontWeight: "bold" }}>B</Text>
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
            textToDisplay="x ="
            textInputValue={this.state.x}
            onTextInputChangeText={(newText) => this.xValueChanged(newText)}
            theme={this.state.theme}
          />

          <Vector_Unitless_Input
            quantityName={"First vector"}
            quantitySymbol={"A"}
            xTextInputValue={this.state.Ax}
            onXTextInputChangeText={(newText) => this.AxValueChanged(newText)}
            yTextInputValue={this.state.Ay}
            onYTextInputChangeText={(newText) => this.AyValueChanged(newText)}
            zTextInputValue={this.state.Az}
            onZTextInputChangeText={(newText) => this.AzValueChanged(newText)}
            theme={this.state.theme}
          />

          <Vector_Unitless_Input
            quantityName={"Second vector"}
            quantitySymbol={"B"}
            xTextInputValue={this.state.Bx}
            onXTextInputChangeText={(newText) => this.BxValueChanged(newText)}
            yTextInputValue={this.state.By}
            onYTextInputChangeText={(newText) => this.ByValueChanged(newText)}
            zTextInputValue={this.state.Bz}
            onZTextInputChangeText={(newText) => this.BzValueChanged(newText)}
            theme={this.state.theme}
          />

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_VectorDotProduct.bind(this)}
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
