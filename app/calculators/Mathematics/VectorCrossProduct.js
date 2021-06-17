import { CrossProduct_Multiple_Vectors } from "./Vectors";

export var Calculate_X_From_Vectors = function (vectors) {
  var X = CrossProduct_Multiple_Vectors(vectors);

  var Steps = `
  ToFind,GivenEntered,FormulaCalculationResult;
    Cross product of all the vectors = X;
    `;

  for (let i = 0; i < vectors.length; i++) {
    Steps += `x${i + 1} = ${vectors[i][0]}x + ${vectors[i][1]}y + ${
      vectors[i][2]
    }z
      `;
  }
  Steps += `;
  The cross product of 2 vectors:
  Ax + Ay + Az
  and
  Bx + By + Bz

  is given by:
  
  (Ay * Bz - Az * By)x 
  + (Az * Bx - Ax * Bz) y
  + (Ax * By - Ay * Bx) z

  Evaluating the cross product one-by-one starting from x1, we get:

  X = ${X[0]}x + ${X[1]}y +${X[2]}z
  `;

  return [X, Steps];
};
