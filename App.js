import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./app/screens/MainScreen";
import SettingsScreen from "./app/screens//SettingsScreen";
import SubjectScreen from "./app/screens/SubjectScreen";
import StepsScreen from "./app/screens/StepsScreen";
import SearchScreen from "./app/screens/SearchScreen";

//Formula Screens
//Mathematics
import QuadraticEquationDetailsScreen from "./app/screens/Mathematics/QuadraticEquationDetails";
import QuadraticEquationCommonRootsScreen from "./app/screens/Mathematics/QuadraticEquationsCommonRoots";
import TnOfAPScreen from "./app/screens/Mathematics/TnOfAP";
import SnOfAPScreen from "./app/screens/Mathematics/SnOfAP";
import GPDetailsScreen from "./app/screens/Mathematics/GPDetails";
import VectorCrossProductScreen from "./app/screens/Mathematics/VectorCrossProduct";
import VectorDotProductScreen from "./app/screens/Mathematics/VectorDotProduct";
import PairOfLinearEquationsScreen from "./app/screens/Mathematics/PairOfLinearEquations";
import MatrixDeterminantScreen from "./app/screens/Mathematics/MatrixDeterminant";
import VectorDetails3DScreen from "./app/screens/Mathematics/VectorDetails3D";
//Physics
import EnergyStoredInACapacitorScreen from "./app/screens/Physics/EnergyStoredInACapacitor";
import ElasticPotentialEnergyScreen from "./app/screens/Physics/ElasticPotentialEnergy";
import EscapeVelocityScreen from "./app/screens/Physics/EscapeVelocity";
import AverageVelocityScreen from "./app/screens/Physics/AverageVelocity";
import AverageAccelerationScreen from "./app/screens/Physics/AverageAcceleration";
import RadiusOfMovingChargeInMagneticFieldScreen from "./app/screens/Physics/RadiusOfMovingChargeInMagneticField";
import HeatCurrentScreen from "./app/screens/Physics/HeatCurrent";
import CoulombsConstantFromPermittivityScreen from "./app/screens/Physics/CoulombsConstantFromPermittivity";
import DipoleMomentScalerScreen from "./app/screens/Physics/DipoleMomentScaler";
import DipoleMomentVectorScreen from "./app/screens/Physics/DipoleMomentVector";
import ElectrostaticForceScreen from "./app/screens/Physics/ElectrostaticForce";
import ElectrostaticPotentialEnergyScreen from "./app/screens/Physics/ElectrostaticPotentialEnergy";
import GravitationalForceScreen from "./app/screens/Physics/GravitationalForce";
import GravitationalPotentialEnergyScreen from "./app/screens/Physics/GravitationalPotentialEnergy";
import GravitationalPotentialEnergyOnAPlanetScreen from "./app/screens/Physics/GravitationalPotentialEnergyOnAPlanet";
import FrictionScreen from "./app/screens/Physics/Friction";
import TorqueScalerScreen from "./app/screens/Physics/TorqueScaler";
import TorqueVectorScreen from "./app/screens/Physics/TorqueVector";
//Chemistry
import BoylesMariotteLawScreen from "./app/screens/Chemistry/BoyleMariotteLaw";
import CharlesLawScreen from "./app/screens/Chemistry/CharlesLaw";

import AsyncStorage from "@react-native-community/async-storage";
import { AdMobInterstitial } from "expo-ads-admob";

export default class App extends Component {
  constructor() {
    super();

    this.Stack = createStackNavigator();
  }

  render() {
    return (
      <NavigationContainer>
        <this.Stack.Navigator initialRouteName="MainScreen" headerMode={false}>
          <this.Stack.Screen name="MainScreen" component={MainScreen} />
          <this.Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <this.Stack.Screen name="SearchScreen" component={SearchScreen} />
          <this.Stack.Screen name="PhysicsScreen" component={SubjectScreen} />
          <this.Stack.Screen
            name="MathematicsScreen"
            component={SubjectScreen}
          />
          <this.Stack.Screen name="ChemistryScreen" component={SubjectScreen} />
          <this.Stack.Screen
            name="QuadraticEquationDetailsScreen"
            component={QuadraticEquationDetailsScreen}
          />
          <this.Stack.Screen
            name="QuadraticEquationCommonRootsScreen"
            component={QuadraticEquationCommonRootsScreen}
          />
          <this.Stack.Screen name="TnOfAPScreen" component={TnOfAPScreen} />
          <this.Stack.Screen name="SnOfAPScreen" component={SnOfAPScreen} />
          <this.Stack.Screen
            name="GPDetailsScreen"
            component={GPDetailsScreen}
          />
          <this.Stack.Screen
            name="VectorDotProductScreen"
            component={VectorDotProductScreen}
          />
          <this.Stack.Screen
            name="VectorCrossProductScreen"
            component={VectorCrossProductScreen}
          />
          <this.Stack.Screen
            name="MatrixDeterminantScreen"
            component={MatrixDeterminantScreen}
          />
          <this.Stack.Screen
            name="PairOfLinearEquationsScreen"
            component={PairOfLinearEquationsScreen}
          />
          <this.Stack.Screen
            name="VectorDetails3DScreen"
            component={VectorDetails3DScreen}
          />

          <this.Stack.Screen
            name="EnergyStoredInACapacitorScreen"
            component={EnergyStoredInACapacitorScreen}
          />
          <this.Stack.Screen
            name="ElasticPotentialEnergyScreen"
            component={ElasticPotentialEnergyScreen}
          />
          <this.Stack.Screen
            name="EscapeVelocityScreen"
            component={EscapeVelocityScreen}
          />
          <this.Stack.Screen
            name="AverageVelocityScreen"
            component={AverageVelocityScreen}
          />
          <this.Stack.Screen
            name="AverageAccelerationScreen"
            component={AverageAccelerationScreen}
          />
          <this.Stack.Screen
            name="RadiusOfMovingChargeInMagneticFieldScreen"
            component={RadiusOfMovingChargeInMagneticFieldScreen}
          />
          <this.Stack.Screen
            name="HeatCurrentScreen"
            component={HeatCurrentScreen}
          />
          <this.Stack.Screen
            name="CoulombsConstantFromPermittivityScreen"
            component={CoulombsConstantFromPermittivityScreen}
          />
          <this.Stack.Screen
            name="DipoleMomentScalerScreen"
            component={DipoleMomentScalerScreen}
          />
          <this.Stack.Screen
            name="DipoleMomentVectorScreen"
            component={DipoleMomentVectorScreen}
          />
          <this.Stack.Screen
            name="ElectrostaticForceScreen"
            component={ElectrostaticForceScreen}
          />
          <this.Stack.Screen
            name="ElectrostaticPotentialEnergyScreen"
            component={ElectrostaticPotentialEnergyScreen}
          />
          <this.Stack.Screen
            name="GravitationalForceScreen"
            component={GravitationalForceScreen}
          />
          <this.Stack.Screen
            name="GravitationalPotentialEnergyScreen"
            component={GravitationalPotentialEnergyScreen}
          />
          <this.Stack.Screen
            name="GravitationalPotentialEnergyOnAPlanetScreen"
            component={GravitationalPotentialEnergyOnAPlanetScreen}
          />
          <this.Stack.Screen name="FrictionScreen" component={FrictionScreen} />
          <this.Stack.Screen
            name="TorqueScalerScreen"
            component={TorqueScalerScreen}
          />
          <this.Stack.Screen
            name="TorqueVectorScreen"
            component={TorqueVectorScreen}
          />

          <this.Stack.Screen
            name="BoylesMariotteLawScreen"
            component={BoylesMariotteLawScreen}
          />
          <this.Stack.Screen
            name="CharlesLawScreen"
            component={CharlesLawScreen}
          />

          <this.Stack.Screen name="StepsScreen" component={StepsScreen} />
        </this.Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
