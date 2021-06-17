import {
  Convert_MassUnits,
  Convert_DistanceUnits,
  Convert_VelocityUnits,
} from "../Conversions";

import { Universal_Gravitational_Constant } from "../Constants";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, Mass, Radius, EscapeVelocity, Units
//FIXED: Units order: Mass, Radius, EscapeVelocity
export var Calculate_EscapeVelocity_From_Mass_Radius = function (
  M,
  R,
  mUnit,
  rUnit,
  vUnit
) {
  var G = Universal_Gravitational_Constant[0];
  var G_Display = Universal_Gravitational_Constant[3];
  var gUnit = Universal_Gravitational_Constant[4];

  var Msi = Convert_MassUnits(parseFloat(M), mUnit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(R), rUnit, "m");

  var Vsi = Math.sqrt(Math.abs((2 * G * Msi) / Rsi));
  var V = Convert_VelocityUnits(Vsi, "m/s", vUnit);
  V = lazy_RoundLongFloatTo10Places(V);

  var G_into_Msi = G * Msi;
  var G_into_Msi__into_2 = 2 * G_into_Msi;
  var G_into_Msi__into_2___by___Rsi = G_into_Msi__into_2 / Rsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Escape velocity = Vₑ;
  Mass of the centre body = M = ${M} ${mUnit}
  Radius of the centre body = r = ${R} ${rUnit};  
  `;

  if (mUnit != "kg" || rUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += `
    M = ${M} ${mUnit}
    After converting:
    M = ${Msi} kg
    `;
    }

    if (mUnit != "kg" && rUnit != "m") {
      Steps += `
      `;
    }

    if (rUnit != "m") {
      Steps += `
    r = ${R} ${rUnit}
    After converting:
    r = ${Rsi} m
    `;
    }
  }

  Steps += `

  Escape velocity is given by:
  Vₑ = sqrt(2 * G * M / r)

  Substituting the above values and evaluating:
  Vₑ = sqrt(2 * ${G_Display} * ${Msi} / ${Rsi}) m/s
  Vₑ = sqrt(2 * ${G_into_Msi} / ${Rsi}) m/s
  Vₑ = sqrt(${G_into_Msi__into_2} / ${Rsi}) m/s
  Vₑ = sqrt(${G_into_Msi__into_2___by___Rsi}) m/s
  Vₑ = ${Vsi} m/s
  
  
  `;
  if (vUnit != "m/s") {
    Steps += `
  Converting 'Vₑ' from S.I. units to ${vUnit}:
  Vₑ = ${V} ${vUnit}
  `;
  }
  Steps += `
  'Vₑ' has been calculated.
  `;

  return [V, Steps];
};

export var Calculate_Mass_From_Radius_EscapeVelocity = function (
  R,
  Ve,
  mUnit,
  rUnit,
  vUnit
) {
  var G = Universal_Gravitational_Constant[0];
  var G_Display = Universal_Gravitational_Constant[3];
  var gUnit = Universal_Gravitational_Constant[4];

  var Rsi = Convert_DistanceUnits(parseFloat(R), rUnit, "m");
  var Vsi = Convert_VelocityUnits(parseFloat(Ve), vUnit, "m/s");

  var Msi = (Rsi * Vsi * Vsi) / (2 * G);
  var M = Convert_MassUnits(Msi, "kg", mUnit);
  M = lazy_RoundLongFloatTo10Places(M);

  var Vsi_squared = Vsi * Vsi;
  var G_into_2 = 2 * G;
  var Rsi__into__Vsi_squared = Rsi * Vsi_squared;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Mass of the centre body = M;  
  Radius of the centre body = r = ${R} ${rUnit}
  Escape velocity = Vₑ = ${Ve} ${vUnit};  
  `;

  if (vUnit != "m/s" || rUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (rUnit != "m") {
      Steps += `
    r = ${R} ${rUnit}
    After converting:
    r = ${Rsi} m
    `;
    }

    if (vUnit != "m/s" && rUnit != "m") {
      Steps += `
      `;
    }

    if (vUnit != "m/s") {
      Steps += `
    Vₑ = ${Ve} ${vUnit}
    After converting:
    Vₑ = ${Vsi} m/s
    `;
    }
  }

  Steps += `

  Escape velocity is given by:
  Vₑ = sqrt(2 * G * M / r)

  On rearranging the above formula, the mass of the centre body is given by:
  M = r * Vₑ² / (2 * G)

  Substituting the above values and evaluating:
  M = ${Rsi} * ${Vsi}² / (2 * ${G_Display}) kg
  M = ${Rsi} * ${Vsi_squared} / ${G_into_2} kg
  M = ${Rsi__into__Vsi_squared} / ${G_into_2} kg
  M = ${Msi} 
  
  `;
  if (mUnit != "kg") {
    Steps += `
  Converting 'M' from S.I. units to ${mUnit}:
  M = ${M} ${mUnit}
  `;
  }
  Steps += `
  'M' has been calculated.
  `;

  return [M, Steps];
};

export var Calculate_Radius_From_Mass_EscapeVelocity = function (
  M,
  Ve,
  mUnit,
  rUnit,
  vUnit
) {
  var G = Universal_Gravitational_Constant[0];
  var G_Display = Universal_Gravitational_Constant[3];
  var gUnit = Universal_Gravitational_Constant[4];

  var Msi = Convert_MassUnits(parseFloat(M), mUnit, "kg");
  var Vsi = Convert_VelocityUnits(parseFloat(Ve), vUnit, "m/s");

  var Rsi = (2 * G * Msi) / (Vsi * Vsi);
  var R = Convert_DistanceUnits(Rsi, "m", rUnit);
  R = lazy_RoundLongFloatTo10Places(R);

  var Vsi_squared = Vsi * Vsi;
  var G_into_Msi = G * Msi;
  var G_into_Msi__into__2 = 2 * G_into_Msi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Radius of the centre body = r;  
  Mass of the centre body = M = ${M} ${mUnit}
  Escape velocity = Vₑ = ${Ve} ${vUnit};  
  `;

  if (vUnit != "m/s" || mUnit != "kg") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += `
    M = ${M} ${mUnit}
    After converting:
    M = ${Msi} kg
    `;
    }

    if (vUnit != "m/s" && mUnit != "kg") {
      Steps += `
      `;
    }

    if (vUnit != "m/s") {
      Steps += `
    Vₑ = ${Ve} ${vUnit}
    After converting:
    Vₑ = ${Vsi} m/s
    `;
    }
  }

  Steps += `

  Escape velocity is given by:
  Vₑ = sqrt(2 * G * M / r)

  On rearranging the above formula, the radius of the centre body is given by:
  r = 2 * G * M / Vₑ²

  Substituting the above values and evaluating:
  r = 2 * ${G_Display} * ${Msi} / ${Vsi}² m
  r = 2 * ${G_into_Msi} / ${Vsi_squared} m
  r = ${G_into_Msi__into__2} / ${Vsi_squared} m
  r = ${Rsi} m
  
  `;
  if (rUnit != "m") {
    Steps += `
  Converting 'r' from S.I. units to ${rUnit}:
  r = ${R} ${rUnit}
  `;
  }
  Steps += `
  'r' has been calculated.
  `;

  return [R, Steps];
};
