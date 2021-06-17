import { StyleSheet, StatusBar } from "react-native";
import { color } from "react-native-reanimated";

const Colors = {
  LightTheme: {
    FormulaScreen: {
      backgroundView: {
        backgroundColor: "#fff",
      },
      heading: {
        backgroundColor: "#ddd",
        textColor: "#000",
        borderColor: "#333",
      },
      formulaDisplay: {
        backgroundColor: "#ddd",
        textColor: "#000",
        borderColor: "#333",
      },
      inputOutputScrollView: {},
      inputOutputScrollViewContentContainerStyle: {},
      endingVerticalMarginView: {},
      inputContainer1: {
        backgroundColor: "#ddd",
      },
      textH3: {
        textColor: "#000",
      },
      textH5: {
        textColor: "#000",
      },
    },
    SubjectScreen: {
      backgroundView: {
        backgroundColor: "#fff",
      },
      heading: {
        backgroundColor: "#ddd",
        textColor: "#000",
        borderColor: "#333",
      },
    },
    StepsScreen: {
      background: {
        backgroundColor: "#fff",
      },
      scrollView: {
        backgroundColor: "#fff",
      },
      toFindTextHeader: {
        color: "#000",
      },
      toFindText: {
        color: "#000",
      },
      givenEnteredTextHeader: {
        color: "#000",
      },
      givenEnteredText: {
        color: "#000",
      },
      formulaCalculationResultTextHeader: {
        color: "#000",
      },
      formulaCalculationResultText: {
        color: "#000",
      },
    },
    MainScreen: {
      backgroundView: {
        backgroundColor: "#fff",
      },
      heading: {
        backgroundColor: "#ddd",
        textColor: "#000",
        borderColor: "#333",
      },
    },
    SettingsScreen: {
      backgroundView: {
        backgroundColor: "#fff",
      },
      heading: {
        backgroundColor: "#ddd",
        textColor: "#000",
        borderColor: "#333",
      },
      settingsRowView: {},
    },
    SearchScreen: {
      backgroundView: {
        backgroundColor: "#fff",
      },
      heading: {
        backgroundColor: "#ddd",
        textColor: "#000",
        borderColor: "#333",
      },
    },
    MenuButton: {
      wrapperView: {},
      menuButtonView: {
        backgroundColor: "#f0f0f0",
      },
      text: {
        color: "#000",
      },
    },
    MultilineTextDisplayer: {
      backgroundView: {
        backgroundColor: "#eee",
      },
      line1ScrollView: {},
      line1Text: {
        color: "#000",
      },
      line2ScrollView: {},
      line2Text: {
        color: "#000",
      },
    },
    ScalerInputWithUnits: {
      backgroundView: {
        backgroundColor: "#ccc",
      },
      row1View: {
        borderColor: "#000",
      },
      row1Text: {
        color: "#000",
      },
      row2View: {
        borderColor: "#000",
      },
      row2Text: {
        color: "#000",
      },
      textInput: {
        borderColor: "#000",
      },
    },
    ScalerUnitlessInput: {
      backgroundView: {
        backgroundColor: "#eee",
        borderColor: "#333",
      },
      text: {
        color: "#000",
      },
      textInput: {
        borderColor: "#000",
      },
    },
    MatrixCellInput: {
      backgroundView: {
        backgroundColor: "#eee",
        borderColor: "#333",
      },
      text: {
        color: "#000",
      },
      textInput: {
        borderColor: "#000",
      },
    },
    ScreenButton: {
      wrapperView: {},
      screenButtonView: {
        backgroundColor: "#f0f0f0",
      },
      text: {
        color: "#000",
      },
    },
    ShowStepsButton: {
      wrapperView: {},
      showStepsButtonView: {
        backgroundColor: "#f0f0f0",
      },
      text: {
        color: "#000",
      },
    },
    SmallCrossButton: {
      wrapperView: {},
      showStepsButtonView: {
        backgroundColor: "#ff0000",
      },
      text: {
        color: "#fff",
      },
    },
    TextDisplayer: {
      backgroundView: {
        backgroundColor: "#eee",
      },
      scrollView: {},
      text: {
        color: "#000",
      },
    },

    // NOT SET UP DOWN BELOW
    UnitsPicker: {},
    ValuePicker: {},
    Toggler: {},
  },
  DarkTheme: {
    FormulaScreen: {
      backgroundView: {
        backgroundColor: "#000",
      },
      heading: {
        backgroundColor: "#222",
        textColor: "#fff",
        borderColor: "#ccc",
      },
      formulaDisplay: {
        backgroundColor: "#222",
        textColor: "#fff",
        borderColor: "#ccc",
      },
      inputOutputScrollView: {},
      inputOutputScrollViewContentContainerStyle: {},
      endingVerticalMarginView: {},
      inputContainer1: {
        backgroundColor: "#222",
      },
      textH3: {
        textColor: "#fff",
      },
      textH5: {
        textColor: "#fff",
      },
    },
    SubjectScreen: {
      backgroundView: {
        backgroundColor: "#000",
      },
      heading: {
        backgroundColor: "#222",
        textColor: "#fff",
        borderColor: "#ccc",
      },
    },
    StepsScreen: {
      background: {
        backgroundColor: "#000",
      },
      scrollView: {
        backgroundColor: "#000",
      },
      toFindTextHeader: {
        color: "#fff",
      },
      toFindText: {
        color: "#fff",
      },
      givenEnteredTextHeader: {
        color: "#fff",
      },
      givenEnteredText: {
        color: "#fff",
      },
      formulaCalculationResultTextHeader: {
        color: "#fff",
      },
      formulaCalculationResultText: {
        color: "#fff",
      },
    },
    MainScreen: {
      backgroundView: {
        backgroundColor: "#000",
      },
      heading: {
        backgroundColor: "#222",
        textColor: "#fff",
        borderColor: "#ccc",
      },
    },
    SettingsScreen: {
      backgroundView: {
        backgroundColor: "#000",
      },
      heading: {
        backgroundColor: "#222",
        textColor: "#fff",
        borderColor: "#ccc",
      },
      text: {
        color: "fff",
      },

      settingsRowView: {},
    },
    SearchScreen: {
      backgroundView: {
        backgroundColor: "#000",
      },
      heading: {
        backgroundColor: "#222",
        textColor: "#fff",
        borderColor: "#ccc",
      },
    },
    MenuButton: {
      wrapperView: {},
      menuButtonView: {
        backgroundColor: "#0f0f0f",
      },
      text: {
        color: "#fff",
      },
    },
    MultilineTextDisplayer: {
      backgroundView: {
        backgroundColor: "#111",
      },
      line1ScrollView: {},
      line1Text: {
        color: "#fff",
      },
      line2ScrollView: {},
      line2Text: {
        color: "#fff",
      },
    },
    ScalerInputWithUnits: {
      backgroundView: {
        backgroundColor: "#333",
      },
      row1View: {
        borderColor: "#fff",
      },
      row1Text: {
        color: "#fff",
      },
      row2View: {
        borderColor: "#fff",
      },
      row2Text: {
        color: "#fff",
      },
      textInput: {
        borderColor: "#fff",
        color: "#fff",
      },
    },
    ScalerUnitlessInput: {
      backgroundView: {
        backgroundColor: "#111",
        borderColor: "#ccc",
      },
      text: {
        color: "#fff",
      },
      textInput: {
        borderColor: "#fff",
        color: "#fff",
      },
    },
    MatrixCellInput: {
      backgroundView: {
        backgroundColor: "#111",
        borderColor: "#ccc",
      },
      text: {
        color: "#fff",
      },
      textInput: {
        borderColor: "#fff",
        color: "#fff",
      },
    },
    ScreenButton: {
      wrapperView: {},
      screenButtonView: {
        backgroundColor: "#0f0f0f",
      },
      text: {
        color: "#fff",
      },
    },
    ShowStepsButton: {
      wrapperView: {},
      showStepsButtonView: {
        backgroundColor: "#0f0f0f",
      },
      text: {
        color: "#fff",
      },
    },
    SmallCrossButton: {
      wrapperView: {},
      showStepsButtonView: {
        backgroundColor: "#00ffff",
      },
      text: {
        color: "#000",
      },
    },
    TextDisplayer: {
      backgroundView: {
        backgroundColor: "#111",
      },
      scrollView: {},
      text: {
        color: "#fff",
      },
    },

    // NOT SET UP DOWN BELOW
    UnitsPicker: {},
    ValuePicker: {},
    Toggler: {},
  },
};

//Formula Screen
const FormulaScreenStyles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    top: StatusBar.currentHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headingView: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: 2,
  },
  headingText: {
    textAlign: "center",
    fontSize: 33,
  },
  formulaDisplayView: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: 2,
  },
  formulaDisplayText: {
    textAlign: "center",
    fontSize: 33,
  },
  inputOutputScrollView: {
    width: "100%",
    marginVertical: 25,
    flex: 1,
  },
  inputOutputScrollViewContentContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  endingVerticalMarginView: {
    height: 100,
  },
  inputContainer1: {
    width: "90%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  textH3: {
    textAlign: "center",
    fontSize: 21,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  textH5: {
    fontSize: 18,
  },
});

const FormulaScreenLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.FormulaScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.LightTheme.FormulaScreen.heading.backgroundColor,
    borderColor: Colors.LightTheme.FormulaScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.LightTheme.FormulaScreen.heading.textColor,
  },
  formulaDisplayView: {
    backgroundColor:
      Colors.LightTheme.FormulaScreen.formulaDisplay.backgroundColor,
    borderColor: Colors.LightTheme.FormulaScreen.formulaDisplay.borderColor,
  },
  formulaDisplayText: {
    color: Colors.LightTheme.FormulaScreen.formulaDisplay.textColor,
  },
  inputOutputScrollView: {},
  inputOutputScrollViewContentContainerStyle: {},
  endingVerticalMarginView: {},
  inputContainer1: {
    backgroundColor:
      Colors.LightTheme.FormulaScreen.inputContainer1.backgroundColor,
  },
  textH3: {
    color: Colors.LightTheme.FormulaScreen.textH3.textColor,
  },
  textH5: {
    color: Colors.LightTheme.FormulaScreen.textH5.textColor,
  },
});

const FormulaScreenDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.FormulaScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.DarkTheme.FormulaScreen.heading.backgroundColor,
    borderColor: Colors.DarkTheme.FormulaScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.DarkTheme.FormulaScreen.heading.textColor,
  },
  formulaDisplayView: {
    backgroundColor:
      Colors.DarkTheme.FormulaScreen.formulaDisplay.backgroundColor,
    borderColor: Colors.DarkTheme.FormulaScreen.formulaDisplay.borderColor,
  },
  formulaDisplayText: {
    color: Colors.DarkTheme.FormulaScreen.formulaDisplay.textColor,
  },
  inputOutputScrollView: {},
  inputOutputScrollViewContentContainerStyle: {},
  endingVerticalMarginView: {},
  inputContainer1: {
    backgroundColor:
      Colors.DarkTheme.FormulaScreen.inputContainer1.backgroundColor,
  },
  textH3: {
    color: Colors.DarkTheme.FormulaScreen.textH3.textColor,
  },
  textH5: {
    color: Colors.DarkTheme.FormulaScreen.textH5.textColor,
  },
});

export function GetFormulaScreenStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [FormulaScreenStyles, FormulaScreenLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [FormulaScreenStyles, FormulaScreenDarkThemeColors];
  }
}
//Formula Screen END

//Subject Screen
const SubjectScreenStyles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    top: StatusBar.currentHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headingView: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: 2,
  },
  headingText: {
    textAlign: "center",
    fontSize: 50,
  },
  contentScrollView: {
    width: "100%",
    marginVertical: 25,
    flex: 1,
  },
  contentScrollViewContentContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  endingVerticalMarginView: {
    height: 100,
  },
});

const SubjectScreenLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.SubjectScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.LightTheme.SubjectScreen.heading.backgroundColor,
    borderColor: Colors.LightTheme.SubjectScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.LightTheme.SubjectScreen.heading.textColor,
  },
});

const SubjectScreenDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.SubjectScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.DarkTheme.SubjectScreen.heading.backgroundColor,
    borderColor: Colors.DarkTheme.SubjectScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.DarkTheme.SubjectScreen.heading.textColor,
  },
});

export function GetSubjectScreenStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [SubjectScreenStyles, SubjectScreenLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [SubjectScreenStyles, SubjectScreenDarkThemeColors];
  }
}
//Subject Screen END

//Steps Screen
const StepsScreenStyles = StyleSheet.create({
  background: {
    flex: 1,
    top: StatusBar.currentHeight,
    flexDirection: "column",
  },
  scrollView: {
    marginHorizontal: 0,
    flex: 1,
  },
  toFindTextHeader: {
    marginHorizontal: 20,
    marginTop: 35,
    fontSize: 35,
    fontWeight: "bold",
  },
  toFindText: {
    marginHorizontal: 30,
    marginVertical: 0,
    fontSize: 20,
  },
  givenEnteredTextHeader: {
    marginHorizontal: 20,
    marginTop: 25,
    fontSize: 35,
    fontWeight: "bold",
  },
  givenEnteredText: {
    marginHorizontal: 30,
    marginVertical: 0,
    fontSize: 20,
  },
  formulaCalculationResultTextHeader: {
    marginHorizontal: 20,
    marginTop: 25,
    fontSize: 35,
    fontWeight: "bold",
  },
  formulaCalculationResultText: {
    marginHorizontal: 30,
    marginBottom: 50,
    fontSize: 20,
    paddingBottom: 50,
  },
});

const StepsScreenLightThemeColors = StyleSheet.create({
  background: {
    backgroundColor: Colors.LightTheme.StepsScreen.background.backgroundColor,
  },
  scrollView: {
    backgroundColor: Colors.LightTheme.StepsScreen.scrollView.backgroundColor,
  },
  toFindTextHeader: {
    color: Colors.LightTheme.StepsScreen.toFindTextHeader.color,
  },
  toFindText: {
    color: Colors.LightTheme.StepsScreen.toFindText.color,
  },
  givenEnteredTextHeader: {
    color: Colors.LightTheme.StepsScreen.givenEnteredTextHeader.color,
  },
  givenEnteredText: {
    color: Colors.LightTheme.StepsScreen.givenEnteredText.color,
  },
  formulaCalculationResultTextHeader: {
    color:
      Colors.LightTheme.StepsScreen.formulaCalculationResultTextHeader.color,
  },
  formulaCalculationResultText: {
    color: Colors.LightTheme.StepsScreen.formulaCalculationResultText.color,
  },
});

const StepsScreenDarkThemeColors = StyleSheet.create({
  background: {
    backgroundColor: Colors.DarkTheme.StepsScreen.background.backgroundColor,
  },
  scrollView: {
    backgroundColor: Colors.DarkTheme.StepsScreen.scrollView.backgroundColor,
  },
  toFindTextHeader: {
    color: Colors.DarkTheme.StepsScreen.toFindTextHeader.color,
  },
  toFindText: {
    color: Colors.DarkTheme.StepsScreen.toFindText.color,
  },
  givenEnteredTextHeader: {
    color: Colors.DarkTheme.StepsScreen.givenEnteredTextHeader.color,
  },
  givenEnteredText: {
    color: Colors.DarkTheme.StepsScreen.givenEnteredText.color,
  },
  formulaCalculationResultTextHeader: {
    color:
      Colors.DarkTheme.StepsScreen.formulaCalculationResultTextHeader.color,
  },
  formulaCalculationResultText: {
    color: Colors.DarkTheme.StepsScreen.formulaCalculationResultText.color,
  },
});

export function GetStepsScreenStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [StepsScreenStyles, StepsScreenLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [StepsScreenStyles, StepsScreenDarkThemeColors];
  }
}
//Steps Screen END

//Main Screen
const MainScreenStyles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    top: StatusBar.currentHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headingView: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: 2,
  },
  headingText: {
    textAlign: "center",
    fontSize: 50,
  },
  contentScrollView: {
    width: "100%",
    marginVertical: 25,
    flex: 1,
  },
  contentScrollViewContentContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  endingVerticalMarginView: {
    height: 100,
  },
});

const MainScreenLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.MainScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.LightTheme.MainScreen.heading.backgroundColor,
    borderColor: Colors.LightTheme.MainScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.LightTheme.MainScreen.heading.textColor,
  },
});

const MainScreenDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor: Colors.DarkTheme.MainScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.DarkTheme.MainScreen.heading.backgroundColor,
    borderColor: Colors.DarkTheme.MainScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.DarkTheme.MainScreen.heading.textColor,
  },
});

export function GetMainScreenStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [MainScreenStyles, MainScreenLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [MainScreenStyles, MainScreenDarkThemeColors];
  }
}
//Main Screen END

//Settings Screen
const SettingsScreenStyles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    top: StatusBar.currentHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headingView: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: 2,
  },
  headingText: {
    textAlign: "center",
    fontSize: 50,
  },
  contentScrollView: {
    width: "100%",
    marginVertical: 25,
    flex: 1,
  },
  contentScrollViewContentContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  smallVerticalMarginView: {
    height: 35,
  },
  settingsRowView: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

const SettingsScreenLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.SettingsScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.LightTheme.SettingsScreen.heading.backgroundColor,
    borderColor: Colors.LightTheme.SettingsScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.LightTheme.SettingsScreen.heading.textColor,
  },
  settingsRowView: {},
});

const SettingsScreenDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.SettingsScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.DarkTheme.SettingsScreen.heading.backgroundColor,
    borderColor: Colors.DarkTheme.SettingsScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.DarkTheme.SettingsScreen.heading.textColor,
  },
  settingsRowView: {},
});

export function GetSettingsScreenStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [SettingsScreenStyles, SettingsScreenLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [SettingsScreenStyles, SettingsScreenDarkThemeColors];
  }
}
//Settings Screen END

//Search Screen
const SearchScreenStyles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    top: StatusBar.currentHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headingView: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: 2,
  },
  headingText: {
    textAlign: "center",
    fontSize: 50,
  },
  searchTextInputView: {},
  searchTextInput: {
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
  },
  contentScrollView: {
    width: "100%",
    marginVertical: 25,
    flex: 1,
  },
  contentScrollViewContentContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  endingVerticalMarginView: {
    height: 100,
  },
});

const SearchScreenLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.SearchScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.LightTheme.SearchScreen.heading.backgroundColor,
    borderColor: Colors.LightTheme.SearchScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.LightTheme.SearchScreen.heading.textColor,
  },
  searchTextInputView: {},
  searchTextInput: {
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
  },
});

const SearchScreenDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.SearchScreen.backgroundView.backgroundColor,
  },
  headingView: {
    backgroundColor: Colors.DarkTheme.SearchScreen.heading.backgroundColor,
    borderColor: Colors.DarkTheme.SearchScreen.heading.borderColor,
  },
  headingText: {
    color: Colors.DarkTheme.SearchScreen.heading.textColor,
  },
  searchTextInputView: {},
  searchTextInput: {
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
  },
});

export function GetSearchScreenStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [SearchScreenStyles, SearchScreenLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [SearchScreenStyles, SearchScreenDarkThemeColors];
  }
}
//Search Screen END

//Menu Button
const MenuButtonStyles = StyleSheet.create({
  wrapperView: {
    marginVertical: 10,
    width: "90%",
  },
  menuButtonView: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 24,
    textAlign: "center",
  },
});

const MenuButtonLightThemeColors = StyleSheet.create({
  wrapperView: {},
  menuButtonView: {
    backgroundColor:
      Colors.LightTheme.MenuButton.menuButtonView.backgroundColor,
  },
  text: {
    color: Colors.LightTheme.MenuButton.text.color,
  },
});

const MenuButtonDarkThemeColors = StyleSheet.create({
  wrapperView: {},
  menuButtonView: {
    backgroundColor: Colors.DarkTheme.MenuButton.menuButtonView.backgroundColor,
  },
  text: {
    color: Colors.DarkTheme.MenuButton.text.color,
  },
});

export function GetMenuButtonStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [MenuButtonStyles, MenuButtonLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [MenuButtonStyles, MenuButtonDarkThemeColors];
  }
}
//Menu Button END

//Multiline Text Displayer
const MultilineTextDisplayerStyles = StyleSheet.create({
  backgroundView: {
    padding: 8,
    margin: 10,
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
  },
  line1ScrollView: {},
  line1Text: {
    fontSize: 25,
  },
  line2ScrollView: {},
  line2Text: {
    fontSize: 25,
  },
});

const MultilineTextDisplayerLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.MultilineTextDisplayer.backgroundView.backgroundColor,
  },
  line1ScrollView: {},
  line1Text: {
    color: Colors.LightTheme.MultilineTextDisplayer.line1Text.color,
  },
  line2ScrollView: {},
  line2Text: {
    color: Colors.LightTheme.MultilineTextDisplayer.line2Text.color,
  },
});

const MultilineTextDisplayerDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.MultilineTextDisplayer.backgroundView.backgroundColor,
  },
  line1ScrollView: {},
  line1Text: {
    color: Colors.DarkTheme.MultilineTextDisplayer.line1Text.color,
  },
  line2ScrollView: {},
  line2Text: {
    color: Colors.DarkTheme.MultilineTextDisplayer.line2Text.color,
  },
});

export function GetMultilineTextDisplayerStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [
      MultilineTextDisplayerStyles,
      MultilineTextDisplayerLightThemeColors,
    ];
  } else if (theme === "Dark Theme") {
    return [
      MultilineTextDisplayerStyles,
      MultilineTextDisplayerDarkThemeColors,
    ];
  }
}
//Multiline Text Displayer END

//Scaler Input With Units
const ScalerInputWithUnitsStyles = StyleSheet.create({
  backgroundView: {
    marginVertical: 10,
  },
  row1View: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    paddingHorizontal: 5,
    width: "100%",
    borderColor: "#000",
  },
  row1Text: {
    marginHorizontal: 5,
    fontSize: 25,
    textAlign: "left",
  },
  row2View: {
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 5,
    width: "100%",
  },
  row2Text: {
    width: "15%",
    fontSize: 25,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
    position: "relative",
  },
});

const ScalerInputWithUnitsLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.ScalerInputWithUnits.backgroundView.backgroundColor,
  },
  row1View: {
    borderColor: Colors.LightTheme.ScalerInputWithUnits.row1View.borderColor,
  },
  row1Text: {
    color: Colors.LightTheme.ScalerInputWithUnits.row1Text.color,
  },
  row2View: {
    borderColor: Colors.LightTheme.ScalerInputWithUnits.row2View.borderColor,
  },
  row2Text: {
    color: Colors.LightTheme.ScalerInputWithUnits.row2Text.color,
  },
  textInput: {
    borderColor: Colors.LightTheme.ScalerInputWithUnits.textInput.borderColor,
  },
});

const ScalerInputWithUnitsDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.ScalerInputWithUnits.backgroundView.backgroundColor,
  },
  row1View: {
    borderColor: Colors.DarkTheme.ScalerInputWithUnits.row1View.borderColor,
  },
  row1Text: {
    color: Colors.DarkTheme.ScalerInputWithUnits.row1Text.color,
  },
  row2View: {
    borderColor: Colors.DarkTheme.ScalerInputWithUnits.row2View.borderColor,
  },
  row2Text: {
    color: Colors.DarkTheme.ScalerInputWithUnits.row2Text.color,
  },
  textInput: {
    borderColor: Colors.DarkTheme.ScalerInputWithUnits.textInput.borderColor,
  },
});

export function GetScalerInputWithUnitsStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [ScalerInputWithUnitsStyles, ScalerInputWithUnitsLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [ScalerInputWithUnitsStyles, ScalerInputWithUnitsDarkThemeColors];
  }
}
//Scaler Input With Units END

//Scaler Unitless Input
const ScalerUnitlessInputStyles = StyleSheet.create({
  backgroundView: {
    justifyContent: "center",
    marginVertical: 10,
    width: "90%",
  },
  text: {
    fontSize: 25,
  },
  textInput: {
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
  },
});

const ScalerUnitlessInputLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.ScalerUnitlessInput.backgroundView.backgroundColor,
    borderColor:
      Colors.LightTheme.ScalerUnitlessInput.backgroundView.borderColor,
  },
  text: {
    color: Colors.LightTheme.ScalerUnitlessInput.text.color,
  },
  textInput: {
    borderColor:
      Colors.LightTheme.ScalerUnitlessInput.textInput.backgroundColor,
  },
});

const ScalerUnitlessInputDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.ScalerUnitlessInput.backgroundView.backgroundColor,
    borderColor:
      Colors.DarkTheme.ScalerUnitlessInput.backgroundView.borderColor,
  },
  text: {
    color: Colors.DarkTheme.ScalerUnitlessInput.text.color,
  },
  textInput: {
    borderColor: Colors.DarkTheme.ScalerUnitlessInput.textInput.backgroundColor,
  },
});

export function GetScalerUnitlessInputStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [ScalerUnitlessInputStyles, ScalerUnitlessInputLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [ScalerUnitlessInputStyles, ScalerUnitlessInputDarkThemeColors];
  }
}
//Scaler Unitless Input END

//matrixCell Input
const MatrixCellInputStyles = StyleSheet.create({
  backgroundView: {
    justifyContent: "center",
    marginVertical: 10,
    width: "90%",
  },
  text: {
    fontSize: 25,
  },
  textInput: {
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 75,
  },
});

const MatrixCellInputLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.MatrixCellInput.backgroundView.backgroundColor,
    borderColor: Colors.LightTheme.MatrixCellInput.backgroundView.borderColor,
  },
  text: {
    color: Colors.LightTheme.MatrixCellInput.text.color,
  },
  textInput: {
    borderColor: Colors.LightTheme.MatrixCellInput.textInput.backgroundColor,
  },
});

const MatrixCellInputDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.MatrixCellInput.backgroundView.backgroundColor,
    borderColor: Colors.DarkTheme.MatrixCellInput.backgroundView.borderColor,
  },
  text: {
    color: Colors.DarkTheme.MatrixCellInput.text.color,
  },
  textInput: {
    borderColor: Colors.DarkTheme.MatrixCellInput.textInput.backgroundColor,
  },
});

export function GetMatrixCellInputStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [MatrixCellInputStyles, MatrixCellInputLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [MatrixCellInputStyles, MatrixCellInputDarkThemeColors];
  }
}
//matrixCell Input END

//Screen Button
const ScreenButtonStyles = StyleSheet.create({
  wrapperView: {
    marginVertical: 10,
    width: "90%",
  },
  screenButtonView: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 24,
    textAlign: "center",
  },
});

const ScreenButtonLightThemeColors = StyleSheet.create({
  wrapperView: {},
  screenButtonView: {
    backgroundColor:
      Colors.LightTheme.ScreenButton.screenButtonView.backgroundColor,
  },
  text: {
    color: Colors.LightTheme.ScreenButton.text.color,
  },
});

const ScreenButtonDarkThemeColors = StyleSheet.create({
  wrapperView: {},
  screenButtonView: {
    backgroundColor:
      Colors.DarkTheme.ScreenButton.screenButtonView.backgroundColor,
  },
  text: {
    color: Colors.DarkTheme.ScreenButton.text.color,
  },
});

export function GetScreenButtonStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [ScreenButtonStyles, ScreenButtonLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [ScreenButtonStyles, ScreenButtonDarkThemeColors];
  }
}
//Screen Button END

//ShowSteps Button
const ShowStepsButtonStyles = StyleSheet.create({
  wrapperView: {
    marginVertical: 10,
    width: "90%",
  },
  showStepsButtonView: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 24,
    textAlign: "center",
  },
});

const ShowStepsButtonLightThemeColors = StyleSheet.create({
  wrapperView: {},
  showStepsButtonView: {
    backgroundColor:
      Colors.LightTheme.ShowStepsButton.showStepsButtonView.backgroundColor,
  },
  text: {
    color: Colors.LightTheme.ShowStepsButton.text.color,
  },
});

const ShowStepsButtonDarkThemeColors = StyleSheet.create({
  wrapperView: {},
  showStepsButtonView: {
    backgroundColor:
      Colors.DarkTheme.ShowStepsButton.showStepsButtonView.backgroundColor,
  },
  text: {
    color: Colors.DarkTheme.ShowStepsButton.text.color,
  },
});

export function GetShowStepsButtonStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [ShowStepsButtonStyles, ShowStepsButtonLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [ShowStepsButtonStyles, ShowStepsButtonDarkThemeColors];
  }
}
//ShowSteps Button END

//SmallCross Button
const SmallCrossButtonStyles = StyleSheet.create({
  wrapperView: {
    marginVertical: 10,
    width: "15%",
  },
  showStepsButtonView: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 24,
    textAlign: "center",
  },
});

const SmallCrossButtonLightThemeColors = StyleSheet.create({
  wrapperView: {},
  showStepsButtonView: {
    backgroundColor:
      Colors.LightTheme.SmallCrossButton.showStepsButtonView.backgroundColor,
  },
  text: {
    color: Colors.LightTheme.SmallCrossButton.text.color,
  },
});

const SmallCrossButtonDarkThemeColors = StyleSheet.create({
  wrapperView: {},
  showStepsButtonView: {
    backgroundColor:
      Colors.DarkTheme.SmallCrossButton.showStepsButtonView.backgroundColor,
  },
  text: {
    color: Colors.DarkTheme.SmallCrossButton.text.color,
  },
});

export function GetSmallCrossButtonStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [SmallCrossButtonStyles, SmallCrossButtonLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [SmallCrossButtonStyles, SmallCrossButtonDarkThemeColors];
  }
}
//SmallCross Button END

//Text displayer
const TextDisplayerStyles = StyleSheet.create({
  backgroundView: {
    padding: 8,
    margin: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
  },
  scrollView: {},
  text: {
    fontSize: 25,
  },
});

const TextDisplayerLightThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.LightTheme.TextDisplayer.backgroundView.backgroundColor,
  },
  scrollView: {},
  text: {
    color: Colors.LightTheme.TextDisplayer.text.color,
  },
});

const TextDisplayerDarkThemeColors = StyleSheet.create({
  backgroundView: {
    backgroundColor:
      Colors.DarkTheme.TextDisplayer.backgroundView.backgroundColor,
  },
  scrollView: {},
  text: {
    color: Colors.DarkTheme.TextDisplayer.text.color,
  },
});

export function GetTextDisplayerStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [TextDisplayerStyles, TextDisplayerLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [TextDisplayerStyles, TextDisplayerDarkThemeColors];
  }
}
//Text Displayer END

//UnitsPicker
const UnitsPickerStyles = StyleSheet.create({
  backgroundView: {},
  picker: {},
});

const UnitsPickerLightThemeColors = StyleSheet.create({
  backgroundView: {},
  picker: {},
});

const UnitsPickerDarkThemeColors = StyleSheet.create({
  backgroundView: {},
  picker: {},
});

export function GetUnitsPickerStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [UnitsPickerStyles, UnitsPickerLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [UnitsPickerStyles, UnitsPickerDarkThemeColors];
  }
}
//UnitsPicker END

//ValuePicker
const ValuePickerStyles = StyleSheet.create({
  backgroundView: {},
  picker: {},
});

const ValuePickerLightThemeColors = StyleSheet.create({
  backgroundView: {},
  picker: {},
});

const ValuePickerDarkThemeColors = StyleSheet.create({
  backgroundView: {},
  picker: {},
});

export function GetValuePickerStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [ValuePickerStyles, ValuePickerLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [ValuePickerStyles, ValuePickerDarkThemeColors];
  }
}
//ValuePicker END

//Toggler INCOMPLETE
const TogglerStyles = StyleSheet.create({
  backgroundView: {
    padding: 8,
    margin: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
  },
  scrollView: {},
  text: {
    fontSize: 25,
  },
});

const TogglerLightThemeColors = StyleSheet.create({});

const TogglerDarkThemeColors = StyleSheet.create({});

export function GetTogglerStylesFromTheme(theme) {
  if (theme === "Light Theme") {
    return [TogglerStyles, TogglerLightThemeColors];
  } else if (theme === "Dark Theme") {
    return [TogglerStyles, TogglerDarkThemeColors];
  }
}
//Toggler END
