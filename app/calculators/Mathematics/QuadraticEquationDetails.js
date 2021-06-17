import {roundWithPrecision} from "./MathematicsBasics"

//Quadratic Equation Details
export var Calculate_QuadraticEquationDetails_From_A_B_C = function (
    A,
    B,
    C,
    Precision = 34
  ) {
    Min = "- ∞";
    Max = "∞";
    D = B * B - 4 * A * C;
    if (A > 0) {
      Min = roundWithPrecision((-1 * D) / (4 * A), Precision).toString();
    } else {
      Max = roundWithPrecision((-1 * D) / (4 * A), Precision).toString();
    }
  
    if (D < 0) {
      x1 = (-1 * B) / (2 * A);
      x2 = x1;
      x1 = roundWithPrecision(x1, Precision).toString();
      x2 = roundWithPrecision(x2, Precision).toString();
  
      D *= -1;
      D = Math.sqrt(D);
      D /= 2 * A;
  
      D = roundWithPrecision(D, Precision).toString();
  
      if (D === "1") {
        D = "";
      }
  
      x1 += " + " + D + "i";
      x2 += " - " + D + "i";
    } else {
      D = Math.sqrt(D);
      x1 = (-1 * B + D) / (2 * A);
      x2 = (-1 * B - D) / (2 * A);
      x1 = roundWithPrecision(x1, Precision).toString();
      x2 = roundWithPrecision(x2, Precision).toString();
    }
  
    Sum = (-1 * B) / A;
    Product = C / A;
    Difference = Sum * Sum - 4 * Product;
  
    Sum = roundWithPrecision(Sum, Precision).toString();
    Product = roundWithPrecision(Product, Precision).toString();
  
    if (Difference < 0) {
      Difference *= -1;
      Difference = Math.sqrt(Difference);
      Difference = roundWithPrecision(Difference, Precision).toString() + "i";
    } else {
      Difference = Math.sqrt(Difference);
      Difference = roundWithPrecision(Difference, Precision);
    }
  
    //Step seperator = ';'
    //Step order = {Description},To find, Given/entered , formula used, calculation, result
  
    D1 = B * B - 4 * A * C;
  
    Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    First Root, Second Root, Sum Of Roots, Product Of Roots, Difference Of Roots, Minima, Maxima ;
    Quadratic Equation of the format:-\n ax² + bx + c = 0 \n\nwith:-\n a = ${A}\n b = ${B}\n c = ${C};  
    Discriminant = D
    D =  b² - 4 * a * c
     
     ⇒ D = ${B}² - 4 * ${A} * ${C}
     ⇒ D = ${D1}\n
    
    First Root = x1
    x1 = [-b + sqrt(D)]/[2 * a]
    ⇒ x1 = ${x1}
    
    Second Root = x2
    x2 = [-b - sqrt(D)]/[2 * a]
    ⇒ x2 = ${x2}\n
    
    Sum Of Roots = S
    S = -b/a
    ⇒ S = -${B}/${A}
    ⇒ S = ${Sum}\n
    
    Product Of Roots = P = c/a
    P = c/a
    ⇒ P = -${C}/${A}
    ⇒ P = ${Product}\n
    
    Difference Of Roots = Diff
    Diff= sqrt(S² - 4 * P)
    ⇒ Diff = sqrt(${Sum}² - 4 * ${Product})
    ⇒ Diff = ${Difference}\n`;
  
    if (Min == "- ∞") {
      Steps += `\na < 0 therefore
      Minima = ${Min}
      Maxima = -D/(4 * A) = ${Max};`;
    } else {
      Steps += `\na > 0, therefore
      Minima = -D/(4 * A) = ${Min}
      Maxima = ${Max};`;
    }
  
    return [x1, x2, Sum, Product, Difference, Min, Max, Steps];
  };
  //Quadratic Equation Details END