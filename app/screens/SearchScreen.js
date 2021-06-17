import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  ToastAndroid,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

//Sub-screen components
import MenuButton from "../subScreenComponents/MenuButton";
import Scaler_Unitless_Input from "../subScreenComponents/Scaler_Unitless_Input";

//Calculators
import { Get_Formulas_From_SearchQuery } from "../helpers/SubjectManager";

//Details
import { GetSearchScreenStylesFromTheme } from "./Details/StylesAndColors";

export default class SearchScreen extends Component {
  constructor(props) {
    super();

    this.state.theme = props.route.params.theme;
  }

  state = {
    theme: "",
    searchQuery: "",
    searchOutputFormulas: [],
  };

  searchQueryChanged(newQuery) {
    this.setState({ searchQuery: newQuery });

    this.setState({
      searchOutputFormulas: Get_Formulas_From_SearchQuery(newQuery),
    });
  }

  render() {
    var styles = GetSearchScreenStylesFromTheme(this.props.route.params.theme);

    if (this.state.theme != "") {
      styles = GetSearchScreenStylesFromTheme(this.state.theme);
    }

    return (
      <View style={[styles[0].backgroundView, styles[1].backgroundView]}>
        <View style={[styles[0].headingView, styles[1].headingView]}>
          <Text style={[styles[0].headingText, styles[1].headingText]}>
            Search
          </Text>
        </View>

        <View
          style={[styles[0].searchTextInputView, styles[1].searchTextInputView]}
        >
          <TextInput
            style={[styles[0].searchTextInput, styles[1].searchTextInput]}
            onChangeText={this.searchQueryChanged.bind(this)}
            keyboardType="default"
            value={this.state.searchQuery}
          />
        </View>

        <ScrollView
          style={styles[0].contentScrollView}
          contentContainerStyle={
            styles[0].contentScrollViewContentContainerStyle
          }
        >
          {this.state.searchOutputFormulas.map((aFormula) => (
            <MenuButton
              key={this.state.searchOutputFormulas.indexOf(aFormula)}
              buttonText={aFormula[0]}
              buttonOnPress={() => {
                this.props.navigation.navigate(aFormula[1], {
                  theme: this.props.route.params.theme,
                  saveUnits: this.props.route.params.saveUnits,
                });
              }}
              theme={this.props.route.params.theme}
            />
          ))}

          <View style={styles[0].endingVerticalMarginView} />
        </ScrollView>
      </View>
    );
  }
}
