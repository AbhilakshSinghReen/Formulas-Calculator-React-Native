import {
  Convert_ThermalConductivityUnits,
  Convert_AreaUnits,
  Convert_DistanceUnits,
  Convert_TemperatureUnits,
  Convert_PowerUnits,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, ThermalConductivity, Aera, Length, T1, T2, HeatCurrent
//FIXED: Units order: ThermalConductivity, Aera, Length, T1, T2, HeatCurrent
//Formula: Iₕ = K * (A / l) * (T₂ - T₁)
export var Calculate_HeatCurrent_From_ThermalConductivity_Area_Length_T1_T2 = function (
  K,
  A,
  L,
  T1,
  T2,
  kUnit,
  aUnit,
  lUnit,
  t1Unit,
  t2Unit,
  ihUnit
) {
  var Ksi = Convert_ThermalConductivityUnits(K, kUnit, "W/(m.K)");
  var Asi = Convert_AreaUnits(A, aUnit, "m²");
  var Lsi = Convert_DistanceUnits(L, lUnit, "m");
  var T1si = Convert_TemperatureUnits(T1, t1Unit, "K");
  var T2si = Convert_TemperatureUnits(T2, t2Unit, "K");

  var Ihsi = Ksi * (Asi / Lsi) * (T2si - T1si);
  var Ih = Convert_PowerUnits(Ihsi, "W", ihUnit);
  Ih = lazy_RoundLongFloatTo10Places(Ih);

  var Asi_By_Lsi = Asi / Lsi;
  var T2si_Minus_T1si = T2si - T1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Heat Current = Iₕ;
  Thermal conductivity of material = K = ${K} ${kUnit}
  Area of cross section = A = ${A} ${aUnit}
  Length = l = ${L} ${lUnit}  
  Temperature at end 1 = T₁ = ${T1} ${t1Unit}
  Temperature at end 2 = T₂ = ${T2} ${t2Unit};
  `;

  if (
    kUnit != "W/(m.K)" ||
    aUnit != "m²" ||
    lUnit != "m" ||
    t1Unit != "K" ||
    t2Unit != "K"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "W/(m.K)") {
      Steps += `
      K = ${K} ${kUnit}
      After converting:
      K = ${Ksi} W/(m.K)

      `;
    }

    if (aUnit != "m²") {
      Steps += `
      A = ${A} ${aUnit}
      After converting:
      A = ${Asi} m²
      
      `;
    }

    if (lUnit != "m") {
      Steps += `
      l = ${L} ${lUnit}
      After converting:
      l = ${Lsi} m
      
      `;
    }

    if (t1Unit != "K") {
      Steps += `
      T₁ = ${T1} ${t1Unit}
      After converting:
      T₁ = ${T1si} K
      
      `;
    }

    if (t2Unit != "K") {
      Steps += `
      T₂ = ${T2} ${t2Unit}
      After converting:
      T₂ = ${T2si} K
      
      `;
    }
  }

  Steps += `

  Heat current is given by:
  Iₕ = K * (A / l) * (T₂ - T₁)

  Substituting the above values and evaluating:
  Iₕ = ${Ksi} * (${Asi} / ${Lsi}) * (${T2si} - ${T1si}) W
  Iₕ = ${Ksi} * ${Asi_By_Lsi} * ${T2si_Minus_T1si} W
  Iₕ = ${Ihsi} W
  
  `;
  if (ihUnit != "W") {
    Steps += `
  Converting 'Iₕ' from S.I. units to ${ihUnit}:
  Iₕ = ${Ih} ${ihUnit}
  `;
  }
  Steps += `
  'Iₕ' has been calculated.
  `;

  return [Ih, Steps];
};

export var Calculate_ThermalConductivity_From_Area_Length_T1_T2_HeatCurrent = function (
  A,
  L,
  T1,
  T2,
  Ih,
  kUnit,
  aUnit,
  lUnit,
  t1Unit,
  t2Unit,
  ihUnit
) {
  var Asi = Convert_AreaUnits(A, aUnit, "m²");
  var Lsi = Convert_DistanceUnits(L, lUnit, "m");
  var T1si = Convert_TemperatureUnits(T1, t1Unit, "K");
  var T2si = Convert_TemperatureUnits(T2, t2Unit, "K");
  var Ihsi = Convert_PowerUnits(Ih, ihUnit, "W");

  var Ksi = (Ihsi * Lsi) / (Asi * (T2si - T1si));
  var K = Convert_ThermalConductivityUnits(Ksi, "W/(m.K)", ihUnit);
  K = lazy_RoundLongFloatTo10Places(K);

  var Ihsi_Into_Lsi = Ihsi * Lsi;
  var T2si_Minus_T1si = T2si - T1si;
  var Asi__Into__T2si_Minus_T1si = Asi * T2si_Minus_T1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Thermal conductivity of material = K;  
  Area of cross section = A = ${A} ${aUnit}
  Length = l = ${L} ${lUnit}  
  Temperature at end 1 = T₁ = ${T1} ${t1Unit}
  Temperature at end 2 = T₂ = ${T2} ${t2Unit}
  Heat Current = Iₕ =${Ih} ${ihUnit};
  `;

  if (
    ihUnit != "W" ||
    aUnit != "m²" ||
    lUnit != "m" ||
    t1Unit != "K" ||
    t2Unit != "K"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (aUnit != "m²") {
      Steps += `
      A = ${A} ${aUnit}
      After converting:
      A = ${Asi} m²
      
      `;
    }

    if (lUnit != "m") {
      Steps += `
      l = ${L} ${lUnit}
      After converting:
      l = ${Lsi} m
      
      `;
    }

    if (t1Unit != "K") {
      Steps += `
      T₁ = ${T1} ${t1Unit}
      After converting:
      T₁ = ${T1si} K
      
      `;
    }

    if (t2Unit != "K") {
      Steps += `
      T₂ = ${T2} ${t2Unit}
      After converting:
      T₂ = ${T2si} K
      
      `;
    }

    if (ihUnit != "W") {
      Steps += `
      Iₕ = ${Ih} ${ihUnit}
      After converting:
      Iₕ = ${Ihsi} W

      `;
    }
  }

  Steps += `

  Heat current is given by:
  Iₕ = K * (A / l) * (T₂ - T₁)

  On rearranging the above formula, the thermal conductivity of the material is given by:
  K = (Iₕ * l) / (A * (T₂ - T₁))

  Substituting the above values and evaluating:
  K = (${Ihsi} * ${Lsi}) / (${Asi} * (${T2si} - ${T1si})) W/(m.K)
  K = ${Ihsi_Into_Lsi} / (${Asi} * ${T2si_Minus_T1si}) W/(m.K)
  K = ${Ihsi_Into_Lsi} / ${Asi__Into__T2si_Minus_T1si} W/(m.K)
  K = ${Ksi} W/(m.K)
  
  `;
  if (kUnit != "W/(m.K)") {
    Steps += `
  Converting 'K' from S.I. units to ${kUnit}:
  K = ${K} ${kUnit}
  `;
  }
  Steps += `
  'K' has been calculated.
  `;

  return [K, Steps];
};

export var Calculate_Area_From_ThermalConductivity_Length_T1_T2_HeatCurrent = function (
  K,
  L,
  T1,
  T2,
  Ih,
  kUnit,
  aUnit,
  lUnit,
  t1Unit,
  t2Unit,
  ihUnit
) {
  var Ksi = Convert_ThermalConductivityUnits(K, kUnit, "W/(m.K)");
  var Lsi = Convert_DistanceUnits(L, lUnit, "m");
  var T1si = Convert_TemperatureUnits(T1, t1Unit, "K");
  var T2si = Convert_TemperatureUnits(T2, t2Unit, "K");
  var Ihsi = Convert_PowerUnits(Ih, ihUnit, "W");

  var Asi = (Ihsi * Lsi) / (Ksi * (T2si - T1si));
  var A = Convert_AreaUnits(Asi, "m²", aUnit);
  A = lazy_RoundLongFloatTo10Places(A);

  var Ihsi_Into_Lsi = Ihsi * Lsi;
  var T2si_Minus_T1si = T2si - T1si;
  var Ksi__Into__T2si_Minus_T1si = Ksi * T2si_Minus_T1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Area of cross section = A;
  Thermal conductivity of material = K = ${K} ${kUnit}
  Length = l = ${L} ${lUnit}  
  Temperature at end 1 = T₁ = ${T1} ${t1Unit}
  Temperature at end 2 = T₂ = ${T2} ${t2Unit}
  Heat Current = Iₕ =${Ih} ${ihUnit};
  `;

  if (
    ihUnit != "W" ||
    kUnit != "W/(m.K)" ||
    lUnit != "m" ||
    t1Unit != "K" ||
    t2Unit != "K"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "W/(m.K)") {
      Steps += `
      K = ${K} ${kUnit}
      After converting:
      K = ${Ksi} W/(m.K)
      
      `;
    }

    if (lUnit != "m") {
      Steps += `
      l = ${L} ${lUnit}
      After converting:
      l = ${Lsi} m
      
      `;
    }

    if (t1Unit != "K") {
      Steps += `
      T₁ = ${T1} ${t1Unit}
      After converting:
      T₁ = ${T1si} K
      
      `;
    }

    if (t2Unit != "K") {
      Steps += `
      T₂ = ${T2} ${t2Unit}
      After converting:
      T₂ = ${T2si} K
      
      `;
    }

    if (ihUnit != "W") {
      Steps += `
      Iₕ = ${Ih} ${ihUnit}
      After converting:
      Iₕ = ${Ihsi} W

      `;
    }
  }

  Steps += `

  Heat current is given by:
  Iₕ = K * (A / l) * (T₂ - T₁)

  On rearranging the above formula, the area of cross section is given by:
  A = (Iₕ * l) / (K * (T₂ - T₁))

  Substituting the above values and evaluating:
  A = (${Ihsi} * ${Lsi}) / (${Ksi} * (${T2si} - ${T1si})) m²
  A = ${Ihsi_Into_Lsi} / (${Ksi} * ${T2si_Minus_T1si}) m²
  A = ${Ihsi_Into_Lsi} / ${Ksi__Into__T2si_Minus_T1si} m²
  A = ${Asi} m²
  
  `;
  if (aUnit != "m²") {
    Steps += `
  Converting 'A' from S.I. units to ${aUnit}:
  A = ${A} ${aUnit}
  `;
  }
  Steps += `
  'A' has been calculated.
  `;

  return [A, Steps];
};

export var Calculate_Length_From_ThermalConductivity_Area_T1_T2_HeatCurrent = function (
  K,
  A,
  T1,
  T2,
  Ih,
  kUnit,
  aUnit,
  lUnit,
  t1Unit,
  t2Unit,
  ihUnit
) {
  var Ksi = Convert_ThermalConductivityUnits(K, kUnit, "W/(m.K)");
  var Asi = Convert_AreaUnits(A, aUnit, "m²");
  var T1si = Convert_TemperatureUnits(T1, t1Unit, "K");
  var T2si = Convert_TemperatureUnits(T2, t2Unit, "K");
  var Ihsi = Convert_PowerUnits(Ih, ihUnit, "W");

  var Lsi = (Ksi * Asi * (T2si - T1si)) / Ihsi;
  var L = Convert_DistanceUnits(Lsi, "m", lUnit);
  L = lazy_RoundLongFloatTo10Places(L);

  var T2si_Minus_T1si = T2si - T1si;
  var Ksi_Into_Asi__Into__T2si_Minus_T1si = Ksi * Asi * T2si_Minus_T1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Length = l;
  Thermal conductivity of material = K = ${K} ${kUnit}
  Area of cross section = A = ${A} ${aUnit}  
  Temperature at end 1 = T₁ = ${T1} ${t1Unit}
  Temperature at end 2 = T₂ = ${T2} ${t2Unit}
  Heat Current = Iₕ =${Ih} ${ihUnit};
  `;

  if (
    ihUnit != "W" ||
    kUnit != "W/(m.K)" ||
    aUnit != "m²" ||
    t1Unit != "K" ||
    t2Unit != "K"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "W/(m.K)") {
      Steps += `
      K = ${K} ${kUnit}
      After converting:
      K = ${Ksi} W/(m.K)
      
      `;
    }

    if (aUnit != "m²") {
      Steps += `
      A = ${A} ${aUnit}
      After converting:
      A = ${Asi} m²
      
      `;
    }

    if (t1Unit != "K") {
      Steps += `
      T₁ = ${T1} ${t1Unit}
      After converting:
      T₁ = ${T1si} K
      
      `;
    }

    if (t2Unit != "K") {
      Steps += `
      T₂ = ${T2} ${t2Unit}
      After converting:
      T₂ = ${T2si} K
      
      `;
    }

    if (ihUnit != "W") {
      Steps += `
      Iₕ = ${Ih} ${ihUnit}
      After converting:
      Iₕ = ${Ihsi} W

      `;
    }
  }

  Steps += `

  Heat current is given by:
  Iₕ = K * (A / l) * (T₂ - T₁)

  On rearranging the above formula, the length is given by:
  l = (K * A * (T₂ - T₁)) / Iₕ

  Substituting the above values and evaluating:
  l = (${Ksi} * ${Asi} * (${T2si} - ${T1si})) / ${Ihsi} m
  l = (${Ksi} * ${Asi} * ${T2si_Minus_T1si}) / ${Ihsi} m
  l = ${Ksi_Into_Asi__Into__T2si_Minus_T1si} / ${Ihsi} m
  l = ${Lsi} m
  
  `;
  if (lUnit != "m") {
    Steps += `
  Converting 'l' from S.I. units to ${lUnit}:
  l = ${L} ${lUnit}
  `;
  }
  Steps += `
  'l' has been calculated.
  `;

  return [L, Steps];
};

export var Calculate_T1_From_ThermalConductivity_Area_Length_T2_HeatCurrent = function (
  K,
  A,
  L,
  T2,
  Ih,
  kUnit,
  aUnit,
  lUnit,
  t1Unit,
  t2Unit,
  ihUnit
) {
  var Ksi = Convert_ThermalConductivityUnits(K, kUnit, "W/(m.K)");
  var Asi = Convert_AreaUnits(A, aUnit, "m²");
  var Lsi = Convert_DistanceUnits(L, lUnit, "m");
  var T2si = Convert_TemperatureUnits(T2, t2Unit, "K");
  var Ihsi = Convert_PowerUnits(Ih, ihUnit, "W");

  var T1si = T2si - (Ihsi * Lsi) / (Ksi * Asi);
  var T1 = Convert_TemperatureUnits(T1si, "K", t1Unit);
  T1 = lazy_RoundLongFloatTo10Places(T1);

  var Ihsi_Into_Lsi = Ihsi * Lsi;
  var Ksi_Into_Asi = Ksi * Asi;
  var Ihsi_Into_Lsi__By__Ksi_Into_Asi = Ihsi_Into_Lsi / Ksi_Into_Asi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Temperature at end 1 = T₁;
  Thermal conductivity of material = K = ${K} ${kUnit}
  Area of cross section = A = ${A} ${aUnit}  
  Length = l = ${L} ${lUnit}
  Temperature at end 2 = T₂ = ${T2} ${t2Unit}
  Heat Current = Iₕ =${Ih} ${ihUnit};
  `;

  if (
    ihUnit != "W" ||
    kUnit != "W/(m.K)" ||
    aUnit != "m²" ||
    lUnit != "m" ||
    t2Unit != "K"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "W/(m.K)") {
      Steps += `
      K = ${K} ${kUnit}
      After converting:
      K = ${Ksi} W/(m.K)
      
      `;
    }

    if (aUnit != "m²") {
      Steps += `
      A = ${A} ${aUnit}
      After converting:
      A = ${Asi} m²
      
      `;
    }

    if (lUnit != "m") {
      Steps += `
      l = ${L} ${lUnit}
      After converting:
      l = ${Lsi} m
      
      `;
    }

    if (t2Unit != "K") {
      Steps += `
      T₂ = ${T2} ${t2Unit}
      After converting:
      T₂ = ${T2si} K
      
      `;
    }

    if (ihUnit != "W") {
      Steps += `
      Iₕ = ${Ih} ${ihUnit}
      After converting:
      Iₕ = ${Ihsi} W

      `;
    }
  }

  Steps += `

  Heat current is given by:
  Iₕ = K * (A / l) * (T₂ - T₁)

  On rearranging the above formula, the Temperature at end 1 is given by:
  T₁ = T₂ - ((Iₕ * l) / (K * A))

  Substituting the above values and evaluating:
  T₁ = ${T2si} - ((${Ihsi} * ${Lsi}) / (${Ksi} * ${Asi})) K
  T₁ = ${T2si} - (${Ihsi_Into_Lsi} / ${Ksi_Into_Asi}) K
  T₁ = ${T2si} - ${Ihsi_Into_Lsi__By__Ksi_Into_Asi} K
  T₁ = ${T1si} K
  
  
  `;
  if (t1Unit != "K") {
    Steps += `
  Converting 'T₁' from S.I. units to ${t1Unit}:
  T₁ = ${T1} ${t1Unit}
  `;
  }
  Steps += `
  'T₁' has been calculated.
  `;

  return [T1, Steps];
};

export var Calculate_T2_From_ThermalConductivity_Area_Length_T1_HeatCurrent = function (
  K,
  A,
  L,
  T1,
  Ih,
  kUnit,
  aUnit,
  lUnit,
  t1Unit,
  t2Unit,
  ihUnit
) {
  var Ksi = Convert_ThermalConductivityUnits(K, kUnit, "W/(m.K)");
  var Asi = Convert_AreaUnits(A, aUnit, "m²");
  var Lsi = Convert_DistanceUnits(L, lUnit, "m");
  var T1si = Convert_TemperatureUnits(T1, t1Unit, "K");
  var Ihsi = Convert_PowerUnits(Ih, ihUnit, "W");

  var T2si = (Ihsi * Lsi) / (Ksi * Asi) + T1si;
  var T2 = Convert_TemperatureUnits(T2si, "K", t2Unit);
  T2 = lazy_RoundLongFloatTo10Places(T2);

  var Ihsi_Into_Lsi = Ihsi * Lsi;
  var Ksi_Into_Asi = Ksi * Asi;
  var Ihsi_Into_Lsi__By__Ksi_Into_Asi = Ihsi_Into_Lsi / Ksi_Into_Asi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Temperature at end 2 = T₂;
  Thermal conductivity of material = K = ${K} ${kUnit}
  Area of cross section = A = ${A} ${aUnit}  
  Length = l = ${L} ${lUnit}
  Temperature at end 1 = T₁ = ${T1} ${t1Unit}
  Heat Current = Iₕ =${Ih} ${ihUnit};
  `;

  if (
    ihUnit != "W" ||
    kUnit != "W/(m.K)" ||
    aUnit != "m²" ||
    lUnit != "m" ||
    t1Unit != "K"
  ) {
    Steps += `Converting the given values to S.I. units:
    `;

    if (kUnit != "W/(m.K)") {
      Steps += `
      K = ${K} ${kUnit}
      After converting:
      K = ${Ksi} W/(m.K)
      
      `;
    }

    if (aUnit != "m²") {
      Steps += `
      A = ${A} ${aUnit}
      After converting:
      A = ${Asi} m²
      
      `;
    }

    if (lUnit != "m") {
      Steps += `
      l = ${L} ${lUnit}
      After converting:
      l = ${Lsi} m
      
      `;
    }

    if (t1Unit != "K") {
      Steps += `
      T₁ = ${T1} ${t1Unit}
      After converting:
      T₁ = ${T1si} K
      
      `;
    }

    if (ihUnit != "W") {
      Steps += `
      Iₕ = ${Ih} ${ihUnit}
      After converting:
      Iₕ = ${Ihsi} W

      `;
    }
  }

  Steps += `

  Heat current is given by:
  Iₕ = K * (A / l) * (T₂ - T₁)

  On rearranging the above formula, the Temperature at end 2 is given by:
  T₂ = ((Iₕ * l) / (K * A)) + T₁

  Substituting the above values and evaluating:
  T₂ = ((${Ihsi} * ${Lsi}) / (${Ksi} * ${Asi})) + ${T1si} K
  T₂ = (${Ihsi_Into_Lsi} / ${Ksi_Into_Asi}) + ${T1si} K
  T₂ = ${Ihsi_Into_Lsi__By__Ksi_Into_Asi}  + ${T1si} K
  T₂ = ${T2si} K
  
  
  `;
  if (t2Unit != "K") {
    Steps += `
  Converting 'T₂' from S.I. units to ${t2Unit}:
  T₂ = ${T2} ${t2Unit}
  `;
  }
  Steps += `
  'T₂' has been calculated.
  `;

  return [T2, Steps];
};
