export var Dot_Product_Of_Two_Matrices = function (Matrix1, Matrix2) {
    Matrix1Size = {
      NumberOfRows: Matrix1.length,
      NumberOfColumns: Matrix1[0].length,
    };
    Matrix2Size = {
      NumberOfRows: Matrix2.length,
      NumberOfColumns: Matrix2[0].length,
    };
  
    if (Matrix1Size.NumberOfColumns !== Matrix2Size.NumberOfRows) {
      return "Matrix dot product error: the number columns of Matrix1 should be equal to the number of rows of Matrix2";
    }
    var MatrixOut = [];
  
    for (let i = 0; i < Matrix1Size.NumberOfRows; i++) {
      MatrixOut[i] = [];
  
      for (let j = 0; j < Matrix2Size.NumberOfColumns; j++) {
        S = 0;
        for (let k = 0; k < Matrix1Size.NumberOfColumns; k++) {
          S += Matrix1[i][k] * Matrix2[k][j];
        }
        MatrixOut[i].push(S);
      }
    }
  
    return MatrixOut;
  };
  
  export var Dot_Product_Of_More_Than_Two_Matrices = function (
    Matrices,
    OrderOfMultiplication = "Right To Left"
  ) {
    NumberOfMatrices = Matrices.length;
    var MatrixOut = Matrices[0];
    if ((OrderOfMultiplication = "Right To Left")) {
      for (let i = 1; i < NumberOfMatrices; i++) {
        MatrixOut = Dot_Product_Of_Two_Matrices(MatrixOut, Matrices[i]);
        if (
          MatrixOut ===
          "Matrix dot product error: the number columns of Matrix1 should be equal to the number of rows of Matrix2"
        ) {
          return (
            "Matrix dot product error on multiplaying M[1-" +
            i.toString() +
            "] with M[" +
            (i + 1).toString() +
            "]: the number columns of Matrix1 should be equal to the number of rows of Matrix2"
          );
        }
      }
    } else if ((OrderOfMultiplication = "Left To Right")) {
      MatrixOut = Matrices[NumberOfMatrices - 1];
  
      for (let i = NumberOfMatrices - 2; i >= 0; i--) {
        MatrixOut = Dot_Product_Of_Two_Matrices(Matrices[i], MatrixOut);
        if (
          MatrixOut ===
          "Matrix dot product error: the number columns of Matrix1 should be equal to the number of rows of Matrix2"
        ) {
          return (
            "Matrix dot product error on multiplaying M[1-" +
            i.toString() +
            "] with M[" +
            (i + 1).toString() +
            "]: the number columns of Matrix1 should be equal to the number of rows of Matrix2"
          );
        }
        //console.log("Iteration: "+(NumberOfMatrices-1-i).)
        //console.table(MatrixOut)
      }
    } else {
    }
    return MatrixOut;
  };