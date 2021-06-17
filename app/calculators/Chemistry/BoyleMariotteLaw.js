import { Convert_PressureUnits, Convert_VolumeUnits } from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, P1, V1, P2, V2
//FIXED: Units order: P1, V1, P2, V2
export var Calculate_P1_From_V1_P2_V2 = function (
  V1,
  P2,
  V2,
  p1Unit,
  v1Unit,
  p2Unit,
  v2Unit
) {
  var V1si = Convert_VolumeUnits(parseFloat(V1), v1Unit, "m³");
  var P2si = Convert_PressureUnits(parseFloat(P2), p2Unit, "Pa");
  var V2si = Convert_VolumeUnits(parseFloat(V2), v2Unit, "m³");

  var P1si = (P2si * V2si) / V1si;
  var P1 = Convert_PressureUnits(P1si, "Pa", p1Unit);
  P1 = lazy_RoundLongFloatTo10Places(P1);

  var P2si_into_V2si = P2si * V2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Initial pressure = P₁;
    Initial volume = V₁ = ${V1} ${v1Unit}
    Final pressure = P₂ = ${P2} ${p2Unit}
    Final volume = V₂ = ${V2} ${v2Unit};
    `;

  if (v1Unit != "m³" || p2Unit != "Pa" || v2Unit != "m³") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (v1Unit != "m³") {
      Steps += `
        V₁ = ${V1} ${v1Unit}
        After converting:
        V₁ = ${V1si} m³
        `;
    }
    if (p2Unit != "Pa") {
      Steps += `
          P₂ = ${P2} ${p2Unit}
          After converting:
          P₂ = ${P2si} Pa
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
  
    For constant temperature,
    Boyle–Mariotte Law gives the Pressure-Volume relationship as:
    P₁ * V₁ = P₂ * V₂

    On rearranging the above equation, we get:
    P₁ = (P₂ * V₂) / V₁
  
    Substituting the above values and evaluating:
    P₁ = (${P2si} * ${V2si}) / ${V1si} Pa
    P₁ = ${P2si_into_V2si} / ${V1si} Pa
    P₁ = ${P1si} Pa
    
    `;
  if (p1Unit != "Pa") {
    Steps += `
    Converting 'P₁' from S.I. units to ${p1Unit}:
    P₁ = ${P1} ${p1Unit}
    `;
  }
  Steps += `
    'P₁' has been calculated.
    `;

  return [P1, Steps];
};

export var Calculate_V1_From_P1_P2_V2 = function (
  P1,
  P2,
  V2,
  p1Unit,
  v1Unit,
  p2Unit,
  v2Unit
) {
  var P1si = Convert_PressureUnits(parseFloat(P1), p1Unit, "Pa");
  var P2si = Convert_PressureUnits(parseFloat(P2), p2Unit, "Pa");
  var V2si = Convert_VolumeUnits(parseFloat(V2), v2Unit, "m³");

  var V1si = (P2si * V2si) / P1si;
  var V1 = Convert_VolumeUnits(V1si, "m³", v1Unit);
  V1 = lazy_RoundLongFloatTo10Places(V1);

  var P2si_into_V2si = P2si * V2si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Initial volume = V₁;
    Initial pressure = P₁ = ${P1} ${p1Unit}
    Final pressure = P₂ = ${P2} ${p2Unit}
    Final volume = V₂ = ${V2} ${v2Unit};
    `;

  if (p1Unit != "Pa" || p2Unit != "Pa" || v2Unit != "m³") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (p1Unit != "Pa") {
      Steps += `
        P₁ = ${P1} ${p1Unit}
        After converting:
        P₁ = ${P1si} m³
        `;
    }
    if (p2Unit != "Pa") {
      Steps += `
          P₂ = ${P2} ${p2Unit}
          After converting:
          P₂ = ${P2si} Pa
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
  
    For constant temperature,
    Boyle–Mariotte Law gives the Pressure-Volume relationship as:
    P₁ * V₁ = P₂ * V₂

    On rearranging the above equation, we get:
    V₁ = (P₂ * V₂) / P₁
  
    Substituting the above values and evaluating:
    V₁ = (${P2si} * ${V2si}) / ${P1si} m³
    V₁ = ${P2si_into_V2si} / ${P1si} m³
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

export var Calculate_P2_From_P1_V1_V2 = function (
  P1,
  V1,
  V2,
  p1Unit,
  v1Unit,
  p2Unit,
  v2Unit
) {
  var P1si = Convert_PressureUnits(parseFloat(P1), p1Unit, "Pa");
  var V1si = Convert_VolumeUnits(parseFloat(V1), v1Unit, "m³");
  var V2si = Convert_VolumeUnits(parseFloat(V2), v2Unit, "m³");

  var P2si = (P1si * V1si) / V2si;
  var P2 = Convert_PressureUnits(P2si, "Pa", p2Unit);
  P2 = lazy_RoundLongFloatTo10Places(P2);

  var P1si_into_V1si = P1si * V1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Final pressure = P₂;
    Initial pressure = P₁ = ${P1} ${p1Unit}
    Initial volume = V₁ = ${V1} ${v1Unit}
    Final volume = V₂ = ${V2} ${v2Unit};
    `;

  if (v1Unit != "m³" || p1Unit != "Pa" || v2Unit != "m³") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (p1Unit != "Pa") {
      Steps += `
        P₁ = ${P1} ${p1Unit}
        After converting:
        P₁ = ${P1si} Pa
        `;
    }
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
  }

  Steps += `
  
    For constant temperature,
    Boyle–Mariotte Law gives the Pressure-Volume relationship as:
    P₁ * V₁ = P₂ * V₂

    On rearranging the above equation, we get:
    P₂ = (P₁ * V₁) / V₂
  
    Substituting the above values and evaluating:
    P₂ = (${P1si} * ${V1si}) / ${V2si} Pa
    P₂ = ${P1si_into_V1si} / ${V2si} Pa
    P₂ = ${P2si} Pa
    
    `;
  if (p2Unit != "Pa") {
    Steps += `
    Converting 'P₂' from S.I. units to ${p2Unit}:
    P₂ = ${P2} ${p2Unit}
    `;
  }
  Steps += `
    'P₂' has been calculated.
    `;

  return [P2, Steps];
};

export var Calculate_V2_From_P1_V1_P2 = function (
  P1,
  V1,
  P2,
  p1Unit,
  v1Unit,
  p2Unit,
  v2Unit
) {
  var P1si = Convert_PressureUnits(parseFloat(P1), p1Unit, "Pa");
  var V1si = Convert_VolumeUnits(parseFloat(V1), v1Unit, "m³");
  var P2si = Convert_PressureUnits(parseFloat(P2), p2Unit, "Pa");

  var V2si = (P1si * V1si) / P2si;
  var V2 = Convert_VolumeUnits(V2si, "m³", v2Unit);
  V2 = lazy_RoundLongFloatTo10Places(V2);

  var P1si_into_V1si = P1si * V1si;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    Final volume = V₂;
    Initial pressure = P₁ = ${P1} ${p1Unit}
    Initial volume = V₁ = ${V1} ${v1Unit}
    Final pressure = P₂ = ${P2} ${p2Unit};
    `;

  if (v1Unit != "m³" || p2Unit != "Pa" || p1Unit != "Pa") {
    Steps += `Converting the given values to S.I. units:
      `;

    if (p1Unit != "Pa") {
      Steps += `
        P₁ = ${P1} ${p1Unit}
        After converting:
        P₁ = ${P1si} m³
        `;
    }
    if (v1Unit != "m³") {
      Steps += `
        V₁ = ${V1} ${v1Unit}
        After converting:
        V₁ = ${V1si} m³
        `;
    }
    if (p2Unit != "Pa") {
      Steps += `
        P₂ = ${P2} ${p2Unit}
        After converting:
        P₂ = ${P2si} Pa
        `;
    }
  }

  Steps += `
  
    For constant temperature,
    Boyle–Mariotte Law gives the Pressure-Volume relationship as:
    P₁ * V₁ = P₂ * V₂

    On rearranging the above equation, we get:
    V₂ = (P₁ * V₁) / P₂
  
    Substituting the above values and evaluating:
    V₂ = (${P1si} * ${V1si}) / ${P2si} m³
    V₂ = ${P1si_into_V1si} / ${P2si} m³
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
