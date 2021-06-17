import {
  Convert_MassUnits,
  Convert_VelocityUnits,
  Convert_ChargeUnits,
  Convert_MagneticFieldUnits,
  Convert_DistanceUnits,
} from "../Conversions";

import { lazy_RoundLongFloatTo10Places } from "../Mathematics/MathematicsBasics";

//Order: Calculate, Mass, Velocity, Charge, MagneticField, Radius
//FIXED: Units order: Mass, Velocity, Charge, MagneticField, Radius
export var Calculate_Radius_From_Mass_Velocity_Charge_MagneticField = function (
  M,
  V,
  Q,
  B,
  mUnit,
  vUnit,
  qUnit,
  bUnit,
  rUnit
) {
  var Msi = Convert_MassUnits(parseFloat(M), mUnit, "kg");
  var Vsi = Convert_VelocityUnits(parseFloat(V), vUnit, "m/s");
  var Qsi = Convert_ChargeUnits(parseFloat(Q), qUnit, "C");
  var Bsi = Convert_MagneticFieldUnits(parseFloat(B), bUnit, "T");

  var Rsi = (Msi * Vsi) / (Qsi * Bsi);
  var R = Convert_DistanceUnits(Rsi, "m", rUnit);
  R = lazy_RoundLongFloatTo10Places(R);

  var Msi_Into_Vsi = Msi * Vsi;
  var Qsi_Into_Bsi = Qsi * Bsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Radius of revolution of the particle = r;
  Mass of the particle = m = ${M} ${mUnit}
  Velocity of the particle = v = ${V} ${vUnit}
  Charge on the particle = q = ${Q} ${qUnit}  
  Magnitude of the magnetic field = B = ${B} ${bUnit};
  `;

  if (mUnit != "kg" || vUnit != "m/s" || qUnit != "C" || bUnit != "T") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += `
      m = ${M} ${mUnit}
      After converting:
      m = ${Msi} kg

      `;
    }

    if (vUnit != "m/s") {
      Steps += `
      v = ${V} ${vUnit}
      After converting:
      v = ${Vsi} m/s
      
      `;
    }

    if (qUnit != "C") {
      Steps += `
      q = ${Q} ${qUnit}
      After converting:
      q = ${Qsi} C
      
      `;
    }

    if (bUnit != "T") {
      Steps += `
      B = ${B} ${bUnit}
      After converting:
      B = ${Bsi} T
      
      `;
    }
  }

  Steps += `

  The radius of revolution of a charge in a magnetic field is given by:
  r = (m * v) / (q * B)  

  Substituting the above values and evaluating:
  r = (${Msi} * ${Vsi}) / (${Qsi} * ${Bsi}) m
  r = ${Msi_Into_Vsi} / ${Qsi_Into_Bsi} m
  r = ${Rsi} m
  
  `;
  if (rUnit != "m") {
    Steps += `
  Converting 'r' from S.I. units to ${rUnit}:
  r = ${R} ${rUnit}
  `;
  }
  Steps += `
  'r' has been calculated.
  `;

  return [R, Steps];
};

export var Calculate_Mass_From_Velocity_Charge_MagneticField_Radius = function (
  V,
  Q,
  B,
  R,
  mUnit,
  vUnit,
  qUnit,
  bUnit,
  rUnit
) {
  var Vsi = Convert_VelocityUnits(parseFloat(V), vUnit, "m/s");
  var Qsi = Convert_ChargeUnits(parseFloat(Q), qUnit, "C");
  var Bsi = Convert_MagneticFieldUnits(parseFloat(B), bUnit, "T");
  var Rsi = Convert_DistanceUnits(parseFloat(R), rUnit, "m");

  var Msi = (Qsi * Bsi * Rsi) / Vsi;
  var M = Convert_MassUnits(Msi, "kg", mUnit);
  M = lazy_RoundLongFloatTo10Places(M);

  var Qsi_Into_Bsi_Into_Rsi = Qsi * Bsi * Rsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Mass of the particle = m;  
  Velocity of the particle = v = ${V} ${vUnit}
  Charge on the particle = q = ${Q} ${qUnit}  
  Magnitude of the magnetic field = B = ${B} ${bUnit}
  Radius of revolution of the particle = r = ${R} ${rUnit};
  `;

  if (rUnit != "m" || vUnit != "m/s" || qUnit != "C" || bUnit != "T") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (vUnit != "m/s") {
      Steps += `
      v = ${V} ${vUnit}
      After converting:
      v = ${Vsi} m/s
      
      `;
    }

    if (qUnit != "C") {
      Steps += `
      q = ${Q} ${qUnit}
      After converting:
      q = ${Qsi} C
      
      `;
    }

    if (bUnit != "T") {
      Steps += `
      B = ${B} ${bUnit}
      After converting:
      B = ${Bsi} T
      
      `;
    }

    if (rUnit != "m") {
      Steps += `
      r = ${R} ${rUnit}
      After converting:
      r = ${Rsi} m

      `;
    }
  }

  Steps += `

  The radius of revolution of a charge in a magnetic field is given by:
  r = (m * v) / (q * B)

  On rearranging the above formula, the mass of the particle is given by:
  m = (q * B * r) / v

  Substituting the above values and evaluating:
  m = (${Qsi} * ${Bsi} * ${Rsi}) / ${Vsi} kg
  m = ${Qsi_Into_Bsi_Into_Rsi} / ${Vsi} kg
  m = ${Msi} kg
  
  `;
  if (mUnit != "kg") {
    Steps += `
  Converting 'm' from S.I. units to ${mUnit}:
  m = ${M} ${mUnit}
  `;
  }
  Steps += `
  'm' has been calculated.
  `;

  return [M, Steps];
};

export var Calculate_Velocity_From_Mass_Charge_MagneticField_Radius = function (
  M,
  Q,
  B,
  R,
  mUnit,
  vUnit,
  qUnit,
  bUnit,
  rUnit
) {
  var Msi = Convert_MassUnits(parseFloat(M), mUnit, "kg");
  var Qsi = Convert_ChargeUnits(parseFloat(Q), qUnit, "C");
  var Bsi = Convert_MagneticFieldUnits(parseFloat(B), bUnit, "T");
  var Rsi = Convert_DistanceUnits(parseFloat(R), rUnit, "m");

  var Vsi = (Qsi * Bsi * Rsi) / Msi;
  var V = Convert_VelocityUnits(Vsi, "m/s", vUnit);
  V = lazy_RoundLongFloatTo10Places(V);

  var Qsi_Into_Bsi_Into_Rsi = Qsi * Bsi * Rsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Velocity of the particle = v;     
  Mass of the particle = m = ${M} ${mUnit}
  Charge on the particle = q = ${Q} ${qUnit}  
  Magnitude of the magnetic field = B = ${B} ${bUnit}
  Radius of revolution of the particle = r = ${R} ${rUnit};
  `;

  if (rUnit != "m" || mUnit != "kg" || qUnit != "C" || bUnit != "T") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += `
      m = ${M} ${mUnit}
      After converting:
      m = ${Msi} kg
      
      `;
    }

    if (qUnit != "C") {
      Steps += `
      q = ${Q} ${qUnit}
      After converting:
      q = ${Qsi} C
      
      `;
    }

    if (bUnit != "T") {
      Steps += `
      B = ${B} ${bUnit}
      After converting:
      B = ${Bsi} T
      
      `;
    }

    if (rUnit != "m") {
      Steps += `
      r = ${R} ${rUnit}
      After converting:
      r = ${Rsi} m

      `;
    }
  }

  Steps += `

  The radius of revolution of a charge in a magnetic field is given by:
  r = (m * v) / (q * B)

  On rearranging the above formula, the velocity of the particle is given by:
  v = (q * B * r) / m

  Substituting the above values and evaluating:
  v = (${Qsi} * ${Bsi} * ${Rsi}) / ${Msi} m/s
  v = ${Qsi_Into_Bsi_Into_Rsi} / ${Msi} m/s
  v = ${Vsi} m/s
  
  `;
  if (vUnit != "m/s") {
    Steps += `
  Converting 'v' from S.I. units to ${vUnit}:
  v = ${V} ${vUnit}
  `;
  }
  Steps += `
  'v' has been calculated.
  `;

  return [V, Steps];
};

export var Calculate_Charge_From_Mass_Velocity_MagneticField_Radius = function (
  M,
  V,
  B,
  R,
  mUnit,
  vUnit,
  qUnit,
  bUnit,
  rUnit
) {
  var Msi = Convert_MassUnits(parseFloat(M), mUnit, "kg");
  var Vsi = Convert_VelocityUnits(parseFloat(V), vUnit, "m/s");
  var Bsi = Convert_MagneticFieldUnits(parseFloat(B), bUnit, "T");
  var Rsi = Convert_DistanceUnits(parseFloat(R), rUnit, "m");

  var Qsi = (Msi * Vsi) / (Bsi * Rsi);
  var Q = Convert_ChargeUnits(Qsi, "C", qUnit);
  Q = lazy_RoundLongFloatTo10Places(Q);

  var Msi_Into_Vsi = Msi * Vsi;
  var Bsi_Into_Rsi = Bsi * Rsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Charge on the particle = q;
  Mass of the particle = m = ${M} ${mUnit}
  Velocity of the particle = v = ${V} ${vUnit}  
  Magnitude of the magnetic field = B = ${B} ${bUnit}
  Radius of revolution of the particle = r = ${R} ${rUnit};
  `;

  if (rUnit != "m" || mUnit != "kg" || vUnit != "m/s" || bUnit != "T") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += `
      m = ${M} ${mUnit}
      After converting:
      m = ${Msi} kg
      
      `;
    }

    if (vUnit != "m/s") {
      Steps += `
      v = ${V} ${vUnit}
      After converting:
      v = ${Vsi} m/s
      
      `;
    }

    if (bUnit != "T") {
      Steps += `
      B = ${B} ${bUnit}
      After converting:
      B = ${Bsi} T
      
      `;
    }

    if (rUnit != "m") {
      Steps += `
      r = ${R} ${rUnit}
      After converting:
      r = ${Rsi} m

      `;
    }
  }

  Steps += `

  The radius of revolution of a charge in a magnetic field is given by:
  r = (m * v) / (q * B)

  On rearranging the above formula, the charge on the particle is given by:
  q = (m * v) / (B * r)

  Substituting the above values and evaluating:
  q = (${Msi} * ${Vsi}) / (${Bsi} * ${Rsi}) C
  q = ${Msi_Into_Vsi} / ${Bsi_Into_Rsi} C
  q = ${Qsi} C
  
  `;
  if (qUnit != "C") {
    Steps += `
  Converting 'q' from S.I. units to ${qUnit}:
  q = ${Q} ${qUnit}
  `;
  }
  Steps += `
  'q' has been calculated.
  `;

  return [Q, Steps];
};

export var Calculate_MagneticField_From_Mass_Velocity_Charge_Radius = function (
  M,
  V,
  Q,
  R,
  mUnit,
  vUnit,
  qUnit,
  bUnit,
  rUnit
) {
  var Msi = Convert_MassUnits(parseFloat(M), mUnit, "kg");
  var Vsi = Convert_VelocityUnits(parseFloat(V), vUnit, "m/s");
  var Qsi = Convert_ChargeUnits(parseFloat(Q), qUnit, "C");
  var Rsi = Convert_DistanceUnits(parseFloat(R), rUnit, "m");

  var Bsi = (Msi * Vsi) / (Qsi * Rsi);
  var B = Convert_MagneticFieldUnits(Bsi, "T", bUnit);
  B = lazy_RoundLongFloatTo10Places(B);

  var Msi_Into_Vsi = Msi * Vsi;
  var Qsi_Into_Rsi = Qsi * Rsi;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Magnitude of the magnetic field = B;
  Mass of the particle = m = ${M} ${mUnit}
  Velocity of the particle = v = ${V} ${vUnit}  
  Charge on the particle = q = ${Q} ${qUnit}
  Radius of revolution of the particle = r = ${R} ${rUnit};
  `;

  if (rUnit != "m" || mUnit != "kg" || vUnit != "m/s" || qUnit != "C") {
    Steps += `Converting the given values to S.I. units:
    `;

    if (mUnit != "kg") {
      Steps += `
      m = ${M} ${mUnit}
      After converting:
      m = ${Msi} kg
      
      `;
    }

    if (vUnit != "m/s") {
      Steps += `
      v = ${V} ${vUnit}
      After converting:
      v = ${Vsi} m/s
      
      `;
    }

    if (qUnit != "C") {
      Steps += `
      q = ${Q} ${qUnit}
      After converting:
      q = ${Qsi} C
      
      `;
    }

    if (rUnit != "m") {
      Steps += `
      r = ${R} ${rUnit}
      After converting:
      r = ${Rsi} m

      `;
    }
  }

  Steps += `

  The radius of revolution of a charge in a magnetic field is given by:
  r = (m * v) / (q * B)

  On rearranging the above formula, the magnitude of the magnetic field is given by:
  B = (m * v) / (q * r)

  Substituting the above values and evaluating:
  B = (${Msi} * ${Vsi}) / (${Qsi} * ${Rsi}) T
  B = ${Msi_Into_Vsi} / ${Qsi_Into_Rsi} T
  B = ${Bsi} T
  
  `;
  if (bUnit != "T") {
    Steps += `
  Converting 'B' from S.I. units to ${bUnit}:
  B = ${B} ${bUnit}
  `;
  }
  Steps += `
  'B' has been calculated.
  `;

  return [B, Steps];
};
