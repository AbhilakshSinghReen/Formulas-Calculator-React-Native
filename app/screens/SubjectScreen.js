import React from "react";
import { View, Text, ScrollView } from "react-native";

//Sub-screen components
import MenuButton from "../subScreenComponents/MenuButton";
import Scaler_Input_With_Units from "../subScreenComponents/Scaler_Input_With_Units";

//Calculators
import { Return_All_SubjectFormulas_With_Screen_Names } from "../helpers/SubjectManager";

//Details
import { GetSubjectScreenStylesFromTheme } from "./Details/StylesAndColors";

export default function SubjectScreen({ route, navigation }) {
  const subjectName = route.name.replace("Screen", "");
  var thisSubjectFormulas = Return_All_SubjectFormulas_With_Screen_Names(
    subjectName
  );

  const styles = GetSubjectScreenStylesFromTheme(route.params.theme);

  return (
    <View style={[styles[0].backgroundView, styles[1].backgroundView]}>
      <View style={[styles[0].headingView, styles[1].headingView]}>
        <Text style={[styles[0].headingText, styles[1].headingText]}>
          {subjectName}
        </Text>
      </View>

      <ScrollView
        style={styles[0].contentScrollView}
        contentContainerStyle={styles[0].contentScrollViewContentContainerStyle}
      >
        {thisSubjectFormulas.map((aFormula) => (
          <MenuButton
            key={thisSubjectFormulas.indexOf(aFormula)}
            buttonText={aFormula[0]}
            buttonOnPress={() => {
              navigation.navigate(aFormula[1], {
                theme: route.params.theme,
                saveUnits: route.params.saveUnits,
              });
            }}
            theme={route.params.theme}
          />
        ))}

        <View style={styles[0].endingVerticalMarginView} />
      </ScrollView>
    </View>
  );
}
