import { Convert_TemperatureUnits, Convert_VolumeUnits } from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, V1, T1, V2, T2
//*FIXED: Units order: V1, T1, V2, T2
export var Calculate_V1_From_T1_V2_T2 = function (
  T1,
  V2,
  T2,
  v1Unit,
  t1Unit,
  v2Unit,
  t2Unit
) {
  var T1si = Convert_TemperatureUnits(T1, t1Unit, "K");
  var V2si = Convert_VolumeUnits(V2, v2Unit, "m³");
  var T2si = Convert_TemperatureUnits(T2, t2Unit, "K");

  var V1si = (V2si / T2si) * T1si;
  var V1 = Convert_VolumeUnits(V1si, "m³", v1Unit);
  V1 = lazy_RoundLongFloatTo10Places(V1);

  var V2si_by_T2si = V2si / T2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Initial volume = V₁;
    Initial temperature = T₁ = ${T1} ${t1Unit}
    Final volume = V₂ = ${V2} ${v2Unit}
    Final temperature = T₂ = ${T2} ${t2Unit};
    `;

  if (t1Unit != "K" || t2Unit != "K" || v2Unit != "m³") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (t1Unit != "K") {
      Steps += `
        T₁ = ${T1} ${t1Unit}
        After converting:
        T₁ = ${T1si} K
        `;
    }
    if (v2Unit != "m³") {
      Steps += `
        V₂ = ${V2} ${v2Unit}
        After converting:
        V₂ = ${V2si} m³
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
  
    For constant pressure,
    Charles's Law gives the Temperature-Volume relationship as:
    V₁ / T₁ = V₂ / T₂

    On rearranging the above equation, we get:
    V₁ = (V₂ / T₂) * T₁
  
    Substituting the above values and evaluating:
    V₁ = (${V2si} / ${T2si}) * ${T1si} m³
    V₁ = ${V2si_by_T2si} * ${T1si} m³
    V₁ = ${V1si} m³
    
    `;
  if (v1Unit != "m³") {
    Steps += `
    Converting 'V₁' from S.I. units to ${v1Unit}:
    V₁ = ${V1} ${v1Unit}
    `;
  }
  Steps += `
    'V₁' has been calculated.
    `;

  return [V1, Steps];
};

export var Calculate_T1_From_V1_V2_T2 = function (
  V1,
  V2,
  T2,
  v1Unit,
  t1Unit,
  v2Unit,
  t2Unit
) {
  var V1si = Convert_VolumeUnits(V1, v1Unit, "m³");
  var V2si = Convert_VolumeUnits(V2, v2Unit, "m³");
  var T2si = Convert_TemperatureUnits(T2, t2Unit, "K");

  var T1si = V1si / (V2si / T2si);
  var T1 = Convert_TemperatureUnits(T1si, "K", t1Unit);
  T1 = lazy_RoundLongFloatTo10Places(T1);

  var V2si_by_T2si = V2si / T2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Initial temperature = T₁;
    Initial volume = V₁ = ${V1} ${v1Unit}
    Final volume = V₂ = ${V2} ${v2Unit}
    Final temperature = T₂ = ${T2} ${t2Unit};
    `;

  if (t2Unit != "K" || v1Unit != "m³" || v2Unit != "m³") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (v1Unit != "m³") {
      Steps += `
        V₁ = ${V1} ${v1Unit}
        After converting:
        V₁ = ${V1si} m³
        `;
    }

    if (v2Unit != "m³") {
      Steps += `
        V₂ = ${V2} ${v2Unit}
        After converting:
        V₂ = ${V2si} m³
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
  
  For constant pressure,
  Charles's Law gives the Temperature-Volume relationship as:
  V₁ / T₁ = V₂ / T₂

  On rearranging the above equation, we get:
  T₁ = V₁ / (V₂ / T₂)

  Substituting the above values and evaluating:
  T₁ = ${V1si} / (${V2si} / ${T2si}) K
  T₁ = ${V1si} / ${V2si_by_T2si} K
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

export var Calculate_V2_From_V1_T1_T2 = function (
  V1,
  T1,
  T2,
  v1Unit,
  t1Unit,
  v2Unit,
  t2Unit
) {
  var V1si = Convert_VolumeUnits(V1, v1Unit, "m³");
  var T1si = Convert_TemperatureUnits(T1, t1Unit, "K");
  var T2si = Convert_TemperatureUnits(T2, t2Unit, "K");

  var V2si = (V1si / T1si) * T2si;
  var V2 = Convert_VolumeUnits(V2si, "m³", v2Unit);
  V2 = lazy_RoundLongFloatTo10Places(V2);

  var V1si_by_T1si = V1si / T1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Final volume = V₂;
    Initial Volume = V₁ = ${V1} ${v1Unit}
    Initial temperature = T₁ = ${T1} ${t1Unit}
    Final temperature = T₂ = ${T2} ${t2Unit};
    `;

  if (t1Unit != "K" || t2Unit != "K" || v1Unit != "m³") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (v1Unit != "m³") {
      Steps += `
        V₁ = ${V1} ${v1Unit}
        After converting:
        V₁ = ${V1si} m³
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
  
    For constant pressure,
    Charles's Law gives the Temperature-Volume relationship as:
    V₁ / T₁ = V₂ / T₂

    On rearranging the above equation, we get:
    V₂ = (V₁ / T₁) * T₂
  
    Substituting the above values and evaluating:
    V₂ = (${V1si} / ${T1si}) * ${T2si} m³
    V₂ = ${V1si_by_T1si} * ${T2si} m³
    V₂ = ${V2si} m³
    
    `;
  if (v2Unit != "m³") {
    Steps += `
    Converting 'V₂' from S.I. units to ${v2Unit}:
    V₂ = ${V2} ${v2Unit}
    `;
  }
  Steps += `
    'V₂' has been calculated.
    `;

  return [V2, Steps];
};

export var Calculate_T2_From_V1_T1_V2 = function (
  V1,
  T1,
  V2,
  v1Unit,
  t1Unit,
  v2Unit,
  t2Unit
) {
  var V1si = Convert_VolumeUnits(V1, v1Unit, "m³");
  var T1si = Convert_TemperatureUnits(T1, t1Unit, "K");
  var V2si = Convert_VolumeUnits(V2, v2Unit, "m³");

  var T2si = V2si / (V1si / T1si);
  var T2 = Convert_TemperatureUnits(T2si, "K", t2Unit);
  T2 = lazy_RoundLongFloatTo10Places(T2);

  var V1si_by_T1si = V1si / T1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Final temperature = T₂;
    Initial volume = V₁ = ${V1} ${v1Unit}
    Initial temperature = T₁ = ${T1} ${t1Unit}
    Final volume = V₂ = ${V2} ${v2Unit};
    `;

  if (t1Unit != "K" || v1Unit != "m³" || v2Unit != "m³") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (v1Unit != "m³") {
      Steps += `
        V₁ = ${V1} ${v1Unit}
        After converting:
        V₁ = ${V1si} m³
        `;
    }
    if (t1Unit != "K") {
      Steps += `
        T₁ = ${T1} ${t1Unit}
        After converting:
        T₁ = ${T1si} K
        `;
    }

    if (v2Unit != "m³") {
      Steps += `
        V₂ = ${V2} ${v2Unit}
        After converting:
        V₂ = ${V2si} m³
        `;
    }
  }

  Steps += `
  
  For constant pressure,
  Charles's Law gives the Temperature-Volume relationship as:
  V₁ / T₁ = V₂ / T₂

  On rearranging the above equation, we get:
  T₂ = V₂ / (V₁ / T₁)

  Substituting the above values and evaluating:
  T₂ = ${V2si} / (${V1si} / ${T1si}) K
  T₂ = ${V2si} / ${V1si_by_T1si} K
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
