import {
  MagnitudeOfVector_From_Vector,
  UnitVector_From_Vector,
  Scale_A_Vector,
} from "./Vectors";

import { lazy_RoundLongFloatTo10Places } from "./MathematicsBasics";

//ORDER: Calculate, Vector, Magnitude, Ux, Uy, Uz, A, B, C, cosA, cosB, cosC
//α, β, γ

export var Calculate_Magnitude_UnitVector_Angles_DirectionCosines_From_Vector = function (
  Xx,
  Xy,
  Xz
) {
  Xx = parseFloat(Xx);
  Xy = parseFloat(Xy);
  Xz = parseFloat(Xz);

  var M = lazy_RoundLongFloatTo10Places(
    MagnitudeOfVector_From_Vector(Xx, Xy, Xz)
  );
  var U = UnitVector_From_Vector(Xx, Xy, Xz);

  U[0] = lazy_RoundLongFloatTo10Places(U[0]);
  U[1] = lazy_RoundLongFloatTo10Places(U[1]);
  U[2] = lazy_RoundLongFloatTo10Places(U[2]);

  var cosA = U[0];
  var cosB = U[1];
  var cosC = U[2];
  var A = lazy_RoundLongFloatTo10Places(Math.acos(cosA) * (180 / Math.PI));
  var B = lazy_RoundLongFloatTo10Places(Math.acos(cosB) * (180 / Math.PI));
  var C = lazy_RoundLongFloatTo10Places(Math.acos(cosC) * (180 / Math.PI));

  var Xx_Squared = Xx * Xx;
  var Xy_Squared = Xy * Xy;
  var Xz_Squared = Xz * Xz;

  var Sum__Xx_Squared__Xy_Squared__Xz_Squared =
    Xx_Squared + Xy_Squared + Xz_Squared;

  var Steps = `
  ToFind,GivenEntered,FormulaCalculationResult;
  Magnitude of the vector = |X|
  Unit vector = U
  α, β, γ
  cos(α), cos(β), cos(γ);
  Vector = X = ${Xx}x + ${Xy}y + ${Xz}z;
  The magnitude of a vector is given by:
  |X| = sqrt(xComponent² + yComponent² zCompenent²)
  
  Substituting the above values and evaluating:
  |X| = sqrt(${Xx}² + ${Xy}² ${Xz}²)
  |X| = sqrt(${Xx_Squared} + ${Xy_Squared} ${Xz_Squared})
  |X| = sqrt(${Sum__Xx_Squared__Xy_Squared__Xz_Squared})
  |X| = ${M}

  The unit vector of a vector is given by:
  U = (xComponent / Magnitude)x + (yComponent / Magnitude)y + (zComponent / Magnitude)z
  
  Substituting the above values and evaluating:
  U = (${Xx} / ${M})x + (${Xy} / ${M})y + (${Xz} / ${M})z
  U = ${U[0]}x + ${U[1]}y + ${U[2]}z

  The x, y and z components of the the unit vector are the direction cosines cos(α), cos(β) and cos(γ) respectively.
  Therefore,
  cos(α) = ${U[0]}
  cos(β) = ${U[1]}
  cos(γ) = ${U[2]}

  The angles the vector makes with the x, y and z axes are given by:
  α = acos(cos(α)) = acos(${U[0]}) = ${A}°
  β = acos(cos(β)) = acos(${U[1]}) = ${B}°
  γ = acos(cos(γ)) = acos(${U[2]}) = ${C}°


  |X|, U, α, β, γ, cos(α), cos(β), cos(γ) have been calculated.
  `;

  return [[M, U, A, B, C, cosA, cosB, cosC], Steps];
};

export var Calculate_Angle_DirectionCosine_From_UnitVectorComponent = function (
  Uc
) {
  Uc = parseFloat(Uc);

  var cosC = lazy_RoundLongFloatTo10Places(Uc);
  var C = lazy_RoundLongFloatTo10Places(Math.acos(cosC) * (180 / Math.PI));

  var Steps = `
  ToFind,GivenEntered,FormulaCalculationResult;  
  Direction cosine for the axis corresponding to the provided component = cos(C)
  The angle the vector makes with the axis corresponding to the provided component = C;
  Any component of the unit vector;
  
  The direction cosine for the axis corresponding to the provided component of the unit vector is the same as the component.
  cos(C) = Uc

  The angles the vector makes with the axis mentioned above is given by:
  C = acos(cos(C))  
  `;

  return [[C, cosC], Steps];
};

export var Calculate_UnitVectorComponent_DirectionCosine_From_Angle = function (
  C
) {
  C = parseFloat(C);

  var Uc = lazy_RoundLongFloatTo10Places(Math.cos((C * Math.PI) / 180));

  var Steps = `
  ToFind,GivenEntered,FormulaCalculationResult;  
  Direction cosine of the vector for the given axis = cos(C)
  Component of the unit vector corresponding to the given axis = Uc;
  The angle the vector makes with an axis = C;  
  
  Direction cosine of the vector for the given axis is given by:
  cos(C)
  = ${Uc}

  Component of the unit vector corresponding to the given axis is given by:
  Uc = cos(C)
  Uc = ${Uc}
  `;

  return [[Uc, Uc], Steps];
};

export var Calculate_UnitVectorComponent_Angle_From_DirectionCosine = function (
  cosC
) {
  cosC = parseFloat(cosC);

  var Uc = cosC;
  var C = lazy_RoundLongFloatTo10Places(Math.acos(cosC) * (180 / Math.PI));

  var Steps = `
  ToFind,GivenEntered,FormulaCalculationResult;
  The angle the vector makes with the given axis = C
  Component of the unit vector corresponding to the given axis = Uc;
  Direction cosine of the vector for an axis = cos(C);
  
  Component of the unit vector corresponding to the given axis is given by:
  Uc = cos(C)
  Uc = ${Uc}
  
  The angle the vector makes with the given axis is given by:
  C = acos(cos(C))
  C = ${C}°
  `;

  return [[Uc, C], Steps];
};

export var Calculate_Vector_From_UnitVector_Magnitude = function (
  Ux,
  Uy,
  Uz,
  M
) {
  Ux = parseFloat(Ux);
  Uy = parseFloat(Uy);
  Uz = parseFloat(Uz);
  M = parseFloat(M);

  var X = Scale_A_Vector(Ux, Uy, Uz, M);

  var Steps = `
  ToFind,GivenEntered,FormulaCalculationResult;
  Required vector = X;
  Unit vector of the required vector = U = ${Ux}x + ${Uy}y + ${Uz}z
  Magnitude of the required vector = M = ${M};
  
  The required vector is given by:
  X = M * U

  Substituting the above values and evaluating:
  X = ${M} * (${Ux}x + ${Uy}y + ${Uz}z)
  X = ${X[0]}x + ${X[1]}y + ${X[2]}z

  'X' has been calculated.
  `;

  return [X, Steps];
};
