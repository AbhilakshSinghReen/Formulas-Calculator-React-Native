import { roundWithPrecision } from "./MathematicsBasics";
import { Calculate_QuadraticEquationDetails_From_A_B_C } from "./QuadraticEquationDetails";

//Quadratic Equations Common Roots
export var Calculate_QuadraticEquationsCommonRoots_From_A1_B1_C1_A2_B2_C2 = function (
  A1,
  B1,
  C1,
  A2,
  B2,
  C2,
  Precision = 34
) {
  NumberOfRootsInCommon = "";
  CommonRoot1 = "";
  CommonRoot2 = "";
  Equation1UncommonRoot1 = "";
  Equation1UncommonRoot2 = "";
  Equation2UncommonRoot1 = "";
  Equation2UncommonRoot2 = "";
  QuadraticEquationsCommonRootsCalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;
    Number of roots in common,The common roots,The uncommon roots ;
    Two quadratic equations of the formats:-
    Equation1: a₁x² + b₁x + c₁ = 0\nwith:-\n a₁ = ${A1}\n b₁ = ${B1}\n c₁ = ${C1}
    Equation2: a₂x² + b₂x + c₂ = 0\nwith:-\n a₂ = ${A2}\n b₂ = ${B2}\n c₂ = ${C2};
    If the equations have 2 roots in common, the coefficients will satisfy the following condition:-  
    (a₁/a₂) = (b₁/b₂) = (c₁/c₂)
  
    Substituting the given values:
    `;

  Ra = roundWithPrecision(A1 / A2, Precision);
  Rb = roundWithPrecision(B1 / B2, Precision);
  Rc = roundWithPrecision(C1 / C2, Precision);

  QuadraticEquationsCommonRootsCalculationSteps += `(a₁/a₂) = (${A1}/${A2})
    (a₁/a₂) = ${Ra}
  
    (b₁/b₂) = (${B1}/${B2})
    (b₁/b₂) = ${Rb}
  
    (c₁/c₂) = (${C1}/${C2})
    (c₁/c₂) = ${Rc}
  
    `;

  if (Ra == Rb && Rb == Rc) {
    NumberOfRootsInCommon = "2";
    R1 = Calculate_QuadraticEquationDetails_From_A_B_C(A1, B1, C1, Precision);
    R1 = R1.slice(0, 2);

    CommonRoot1 = R1[0];
    CommonRoot2 = R1[1];

    Equation1UncommonRoot1 = "";
    Equation1UncommonRoot2 = "";
    Equation2UncommonRoot1 = "";
    Equation2UncommonRoot2 = "";
    QuadraticEquationsCommonRootsCalculationSteps += `
      From the above calculations, it can be seen that the values 
      (a₁/a₂), (b₁/b₂), (c₁/c₂) 
      are mutually equal.
      
      Therefore the two given quadratic equation have both their roots in common.
      
      The common roots are: 
      x1 = ${CommonRoot1}
      x2 = ${CommonRoot2}
  
      The steps for finding the roots of a quadratic equation can be found in the "Quadratic Equation Details" section.
      `;
  } else {
    Ra = roundWithPrecision(
      (A1 * C2 - A2 * C1) * (A1 * C2 - A2 * C1),
      Precision
    );
    Rb = roundWithPrecision(B1 * C2 - B2 * C1, Precision);
    Rc = roundWithPrecision(A1 * B2 - A2 * B1, Precision);

    R1 = Calculate_QuadraticEquationDetails_From_A_B_C(A1, B1, C1, Precision);
    R1 = R1.slice(0, 2);

    R2 = Calculate_QuadraticEquationDetails_From_A_B_C(A2, B2, C2, Precision);
    R2 = R2.slice(0, 2);

    Equation1UncommonRoot1 = R1[0];
    Equation1UncommonRoot2 = R1[1];
    Equation2UncommonRoot1 = R2[0];
    Equation2UncommonRoot2 = R2[1];

    QuadraticEquationsCommonRootsCalculationSteps += `
      From the above calculations, it can be seen that the values 
      (a₁/a₂), (b₁/b₂), (c₁/c₂) 
      are NOT mutually equal.
      
      Therefore the two given quadratic equation DO NOT have BOTH their roots in common.
      
      We will now check if the given quadratic equations have a single root in common.
  
      If the equations have a single root in common, the coefficients will satisfy the following condition:-
  
      (a₁c₂ - a₂c₁)² = (b₁c₂ - b₂c₁) * (a₁b₂ - a₂b₁)
  
      Substituting the given values:
  
      (a₁c₂ - a₂c₁)² = (${A1} * ${C2} - ${A2} * ${C1})²
      (a₁c₂ - a₂c₁)² = ${Ra}
  
      (b₁c₂ - b₂c₁) = (${B1} * ${C2} - ${B2} * ${C1})
      (b₁c₂ - b₂c₁) = ${Rb}
  
      (a₁b₂ - a₂b₁) = (${A1} * ${B2} - ${A2} * ${B1})
      (a₁b₂ - a₂b₁) = ${Rc}
      
      (b₁c₂ - b₂c₁) * (a₁b₂ - a₂b₁) = ${Rb} * ${Rc}
      (b₁c₂ - b₂c₁) * (a₁b₂ - a₂b₁) = ${Rb * Rc}
      
      `;

    if (Ra == Rb * Rc) {
      NumberOfRootsInCommon = "1";

      if (Equation1UncommonRoot1 == Equation2UncommonRoot1) {
        CommonRoot1 = Equation1UncommonRoot1;
        Equation1UncommonRoot1 = Equation1UncommonRoot2;
        Equation1UncommonRoot2 = "";
        Equation2UncommonRoot1 = Equation2UncommonRoot2;
        Equation2UncommonRoot2 = "";
      } else if (Equation1UncommonRoot1 == Equation2UncommonRoot2) {
        CommonRoot1 = Equation1UncommonRoot1;
        Equation1UncommonRoot1 = Equation1UncommonRoot2;
        Equation1UncommonRoot2 = "";
        Equation2UncommonRoot2 = "";
      } else if (Equation1UncommonRoot2 == Equation2UncommonRoot1) {
        CommonRoot1 = Equation1UncommonRoot2;
        Equation1UncommonRoot2 = "";
        Equation2UncommonRoot1 = Equation2UncommonRoot2;
        Equation2UncommonRoot2 = "";
      } else if (Equation1UncommonRoot2 == Equation2UncommonRoot2) {
        CommonRoot1 = Equation1UncommonRoot2;
        Equation1UncommonRoot2 = "";
        Equation2UncommonRoot2 = "";
      }

      QuadraticEquationsCommonRootsCalculationSteps += `
        From the above calculations, it can be seen that
        (a₁c₂ - a₂c₁)² = (b₁c₂ - b₂c₁) * (a₁b₂ - a₂b₁)
        
        
        Therefore the two given quadratic equation have a single root in common.
        
        The common root is: 
        Cx1 = ${CommonRoot1}
  
        The uncommon root of Equation 1 is:
        E1x = ${Equation1UncommonRoot1}
  
        The uncommon root of Equation 2 is:
        E2x = ${Equation2UncommonRoot1}
    
        The steps for finding the roots of a quadratic equation can be found in the "Quadratic Equation Details" section.
        `;
    } else {
      NumberOfRootsInCommon = "0";

      QuadraticEquationsCommonRootsCalculationSteps += `
        From the above calculations, it can be seen that
        (a₁c₂ - a₂c₁)² ≠ (b₁c₂ - b₂c₁) * (a₁b₂ - a₂b₁)
        
        
        Therefore the two given quadratic equations DO NOT HAVE ANY roots in common.
        
        The roots of Equation 1 are:
        x1 = ${Equation1UncommonRoot1}
        x2 = ${Equation1UncommonRoot2}
  
        The roots of Equation 2 are:
        x1 = ${Equation2UncommonRoot1}
        x2 = ${Equation2UncommonRoot2}
  
        The steps for finding the roots of a quadratic equation can be found in the "Quadratic Equation Details" section.
        `;
    }
  }

  return [
    NumberOfRootsInCommon,
    CommonRoot1,
    CommonRoot2,
    Equation1UncommonRoot1,
    Equation1UncommonRoot2,
    Equation2UncommonRoot1,
    Equation2UncommonRoot2,
    QuadraticEquationsCommonRootsCalculationSteps,
  ];
};
//Quadratic Equations Common Roots END
