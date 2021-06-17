import {
  Convert_ForceUnits,
  Convert_DistanceUnits,
  Convert_TorqueUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

import { CrossProduct_Two_Vectors } from "../Mathematics/Vectors";

//Order: Calculate, Force, LengthVector, Torque
//FIXED: Units order: Force, LengthVector, Torque

export var Calculate_Torque_From_LengthVector_Force = function (
  Lx,
  Ly,
  Lz,
  Fx,
  Fy,
  Fz,
  fUnit,
  lUnit,
  tUnit
) {
  var Lxsi = Convert_DistanceUnits(parseFloat(Lx), lUnit, "m");
  var Lysi = Convert_DistanceUnits(parseFloat(Ly), lUnit, "m");
  var Lzsi = Convert_DistanceUnits(parseFloat(Lz), lUnit, "m");

  var Fxsi = Convert_ForceUnits(parseFloat(Fx), fUnit, "N");
  var Fysi = Convert_ForceUnits(parseFloat(Fy), fUnit, "N");
  var Fzsi = Convert_ForceUnits(parseFloat(Fz), fUnit, "N");

  var T = CrossProduct_Two_Vectors(Lxsi, Lysi, Lzsi, Fxsi, Fysi, Fzsi);

  var Txsi = T[0];
  var Tysi = T[1];
  var Tzsi = T[2];
  var Tx = Convert_TorqueUnits(Txsi, "N.m", tUnit);
  var Ty = Convert_TorqueUnits(Tysi, "N.m", tUnit);
  var Tz = Convert_TorqueUnits(Tzsi, "N.m", tUnit);
  Tx = lazy_RoundLongFloatTo10Places(Tx);
  Ty = lazy_RoundLongFloatTo10Places(Ty);
  Tz = lazy_RoundLongFloatTo10Places(Tz);

  T = [Tx, Ty, Tz];

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Torque = T;
  Force = F = ${Fx}x + ${Fy}y + ${Fz}z ${fUnit}
  Length vector = L = ${Lx}x + ${Ly}y + ${Lz}z ${lUnit};
  `;

  if (fUnit != "N" || lUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fx", Fx, fUnit, Fxsi, "N");
      Steps += Get_Unit_Conversion_Text("Fy", Fy, fUnit, Fysi, "N");
      Steps += Get_Unit_Conversion_Text("Fz", Fz, fUnit, Fzsi, "N");
    }

    if (lUnit != "m") {
      Steps += Get_Unit_Conversion_Text("Lx", Lx, lUnit, Lxsi, "m");
      Steps += Get_Unit_Conversion_Text("Ly", Ly, lUnit, Lysi, "m");
      Steps += Get_Unit_Conversion_Text("Lz", Lz, lUnit, Lzsi, "m");
    }
  }

  Steps += `

  Torque is given by:
  T = F x L

  Substituting the above values and evaluating:
  T = (${Fx}x + ${Fy}y + ${Fz}z) x (${Lx}x + ${Ly}y + ${Lz}z) N.m
  T = ${Txsi}x + ${Tysi}y + ${Tzsi}z N.m
  
  `;
  if (tUnit != "N.m") {
    Steps += `
  Converting 'T' from S.I. units to ${tUnit}:
  T = ${Tx}x + ${Ty}y + ${Tz}z ${tUnit}
  `;
  }
  Steps += `
  'T' has been calculated.
  `;

  return [T, Steps];
};
