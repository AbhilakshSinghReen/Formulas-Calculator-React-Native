import {
  Convert_ChargeUnits,
  Convert_DistanceUnits,
  Convert_DipoleMomentUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, Charge, Length, DipoleMoment, Units
//FIXED: Units order: Charge, Length, DipoleMoment
//Formula: P = q * l
export var Calculate_DipoleMoment_From_Charge_Length = function (
  q,
  l,
  qUnit,
  lUnit,
  pUnit
) {
  var Qsi = Convert_ChargeUnits(parseFloat(q), qUnit, "C");
  var Lsi = Convert_DistanceUnits(parseFloat(l), lUnit, "m");

  var Psi = Qsi * Lsi;
  var P = Convert_DipoleMomentUnits(Psi, "C.m", pUnit);
  P = lazy_RoundLongFloatTo10Places(P);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Magnitude of dipole moment = P;
  Charge at each end = q = ${q} ${qUnit}
  Distance between the 2 charges = l = ${l} ${lUnit};  
  `;

  if (qUnit != "C" || lUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (qUnit != "C") {
      Steps += `
      q = ${q} ${qUnit}
      After converting:
      q = ${Qsi} C

      `;
    }

    if (qUnit != "C") {
      Steps += Get_Unit_Conversion_Text("q", q, qUnit, Qsi, "C");
    }
    if (lUnit != "m") {
      Steps += `
      l = ${l} ${lUnit}
      After converting:
      l = ${Lsi} m

      `;
    }
  }

  Steps += `

  The magnitude of the dipole moment is given by:
  P = q * l

  Substituting the above values and evaluating:
  P = ${Qsi} * ${Lsi} C.m
  P = ${Psi} C.m
  
  `;
  if (pUnit != "C.m") {
    Steps += `
  Converting 'P' from S.I. units to ${pUnit}:
  P = ${P} ${pUnit}
  `;
  }
  Steps += `
  'P' has been calculated.
  `;

  return [P, Steps];
};

export var Calculate_Charge_From_Length_DipoleMoment = function (
  l,
  P,
  qUnit,
  lUnit,
  pUnit
) {
  var Lsi = Convert_DistanceUnits(parseFloat(l), lUnit, "m");
  var Psi = Convert_DipoleMomentUnits(parseFloat(P), pUnit, "C.m");

  var Qsi = Psi / Lsi;
  var Q = Convert_ChargeUnits(Qsi, "C", qUnit);
  Q = lazy_RoundLongFloatTo10Places(Q);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Charge at each end = q;
  Distance between the 2 charges = l = ${l} ${lUnit}
  Magnitude of dipole moment = P = ${P} ${pUnit};
  `;

  if (pUnit != "C.m" || lUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (lUnit != "m") {
      Steps += `
      l = ${l} ${lUnit}
      After converting:
      l = ${Lsi} m

      `;
    }

    if (pUnit != "C.m") {
      Steps += `
      P = ${P} ${pUnit}
      After converting:
      P = ${Psi} C.m

      `;
    }
  }

  Steps += `

  The magnitude of the dipole moment is given by:
  P = q * l

  On rearranging the above formula, the charge at each end is given by:
  q = P / l

  Substituting the above values and evaluating:
  q = ${Psi} / ${Lsi} C
  q = ${Qsi} C
  
  `;
  if (qUnit != "C") {
    Steps += `
  Converting 'Q' from S.I. units to ${qUnit}:
  Q = ${Q} ${qUnit}
  `;
  }
  Steps += `
  'Q' has been calculated.
  `;

  return [Q, Steps];
};

export var Calculate_Length_From_Charge_DipoleMoment = function (
  q,
  P,
  qUnit,
  lUnit,
  pUnit
) {
  var Qsi = Convert_ChargeUnits(parseFloat(q), qUnit, "C");
  var Psi = Convert_DipoleMomentUnits(parseFloat(P), pUnit, "C.m");

  var Lsi = Psi / Qsi;
  var L = Convert_DistanceUnits(Lsi, "m", lUnit);
  L = lazy_RoundLongFloatTo10Places(L);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Distance between the 2 charges = l;
  Charge at each end = q = ${q} ${qUnit}
  Magnitude of dipole moment = P = ${P} ${pUnit};
  `;

  if (pUnit != "C.m" || qUnit != "C") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (qUnit != "C") {
      Steps += `
      q = ${q} ${qUnit}
      After converting:
      q = ${Qsi} C

      `;
    }

    if (pUnit != "C.m") {
      Steps += `
      P = ${P} ${pUnit}
      After converting:
      P = ${Psi} C.m

      `;
    }
  }

  Steps += `

  The magnitude of the dipole moment is given by:
  P = q * l

  On rearranging the above formula, the distance between the 2 charges is given by:
  l = P / q

  Substituting the above values and evaluating:
  l = ${Psi} / ${Qsi} m
  l = ${Lsi} m
  
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
