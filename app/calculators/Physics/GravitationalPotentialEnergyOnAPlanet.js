import {
  Convert_MassUnits,
  Convert_AccelerationUnits,
  Convert_DistanceUnits,
  Convert_EnergyUnits,
  Get_Unit_Conversion_Text,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, MassOfObject, GravitationalAcceleration , Height, GravitationalPotentialEnergy
//FIXED: Units order: MassOfObject, GravitationalAcceleration , Height, GravitationalPotentialEnergy
//FORMULA: Ug = m * g * h
export var Calculate_GravitationalPotentialEnergy_From_MassOfObject_GravitationalAcceleration_Height = function (
  m,
  g,
  h,
  mUnit,
  gUnit,
  hUnit,
  uUnit
) {
  var Msi = Convert_MassUnits(parseFloat(m), mUnit, "kg");
  var Gsi = Convert_AccelerationUnits(parseFloat(g), gUnit, "m/s²");
  var Hsi = Convert_DistanceUnits(parseFloat(h), hUnit, "m");

  var Usi = Msi * Gsi * Hsi;

  var u = Convert_EnergyUnits(Usi, "J", uUnit);
  u = lazy_RoundLongFloatTo10Places(u);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Gravitational potential energy = Ug;  
  Mass of the object = m = ${m} ${mUnit}
  Gravitational Acceleration = g = ${g} ${gUnit}
  Height = h = ${h} ${hUnit};
  `;

  if (mUnit != "kg" || gUnit != "m/s²" || hUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += Get_Unit_Conversion_Text("m", m, mUnit, Msi, "kg");
    }

    if (gUnit != "m/s²") {
      Steps += Get_Unit_Conversion_Text("g", g, gUnit, Gsi, "m/s²");
    }

    if (hUnit != "m") {
      Steps += Get_Unit_Conversion_Text("h", h, hUnit, Hsi, "m");
    }
  }

  Steps += `

  Gravitational potential energy is given by:
  Ug = m * g * h

  Substituting the above values and evaluating:
  Ug = ${Msi} * ${Gsi} * ${Hsi} J
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

export var Calculate_MassOfObject_From_GravitationalAcceleration_Height_GravitationalPotentialEnergy = function (
  g,
  h,
  u,
  mUnit,
  gUnit,
  hUnit,
  uUnit
) {
  var Gsi = Convert_AccelerationUnits(parseFloat(g), gUnit, "m/s²");
  var Hsi = Convert_DistanceUnits(parseFloat(h), hUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var Msi = Usi / (Gsi * Hsi);

  var m = Convert_MassUnits(Msi, "kg", mUnit);
  m = lazy_RoundLongFloatTo10Places(m);

  var Gsi_Into_Hsi = Gsi * Hsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Mass of the object = m;
  Gravitational Acceleration = g = ${g} ${gUnit}
  Height = h = ${h} ${hUnit}
  Gravitational potential energy = Ug = ${u} ${uUnit};
  `;

  if (uUnit != "J" || gUnit != "m/s²" || hUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (gUnit != "m/s²") {
      Steps += Get_Unit_Conversion_Text("g", g, gUnit, Gsi, "m/s²");
    }

    if (hUnit != "m") {
      Steps += Get_Unit_Conversion_Text("h", h, hUnit, Hsi, "m");
    }

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Ug", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Gravitational potential energy is given by:
  Ug = m * g * h

  On rearranging the above formula, the mass of the object is given by:
  m = Ug / (g * h)

  Substituting the above values and evaluating:
  m = ${Usi} / (${Gsi} * ${Hsi}) kg
  m = ${Usi} / ${Gsi_Into_Hsi} kg
  m = ${Msi} kg
  
  `;
  if (mUnit != "kg") {
    Steps += `
  Converting 'm' from S.I. units to ${mUnit}:
  m = ${m} ${mUnit}
  `;
  }
  Steps += `
  'm' has been calculated.
  `;

  return [m, Steps];
};

export var Calculate_GravitationalAcceleration_From_MassOfObject_Height_GravitationalPotentialEnergy = function (
  m,
  h,
  u,
  mUnit,
  gUnit,
  hUnit,
  uUnit
) {
  var Msi = Convert_MassUnits(parseFloat(m), mUnit, "kg");
  var Hsi = Convert_DistanceUnits(parseFloat(h), hUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var Gsi = Usi / (Msi * Hsi);

  var g = Convert_AccelerationUnits(Gsi, "m/s²", gUnit);
  g = lazy_RoundLongFloatTo10Places(g);

  var Msi_Into_Hsi = Msi * Hsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Gravitational Acceleration = g;
  Mass of the object = m = ${m} ${mUnit}  
  Height = h = ${h} ${hUnit}
  Gravitational potential energy = Ug = ${u} ${uUnit};
  `;

  if (uUnit != "J" || mUnit != "kg" || hUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += Get_Unit_Conversion_Text("m", m, mUnit, Msi, "kg");
    }

    if (hUnit != "m") {
      Steps += Get_Unit_Conversion_Text("h", h, hUnit, Hsi, "m");
    }

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Ug", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Gravitational potential energy is given by:
  Ug = m * g * h

  On rearranging the above formula, the gravitational acceleration is given by:
  g = Ug / (m * h)

  Substituting the above values and evaluating:
  g = ${Usi} / (${Msi} * ${Hsi}) m/s²
  g = ${Usi} / ${Msi_Into_Hsi} m/s²
  g = ${Gsi} m/s²
  
  `;
  if (gUnit != "m/s²") {
    Steps += `
  Converting 'g' from S.I. units to ${gUnit}:
  g = ${g} ${gUnit}
  `;
  }
  Steps += `
  'g' has been calculated.
  `;

  return [g, Steps];
};

export var Calculate_Height_From_MassOfObject_GravitationalAcceleration_GravitationalPotentialEnergy = function (
  m,
  g,
  u,
  mUnit,
  gUnit,
  hUnit,
  uUnit
) {
  var Msi = Convert_MassUnits(parseFloat(m), mUnit, "kg");
  var Gsi = Convert_AccelerationUnits(parseFloat(g), gUnit, "m/s²");
  var Usi = Convert_EnergyUnits(parseFloat(u), uUnit, "J");

  var Hsi = Usi / (Msi * Gsi);

  var h = Convert_DistanceUnits(Hsi, "m", hUnit);
  h = lazy_RoundLongFloatTo10Places(h);

  var Msi_Into_Gsi = Msi * Gsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Height = h;
  Mass of the object = m = ${m} ${mUnit}  
  Gravitational Acceleration = g = ${g} ${gUnit}
  Gravitational potential energy = Ug = ${u} ${uUnit};
  `;

  if (uUnit != "J" || mUnit != "kg" || gUnit != "m/s²") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += Get_Unit_Conversion_Text("m", m, mUnit, Msi, "kg");
    }

    if (gUnit != "m/s²") {
      Steps += Get_Unit_Conversion_Text("g", g, gUnit, Gsi, "m/s²");
    }

    if (uUnit != "J") {
      Steps += Get_Unit_Conversion_Text("Ug", u, uUnit, Usi, "J");
    }
  }

  Steps += `

  Gravitational potential energy is given by:
  Ug = m * g * h

  On rearranging the above formula, the height is given by:
  h = Ug / (m * g)

  Substituting the above values and evaluating:
  h = ${Usi} / (${Msi} * ${Gsi}) m
  h = ${Usi} / ${Msi_Into_Gsi} m
  h = ${Hsi} m
  
  `;
  if (hUnit != "m") {
    Steps += `
  Converting 'h' from S.I. units to ${hUnit}:
  h = ${h} ${hUnit}
  `;
  }
  Steps += `
  'h' has been calculated.
  `;

  return [h, Steps];
};
