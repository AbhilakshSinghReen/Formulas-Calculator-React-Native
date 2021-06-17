import {
  Convert_SpringConstantUnits,
  Convert_DistanceUnits,
  Convert_EnergyUnits,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, SpringConstant, Extension, ElasticPotentialEnergy, Units
//FIXED: Units order: SpringConstant, Extension, ElasticPotentialEnergy
export var Calculate_ElasticPotentialEnergy_From_SpringConstant_Extension = function (
  K,
  X,
  kUnit,
  xUnit,
  uUnit
) {
  var Ksi = Convert_SpringConstantUnits(parseFloat(K), kUnit, "N/m");
  var Xsi = Convert_DistanceUnits(parseFloat(X), xUnit, "m");

  var Usi = 0.5 * Ksi * Xsi * Xsi;
  var U = Convert_EnergyUnits(Usi, "J", uUnit);
  U = lazy_RoundLongFloatTo10Places(U);

  var Xsi_squared = Xsi * Xsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Elastic Potential Energy = U;
  Spring constant of the spring = k = ${K} ${kUnit}
  Extension of the spring = x = ${X} ${xUnit};  
  `;

  if (kUnit != "N/m" || xUnit != "m") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "N/m") {
      Steps += `
    k = ${K} ${kUnit}
    After converting:
    k = ${Ksi} N/m
    `;
    }

    if (kUnit != "N/m" && xUnit != "m") {
      Steps += `
      `;
    }

    if (xUnit != "m") {
      Steps += `
    x = ${X} ${xUnit}
    After converting:
    x = ${Xsi} m
    `;
    }
  }

  Steps += `

  The elastic potential energy of a spring is given by:
  U = 0.5 * k * x²

  Substituting the above values and evaluating:
  U = 0.5 * ${Ksi} * ${Xsi}² J
  U = 0.5 * ${Ksi} * ${Xsi_squared} J
  U = ${Usi} J
  `;
  if (uUnit != "J") {
    Steps += `
  Converting 'U' from S.I. units to ${uUnit}:
  U = ${U} ${uUnit}
  `;
  }
  Steps += `
  'U' has been calculated.
  `;

  return [U, Steps];
};

export var Calculate_SpringConstant_From_Extension_ElasticPotentialEnergy = function (
  X,
  U,
  kUnit,
  xUnit,
  uUnit
) {
  var Xsi = Convert_DistanceUnits(parseFloat(X), xUnit, "m");
  var Usi = Convert_EnergyUnits(parseFloat(U), uUnit, "J");

  var Ksi = (2 * Usi) / (Xsi * Xsi);
  var K = Convert_SpringConstantUnits(Ksi, "N/m", kUnit);
  K = lazy_RoundLongFloatTo10Places(K);

  var Xsi_squared = Xsi * Xsi;
  var Usi_into_2 = 2 * Usi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Spring constant of the spring = k;    
    Extension of the spring = x = ${X} ${xUnit}
    Elastic potential energy of the spring = U = ${U} ${uUnit};  
    `;

  if (uUnit != "J" || xUnit != "m") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (xUnit != "m") {
      Steps += `
        x = ${X} ${xUnit}
        After converting:
        x = ${Xsi} m
        `;
    }

    if (uUnit != "J" && xUnit != "m") {
      Steps += `
        `;
    }

    if (uUnit != "J") {
      Steps += `
        U = ${U} ${uUnit}
        After converting:
        U = ${Usi} J
        `;
    }
  }

  Steps += `
  
    The elastic potential energy of a spring is given by:
    U = 0.5 * k * x²

    On rearranging the above formula, the spring constant of the spring is given by:
    k = (2 * U) / x²
  
    Substituting the above values and evaluating:    
    k = (2 * ${Usi}) / ${Xsi}² N/m
    k = ${Usi_into_2} / ${Xsi_squared} N/m
    k = ${Ksi} N/m
    `;
  if (kUnit != "N/m") {
    Steps += `
    Converting 'k' from S.I. units to ${kUnit}:
    k = ${K} ${kUnit}
    `;
  }
  Steps += `
    'k' has been calculated.
    `;

  return [K, Steps];
};

export var Calculate_Extension_From_SpringConstant_ElasticPotentialEnergy = function (
  K,
  U,
  kUnit,
  xUnit,
  uUnit
) {
  var Ksi = Convert_SpringConstantUnits(parseFloat(K), kUnit, "N/m");
  var Usi = Convert_EnergyUnits(parseFloat(U), uUnit, "J");

  var Xsi = Math.sqrt(Math.abs((2 * Usi) / Ksi));
  var X = Convert_DistanceUnits(Xsi, "m", xUnit);
  X = lazy_RoundLongFloatTo10Places(X);

  var Ksi_by_2 = Ksi / 2;
  var Usi__by__Ksi_by_2 = Usi / Ksi_by_2;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
      Extension of the spring = x;
      Spring constant of the spring = k = ${K} ${kUnit}
      Elastic potential energy of the spring = U = ${U} ${uUnit};  
      `;

  if (uUnit != "J" || kUnit != "N/m") {
    Steps += `Converting the given values to S.I. units:
        `;

    if (kUnit != "N/m") {
      Steps += `
        k = ${K} ${kUnit}
        After converting:
        k = ${Ksi} N/m
        `;
    }

    if (uUnit != "J" && kUnit != "N/m") {
      Steps += `
          `;
    }

    if (uUnit != "J") {
      Steps += `
        U = ${U} ${uUnit}
        After converting:
        U = ${Usi} J
        `;
    }
  }

  Steps += `
    
      The elastic potential energy of a spring is given by:
      U = 0.5 * k * x²
  
      On rearranging the above formula, the extension of the spring is given by:
      x = sqrt(U / (0.5 * k))
    
      Substituting the above values and evaluating:
      x = sqrt(${Usi} / (0.5 * ${Ksi})) m
      x = sqrt(${Usi} / ${Ksi_by_2}) m
      x = sqrt(${Usi__by__Ksi_by_2}) m
      x = ${Xsi} m
      `;
  if (xUnit != "m") {
    Steps += `
      Converting 'x' from S.I. units to ${xUnit}:
      x = ${X} ${xUnit}
      `;
  }
  Steps += `
      'x' has been calculated.
      `;

  return [X, Steps];
};
