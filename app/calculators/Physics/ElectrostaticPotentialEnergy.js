import {
  Convert_CoulombsConstantUnits,
  Convert_ChargeUnits,
  Convert_DistanceUnits,
  Convert_EnergyUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, CoulombsConstant, Charge1, Charge2, Distance, ElectrostaticPotentialEnergy
//FIXED: Units order: CoulombsConstant, Charge1, Charge2, Distance, ElectrostaticPotentialEnergy
//FORMULA: Uₑ = (k * Q₁ * Q₂) / r
export var Calculate_ElectrostaticPotentialEnergy_From_CoulombsConstant_Charge1_Charge2_Distance = function (
  k,
  q1,
  q2,
  r,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  uUnit
) {
  var Ksi = Convert_CoulombsConstantUnits(parseFloat(k), kUnit, "N·m²/C²");
  var Q1si = Convert_ChargeUnits(parseFloat(q1), q1Unit, "C");
  var Q2si = Convert_ChargeUnits(parseFloat(q2), q2Unit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");

  var Usi = (Ksi * Q1si * Q2si) / Rsi;

  var u = Convert_EnergyUnits(Usi, "J", uUnit);
  u = lazy_RoundLongFloatTo10Places(u);

  var Ksi_Into_Q1si_Into_Q2si = Ksi * Q1si * Q2si;
  var Rsi_Squared = Rsi * Rsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Electrostatic potential energy = Uₑ;
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

  Electrostatic potential energy is given by:
  Uₑ = (k * Q₁ * Q₂) / r

  Substituting the above values and evaluating:
  Uₑ = (${Ksi} * ${Q1si} * ${Q2si}) / ${Rsi} J
  Uₑ = (${Ksi} * ${Q1si} * ${Q2si}) / ${Rsi} J
  Uₑ = ${Usi} J
  
  `;
  if (uUnit != "J") {
    Steps += `
  Converting 'Uₑ' from S.I. units to ${uUnit}:
  Uₑ = ${u} ${uUnit}
  `;
  }
  Steps += `
  'Uₑ' has been calculated.
  `;

  return [u, Steps];
};

export var Calculate_CoulombsConstant_From_Charge1_Charge2_Distance_ElectrostaticPotentialEnergy = function (
  q1,
  q2,
  r,
  u,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  uUnit
) {
  var Q1si = Convert_ChargeUnits(parseFloat(q1), q1Unit, "C");
  var Q2si = Convert_ChargeUnits(parseFloat(q2), q2Unit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var Ksi = (Usi * Rsi) / (Q1si * Q2si);

  var k = Convert_CoulombsConstantUnits(Ksi, "N·m²/C²", kUnit);
  k = lazy_RoundLongFloatTo10Places(k);

  var Usi_Into_Rsi = Usi * Rsi;
  var Q1si_Into_Q2si = Q1si * Q2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Coulomb's constant = k;  
  First charge = Q₁ = ${q1} ${q1Unit}
  Second charge = Q₂ = ${q2} ${q2Unit}
  Distance between the 2 charges = r = ${r} ${rUnit}
  Electrostatic potential energy = Uₑ = ${u} ${uUnit};
  `;

  if (uUnit != "J" || q1Unit != "C" || q2Unit != "C" || rUnit != "m") {
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

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Uₑ", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Electrostatic potential energy is given by:
  Uₑ = (k * Q₁ * Q₂) / r

  On rearranging the above formula, the Coulomb's constant is given by:
  k = (Uₑ * r) / (Q₁ * Q₂)

  Substituting the above values and evaluating:
  k = (${Usi} * ${Rsi}) / (${Q1si} * ${Q2si}) N·m²/C²
  k = ${Usi_Into_Rsi} / ${Q1si_Into_Q2si} N·m²/C²
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

export var Calculate_Charge1_From_CoulombsConstant_Charge2_Distance_ElectrostaticPotentialEnergy = function (
  k,
  q2,
  r,
  u,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  uUnit
) {
  var Ksi = Convert_CoulombsConstantUnits(parseFloat(k), kUnit, "N·m²/C²");
  var Q2si = Convert_ChargeUnits(parseFloat(q2), q2Unit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var Q1si = (Usi * Rsi) / (Ksi * Q2si);

  var q1 = Convert_ChargeUnits(Q1si, "C", q1Unit);
  q1 = lazy_RoundLongFloatTo10Places(q1);

  var Usi_Into_Rsi = Usi * Rsi;
  var Ksi_Into_Q2si = Ksi * Q2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  First charge = Q₁;
  Coulomb's constant = k = ${k} ${kUnit}
  Second charge = Q₂ = ${q2} ${q2Unit}
  Distance between the 2 charges = r = ${r} ${rUnit}
  Electrostatic potential energy = Uₑ = ${u} ${uUnit};
  `;

  if (uUnit != "J" || kUnit != "N·m²/C²" || q2Unit != "C" || rUnit != "m") {
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

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Uₑ", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Electrostatic potential energy is given by:
  Uₑ = (k * Q₁ * Q₂) / r

  On rearranging the above formula, the First charge is given by:
  Q₁ = (F * r) / (k * Q₂)

  Substituting the above values and evaluating:
  Q₁ = (${Usi} * ${Rsi}) / (${Ksi} * ${Q2si}) C
  Q₁ = ${Usi_Into_Rsi} / ${Ksi_Into_Q2si} C
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

export var Calculate_Charge2_From_CoulombsConstant_Charge1_Distance_ElectrostaticPotentialEnergy = function (
  k,
  q1,
  r,
  u,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  uUnit
) {
  var Ksi = Convert_CoulombsConstantUnits(parseFloat(k), kUnit, "N·m²/C²");
  var Q1si = Convert_ChargeUnits(parseFloat(q1), q1Unit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var Q2si = (Usi * Rsi) / (Ksi * Q1si);

  var q2 = Convert_ChargeUnits(Q2si, "C", q2Unit);
  q2 = lazy_RoundLongFloatTo10Places(q2);

  var Usi_Into_Rsi = Usi * Rsi;
  var Ksi_Into_Q1si = Ksi * Q1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Second charge = Q₂;
  Coulomb's constant = k = ${k} ${kUnit}
  First charge = Q₁ = ${q1} ${q1Unit}
  Distance between the 2 charges = r = ${r} ${rUnit}
  Electrostatic potential energy = Uₑ = ${u} ${uUnit};
  `;

  if (uUnit != "J" || kUnit != "N·m²/C²" || q1Unit != "C" || rUnit != "m") {
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

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Uₑ", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Electrostatic potential energy is given by:
  Uₑ = (k * Q₁ * Q₂) / r

  On rearranging the above formula, the Second charge is given by:
  Q₂ = (F * r) / (k * Q₁)

  Substituting the above values and evaluating:
  Q₂ = (${Usi} * ${Rsi}) / (${Ksi} * ${Q1si}) C
  Q₂ = ${Usi_Into_Rsi} / ${Ksi_Into_Q1si} C
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

export var Calculate_Distance_From_CoulombsConstant_Charge1_Charge2_ElectrostaticPotentialEnergy = function (
  k,
  q1,
  q2,
  u,
  kUnit,
  q1Unit,
  q2Unit,
  rUnit,
  uUnit
) {
  var Ksi = Convert_CoulombsConstantUnits(parseFloat(k), kUnit, "N·m²/C²");
  var Q1si = Convert_ChargeUnits(parseFloat(q1), q1Unit, "C");
  var Q2si = Convert_ChargeUnits(parseFloat(q2), q2Unit, "C");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var Rsi = Math.abs((Ksi * Q1si * Q2si) / Usi);

  var r = Convert_DistanceUnits(Rsi, "m", rUnit);
  r = lazy_RoundLongFloatTo10Places(r);

  var Ksi_Into_Q1si_Into_Q2si = Ksi * Q1si * Q2si;
  var Ksi_Into_Q1si_Into_Q2si__By__Usi = Ksi_Into_Q1si_Into_Q2si / Usi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Distance between the 2 charges = r;
  Coulomb's constant = k = ${k} ${kUnit}
  First charge = Q₁ = ${q1} ${q1Unit}
  Second charge = Q₂ = ${q2} ${q2Unit}
  Electrostatic potential energy = Uₑ = ${u} ${uUnit};
  `;

  if (uUnit != "J" || kUnit != "N·m²/C²" || q1Unit != "C" || q2Unit != "C") {
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

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Uₑ", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Electrostatic potential energy is given by:
  Uₑ = (k * Q₁ * Q₂) / r

  On rearranging the above formula, the distance between the 2 charges is given by:
  r = (k * Q₁ * Q₂) / Uₑ

  Substituting the above values and evaluating:
  r = (${Ksi} * ${Q1si} * ${Q2si}) / ${Usi} m
  r = ${Ksi_Into_Q1si_Into_Q2si} / ${Usi} m
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
