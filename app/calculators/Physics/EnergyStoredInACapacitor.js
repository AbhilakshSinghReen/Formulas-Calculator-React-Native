import {
  Convert_CapacitanceUnits,
  Convert_VoltageUnits,
  Convert_EnergyUnits,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, Capacitance, Voltage, Energy, Units
//FIXED: Units order: Capacitance, Voltage, Energy
export var Calculate_EnergyStoredInACapacitor_From_Capacitance_Voltage = function (
  C,
  V,
  cUnits,
  vUnits,
  eUnits
) {
  var Csi = Convert_CapacitanceUnits(parseFloat(C), cUnits, "F");
  var Vsi = Convert_VoltageUnits(parseFloat(V), vUnits, "V");

  var Esi = 0.5 * Csi * Vsi * Vsi;

  var E = Convert_EnergyUnits(Esi, "J", eUnits);
  E = lazy_RoundLongFloatTo10Places(E);

  var Vsi_squared = Vsi * Vsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Energy stored in the capacitor = E;
  Capacitance of the Capacitor = C = ${C} ${cUnits}
  Voltage across the Capacitor = V = ${V} ${vUnits};  
  `;

  if (vUnits != "V" || cUnits != "F") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (vUnits != "V") {
      Steps += `
    V = ${V} ${vUnits}
    After converting:
    V = ${Vsi} V
    `;
    }

    if (vUnits != "V" && cUnits != "F") {
      Steps += `
      `;
    }

    if (cUnits != "F") {
      Steps += `
    C = ${C} ${cUnits}
    After converting:
    C = ${Csi} F
    `;
    }
  }

  Steps += `

  The erergy stored in a capacitor is given by:
  E = 0.5 * C * V²

  Substituting the above values and evaluating:
  E = 0.5 * ${Csi} * ${Vsi}² J
  E = 0.5 * ${Csi} * ${Vsi_squared} J
  E = ${Esi} J
  `;
  if (eUnits != "J") {
    Steps += `
  Converting 'E' from S.I. units to ${eUnits}:
  E = ${E} ${eUnits}
  `;
  }
  Steps += `
  'E' has been calculated.
  `;

  return [E, Steps];
};

export var Calculate_Capacitance_From_Voltage_EnergyStoredInACapacitor = function (
  V,
  E,
  cUnits,
  vUnits,
  eUnits
) {
  var Vsi = Convert_VoltageUnits(parseFloat(V), vUnits, "V");
  var Esi = Convert_EnergyUnits(parseFloat(E), eUnits, "J");

  var Csi = (2 * Esi) / (Vsi * Vsi);
  var C = Convert_CapacitanceUnits(Csi, "F", cUnits);

  var Esi_into_2 = 2 * Esi;
  var Vsi_squared = Vsi * Vsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Capacitance of the Capacitor = C;   
  Voltage across the Capacitor = V = ${V} ${vUnits}
  Energy stored in the capacitor = E = ${E} ${eUnits};    
  `;

  if (vUnits != "V" || eUnits != "J") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (vUnits != "V") {
      Steps += `
    V = ${V} ${vUnits}
    After converting:
    V = ${Vsi} V
    `;
    }

    if (vUnits != "V" && eUnits != "J") {
      Steps += `
      `;
    }

    if (eUnits != "J") {
      Steps += `
    E = ${E} ${eUnits}
    After converting:
    E = ${Esi} J
    `;
    }
  }

  Steps += `

  The erergy stored in a capacitor is given by:
  E = 0.5 * C * V²

  On rearranging the above formula, the capacitance of the capacitor is given by:
  C = (2 * E) / V²

  Substituting the above values and evaluating:  
  C = (2 * ${Esi}) / ${Vsi}²
  C = ${Esi_into_2} / ${Vsi_squared}
  C = ${Csi} F
  `;
  if (cUnits != "F") {
    Steps += `
  Converting 'C' from S.I. units to ${cUnits}:
  E = ${C} ${cUnits}
  `;
  }
  Steps += `
  'C' has been calculated.
  `;

  return [C, Steps];
};

export var Calculate_Voltage_From_Capacitance_EnergyStoredInACapacitor = function (
  C,
  E,
  cUnits,
  vUnits,
  eUnits
) {
  var Csi = Convert_CapacitanceUnits(parseFloat(C), cUnits, "F");
  var Esi = Convert_EnergyUnits(parseFloat(E), eUnits, "J");

  var Vsi = Math.sqrt(Math.abs((2 * Esi) / Csi));
  var V = Convert_VoltageUnits(Vsi, "V", vUnits);

  var Csi_by_2 = 0.5 * Csi;
  var Esi__into__Csi_by_2 = Esi * Csi_by_2;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Voltage across the Capacitor = V;
  Capacitance of the Capacitor = C = ${C} ${cUnits}
  Energy stored in the capacitor = E = ${E} ${eUnits};  
  `;

  if (eUnits != "J" || cUnits != "F") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (eUnits != "J") {
      Steps += `
    E = ${E} ${eUnits}
    After converting:
    E = ${Esi} J
    `;
    }

    if (eUnits != "J" && cUnits != "F") {
      Steps += `
      `;
    }

    if (cUnits != "F") {
      Steps += `
    C = ${C} ${cUnits}
    After converting:
    C = ${Csi} F
    `;
    }
  }

  Steps += `

  The erergy stored in a capacitor is given by:
  E = 0.5 * C * V²

  On rearranging the above formula, the voltage across the capacitor is given by:
  V = sqrt(E / (0.5 * C))

  Substituting the above values and evaluating:
  V = sqrt(${Esi} / (0.5 * ${Csi}))
  V = sqrt(${Esi} /  ${Csi_by_2})
  V = sqrt(${Esi__into__Csi_by_2})
  V= ${Vsi} V
  
  `;
  if (vUnits != "V") {
    Steps += `
  Converting 'V' from S.I. units to ${vUnits}:
  V = ${V} ${vUnits}
  `;
  }
  Steps += `
  'V' has been calculated.
  `;

  return [V, Steps];
};
