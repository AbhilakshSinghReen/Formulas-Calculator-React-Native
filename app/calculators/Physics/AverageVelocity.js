import {
  Convert_DistanceUnits,
  Convert_TimeUnits,
  Convert_VelocityUnits,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, Displacement, Time, AverageVelocity, Units
//FIXED: Units order: Displacement, Time, AverageVelocity
export var Calculate_AverageVelocity_From_Displacement_Time = function (
  X,
  T,
  xUnit,
  tUnit,
  vUnit
) {
  var Xsi = Convert_DistanceUnits(parseFloat(X), xUnit, "m");
  var Tsi = Convert_TimeUnits(parseFloat(T), tUnit, "s");

  var Vsi = Xsi / Tsi;
  var V = Convert_VelocityUnits(Vsi, "m/s", vUnit);
  V = lazy_RoundLongFloatTo10Places(V);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Average velocity = v;
  Total displacement = x = ${X} ${xUnit}
  Time taken = t = ${T} ${tUnit};  
  `;

  if (tUnit != "s" || xUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (xUnit != "m") {
      Steps += `
      x = ${X} ${xUnit}
      After converting:
      x = ${Xsi} m
      `;
    }

    if (tUnit != "s" && xUnit != "m") {
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

  Average velocity is given by:
  v = x / t

  Substituting the above values and evaluating:
  v = ${Xsi} / ${Tsi} m/s
  v = ${Vsi} m/s
  
  `;
  if (vUnit != "m/s") {
    Steps += `
  Converting 'v' from S.I. units to ${vUnit}:
  v = ${V} ${vUnit}
  `;
  }
  Steps += `
  'v' has been calculated.
  `;

  return [V, Steps];
};

export var Calculate_Displacement_From_Time_AverageVelocity = function (
  T,
  V,
  xUnit,
  tUnit,
  vUnit
) {
  var Tsi = Convert_TimeUnits(parseFloat(T), tUnit, "s");
  var Vsi = Convert_VelocityUnits(parseFloat(V), vUnit, "m/s");

  var Xsi = Vsi * Tsi;
  var X = Convert_DistanceUnits(Xsi, "m", xUnit);
  X = lazy_RoundLongFloatTo10Places(X);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Total displacement = x;    
    Time taken = t = ${T} ${tUnit}
    Average velocity = v = ${V} ${vUnit};
    `;

  if (tUnit != "s" || vUnit != "m/s") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (tUnit != "s") {
      Steps += `
        t = ${T} ${tUnit}
        After converting:
        t = ${Tsi} s
        `;
    }

    if (tUnit != "s" && vUnit != "m/s") {
      Steps += `
        `;
    }
    if (vUnit != "m/s") {
      Steps += `
        v = ${V} ${vUnit}
        After converting:
        v = ${Vsi} m/s
        `;
    }
  }

  Steps += `
  
    Average velocity is given by:
    v = x / t

    On rearranging the above formula, the total displacement is given by:
    x = v * t
  
    Substituting the above values and evaluating:
    x = ${Vsi} * ${Tsi} m
    x = ${Xsi} m
    
    `;
  if (xUnit != "m") {
    Steps += `
    Converting 'x' from S.I. units to ${xUnit}:
    x = ${X} ${xUnit}
    `;
  }
  Steps += `
    'x' has been calculated.
    `;

  return [X, Steps];
};

export var Calculate_Time_From_Displacement_AverageVelocity = function (
  X,
  V,
  xUnit,
  tUnit,
  vUnit
) {
  var Xsi = Convert_DistanceUnits(parseFloat(X), xUnit, "m");
  var Vsi = Convert_VelocityUnits(parseFloat(V), vUnit, "m/s");

  var Tsi = Xsi / Vsi;
  var T = Convert_TimeUnits(Tsi, "s", tUnit);
  T = lazy_RoundLongFloatTo10Places(T);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Time taken = t;
    Total displacement = x = ${X} ${xUnit}
    Average velocity = v = ${V} ${vUnit};
    `;

  if (xUnit != "m" || vUnit != "m/s") {
    Steps += `Converting the given values to S.I. units:
        `;

    if (xUnit != "m") {
      Steps += `
        x = ${X} ${xUnit}
        After converting:
        x = ${Xsi} m
        `;
    }

    if (xUnit != "m" && vUnit != "m/s") {
      Steps += `
        `;
    }
    if (vUnit != "m/s") {
      Steps += `
        v = ${V} ${vUnit}
        After converting:
        v = ${Vsi} m/s
        `;
    }
  }

  Steps += `
    
      Average velocity is given by:
      v = x / t
  
      On rearranging the above formula, the time taken is given by:
      t = x / v
    
      Substituting the above values and evaluating:
      t = ${Xsi} / ${Vsi} s
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
