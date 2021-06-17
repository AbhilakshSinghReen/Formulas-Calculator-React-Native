import {
  Convert_ForceUnits,
  Convert_DistanceUnits,
  Convert_TorqueUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, Force, PerpendicularDistance, Torque
//FIXED: Units order: Force, PerpendicularDistance, Torque

export var Calculate_Torque_From_Force_PerpendicularDistance = function (
  F,
  L,
  fUnit,
  lUnit,
  tUnit
) {
  var Fsi = Convert_ForceUnits(parseFloat(F), fUnit, "N");
  var Lsi = Convert_DistanceUnits(parseFloat(L), lUnit, "m");

  var Tsi = Fsi * Lsi;
  var T = Convert_TorqueUnits(Tsi, "N.m", tUnit);
  T = lazy_RoundLongFloatTo10Places(T);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Torque = T;
  Force = F = ${F} ${fUnit}
  Perpendicular distance between the force and the point of rotation = L = ${L} ${lUnit};
  `;

  if (fUnit != "N" || lUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("F", F, fUnit, Fsi, "N");
    }

    if (lUnit != "m") {
      Steps += Get_Unit_Conversion_Text("L", L, lUnit, Lsi, "m");
    }
  }

  Steps += `

  Magnitude of torque is given by:
  T = F * L

  Substituting the above values and evaluating:
  T = ${Fsi} * ${Lsi} N.m
  T = ${Tsi} N.m
  
  `;
  if (tUnit != "N.m") {
    Steps += `
  Converting 'T' from S.I. units to ${tUnit}:
  T = ${T} ${tUnit}
  `;
  }
  Steps += `
  'T' has been calculated.
  `;

  return [T, Steps];
};

export var Calculate_Force_From_PerpendicularDistance_Torque = function (
  L,
  T,
  fUnit,
  lUnit,
  tUnit
) {
  var Lsi = Convert_DistanceUnits(parseFloat(L), lUnit, "m");
  var Tsi = Convert_TorqueUnits(parseFloat(T), tUnit, "N.m");

  var Fsi = Tsi / Lsi;
  var F = Convert_ForceUnits(Fsi, "N", fUnit);
  F = lazy_RoundLongFloatTo10Places(F);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Force = F;  
  Perpendicular distance between the force and the point of rotation = L = ${L} ${lUnit}
  Torque = T = ${T} ${tUnit};
  `;

  if (tUnit != "N.m" || lUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (lUnit != "m") {
      Steps += Get_Unit_Conversion_Text("L", L, lUnit, Lsi, "m");
    }

    if (tUnit != "N.m") {
      Steps += Get_Unit_Conversion_Text("T", T, tUnit, Tsi, "N.m");
    }
  }

  Steps += `

  Magnitude of torque is given by:
  T = F * L

  On rearranging the above equation, the force is given by:
  F = T / L

  Substituting the above values and evaluating:
  F = ${Tsi} / ${Lsi} N
  F = ${Fsi} N
  
  `;
  if (fUnit != "N") {
    Steps += `
  Converting 'F' from S.I. units to ${fUnit}:
  F = ${F} ${fUnit}
  `;
  }
  Steps += `
  'F' has been calculated.
  `;

  return [F, Steps];
};

export var Calculate_PerpendicularDistance_From_Force_Torque = function (
  F,
  T,
  fUnit,
  lUnit,
  tUnit
) {
  var Fsi = Convert_ForceUnits(parseFloat(F), fUnit, "N");
  var Tsi = Convert_TorqueUnits(parseFloat(T), tUnit, "N.m");

  var Lsi = Tsi / Fsi;
  var L = Convert_DistanceUnits(Lsi, "m", lUnit);
  L = lazy_RoundLongFloatTo10Places(L);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Perpendicular distance between the force and the point of rotation = L;
  Force = F = ${F} ${fUnit}
  Torque = T = ${T} ${tUnit};
  `;

  if (tUnit != "N.m" || fUnit != "N") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("F", F, fUnit, Fsi, "N");
    }

    if (tUnit != "N.m") {
      Steps += Get_Unit_Conversion_Text("T", T, tUnit, Tsi, "N.m");
    }
  }

  Steps += `

  Magnitude of torque is given by:
  T = F * L

  On rearranging the above equation, the perpendicular distance is given by:
  L = T / F

  Substituting the above values and evaluating:
  L = ${Tsi} / ${Fsi} m
  L = ${Lsi} m
  
  `;
  if (lUnit != "m") {
    Steps += `
  Converting 'L' from S.I. units to ${lUnit}:
  L = ${L} ${lUnit}
  `;
  }
  Steps += `
  'L' has been calculated.
  `;

  return [L, Steps];
};
