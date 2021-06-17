export var Calculate_x_y_From_a1_b1_c1_a2_b2_c2 = function (
  a1,
  b1,
  c1,
  a2,
  b2,
  c2
) {
  a1 = parseFloat(a1);
  b1 = parseFloat(b1);
  c1 = parseFloat(c1);
  a2 = parseFloat(a2);
  b2 = parseFloat(b2);
  c2 = parseFloat(c2);

  var Ra = a1 / a2;
  var Rb = b1 / b2;
  var Rc = c1 / c2;

  var x = 0;
  var y = 0;

  var Steps = `ToFind,GivenEntered,FormulaCalculationResult;
    x, y;
    Two linear equations of the formats:-\n a₁x + b₁y = c₁\na₂x + b₂y = c₂ \n\nwith:-\n a₁ = ${a1}\n b₁ = ${b1}\n c₁ = ${c1}\n a₂ = ${a2}\n b₂ = ${b2}\n c₂ = ${c2};  
    a₁ / a₂ = ${a1} / ${a2} = ${Ra}
    b₁ / b₂ = ${b1} / ${b2} = ${Rb}
    c₁ / c₂ = ${c1} / ${c2} = ${Rc}

    `;
  if (Ra == Rb) {
    if (Rb != Rc) {
      //NO SOLUTION
      Steps += `
     From the above values, it can be seen that:
     (a₁ / a₂) = (b₁ / b₂) ≠ (c₁ / c₂)

     Therefore, no solution exists for the given pair of linear equations.
     `;
    } else {
      //INFINITELY MANY SOLUTIONS
      x = 0;
      y = c1 / b1;
      Steps += `
     From the above values, it can be seen that:
     (a₁ / a₂) = (b₁ / b₂) = (c₁ / c₂)

     Therefore, an infinite number of solutions exist for the given pair of linear equations.

     These solutions are given by the equation:
     y =  -(a₁ / b₁) * x + (c₁ / b₁)

     For example:
     x = 0
     y = ${y}
     `;
    }
  } else {
    //UNIQUE SOLUTION
    x = ((1 / a2) * (c2 - (b2 * c1) / b1)) / (1 - (a1 * b2) / (a2 * b1));

    y = (c1 - a1 * x) / b1;

    Steps += `
   From the above values, it can be seen that:
   (a₁ / a₂) ≠ (b₁ / b₂)

   Therefore, a unique solution exists for the given pair of linear equations.   

   Using the first equation:
   y = (c₁ - a₁ * x) / b₁
   
   Using the second equation:
   x = (c₂ - b₂ * y) / a₂

   Substituting the value of y in the above equation:

   x = (c₂ - b₂ * ((c₁ - a₁ * x) / b₁)) / a₂;
   x = (c₂ - ((b₂ * c₁) / b₁))/ a₂ + x * ((a₁ * b₂) / (a₂ * b₁))
   x * (1 - ((a₁ * b₂) / (a₂ * b₁))) = (c₂ - ((b₂ * c₁) / b₁))/ a₂
   x = ((c₂ - ((b₂ * c₁) / b₁))/ a₂) / (1 - ((a₁ * b₂) / (a₂ * b₁)))

   Substituting the values of the coefficeients and evaluating:
   x = ((${c2} - ((${b2} * ${c1}) / ${b1}))/ ${a2}) / (1 - ((${a1} * ${b2}) / (${a2} * ${b1})))
   x = ${x}

   
   y = (c₁ - a₁ * x) / b₁
   Substituting the values and evaluating: 
   y = (${c1} - ${a1} * ${x}) / ${b1}
   y = ${y}   
   `;
  }

  return [x, y, Steps];
};
