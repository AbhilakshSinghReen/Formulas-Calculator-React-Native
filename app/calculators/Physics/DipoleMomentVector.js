import {
  Convert_ChargeUnits,
  Convert_DistanceUnits,
  Convert_DipoleMomentUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import {
  lazy_RoundLongFloatTo10Places,
  roundWithPrecision,
} from "../Mathematics/MathematicsBasics";
import {
  UnitVector_From_Vector,
  MagnitudeOfVector_From_Vector,
} from "../Mathematics/Vectors";

//Order: Calculate, Charge, Length, DipoleMoment, Units
//FIXED: Units order: Charge, Length, DipoleMoment
//Formula: P = q * l
export var Calculate_DipoleMoment_From_Charge_Length = function (
  q,
  lx,
  ly,
  lz,
  qUnit,
  lUnit,
  pUnit
) {
  var Qsi = Convert_ChargeUnits(parseFloat(q), qUnit, "C");
  var Lxsi = Convert_DistanceUnits(parseFloat(lx), lUnit, "m");
  var Lysi = Convert_DistanceUnits(parseFloat(ly), lUnit, "m");
  var Lzsi = Convert_DistanceUnits(parseFloat(lz), lUnit, "m");

  var Pxsi = Qsi * Lxsi;
  var Pysi = Qsi * Lysi;
  var Pzsi = Qsi * Lzsi;

  var Px = Convert_DipoleMomentUnits(Pxsi, "C.m", pUnit);
  var Py = Convert_DipoleMomentUnits(Pysi, "C.m", pUnit);
  var Pz = Convert_DipoleMomentUnits(Pzsi, "C.m", pUnit);

  Px = lazy_RoundLongFloatTo10Places(Px);
  Py = lazy_RoundLongFloatTo10Places(Py);
  Pz = lazy_RoundLongFloatTo10Places(Pz);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Dipole moment = P;
  Charge at each end = q = ${q} ${qUnit}
  Vector from negative charge to positive charge = L = ${lx}i + ${ly}j + ${lz}k ${lUnit};  
  `;

  if (qUnit != "C" || lUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (qUnit != "C") {
      Steps += Get_Unit_Conversion_Text("q", q, qUnit, Qsi, "C");
    }
    if (lUnit != "m") {
      Steps += Get_Unit_Conversion_Text("Lx", lx, lUnit, Lxsi, "m");
      Steps += Get_Unit_Conversion_Text("Ly", ly, lUnit, Lysi, "m");
      Steps += Get_Unit_Conversion_Text("Lz", lz, lUnit, Lzsi, "m");
    }
  }

  Steps += `

  The dipole moment is given by:
  P = q * (L)

  P and L are vectors and q is a scaler.

  Substituting the above values and evaluating:
  P = ${Qsi} * (${Lxsi}i + ${Lysi}j + ${Lzsi}k) C.m
  P = ${Pxsi}i + ${Pysi}j + ${Pzsi}k C.m
  
  
  `;
  if (pUnit != "C.m") {
    Steps += `
  Converting 'P' from S.I. units to ${pUnit}:
  Px = ${Px} ${pUnit}
  Py = ${Py} ${pUnit}
  Pz = ${Pz} ${pUnit}
  `;
  }
  Steps += `
  'P' has been calculated.
  `;

  return [Px, Py, Pz, Steps];
};

export var Calculate_Charge_From_Length_DipoleMoment = function (
  Lx,
  Ly,
  Lz,
  Px,
  Py,
  Pz,
  qUnit,
  lUnit,
  pUnit,
  precision
) {
  var Lxsi = Convert_DistanceUnits(parseFloat(lx), lUnit, "m");
  var Lysi = Convert_DistanceUnits(parseFloat(ly), lUnit, "m");
  var Lzsi = Convert_DistanceUnits(parseFloat(lz), lUnit, "m");

  var Pxsi = Convert_DipoleMomentUnits(Px, pUnit, "C.m");
  var Pysi = Convert_DipoleMomentUnits(Py, pUnit, "C.m");
  var Pzsi = Convert_DipoleMomentUnits(Pz, pUnit, "C.m");

  var Qxsi = Pxsi / Lxsi;
  var Qysi = Pysi / Lysi;
  var Qzsi = Pzsi / Lzsi;

  var inconsistentVectorsError = false;

  var roundedQxsi = roundWithPrecision(Qxsi, precision);
  var roundedQysi = roundWithPrecision(Qysi, precision);
  var roundedQzsi = roundWithPrecision(Qzsi, precision);

  if (
    roundedQxsi != roundedQysi ||
    roundedQysi != roundedQzsi ||
    roundedQzsi != roundedQxsi
  ) {
    inconsistentVectorsError = true;
  }

  var Q = Convert_ChargeUnits(Qxsi, "C", qUnit);
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
