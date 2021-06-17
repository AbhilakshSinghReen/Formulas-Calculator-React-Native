import {
  Convert_PermittivityUnits,
  Convert_CoulombsConstantUnits,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, Permittivity, CoulombsConstant
//FIXED: Units order: Permittivity, CoulombsConstant
//Formula: k = 1 / (4 * π * ε)
export var Calculate_CoulombsConstant_From_Permittivity = function (
  E,
  eUnit,
  kUnit
) {
  var Esi = Convert_PermittivityUnits(E, eUnit, "F/m");

  var Ccsi = 1 / (4 * Math.PI * Esi);

  var Cc = Convert_CoulombsConstantUnits(Ccsi, "N·m²/C²", kUnit);
  Cc = lazy_RoundLongFloatTo10Places(Cc);

  var _4_Pi_Esi = 4 * Math.PI * Esi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Coulomb's constant of the material = k;
  Permittivity of the material = ε = ${E} ${eUnit};
  `;

  if (eUnit != "F/m") {
    Steps += `Converting the given values to S.I. units:
    
    ε = ${E} ${eUnit}
    After converting:
    ε = ${Esi} F/m

    `;
  }

  Steps += `

  Coulomb's constant is given by:
  k = 1 / (4 * π * ε)

  Substituting the above values and evaluating:
  k = 1 / (4 * π * ${Esi}) N·m²/C²
  k = 1 / ${_4_Pi_Esi} N·m²/C²
  k = ${Ccsi} N·m²/C²
  
  `;
  if (kUnit != "N·m²/C²") {
    Steps += `
  Converting 'k' from S.I. units to ${kUnit}:
  k = ${Cc} ${kUnit}
  `;
  }
  Steps += `
  'k' has been calculated.
  `;

  return [Cc, Steps];
};

export var Calculate_Permittivity_From_CoulombsConstant = function (
  Cc,
  eUnit,
  kUnit
) {
  var Ccsi = Convert_CoulombsConstantUnits(Cc, kUnit, "N·m²/C²");

  var Esi = 1 / (4 * Math.PI * Ccsi);
  var E = Convert_CoulombsConstantUnits(Esi, "F/m", eUnit);
  E = lazy_RoundLongFloatTo10Places(E);

  var _4_Pi_Ccsi = 4 * Math.PI * Ccsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Permittivity of the material = ε;
  Coulomb's constant of the material = k = ${Cc} ${kUnit};
  `;

  if (kUnit != "N·m²/C²") {
    Steps += `Converting the given values to S.I. units:
    
    k = ${Cc} ${kUnit}
    After converting:
    k = ${Ccsi} N·m²/C²

    `;
  }

  Steps += `

  Coulomb's constant is given by:
  k = 1 / (4 * π * ε)

  On rearranging the above formula, the permittivity of the material is given by:
  ε = 1 / (4 * π * k)

  Substituting the above values and evaluating:
  ε = 1 / (4 * π * ${Ccsi}) F/m
  ε = 1 / ${_4_Pi_Ccsi} F/m
  ε = ${Esi} F/m
  
  `;
  if (eUnit != "F/m") {
    Steps += `
  Converting 'ε' from S.I. units to ${eUnit}:
  ε = ${E} ${eUnit}
  `;
  }
  Steps += `
  'ε' has been calculated.
  `;

  return [E, Steps];
};
