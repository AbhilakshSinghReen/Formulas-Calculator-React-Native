import { Convert_ForceUnits, Get_Unit_Conversion_Text } from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, CoefficientOfFriction, NormalReaction, Friction
//FIXED: Units order: CoefficientOfFriction, NormalReaction, Friction

export var Calculate_Friction_From_CoefficientOfFriction_NormalReaction = function (
  u,
  N,
  uUnit,
  nUnit,
  fUnit
) {
  var Usi = parseFloat(u);
  var Nsi = Convert_ForceUnits(parseFloat(N), nUnit, "N");

  var Fsi = Usi * Nsi;
  var F = Convert_ForceUnits(Fsi, "N", fUnit);
  F = lazy_RoundLongFloatTo10Places(F);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Friction = F;
  Coefficient of friction = u = ${u} ${uUnit}
  Normal reaction = N = ${N} ${nUnit};  
  `;

  if (nUnit != "N" || uUnit != "N/N") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (uUnit != "N/N") {
      Steps += Get_Unit_Conversion_Text("u", u, uUnit, Usi, "N/N");
    }

    if (nUnit != "N") {
      Steps += Get_Unit_Conversion_Text("N", N, nUnit, Nsi, "N");
    }
  }

  Steps += `

  Friction is given by:
  F = u * N

  Substituting the above values and evaluating:
  F = ${Usi} * ${Nsi} N
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

export var Calculate_CoefficientOfFriction_From_NormalReaction_Friction = function (
  N,
  F,
  uUnit,
  nUnit,
  fUnit
) {
  var Nsi = Convert_ForceUnits(parseFloat(N), nUnit, "N");
  var Fsi = Convert_ForceUnits(parseFloat(F), fUnit, "N");

  var Usi = Fsi / Nsi;
  var u = Usi;
  u = lazy_RoundLongFloatTo10Places(u);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Coefficient of friction = u;  
  Normal reaction = N = ${N} ${nUnit}
  Friction = F = ${F} ${fUnit};
  `;

  if (nUnit != "N" || fUnit != "N") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (nUnit != "N") {
      Steps += Get_Unit_Conversion_Text("N", N, nUnit, Nsi, "N");
    }
    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("F", F, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Friction is given by:
  F = u * N

  On rearranging the above formula, the coefficient of friction is given by:
  u = F / N

  Substituting the above values and evaluating:
  u = ${Fsi} / ${Nsi} N/N
  u = ${Usi} N/N
  
  `;
  /*
  if (uUnit != "N/N") {
    Steps += `
  Converting 'u' from S.I. units to ${uUnit}:
  u = ${u} ${uUnit}
  `;
  }
  */
  Steps += `
  'u' has been calculated.
  `;

  return [u, Steps];
};

export var Calculate_NormalReaction_From_CoefficientOfFriction_Friction = function (
  u,
  F,
  uUnit,
  nUnit,
  fUnit
) {
  var Usi = parseFloat(u);
  var Fsi = Convert_ForceUnits(parseFloat(F), fUnit, "N");

  var Nsi = Fsi / Usi;
  var N = Convert_ForceUnits(Nsi, "N", nUnit);
  N = lazy_RoundLongFloatTo10Places(N);

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Normal reaction = N;
  Coefficient of friction = u = ${u} ${uUnit}
  Friction = F = ${F} ${fUnit};
  `;

  if (fUnit != "N" || uUnit != "N/N") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (uUnit != "N/N") {
      Steps += Get_Unit_Conversion_Text("u", u, uUnit, Usi, "N/N");
    }

    if (fUnit != "N") {
      Steps += Get_Unit_Conversion_Text("F", F, fUnit, Fsi, "N");
    }
  }

  Steps += `

  Friction is given by:
  F = u * N

  On rearranging the above formula, normal reaction is given by:
  N = F / u

  Substituting the above values and evaluating:
  N = ${Fsi} / ${Usi} N
  N = ${Nsi} N
  
  `;
  if (nUnit != "N") {
    Steps += `
  Converting 'N' from S.I. units to ${nUnit}:
  N = ${N} ${nUnit}
  `;
  }
  Steps += `
  'N' has been calculated.
  `;

  return [N, Steps];
};
