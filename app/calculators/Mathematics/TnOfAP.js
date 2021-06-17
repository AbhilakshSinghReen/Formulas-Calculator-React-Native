//Tn of A.P.
//Order: Calculate, FirstTerm, CommonDifference,n,TnOfAP
export var TnOfAP__Calculate_TnOfAP_From_FirstTerm_CommonDifference_n=function(a,d,n){
    a=parseFloat(a);
    d=parseFloat(d);
    n=parseInt(n)
    var Tn= (a+(n-1)*d).toString();
  
    var n1=n-1;
    var n1d = n1 *d;
  
    var TnOfAp_From_a_d_n_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;
    nth term of the A.P. = Tₙ;
    First term of the A.P. = a = ${a}
    Common difference of the A.P. = d = ${d}
    n = ${n};
    
    The nth term of the A.P. is given by:
    Tₙ = a + (n - 1) * d
  
    Substituting the given values and evaluating:
  
    Tn = ${a} + (${n} - 1) * ${d}  
    Tn = ${a} +  ${n1} * ${d}
    Tn = ${a} +  ${n1d}
    Tn = ${Tn}
    
    The nth term of the A.P. has been calculated.
    `;
  
    return [Tn,TnOfAp_From_a_d_n_CalculationSteps];
  }
  
  export var TnOfAP__Calculate_FirstTerm_From_CommonDifference_n_TnOfAP=function(d,n,Tn){
    d=parseFloat(d);
    n=parseInt(n)
    Tn=parseFloat(Tn);
    var a = (Tn-(n-1)*d).toString();
  
    var n1 = n-1;
    var n1d= n1*d;
  
    var aOfAp_From_d_n_Tn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;
    First term of the A.P. = a;  
    Common difference of the A.P. = d = ${d}
    n = ${n}
    nth term of the A.P. = Tₙ = ${Tn};
  
    The nth term of the A.P. is given by:
    Tₙ = a + (n - 1) * d
  
    On rearranging the above formula,
  
    The first term of the A.P. is given by:
    a = Tₙ - (n - 1) * d
  
    Substituting the given values and evaluating:
    
    a = ${Tn} - (${n} - 1) * ${d}
    a = ${Tn} - ${n1} * ${d}
    a = ${Tn} - ${n1d}
    a = ${a}
  
    The first term of the A.P. has been calculated.
    `;
  
    return [a,aOfAp_From_d_n_Tn_CalculationSteps];
  }
  
  export var TnOfAP__Calculate_CommonDifference_From_FirstTerm_n_TnOfAP=function(a,n,Tn){
    a=parseFloat(a);
    n=parseInt(n)
    Tn=parseFloat(Tn);
    var d = ((Tn-a)/(n-1)).toString();
  
    var n1=n-1;
    var Tn_minus_a = Tn-a;
  
    var dOfAp_From_a_n_Tn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;  
    Common difference of the A.P. = d;  
    First term of the A.P. = a = ${a}
    n = ${n}
    nth term of the A.P. = Tₙ = ${Tn};
  
    The nth term of the A.P. is given by:
    Tₙ = a + (n - 1) * d
  
    On rearranging the above formula,
  
    The common difference of the A.P. is given by:
    d = (Tₙ - a) / (n - 1)  
  
    Substituting the given values and evaluating:
    
    d = (${Tn} - ${a}) / (${n} - 1)
    d = ${Tn_minus_a} / ${n1}
    d = ${d}
  
    The common difference of the A.P. has been calculated.
    `;
  
    return [d,dOfAp_From_a_n_Tn_CalculationSteps];
  }
  
  export var TnOfAP__Calculate_n_From_FirstTerm_CommonDifference_TnOfAP=function(a,d,Tn){
    a=parseFloat(a);
    d=parseFloat(d);
    Tn=parseFloat(Tn);
    var n = ((Tn-a)/d +1).toString();
  
    var Tn_minus_a = Tn-a;
    var Tn_minus_a_by_d = Tn_minus_a/d;
  
    var nOfAp_From_a_d_Tn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;  
    n;  
    First term of the A.P. = a = ${a}
    Common difference of the A.P. = d = ${d}
    nth term of the A.P. = Tₙ = ${Tn};
  
    The nth term of the A.P. is given by:
    Tₙ = a + (n - 1) * d
  
    On rearranging the above formula,
  
    n is given by:
    n = ((Tₙ - a) / d) + 1
  
    Substituting the given values and evaluating:
    
    n = ((${Tn} - ${a}) / ${d}) + 1
    n = (${Tn_minus_a} / ${d}) + 1
    n = ${Tn_minus_a_by_d} + 1
    n = ${n}
  
    n has been calculated.
    `;
  
    return [n,nOfAp_From_a_d_Tn_CalculationSteps];
  }
  
  //Tn of A.P. END