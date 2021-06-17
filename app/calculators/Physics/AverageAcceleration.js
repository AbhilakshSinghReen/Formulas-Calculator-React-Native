import {
  Convert_VelocityUnits,
  Convert_TimeUnits,
  Convert_AccelerationUnits,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, Velocity, Time, AverageAcceleration, Units
//FIXED: Units order: Velocity, Time, AverageAcceleration
export var Calculate_AverageAcceleration_From_Velocity_Time = function (
  V,
  T,
  vUnit,
  tUnit,
  aUnit
) {
  var Vsi = Convert_VelocityUnits(parseFloat(V), vUnit, "m/s");
  var Tsi = Convert_TimeUnits(parseFloat(T), tUnit, "s");

  var Asi = Vsi / Tsi;
  var A = Convert_AccelerationUnits(Asi, "m/s²", aUnit);
  A = lazy_RoundLongFloatTo10Places(A);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Average acceleration = a;
  Change in velocity = Δv = ${V} ${vUnit}
  Time taken = t = ${T} ${tUnit};  
  `;

  if (tUnit != "s" || vUnit != "m/s") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (vUnit != "m/s") {
      Steps += `
      Δv = ${V} ${vUnit}
      After converting:
      Δv = ${Vsi} m/s
      `;
    }

    if (tUnit != "s" && vUnit != "m/s") {
      Steps += `
      `;
    }
    if (tUnit != "s") {
      Steps += `
      t = ${T} ${tUnit}
      After converting:
      t = ${Tsi} s
      `;
    }
  }

  Steps += `

  Average acceleration is given by:
  a = Δv / t

  Substituting the above values and evaluating:
  a = ${Vsi} / ${Tsi} m/s²
  a = ${Asi} m/s²
  
  `;
  if (aUnit != "m/s²") {
    Steps += `
  Converting 'a' from S.I. units to ${aUnit}:
  a = ${A} ${aUnit}
  `;
  }
  Steps += `
  'a' has been calculated.
  `;

  return [A, Steps];
};

export var Calculate_Velocity_From_Time_AverageAcceleration = function (
  T,
  A,
  vUnit,
  tUnit,
  aUnit
) {
  var Tsi = Convert_TimeUnits(parseFloat(T), tUnit, "s");
  var Asi = Convert_AccelerationUnits(parseFloat(A), aUnit, "m/s²");

  var Vsi = Asi * Tsi;
  var V = Convert_VelocityUnits(Vsi, "m/s", vUnit);
  V = lazy_RoundLongFloatTo10Places(V);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Change in velocity = Δv;    
    Time taken = t = ${T} ${tUnit}
    Average acceleration = a = ${A} ${aUnit};
    `;

  if (tUnit != "s" || aUnit != "m/s²") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (tUnit != "s") {
      Steps += `
        t = ${T} ${tUnit}
        After converting:
        t = ${Tsi} s
        `;
    }

    if (tUnit != "s" && aUnit != "m/s²") {
      Steps += `
        `;
    }
    if (aUnit != "m/s²") {
      Steps += `
        a = ${A} ${aUnit}
        After converting:
        a = ${Asi} m/s²
        `;
    }
  }

  Steps += `
  
    Average acceleration is given by:
    a = Δv / t

    On rearranging the above formula, the total velocity is given by:
    Δv = a * t
  
    Substituting the above values and evaluating:
    Δv = ${Asi} * ${Tsi} m/s
    Δv = ${Vsi} m/s
    
    `;
  if (vUnit != "m/s") {
    Steps += `
    Converting 'Δv' from S.I. units to ${vUnit}:
    Δv = ${V} ${vUnit}
    `;
  }
  Steps += `
    'Δv' has been calculated.
    `;

  return [V, Steps];
};

export var Calculate_Time_From_Velocity_AverageAcceleration = function (
  V,
  A,
  vUnit,
  tUnit,
  aUnit
) {
  var Vsi = Convert_VelocityUnits(parseFloat(V), vUnit, "m/s");
  var Asi = Convert_AccelerationUnits(parseFloat(A), aUnit, "m/s²");

  var Tsi = Vsi / Asi;
  var T = Convert_TimeUnits(Tsi, "s", tUnit);
  T = lazy_RoundLongFloatTo10Places(T);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Time taken = t;
    Change in velocity = Δv = ${V} ${vUnit}
    Average acceleration = a = ${A} ${aUnit};
    `;

  if (aUnit != "m/s²" || vUnit != "m/s") {
    Steps += `Converting the given values to S.I. units:
        `;

    if (vUnit != "m/s") {
      Steps += `
        v = ${V} ${vUnit}
        After converting:
        v = ${Vsi} m/s
        `;
    }

    if (aUnit != "m/s²" && vUnit != "m/s") {
      Steps += `
        `;
    }
    if (aUnit != "m/s²") {
      Steps += `
        a = ${A} ${aUnit}
        After converting:
        a = ${Asi} m/s²
        `;
    }
  }

  Steps += `
    
      Average acceleration is given by:
      a = Δv / t
  
      On rearranging the above formula, the time taken is given by:
      t = Δv / a
    
      Substituting the above values and evaluating:
      t = ${Vsi} / ${Asi} s
      t = ${Tsi} s
      
      `;
  if (tUnit != "s") {
    Steps += `
      Converting 't' from S.I. units to ${tUnit}:
      t = ${T} ${tUnit}
      `;
  }
  Steps += `
      't' has been calculated.
      `;

  return [T, Steps];
};
