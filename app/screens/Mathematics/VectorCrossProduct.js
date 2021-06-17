import React, { Component } from "react";
import { Button, Text, View, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

//Sub-screen components
import Vector_Unitless_Input_Container from "../../subScreenComponents/Vector_Unitless_Input_Container";
import Vector_Unitless_Input from "../../subScreenComponents/Vector_Unitless_Input";
import ScreenButton from "../../subScreenComponents/ScreenButton";
import ShowStepsButton from "../../subScreenComponents/ShowStepsButton";
import SmallPlusButton from "../../subScreenComponents/SmallPlusButton";

//Calculators
import { Calculate_X_From_Vectors } from "../../calculators/Mathematics/VectorCrossProduct";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsPositive,
  IsInteger,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class VectorCrossProduct extends Component {
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
    vectors: [
      ["", "", ""],
      ["", "", ""],
    ],
    Xx: "",
    Xy: "",
    Xz: "",
    Steps: "",
  };

  CountEmptyValues() {
    var count = 0;
    if (this.state.Xx == "" || this.state.Xy == "" || this.state.Xz == "") {
      count += 1;
    }
    this.state.vectors.forEach((element) => {
      if (element[0] == "" || element[1] == "" || element[2] == "") {
        count += 1;
      }
    });
    return count;
  }

  Calculate_VectorCrossProduct() {
    if (this.CountEmptyValues() > 1) {
      ToastAndroid.show(
        "One or more entries other than X are empty. In this formula, you can only calculate X.",
        ToastAndroid.LONG
      );
    } else {
      var X = Calculate_X_From_Vectors(this.state.vectors);
      this.setState({ Xx: X[0][0].toString() });
      this.setState({ Xy: X[0][1].toString() });
      this.setState({ Xz: X[0][2].toString() });
      this.setState({ Steps: X[1] });
      ToastAndroid.show("'X' has been calculated.", ToastAndroid.LONG);
    }
  }

  addNewVector() {
    var newVectors = this.state.vectors;
    newVectors.push(["", "", ""]);
    this.setState({ vectors: newVectors });
  }

  removeVector(vectorNumber) {
    var newVectors = [];
    for (let index = 0; index < this.state.vectors.length; index++) {
      if (index != vectorNumber) {
        newVectors.push(this.state.vectors[index]);
      }
    }
    this.setState({ vectors: newVectors });
  }

  vectorComponentChanged(vectorNumber, vectorComponent, newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      var newVectors = this.state.vectors;

      if (vectorComponent == "x") {
        newVectors[vectorNumber][0] = x[1].toString();
      } else if (vectorComponent == "y") {
        newVectors[vectorNumber][1] = x[1].toString();
      } else if (vectorComponent == "z") {
        newVectors[vectorNumber][2] = x[1].toString();
      }

      this.setState({ vectors: newVectors });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  XxValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Xx: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  XyValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Xy: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  XzValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Xz: x[1].toString() });
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
            Vector Cross Product
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
            <Text style={{ fontWeight: "bold" }}>X</Text>
            <Text> = </Text>
            <Text style={{ fontWeight: "bold" }}>x1</Text>
            <Text> x </Text>
            <Text style={{ fontWeight: "bold" }}>x2</Text>
            <Text>...</Text>
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
          <Vector_Unitless_Input
            quantityName={""}
            quantitySymbol={"X"}
            xTextInputValue={this.state.Xx}
            onXTextInputChangeText={(newText) => this.XxValueChanged(newText)}
            yTextInputValue={this.state.Xy}
            onYTextInputChangeText={(newText) => this.XyValueChanged(newText)}
            zTextInputValue={this.state.Xz}
            onZTextInputChangeText={(newText) => this.XzValueChanged(newText)}
            theme={this.state.theme}
          />

          {this.state.vectors.map((aVector) => (
            <Vector_Unitless_Input_Container
              key={this.state.vectors.indexOf(aVector)}
              quantityName={""}
              quantitySymbol={
                "x" + `${this.state.vectors.indexOf(aVector) + 1}`
              }
              xTextInputValue={this.state.vectors[
                this.state.vectors.indexOf(aVector)
              ][0].toString()}
              onXTextInputChangeText={(newText) =>
                this.vectorComponentChanged(
                  this.state.vectors.indexOf(aVector),
                  "x",
                  newText
                )
              }
              yTextInputValue={this.state.vectors[
                this.state.vectors.indexOf(aVector)
              ][1].toString()}
              onYTextInputChangeText={(newText) =>
                this.vectorComponentChanged(
                  this.state.vectors.indexOf(aVector),
                  "y",
                  newText
                )
              }
              zTextInputValue={this.state.vectors[
                this.state.vectors.indexOf(aVector)
              ][2].toString()}
              onZTextInputChangeText={(newText) =>
                this.vectorComponentChanged(
                  this.state.vectors.indexOf(aVector),
                  "z",
                  newText
                )
              }
              theme={this.state.theme}
              onCrossButton={this.removeVector.bind(
                this,
                this.state.vectors.indexOf(aVector)
              )}
            />
          ))}

          <SmallPlusButton
            theme={this.state.theme}
            buttonOnPress={this.addNewVector.bind(this)}
          />
          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_VectorCrossProduct.bind(this)}
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
