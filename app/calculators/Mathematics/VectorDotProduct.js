import { DotProduct_Two_Vectors } from "./Vectors";

export var Calculate_x_From_Vectors = function (ax, ay, az, bx, by, bz) {
  ax = parseFloat(ax);
  ay = parseFloat(ay);
  az = parseFloat(az);
  bx = parseFloat(bx);
  by = parseFloat(by);
  bz = parseFloat(bz);

  var x = DotProduct_Two_Vectors(ax, ay, az, bx, by, bz);

  var ax_into_bx = ax * bx;
  var ay_into_by = ay * by;
  var az_into_bz = az * bz;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
  Dot product of the given vectors = x;
  First vector = A = ${ax}x + ${ay}y + ${az}z
  Second vector = B = ${bx}x + ${by}y + ${bz}z;
  
  The Dot product of 2 vectors:
  Ax + Ay + Az
  and
  Bx + By + Bz

  is given by:
  
  x = (Ax * Bx) + (Ay * By) + (Az * Bz)

  Substituting the given values and evaluating:
  x = (${ax} * ${bx}) + (${ay} * ${by}) + (${az} * ${bz})
  x = ${ax_into_bx} + ${ay_into_by} + ${az_into_bz}
  x = ${x}

  'x' has been calculated.  
  `;
  return [x, Steps];
};

export var Calculate_xComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_yComponentOfVector_zComponentOfVector = function (
  x,
  x2,
  y2,
  z2,
  y1,
  z1,
  vectorNumber
) {
  var x1 = 0;

  x = parseFloat(x);
  x1 = parseFloat(x1);
  x2 = parseFloat(x2);
  y1 = parseFloat(y1);
  y2 = parseFloat(y2);
  z1 = parseFloat(z1);
  z2 = parseFloat(z2);

  x1 = (x - y1 * y2 - z1 * z2) / x2;

  var y1_into_y2 = y1 * y2;
  var z1_into_z2 = z1 * z2;

  var x__minus__y1_into_y2__minus__z1_into_z2 = x - y1_into_y2 - z1_into_z2;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;`;

  if (vectorNumber == 1) {
    Steps += `x component of the first vector = Ax;
    Second vector = B = ${x2}x + ${y2}y + ${z2}z
    y component of the first vector = Ay = ${y1}
    z component of the first vector = Az = ${z1};
    `;
  } else {
    Steps += `x component of the second vector = Bx;
    First vector = A = ${x2}x + ${y2}y + ${z2}z
    y component of the second vector = By = ${y1}
    z component of the second vector = Bz = ${z1};
    `;
  }

  Steps += `
  
  The Dot product of 2 vectors:
  Ax + Ay + Az
  and
  Bx + By + Bz

  is given by:
  
  x = (Ax * Bx) + (Ay * By) + (Az * Bz)

  On rearranging the above formula, `;

  if (vectorNumber == 1) {
    Steps += `the x component of the first vector is given by:
    Ax = [x - (Ay * By) - (Az * Bz)] / Bx
    `;
  } else {
    Steps += `the x component of the second vector is given by:
    Bx = [x - (Ay * By) - (Az * Bz)] / Ax
    `;
  }

  Steps += `
  Substituting the given values and evaluating:
  `;

  if (vectorNumber == 1) {
    Steps += `
    Ax = [${x} - (${y1} * ${y2}) - (${z1} * ${z2})] / ${x2}
    Ax = [${x} - ${y1_into_y2} - ${z1_into_z2}] / ${x2}
    Ax = ${x__minus__y1_into_y2__minus__z1_into_z2} / ${x2}
    Ax = ${x1}

    'Ax' has been calculated.
    `;
  } else {
    Steps += `
    Bx = [${x} - (${y1} * ${y2}) - (${z1} * ${z2})] / ${x2}
    Bx = [${x} - ${y1_into_y2} - ${z1_into_z2}] / ${x2}
    Bx = ${x__minus__y1_into_y2__minus__z1_into_z2} / ${x2}
    Bx = ${x1}

    'Bx' has been calculated.
    `;
  }

  return [x1, Steps];
};

export var Calculate_yComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_xComponentOfVector_zComponentOfVector = function (
  x,
  x2,
  y2,
  z2,
  x1,
  z1,
  vectorNumber
) {
  var y1 = 0;

  x = parseFloat(x);
  x1 = parseFloat(x1);
  x2 = parseFloat(x2);
  y1 = parseFloat(y1);
  y2 = parseFloat(y2);
  z1 = parseFloat(z1);
  z2 = parseFloat(z2);

  y1 = (x - x1 * x2 - z1 * z2) / y2;

  var x1_into_x2 = x1 * x2;
  var z1_into_z2 = z1 * z2;

  var x__minus__x1_into_x2__minus__z1_into_z2 = x - x1_into_x2 - z1_into_z2;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;`;

  if (vectorNumber == 1) {
    Steps += `y component of the first vector = Ay;
    Second vector = B = ${x2}x + ${y2}y + ${z2}z
    x component of the first vector = Ax = ${x1}
    z component of the first vector = Az = ${z1};
    `;
  } else {
    Steps += `y component of the second vector = By;
    First vector = A = ${x2}x + ${y2}y + ${z2}z
    x component of the second vector = Bx = ${x1}
    z component of the second vector = Bz = ${z1};
    `;
  }

  Steps += `
  
  The Dot product of 2 vectors:
  Ax + Ay + Az
  and
  Bx + By + Bz

  is given by:
  
  x = (Ax * Bx) + (Ay * By) + (Az * Bz)

  On rearranging the above formula, `;

  if (vectorNumber == 1) {
    Steps += `the y component of the first vector is given by:
    Ay = [x - (Ax * Bx) - (Az * Bz)] / By
    `;
  } else {
    Steps += `the y component of the second vector is given by:
    By = [x - (Ax * Bx) - (Az * Bz)] / Ay
    `;
  }

  Steps += `
  Substituting the given values and evaluating:
  `;

  if (vectorNumber == 1) {
    Steps += `
    Ay = [${x} - (${x1} * ${x2}) - (${z1} * ${z2})] / ${y2}
    Ay = [${x} - ${x1_into_x2} - ${z1_into_z2}] / ${y2}
    Ay = ${x__minus__x1_into_x2__minus__z1_into_z2} / ${y2}
    Ay = ${y1}

    'Ay' has been calculated.
    `;
  } else {
    Steps += `
    By = [${x} - (${x1} * ${x2}) - (${z1} * ${z2})] / ${y2}
    By = [${x} - ${x1_into_x2} - ${z1_into_z2}] / ${y2}
    By = ${x__minus__x1_into_x2__minus__z1_into_z2} / ${y2}
    By = ${y1}

    'By' has been calculated.
    `;
  }

  return [y1, Steps];
};

export var Calculate_zComponentOfVector_From_x_xComponentOfOtherVector_yComponentOfOtherVector_zComponentOfOtherVector_xComponentOfVector_yComponentOfVector = function (
  x,
  x2,
  y2,
  z2,
  x1,
  y1,
  vectorNumber
) {
  var z1 = 0;

  x = parseFloat(x);
  x1 = parseFloat(x1);
  x2 = parseFloat(x2);
  y1 = parseFloat(y1);
  y2 = parseFloat(y2);
  z1 = parseFloat(z1);
  z2 = parseFloat(z2);

  z1 = (x - x1 * x2 - y1 * y2) / z2;

  var x1_into_x2 = x1 * x2;
  var y1_into_y2 = y1 * y2;

  var x__minus__x1_into_x2__minus__y1_into_y2 = x - x1_into_x2 - y1_into_y2;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;`;

  if (vectorNumber == 1) {
    Steps += `z component of the first vector = Az;
    Second vector = B = ${x2}x + ${y2}y + ${z2}z
    x component of the first vector = Ax = ${x1}
    y component of the first vector = Ay = ${y1};
    `;
  } else {
    Steps += `z component of the second vector = Bz;
    First vector = A = ${x2}x + ${y2}y + ${z2}z
    x component of the second vector = Bx = ${x1}
    y component of the second vector = By = ${y1};
    `;
  }

  Steps += `
  
  The Dot product of 2 vectors:
  Ax + Ay + Az
  and
  Bx + By + Bz

  is given by:
  
  x = (Ax * Bx) + (Ay * By) + (Az * Bz)

  On rearranging the above formula, `;

  if (vectorNumber == 1) {
    Steps += `the z component of the first vector is given by:
    Az = [x - (Ax * Bx) - (Ay * By)] / Bz
    `;
  } else {
    Steps += `the z component of the second vector is given by:
    Bz = [x - (Ax * Bx) - (Ay * By)] / Az
    `;
  }

  Steps += `
  Substituting the given values and evaluating:
  `;

  if (vectorNumber == 1) {
    Steps += `
    Az = [${x} - (${x1} * ${x2}) - (${y1} * ${y2})] / ${z2}
    Az = [${x} - ${x1_into_x2} - ${y1_into_y2}] / ${z2}
    Az = ${x__minus__x1_into_x2__minus__y1_into_y2} / ${z2}
    Az = ${z1}

    'Az' has been calculated.
    `;
  } else {
    Steps += `
    Bz = [${x} - (${x1} * ${x2}) - (${y1} * ${y2})] / ${z2}
    Bz = [${x} - ${x1_into_x2} - ${y1_into_y2}] / ${z2}
    Bz = ${x__minus__x1_into_x2__minus__y1_into_y2} / ${z2}
    Bz = ${z1}

    'Bz' has been calculated.
    `;
  }
  return [z1, Steps];
};
