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
  Calculate_Magnitude_UnitVector_Angles_DirectionCosines_From_Vector,
  Calculate_Angle_DirectionCosine_From_UnitVectorComponent,
  Calculate_UnitVectorComponent_DirectionCosine_From_Angle,
  Calculate_UnitVectorComponent_Angle_From_DirectionCosine,
  Calculate_Vector_From_UnitVector_Magnitude,
} from "../../calculators/Mathematics/VectorDetails3D";

//Helpers
import {
  Format_Numeric_Input_Value,
  IsPositive,
  IsInteger,
} from "../../helpers/Helpers";
import { AdMobConfig } from "../../helpers/AdMobHandler";

//Details
import { GetFormulaScreenStylesFromTheme } from "../Details/StylesAndColors";

export default class VectorDetails3D extends Component {
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
    Xx: "",
    Xy: "",
    Xz: "",
    magnitude: "",
    Ux: "",
    Uy: "",
    Uz: "",
    A: "",
    B: "",
    C: "",
    cosA: "",
    cosB: "",
    cosC: "",
    Steps: "",
  };

  Calculate_VectorDetails() {
    if (this.state.Xx != "" && this.state.Xy != "" && this.state.Xz != "") {
      this.onNewClick();
      var Result = Calculate_Magnitude_UnitVector_Angles_DirectionCosines_From_Vector(
        this.state.Xx,
        this.state.Xy,
        this.state.Xz
      );
      ToastAndroid.show(
        "|X|, U, α, β, γ, cos(α), cos(β), cos(γ) have been calculated.",
        ToastAndroid.LONG
      );
      this.setState({ magnitude: Result[0][0].toString() });
      this.setState({ Ux: Result[0][1][0].toString() });
      this.setState({ Uy: Result[0][1][1].toString() });
      this.setState({ Uz: Result[0][1][2].toString() });
      this.setState({ A: Result[0][2].toString() });
      this.setState({ B: Result[0][3].toString() });
      this.setState({ C: Result[0][4].toString() });
      this.setState({ cosA: Result[0][5].toString() });
      this.setState({ cosB: Result[0][6].toString() });
      this.setState({ cosC: Result[0][7].toString() });

      this.setState({ Steps: Result[1].toString() });
    } else {
      //See what can be calculated among 3,4,5
      //Calculate X after above

      //Step 1 : checking x components
      if (this.state.Ux != "") {
        var Result = Calculate_Angle_DirectionCosine_From_UnitVectorComponent(
          this.state.Ux
        );
        this.setState({ A: Result[0][0].toString() });
        this.setState({ cosA: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show(
          "α and cos(α) have been calculated.",
          ToastAndroid.SHORT
        );
      } else if (this.state.A != "") {
        var Result = Calculate_UnitVectorComponent_DirectionCosine_From_Angle(
          this.state.A
        );
        this.setState({ Ux: Result[0][0].toString() });
        this.setState({ cosA: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show(
          "cos(α) and Ux have been calculated.",
          ToastAndroid.SHORT
        );
      } else if (this.state.cosA != "") {
        var Result = Calculate_UnitVectorComponent_Angle_From_DirectionCosine(
          this.state.cosA
        );
        this.setState({ Ux: Result[0][0].toString() });
        this.setState({ A: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show("Ux and α have been calculated.", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "One of Ux, α or cos(α) is required.",
          ToastAndroid.LONG
        );
      }

      //Step 2 : checking y components
      if (this.state.Uy != "") {
        var Result = Calculate_Angle_DirectionCosine_From_UnitVectorComponent(
          this.state.Uy
        );
        this.setState({ B: Result[0][0].toString() });
        this.setState({ cosB: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show(
          "β and cos(β) have been calculated.",
          ToastAndroid.SHORT
        );
      } else if (this.state.B != "") {
        var Result = Calculate_UnitVectorComponent_DirectionCosine_From_Angle(
          this.state.B
        );
        this.setState({ Uy: Result[0][0].toString() });
        this.setState({ cosB: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show(
          "Uy and cos(β) have been calculated.",
          ToastAndroid.SHORT
        );
      } else if (this.state.cosB != "") {
        var Result = Calculate_UnitVectorComponent_Angle_From_DirectionCosine(
          this.state.cosB
        );
        this.setState({ Uy: Result[0][0].toString() });
        this.setState({ B: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show("Uy and β have been calculated.", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "One of Uy, β or cos(β) is required.",
          ToastAndroid.LONG
        );
      }

      //Step 3 : checking z components
      if (this.state.Uz != "") {
        var Result = Calculate_Angle_DirectionCosine_From_UnitVectorComponent(
          this.state.Uz
        );
        this.setState({ C: Result[0][0].toString() });
        this.setState({ cosC: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show(
          "γ and cos(γ) have been calculated.",
          ToastAndroid.SHORT
        );
      } else if (this.state.C != "") {
        var Result = Calculate_UnitVectorComponent_DirectionCosine_From_Angle(
          this.state.C
        );
        this.setState({ Uz: Result[0][0].toString() });
        this.setState({ cosC: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show(
          "Uz and cos(γ) have been calculated.",
          ToastAndroid.SHORT
        );
      } else if (this.state.cosC != "") {
        var Result = Calculate_UnitVectorComponent_Angle_From_DirectionCosine(
          this.state.cosC
        );
        this.setState({ Uz: Result[0][0].toString() });
        this.setState({ C: Result[0][1].toString() });
        this.setState({ Steps: Result[1].toString() });
        ToastAndroid.show("γ and Uz have been calculated.", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "One of Uz, γ or cos(γ) is required.",
          ToastAndroid.LONG
        );
      }

      if (this.state.Ux != "" && this.state.Uy != "" && this.state.Uz != "") {
        if (this.state.magnitude != "") {
          var Result = Calculate_Vector_From_UnitVector_Magnitude(
            this.state.Ux,
            this.state.Uy,
            this.state.Uz,
            this.state.magnitude
          );
          this.setState({ Xx: Result[0][0].toString() });
          this.setState({ Xy: Result[0][1].toString() });
          this.setState({ Xz: Result[0][2].toString() });
          this.setState({ Steps: Result[1].toString() });
          ToastAndroid.show("X has been calculated.", ToastAndroid.LONG);
        } else {
          ToastAndroid.show(
            "The unit vector has been calculated, enter the magnitude of the vector to calculate the vector.",
            ToastAndroid.LONG
          );
        }
      }
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

  magnitudeValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ magnitude: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  UxValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Ux: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  UyValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Uy: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  UzValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ Uz: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  aValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ A: x[1].toString() });
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
  cValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ C: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }

  cosA_ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ cosA: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  cosB_ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ cosB: x[1].toString() });
    } else {
      ToastAndroid.show(
        "Please enter a valid number. No operations can be performed in the input.",
        ToastAndroid.LONG
      );
    }
  }
  cosC_ValueChanged(newValue) {
    var x = Format_Numeric_Input_Value(newValue);
    if (x[0]) {
      this.setState({ cosC: x[1].toString() });
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
            Vector Details (3D)
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
          <Vector_Unitless_Input
            quantityName={"Vector"}
            quantitySymbol={"X"}
            xTextInputValue={this.state.Xx}
            onXTextInputChangeText={(newText) => this.XxValueChanged(newText)}
            yTextInputValue={this.state.Xy}
            onYTextInputChangeText={(newText) => this.XyValueChanged(newText)}
            zTextInputValue={this.state.Xz}
            onZTextInputChangeText={(newText) => this.XzValueChanged(newText)}
            theme={this.state.theme}
          />

          <Scaler_Unitless_Input
            textToDisplay="|X| ="
            textInputValue={this.state.magnitude}
            onTextInputChangeText={(newText) =>
              this.magnitudeValueChanged(newText)
            }
            theme={this.state.theme}
          />

          <Vector_Unitless_Input
            quantityName={"Unit vector"}
            quantitySymbol={"U"}
            xTextInputValue={this.state.Ux}
            onXTextInputChangeText={(newText) => this.UxValueChanged(newText)}
            yTextInputValue={this.state.Uy}
            onYTextInputChangeText={(newText) => this.UyValueChanged(newText)}
            zTextInputValue={this.state.Uz}
            onZTextInputChangeText={(newText) => this.UzValueChanged(newText)}
            theme={this.state.theme}
          />

          <View
            style={[
              this.styles[0].inputContainer1,
              this.styles[1].inputContainer1,
            ]}
          >
            <Scaler_Unitless_Input
              textToDisplay="α = "
              textInputValue={this.state.A}
              onTextInputChangeText={(newText) => this.aValueChanged(newText)}
              theme={this.state.theme}
            />

            <Scaler_Unitless_Input
              textToDisplay="cos(α) = "
              textInputValue={this.state.cosA}
              onTextInputChangeText={(newText) =>
                this.cosA_ValueChanged(newText)
              }
              theme={this.state.theme}
            />
          </View>

          <View
            style={{
              height: 35,
            }}
          />

          <View
            style={[
              this.styles[0].inputContainer1,
              this.styles[1].inputContainer1,
            ]}
          >
            <Scaler_Unitless_Input
              textToDisplay="β = "
              textInputValue={this.state.B}
              onTextInputChangeText={(newText) => this.bValueChanged(newText)}
              theme={this.state.theme}
            />

            <Scaler_Unitless_Input
              textToDisplay="cos(β) = "
              textInputValue={this.state.cosB}
              onTextInputChangeText={(newText) =>
                this.cosB_ValueChanged(newText)
              }
              theme={this.state.theme}
            />
          </View>

          <View
            style={{
              height: 35,
            }}
          />

          <View
            style={[
              this.styles[0].inputContainer1,
              this.styles[1].inputContainer1,
            ]}
          >
            <Scaler_Unitless_Input
              textToDisplay="γ = "
              textInputValue={this.state.C}
              onTextInputChangeText={(newText) => this.cValueChanged(newText)}
              theme={this.state.theme}
            />

            <Scaler_Unitless_Input
              textToDisplay="cos(γ) = "
              textInputValue={this.state.cosC}
              onTextInputChangeText={(newText) =>
                this.cosC_ValueChanged(newText)
              }
              theme={this.state.theme}
            />
          </View>

          <ScreenButton
            buttonText={"Calculate"}
            buttonOnPress={this.Calculate_VectorDetails.bind(this)}
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
