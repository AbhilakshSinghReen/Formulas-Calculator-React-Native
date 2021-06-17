import {
  Convert_MassUnits,
  Convert_DistanceUnits,
  Convert_ForceUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, UniversalGravitationalConstant, Mass1, Mass2, Distance, GravitationalForce
//FIXED: Units order: UniversalGravitationalConstant, Mass1, Mass2, Distance, GravitationalForce
//FORMULA: Fg = (k * M₁ * M₂) / r²
export var Calculate_GravitationalForce_From_UniversalGravitationalConstant_Mass1_Mass2_Distance = function (
  G,
  m1,
  m2,
  r,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  fUnit
) {
  Gsi = parseFloat(G);
  var M1si = Convert_MassUnits(parseFloat(m1), m1Unit, "kg");
  var M2si = Convert_MassUnits(parseFloat(m2), m2Unit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");

  var Fsi = (Gsi * M1si * M2si) / Math.pow(Rsi, 2);

  var f = Convert_ForceUnits(Fsi, "N", fUnit);
  f = lazy_RoundLongFloatTo10Places(f);

  var Gsi_Into_M1si_Into_M2si = Gsi * M1si * M2si;
  var Rsi_Squared = Rsi * Rsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Gravitational force = Fg;
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

  Magnitude of gravitational force is given by:
  Fg = (G * M₁ * M₂) / r²

  Substituting the above values and evaluating:
  Fg = (${Gsi} * ${M1si} * ${M2si}) / ${Rsi}² N
  Fg = ${Gsi_Into_M1si_Into_M2si} / ${Rsi_Squared} N
  Fg = ${Fsi} N
  
  `;
  if (fUnit != "N") {
    Steps += `
  Converting 'Fg' from S.I. units to ${fUnit}:
  Fg = ${f} ${fUnit}
  `;
  }
  Steps += `
  'Fg' has been calculated.
  `;

  return [f, Steps];
};

/*
export var Calculate_UniversalGravitationalConstant_From_Mass1_Mass2_Distance_GravitationalForce = function (
  m1,
  m2,
  r,
  f,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  fUnit
) {
  var M1si = Convert_MassUnits(parseFloat(m1), m1Unit, "kg");
  var M2si = Convert_MassUnits(parseFloat(m2), m2Unit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Fsi = Convert_ForceUnits(parseFloat(f), fUnit, "N");

  var Gsi = (Fsi * Math.pow(Rsi, 2)) / (M1si * M2si);

  var k = Convert_UniversalGravitationalConstantUnits(Gsi, "m³/(kg.s²)", G_Unit);
  k = lazy_RoundLongFloatTo10Places(k);

  var Rsi_Squared = Rsi * Rsi;
  var Fsi__Into__Rsi_Squared = Fsi * Rsi_Squared;
  var M1si_Into_M2si = M1si * M2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Universal gravitational constant = k;  
  First mass = M₁ = ${m1} ${m1Unit}
  Second mass = M₂ = ${m2} ${m2Unit}
  Distance between the 2 masses = r = ${r} ${rUnit}
  Gravitational force = Fg = ${f} ${fUnit};
  `;

  if (fUnit != "N" || m1Unit != "kg" || m2Unit != "kg" || rUnit != "m") {
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

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fg", f, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Magnitude of gravitational force is given by:
  Fg = (k * M₁ * M₂) / r²

  On rearranging the above formula, the Universal gravitational constant is given by:
  k = (Fg * r²) / (M₁ * M₂)

  Substituting the above values and evaluating:
  k = (${Fsi} * ${Rsi}²) / (${M1si} * ${M2si}) m³/(kg.s²)
  k = (${Fsi} * ${Rsi_Squared}) / (${M1si} * ${M2si}) m³/(kg.s²)
  k = ${Fsi__Into__Rsi_Squared} / ${M1si_Into_M2si} m³/(kg.s²)
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

export var Calculate_Mass1_From_UniversalGravitationalConstant_Mass2_Distance_GravitationalForce = function (
  G,
  m2,
  r,
  f,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  fUnit
) {
  var Gsi = parseFloat(G);
  var M2si = Convert_MassUnits(parseFloat(m2), m2Unit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Fsi = Convert_ForceUnits(parseFloat(f), fUnit, "N");

  var M1si = (Fsi * Math.pow(Rsi, 2)) / (Gsi * M2si);

  var m1 = Convert_MassUnits(M1si, "kg", m1Unit);
  m1 = lazy_RoundLongFloatTo10Places(m1);

  var Rsi_Squared = Rsi * Rsi;
  var Fsi__Into__Rsi_Squared = Fsi * Rsi_Squared;
  var Gsi_Into_M2si = Gsi * M2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  First mass = M₁;
  Universal gravitational constant = G = ${G} ${G_Unit}
  Second mass = M₂ = ${m2} ${m2Unit}
  Distance between the 2 masses = r = ${r} ${rUnit}
  Gravitational force = Fg = ${f} ${fUnit};
  `;

  if (
    fUnit != "N" ||
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

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fg", f, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Magnitude of gravitational force is given by:
  Fg = (G * M₁ * M₂) / r²

  On rearranging the above formula, the first mass is given by:
  M₁ = (Fg * r²) / (G * M₂)

  Substituting the above values and evaluating:
  M₁ = (${Fsi} * ${Rsi}²) / (${Gsi} * ${M2si}) kg
  M₁ = (${Fsi} * ${Rsi_Squared}) / (${Gsi} * ${M2si}) kg
  M₁ = ${Fsi__Into__Rsi_Squared} / ${Gsi_Into_M2si} kg
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

export var Calculate_Mass2_From_UniversalGravitationalConstant_Mass1_Distance_GravitationalForce = function (
  G,
  m1,
  r,
  f,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  fUnit
) {
  var Gsi = parseFloat(G);
  var M1si = Convert_MassUnits(parseFloat(m1), m1Unit, "kg");
  var Rsi = Convert_DistanceUnits(parseFloat(r), rUnit, "m");
  var Fsi = Convert_ForceUnits(parseFloat(f), fUnit, "N");

  var M2si = (Fsi * Math.pow(Rsi, 2)) / (Gsi * M1si);

  var m2 = Convert_MassUnits(M2si, "kg", m2Unit);
  m2 = lazy_RoundLongFloatTo10Places(m2);

  var Rsi_Squared = Rsi * Rsi;
  var Fsi__Into__Rsi_Squared = Fsi * Rsi_Squared;
  var Gsi_Into_M1si = Gsi * M1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Second mass = M₂;
  Universal gravitational constant = G = ${G} ${G_Unit}
  First mass = M₁ = ${m1} ${m1Unit}
  Distance between the 2 masses = r = ${r} ${rUnit}
  Gravitational force = Fg = ${f} ${fUnit};
  `;

  if (
    fUnit != "N" ||
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

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fg", f, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Magnitude of gravitational force is given by:
  Fg = (G * M₁ * M₂) / r²

  On rearranging the above formula, the second mass is given by:
  M₂ = (Fg * r²) / (G * M₁)

  Substituting the above values and evaluating:
  M₂ = (${Fsi} * ${Rsi}²) / (${Gsi} * ${M1si}) kg
  M₂ = (${Fsi} * ${Rsi_Squared}) / (${Gsi} * ${M1si}) kg
  M₂ = ${Fsi__Into__Rsi_Squared} / ${Gsi_Into_M1si} kg
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

export var Calculate_Distance_From_UniversalGravitationalConstant_Mass1_Mass2_GravitationalForce = function (
  G,
  m1,
  m2,
  f,
  G_Unit,
  m1Unit,
  m2Unit,
  rUnit,
  fUnit
) {
  var Gsi = parseFloat(G);
  var M1si = Convert_MassUnits(parseFloat(m1), m1Unit, "kg");
  var M2si = Convert_MassUnits(parseFloat(m2), m2Unit, "kg");
  var Fsi = Convert_ForceUnits(parseFloat(f), fUnit, "N");

  var Rsi = Math.sqrt(Math.abs((Gsi * M1si * M2si) / Fsi));

  var r = Convert_DistanceUnits(Rsi, "m", rUnit);
  r = lazy_RoundLongFloatTo10Places(r);

  var Gsi_Into_M1si_Into_M2si = Gsi * M1si * M2si;
  var Gsi_Into_M1si_Into_M2si__By__Fsi = Gsi_Into_M1si_Into_M2si / Fsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Distance between the 2 masses = r;
  Universal gravitational constant = G = ${G} ${G_Unit}
  First mass = M₁ = ${m1} ${m1Unit}
  Second mass = M₂ = ${m2} ${m2Unit}
  Gravitational force = Fg = ${f} ${fUnit};
  `;

  if (
    fUnit != "N" ||
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

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("Fg", f, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Magnitude of gravitational force is given by:
  Fg = (G * M₁ * M₂) / r²

  On rearranging the above formula, the distance between the 2 masses is given by:
  r = sqrt((G * M₁ * M₂) / Fg)

  Substituting the above values and evaluating:
  r = sqrt((${Gsi} * ${M1si} * ${M2si}) / ${Fsi}) m
  r = sqrt(${Gsi_Into_M1si_Into_M2si} / ${Fsi}) m
  r = sqrt(${Gsi_Into_M1si_Into_M2si__By__Fsi}) m
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
