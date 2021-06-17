import {
  Convert_MassUnits,
  Convert_DistanceUnits,
  Convert_EnergyUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, UniversalGravitationalConstant, Mass1, Mass2, Distance, GravitationalPotentialEnergy
//FIXED: Units order: UniversalGravitationalConstant, Mass1, Mass2, Distance, GravitationalPotentialEnergy
//FORMULA: Ug = (k * M₁ * M₂) / r
export var Calculate_GravitationalPotentialEnergy_From_UniversalGravitationalConstant_Mass1_Mass2_Distance = function (
  G,
  m1,
  m2,
  r,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  uUnit
) {
  Gsi = parseFloat(G);
  var M1si = Convert_MassUnits(parseFloat(m1), m1Unit, "kg");
  var M2si = Convert_MassUnits(parseFloat(m2), m2Unit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");

  var Usi = (-1 * Gsi * M1si * M2si) / Rsi;

  var u = Convert_EnergyUnits(Usi, "J", uUnit);
  u = lazy_RoundLongFloatTo10Places(u);

  var Gsi_Into_M1si_Into_M2si = Gsi * M1si * M2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Gravitational potential energy = Ug;
  Universal gravitational constant = G = ${G} ${G_Unit}
  First mass = M₁ = ${m1} ${m1Unit}
  Second mass = M₂ = ${m2} ${m2Unit}
  Distance between the 2 masses = r = ${r} ${rUnit};
  `;

  if (
    G_Unit != "m³/(kg.s²)" ||
    m1Unit != "kg" ||
    m2Unit != "kg" ||
    rUnit != "m"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (G_Unit != "m³/(kg.s²)") {
      Steps += Get_Unit_Conversion_Text("G", G, G_Unit, Gsi, "m³/(kg.s²)");
    }

    if (m1Unit != "kg") {
      Steps += Get_Unit_Conversion_Text("M₁", m1, m1Unit, M1si, "kg");
    }

    if (m2Unit != "kg") {
      Steps += Get_Unit_Conversion_Text("M₂", m2, m2Unit, M2si, "kg");
    }

    if (rUnit != "m") {
      Steps += Get_Unit_Conversion_Text("r", r, rUnit, Rsi, "m");
    }
  }

  Steps += `

  Gravitational potential energy is given by:
  Ug = - (G * M₁ * M₂) / r

  Substituting the above values and evaluating:
  Ug = - (${Gsi} * ${M1si} * ${M2si}) / ${Rsi} J
  Ug = - ${Gsi_Into_M1si_Into_M2si} / ${Rsi} J
  Ug = ${Usi} J
  
  `;
  if (uUnit != "J") {
    Steps += `
  Converting 'Ug' from S.I. units to ${uUnit}:
  Ug = ${u} ${uUnit}
  `;
  }
  Steps += `
  'Ug' has been calculated.
  `;

  return [u, Steps];
};

/*
export var Calculate_UniversalGravitationalConstant_From_Mass1_Mass2_Distance_GravitationalPotentialEnergy = function (
  m1,
  m2,
  r,
  f,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  uUnit
) {
  var M1si = Convert_MassUnits(parseFloat(m1), m1Unit, "kg");
  var M2si = Convert_MassUnits(parseFloat(m2), m2Unit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(f), uUnit, "J");

  var Gsi = (Usi * Rsi) / (M1si * M2si);

  var k = Convert_UniversalGravitationalConstantUnits(Gsi, "m³/(kg.s²)", G_Unit);
  k = lazy_RoundLongFloatTo10Places(k);

  var Rsi_Squared = Rsi * Rsi;
  var Usi__Into__Rsi_Squared = Usi * Rsi_Squared;
  var M1si_Into_M2si = M1si * M2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Universal gravitational constant = k;  
  First mass = M₁ = ${m1} ${m1Unit}
  Second mass = M₂ = ${m2} ${m2Unit}
  Distance between the 2 masses = r = ${r} ${rUnit}
  Gravitational potential energy = Ug = ${f} ${uUnit};
  `;

  if (uUnit != "J" || m1Unit != "kg" || m2Unit != "kg" || rUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (m1Unit != "kg") {
      Steps += Get_Unit_Conversion_Text("M₁", m1, m1Unit, M1si, "kg");
    }

    if (m2Unit != "kg") {
      Steps += Get_Unit_Conversion_Text("M₂", m2, m2Unit, M2si, "kg");
    }

    if (rUnit != "m") {
      Steps += Get_Unit_Conversion_Text("r", r, rUnit, Rsi, "m");
    }

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Ug", f, uUnit, Usi, "J");
    }
  }

  Steps += `

  Magnitude of gravitational potential energy is given by:
  Ug = (k * M₁ * M₂) / r²

  On rearranging the above formula, the Universal gravitational constant is given by:
  k = (Ug * r²) / (M₁ * M₂)

  Substituting the above values and evaluating:
  k = (${Usi} * ${Rsi}²) / (${M1si} * ${M2si}) m³/(kg.s²)
  k = (${Usi} * ${Rsi_Squared}) / (${M1si} * ${M2si}) m³/(kg.s²)
  k = ${Usi__Into__Rsi_Squared} / ${M1si_Into_M2si} m³/(kg.s²)
  k = ${Gsi} m³/(kg.s²)
  
  `;
  if (G_Unit != "m³/(kg.s²)") {
    Steps += `
  Converting 'k' from S.I. units to ${G_Unit}:
  k = ${k} ${G_Unit}
  `;
  }
  Steps += `
  'k' has been calculated.
  `;

  return [k, Steps];
};
*/

export var Calculate_Mass1_From_UniversalGravitationalConstant_Mass2_Distance_GravitationalPotentialEnergy = function (
  G,
  m2,
  r,
  u,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  uUnit
) {
  var Gsi = parseFloat(G);
  var M2si = Convert_MassUnits(parseFloat(m2), m2Unit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var M1si = (-1 * Usi * Rsi) / (Gsi * M2si);

  var m1 = Convert_MassUnits(M1si, "kg", m1Unit);
  m1 = lazy_RoundLongFloatTo10Places(m1);

  var Usi_Into_Rsi = Usi * Rsi;
  var Gsi_Into_M2si = Gsi * M2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  First mass = M₁;
  Universal gravitational constant = G = ${G} ${G_Unit}
  Second mass = M₂ = ${m2} ${m2Unit}
  Distance between the 2 masses = r = ${r} ${rUnit}
  Gravitational potential energy = Ug = ${u} ${uUnit};
  `;

  if (
    uUnit != "J" ||
    G_Unit != "m³/(kg.s²)" ||
    m2Unit != "kg" ||
    rUnit != "m"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (G_Unit != "m³/(kg.s²)") {
      Steps += Get_Unit_Conversion_Text("G", G, G_Unit, Gsi, "m³/(kg.s²)");
    }

    if (m2Unit != "kg") {
      Steps += Get_Unit_Conversion_Text("M₂", m2, m2Unit, M2si, "kg");
    }

    if (rUnit != "m") {
      Steps += Get_Unit_Conversion_Text("r", r, rUnit, Rsi, "m");
    }

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Ug", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Magnitude of gravitational potential energy is given by:
  Ug = - (G * M₁ * M₂) / r

  On rearranging the above formula, the first mass is given by:
  M₁ = - (Ug * r) / (G * M₂)

  Substituting the above values and evaluating:
  M₁ = - (${Usi} * ${Rsi}) / (${Gsi} * ${M2si}) kg
  M₁ = - (${Usi_Into_Rsi}) / ${Gsi_Into_M2si} kg  
  M₁ = ${M1si} kg
  
  `;
  if (m1Unit != "kg") {
    Steps += `
  Converting 'M₁' from S.I. units to ${m1Unit}:
  M₁ = ${m1} ${m1Unit}
  `;
  }
  Steps += `
  'M₁' has been calculated.
  `;

  return [m1, Steps];
};

export var Calculate_Mass2_From_UniversalGravitationalConstant_Mass1_Distance_GravitationalPotentialEnergy = function (
  G,
  m1,
  r,
  u,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  uUnit
) {
  var Gsi = parseFloat(G);
  var M1si = Convert_MassUnits(parseFloat(m1), m1Unit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var M2si = (-1 * Usi * Rsi) / (Gsi * M1si);

  var m2 = Convert_MassUnits(M2si, "kg", m2Unit);
  m2 = lazy_RoundLongFloatTo10Places(m2);

  var Usi_Into_Rsi = Usi * Rsi;
  var Gsi_Into_M1si = Gsi * M1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Second mass = M₂;
  Universal gravitational constant = G = ${G} ${G_Unit}
  First mass = M₁ = ${m1} ${m1Unit}
  Distance between the 2 masses = r = ${r} ${rUnit}
  Gravitational potential energy = Ug = ${u} ${uUnit};
  `;

  if (
    uUnit != "J" ||
    G_Unit != "m³/(kg.s²)" ||
    m1Unit != "kg" ||
    rUnit != "m"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (G_Unit != "m³/(kg.s²)") {
      Steps += Get_Unit_Conversion_Text("G", G, G_Unit, Gsi, "m³/(kg.s²)");
    }

    if (m1Unit != "kg") {
      Steps += Get_Unit_Conversion_Text("M₁", m1, m1Unit, M1si, "kg");
    }

    if (rUnit != "m") {
      Steps += Get_Unit_Conversion_Text("r", r, rUnit, Rsi, "m");
    }

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Ug", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Magnitude of gravitational potential energy is given by:
  Ug = - (G * M₁ * M₂) / r²

  On rearranging the above formula, the second mass is given by:
  M₂ = - (Ug * r²) / (G * M₁)

  Substituting the above values and evaluating:
  M₂ = - (${Usi} * ${Rsi}²) / (${Gsi} * ${M1si}) kg
  M₂ = - ${Usi_Into_Rsi} / ${Gsi_Into_M1si} kg
  M₂ = ${M2si} kg
  
  `;
  if (m2Unit != "kg") {
    Steps += `
  Converting 'M₂' from S.I. units to ${m2Unit}:
  M₂ = ${m2} ${m2Unit}
  `;
  }
  Steps += `
  'M₂' has been calculated.
  `;

  return [m2, Steps];
};

export var Calculate_Distance_From_UniversalGravitationalConstant_Mass1_Mass2_GravitationalPotentialEnergy = function (
  G,
  m1,
  m2,
  u,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  uUnit
) {
  var Gsi = parseFloat(G);
  var M1si = Convert_MassUnits(parseFloat(m1), m1Unit, "kg");
  var M2si = Convert_MassUnits(parseFloat(m2), m2Unit, "kg");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var Rsi = Math.abs((-1 * (Gsi * M1si * M2si)) / Usi);

  var r = Convert_DistanceUnits(Rsi, "m", rUnit);
  r = lazy_RoundLongFloatTo10Places(r);

  var Gsi_Into_M1si_Into_M2si = Gsi * M1si * M2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Distance between the 2 masses = r;
  Universal gravitational constant = G = ${G} ${G_Unit}
  First mass = M₁ = ${m1} ${m1Unit}
  Second mass = M₂ = ${m2} ${m2Unit}
  Gravitational potential energy = Ug = ${u} ${uUnit};
  `;

  if (
    uUnit != "J" ||
    G_Unit != "m³/(kg.s²)" ||
    m1Unit != "kg" ||
    m2Unit != "kg"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (G_Unit != "m³/(kg.s²)") {
      Steps += Get_Unit_Conversion_Text("G", G, G_Unit, Gsi, "m³/(kg.s²)");
    }

    if (m1Unit != "kg") {
      Steps += Get_Unit_Conversion_Text("M₁", m1, m1Unit, M1si, "kg");
    }

    if (m2Unit != "kg") {
      Steps += Get_Unit_Conversion_Text("M₂", m2, m2Unit, M2si, "kg");
    }

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Ug", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Magnitude of gravitational potential energy is given by:
  Ug = - (G * M₁ * M₂) / r²

  On rearranging the above formula, the distance between the 2 masses is given by:
  r = - (G * M₁ * M₂) / Ug

  Substituting the above values and evaluating:
  r = - (${Gsi} * ${M1si} * ${M2si}) / ${Usi} m
  r = - ${Gsi_Into_M1si_Into_M2si} / ${Usi} m
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
