export var UnitVector_From_Vector = function (x, y, z) {
  x = parseFloat(x);
  y = parseFloat(y);
  z = parseFloat(z);

  var magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

  x = x / magnitude;
  y = y / magnitude;
  z = z / magnitude;

  return [x, y, z];
};

export var MagnitudeOfVector_From_Vector = function (x, y, z) {
  x = parseFloat(x);
  y = parseFloat(y);
  z = parseFloat(z);

  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

export var Add_Two_Vectors = function (x1, y1, z1, x2, y2, z2) {
  x1 = parseFloat(x1);
  y1 = parseFloat(y1);
  z1 = parseFloat(z1);
  x2 = parseFloat(x2);
  y2 = parseFloat(y2);
  z2 = parseFloat(z2);

  return [x1 + x2, y1 + y2, z1 + z2];
};

export var Scale_A_Vector = function (x1, y1, z1, k) {
  x1 = parseFloat(x1);
  y1 = parseFloat(y1);
  z1 = parseFloat(z1);
  k = parseFloat(k);

  return [k * x1, k * y1, k * z1];
};

export var DotProduct_Two_Vectors = function (x1, y1, z1, x2, y2, z2) {
  x1 = parseFloat(x1);
  y1 = parseFloat(y1);
  z1 = parseFloat(z1);
  x2 = parseFloat(x2);
  y2 = parseFloat(y2);
  z2 = parseFloat(z2);

  return x1 * x2 + y1 * y2 + z1 * z2;
};

export var CrossProduct_Two_Vectors = function (ax, ay, az, bx, by, bz) {
  ax = parseFloat(ax);
  ay = parseFloat(ay);
  az = parseFloat(az);
  bx = parseFloat(bx);
  by = parseFloat(by);
  bz = parseFloat(bz);

  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
};

export var CrossProduct_Multiple_Vectors = function (vectors) {
  if (vectors.length == 0) {
    return ["", "", ""];
  }

  var output = vectors[0];

  for (let index = 1; index < vectors.length; index++) {
    output = CrossProduct_Two_Vectors(
      output[0],
      output[1],
      output[2],
      vectors[index][0],
      vectors[index][1],
      vectors[index][2]
    );
  }

  return output;
};
