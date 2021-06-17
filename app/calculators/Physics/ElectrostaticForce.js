import {
  Convert_CoulombsConstantUnits,
  Convert_ChargeUnits,
  Convert_DistanceUnits,
  Convert_ForceUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, CoulombsConstant, Charge1, Charge2, Distance, ElectrostaticForce
//FIXED: Units order: CoulombsConstant, Charge1, Charge2, Distance, ElectrostaticForce
//FORMULA: Fₑ = (k * Q₁ * Q₂) / r²
export var Calculate_ElectrostaticForce_From_CoulombsConstant_Charge1_Charge2_Distance = function (
  k,
  q1,
  q2,
  r,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  fUnit
) {
  var Ksi = Convert_CoulombsConstantUnits(parseFloat(k), kUnit, "N·m²/C²");
  var Q1si = Convert_ChargeUnits(parseFloat(q1), q1Unit, "C");
  var Q2si = Convert_ChargeUnits(parseFloat(q2), q2Unit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");

  var Fsi = (Ksi * Q1si * Q2si) / Math.pow(Rsi, 2);

  var f = Convert_ForceUnits(Fsi, "N", fUnit);
  f = lazy_RoundLongFloatTo10Places(f);

  var Ksi_Into_Q1si_Into_Q2si = Ksi * Q1si * Q2si;
  var Rsi_Squared = Rsi * Rsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Electrostatic force = Fₑ;
  Coulomb's constant = k = ${k} ${kUnit}
  First charge = Q₁ = ${q1} ${q1Unit}
  Second charge = Q₂ = ${q2} ${q2Unit}
  Distance between the 2 charges = r = ${r} ${rUnit};
  `;

  if (kUnit != "N·m²/C²" || q1Unit != "C" || q2Unit != "C" || rUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "N·m²/C²") {
      Steps += Get_Unit_Conversion_Text("k", k, kUnit, Ksi, "N·m²/C²");
    }

    if (q1Unit != "C") {
      Steps += Get_Unit_Conversion_Text("Q₁", q1, q1Unit, Q1si, "C");
    }

    if (q2Unit != "C") {
      Steps += Get_Unit_Conversion_Text("Q₂", q2, q2Unit, Q2si, "C");
    }

    if (rUnit != "m") {
      Steps += Get_Unit_Conversion_Text("r", r, rUnit, Rsi, "m");
    }
  }

  Steps += `

  Magnitude of electrostatic force is given by:
  Fₑ = (k * Q₁ * Q₂) / r²

  Substituting the above values and evaluating:
  Fₑ = (${Ksi} * ${Q1si} * ${Q2si}) / ${Rsi}² N
  Fₑ = ${Ksi_Into_Q1si_Into_Q2si} / ${Rsi_Squared} N
  Fₑ = ${Fsi} N
  
  `;
  if (fUnit != "N") {
    Steps += `
  Converting 'Fₑ' from S.I. units to ${fUnit}:
  Fₑ = ${f} ${fUnit}
  `;
  }
  Steps += `
  'Fₑ' has been calculated.
  `;

  return [f, Steps];
};

export var Calculate_CoulombsConstant_From_Charge1_Charge2_Distance_ElectrostaticForce = function (
  q1,
  q2,
  r,
  f,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  fUnit
) {
  var Q1si = Convert_ChargeUnits(parseFloat(q1), q1Unit, "C");
  var Q2si = Convert_ChargeUnits(parseFloat(q2), q2Unit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Fsi = Convert_ForceUnits(parseFloat(f), fUnit, "N");

  var Ksi = (Fsi * Math.pow(Rsi, 2)) / (Q1si * Q2si);

  var k = Convert_CoulombsConstantUnits(Ksi, "N·m²/C²", kUnit);
  k = lazy_RoundLongFloatTo10Places(k);

  var Rsi_Squared = Rsi * Rsi;
  var Fsi__Into__Rsi_Squared = Fsi * Rsi_Squared;
  var Q1si_Into_Q2si = Q1si * Q2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Coulomb's constant = k;  
  First charge = Q₁ = ${q1} ${q1Unit}
  Second charge = Q₂ = ${q2} ${q2Unit}
  Distance between the 2 charges = r = ${r} ${rUnit}
  Electrostatic force = Fₑ = ${f} ${fUnit};
  `;

  if (fUnit != "N" || q1Unit != "C" || q2Unit != "C" || rUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (q1Unit != "C") {
      Steps += Get_Unit_Conversion_Text("Q₁", q1, q1Unit, Q1si, "C");
    }

    if (q2Unit != "C") {
      Steps += Get_Unit_Conversion_Text("Q₂", q2, q2Unit, Q2si, "C");
    }

    if (rUnit != "m") {
      Steps += Get_Unit_Conversion_Text("r", r, rUnit, Rsi, "m");
    }

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fₑ", f, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Magnitude of electrostatic force is given by:
  Fₑ = (k * Q₁ * Q₂) / r²

  On rearranging the above formula, the Coulomb's constant is given by:
  k = (Fₑ * r²) / (Q₁ * Q₂)

  Substituting the above values and evaluating:
  k = (${Fsi} * ${Rsi}²) / (${Q1si} * ${Q2si}) N·m²/C²
  k = (${Fsi} * ${Rsi_Squared}) / (${Q1si} * ${Q2si}) N·m²/C²
  k = ${Fsi__Into__Rsi_Squared} / ${Q1si_Into_Q2si} N·m²/C²
  k = ${Ksi} N·m²/C²
  
  `;
  if (kUnit != "N·m²/C²") {
    Steps += `
  Converting 'k' from S.I. units to ${kUnit}:
  k = ${k} ${kUnit}
  `;
  }
  Steps += `
  'k' has been calculated.
  `;

  return [k, Steps];
};

export var Calculate_Charge1_From_CoulombsConstant_Charge2_Distance_ElectrostaticForce = function (
  k,
  q2,
  r,
  f,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  fUnit
) {
  var Ksi = Convert_CoulombsConstantUnits(parseFloat(k), kUnit, "N·m²/C²");
  var Q2si = Convert_ChargeUnits(parseFloat(q2), q2Unit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Fsi = Convert_ForceUnits(parseFloat(f), fUnit, "N");

  var Q1si = (Fsi * Math.pow(Rsi, 2)) / (Ksi * Q2si);

  var q1 = Convert_ChargeUnits(Q1si, "C", q1Unit);
  q1 = lazy_RoundLongFloatTo10Places(q1);

  var Rsi_Squared = Rsi * Rsi;
  var Fsi__Into__Rsi_Squared = Fsi * Rsi_Squared;
  var Ksi_Into_Q2si = Ksi * Q2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  First charge = Q₁;
  Coulomb's constant = k = ${k} ${kUnit}
  Second charge = Q₂ = ${q2} ${q2Unit}
  Distance between the 2 charges = r = ${r} ${rUnit}
  Electrostatic force = Fₑ = ${f} ${fUnit};
  `;

  if (fUnit != "N" || kUnit != "N·m²/C²" || q2Unit != "C" || rUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "N·m²/C²") {
      Steps += Get_Unit_Conversion_Text("k", k, kUnit, Ksi, "N·m²/C²");
    }

    if (q2Unit != "C") {
      Steps += Get_Unit_Conversion_Text("Q₂", q2, q2Unit, Q2si, "C");
    }

    if (rUnit != "m") {
      Steps += Get_Unit_Conversion_Text("r", r, rUnit, Rsi, "m");
    }

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fₑ", f, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Magnitude of electrostatic force is given by:
  Fₑ = (k * Q₁ * Q₂) / r²

  On rearranging the above formula, the First charge is given by:
  Q₁ = (Fₑ * r²) / (k * Q₂)

  Substituting the above values and evaluating:
  Q₁ = (${Fsi} * ${Rsi}²) / (${Ksi} * ${Q2si}) C
  Q₁ = (${Fsi} * ${Rsi_Squared}) / (${Ksi} * ${Q2si}) C
  Q₁ = ${Fsi__Into__Rsi_Squared} / ${Ksi_Into_Q2si} C
  Q₁ = ${Q1si} C
  
  `;
  if (q1Unit != "C") {
    Steps += `
  Converting 'Q₁' from S.I. units to ${q1Unit}:
  Q₁ = ${q1} ${q1Unit}
  `;
  }
  Steps += `
  'Q₁' has been calculated.
  `;

  return [q1, Steps];
};

export var Calculate_Charge2_From_CoulombsConstant_Charge1_Distance_ElectrostaticForce = function (
  k,
  q1,
  r,
  f,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  fUnit
) {
  var Ksi = Convert_CoulombsConstantUnits(parseFloat(k), kUnit, "N·m²/C²");
  var Q1si = Convert_ChargeUnits(parseFloat(q1), q1Unit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Fsi = Convert_ForceUnits(parseFloat(f), fUnit, "N");

  var Q2si = (Fsi * Math.pow(Rsi, 2)) / (Ksi * Q1si);

  var q2 = Convert_ChargeUnits(Q2si, "C", q2Unit);
  q2 = lazy_RoundLongFloatTo10Places(q2);

  var Rsi_Squared = Rsi * Rsi;
  var Fsi__Into__Rsi_Squared = Fsi * Rsi_Squared;
  var Ksi_Into_Q1si = Ksi * Q1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Second charge = Q₂;
  Coulomb's constant = k = ${k} ${kUnit}
  First charge = Q₁ = ${q1} ${q1Unit}
  Distance between the 2 charges = r = ${r} ${rUnit}
  Electrostatic force = Fₑ = ${f} ${fUnit};
  `;

  if (fUnit != "N" || kUnit != "N·m²/C²" || q1Unit != "C" || rUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "N·m²/C²") {
      Steps += Get_Unit_Conversion_Text("k", k, kUnit, Ksi, "N·m²/C²");
    }

    if (q1Unit != "C") {
      Steps += Get_Unit_Conversion_Text("Q₁", q1, q1Unit, Q1si, "C");
    }

    if (rUnit != "m") {
      Steps += Get_Unit_Conversion_Text("r", r, rUnit, Rsi, "m");
    }

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fₑ", f, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Magnitude of electrostatic force is given by:
  Fₑ = (k * Q₁ * Q₂) / r²

  On rearranging the above formula, the Second charge is given by:
  Q₂ = (Fₑ * r²) / (k * Q₁)

  Substituting the above values and evaluating:
  Q₂ = (${Fsi} * ${Rsi}²) / (${Ksi} * ${Q1si}) C
  Q₂ = (${Fsi} * ${Rsi_Squared}) / (${Ksi} * ${Q1si}) C
  Q₂ = ${Fsi__Into__Rsi_Squared} / ${Ksi_Into_Q1si} C
  Q₂ = ${Q2si} C
  
  `;
  if (q2Unit != "C") {
    Steps += `
  Converting 'Q₂' from S.I. units to ${q2Unit}:
  Q₂ = ${q2} ${q2Unit}
  `;
  }
  Steps += `
  'Q₂' has been calculated.
  `;

  return [q2, Steps];
};

export var Calculate_Distance_From_CoulombsConstant_Charge1_Charge2_ElectrostaticForce = function (
  k,
  q1,
  q2,
  f,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  fUnit
) {
  var Ksi = Convert_CoulombsConstantUnits(parseFloat(k), kUnit, "N·m²/C²");
  var Q1si = Convert_ChargeUnits(parseFloat(q1), q1Unit, "C");
  var Q2si = Convert_ChargeUnits(parseFloat(q2), q2Unit, "C");
  var Fsi = Convert_ForceUnits(parseFloat(f), fUnit, "N");

  var Rsi = Math.sqrt(Math.abs((Ksi * Q1si * Q2si) / Fsi));

  var r = Convert_DistanceUnits(Rsi, "m", rUnit);
  r = lazy_RoundLongFloatTo10Places(r);

  var Ksi_Into_Q1si_Into_Q2si = Ksi * Q1si * Q2si;
  var Ksi_Into_Q1si_Into_Q2si__By__Fsi = Ksi_Into_Q1si_Into_Q2si / Fsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Distance between the 2 charges = r;
  Coulomb's constant = k = ${k} ${kUnit}
  First charge = Q₁ = ${q1} ${q1Unit}
  Second charge = Q₂ = ${q2} ${q2Unit}
  Electrostatic force = Fₑ = ${f} ${fUnit};
  `;

  if (fUnit != "N" || kUnit != "N·m²/C²" || q1Unit != "C" || q2Unit != "C") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "N·m²/C²") {
      Steps += Get_Unit_Conversion_Text("k", k, kUnit, Ksi, "N·m²/C²");
    }

    if (q1Unit != "C") {
      Steps += Get_Unit_Conversion_Text("Q₁", q1, q1Unit, Q1si, "C");
    }

    if (q2Unit != "C") {
      Steps += Get_Unit_Conversion_Text("Q₂", q2, q2Unit, Q2si, "C");
    }

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fₑ", f, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Magnitude of electrostatic force is given by:
  Fₑ = (k * Q₁ * Q₂) / r²

  On rearranging the above formula, the distance between the 2 charges is given by:
  r = sqrt((k * Q₁ * Q₂) / Fₑ)

  Substituting the above values and evaluating:
  r = sqrt((${Ksi} * ${Q1si} * ${Q2si}) / ${Fsi}) m
  r = sqrt(${Ksi_Into_Q1si_Into_Q2si} / ${Fsi}) m
  r = sqrt(${Ksi_Into_Q1si_Into_Q2si__By__Fsi}) m
  r = ${Rsi} m
  
  `;
  if (rUnit != "m") {
    Steps += `
  Converting 'r' from S.I. units to ${rUnit}:
  r = ${r} ${rUnit}
  `;
  }
  Steps += `
  'r' has been calculated.
  `;

  return [r, Steps];
};
