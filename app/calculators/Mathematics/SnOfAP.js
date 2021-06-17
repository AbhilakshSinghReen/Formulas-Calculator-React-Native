import {Calculate_QuadraticEquationDetails_From_A_B_C} from "./QuadraticEquationDetails"
import {TnOfAP__Calculate_CommonDifference_From_FirstTerm_n_TnOfAP,
  TnOfAP__Calculate_TnOfAP_From_FirstTerm_CommonDifference_n} from "./TnOfAP"

//Sn of A.P.
//Order: Calculate, FirstTerm, n, CommonDifference, TnOfAP, SnOfAP

var Calculate_All_Terms_Of_AP_From_a_d_n=function(a,d,n){
    a=parseFloat(a);
    d=parseFloat(d);
    n=parseInt(n);
  var Terms=[];
    for (let i = 0; i < n; i++) {  
    Terms.push(a+i*d);
  }
  return Terms;
  }
  
  export var SnOfAP__Calculate_SnOfAP_From_FirstTerm_n_TnOfAP=function(a,n,Tn){
    a=parseFloat(a);
    n=parseInt(n);
    Tn=parseFloat(Tn);
  
    var Sn = ((n/2) * (a+Tn)).toString();
  
    var n_by_2=n/2;
    var a_plus_Tn= a+Tn;
  
    var d=TnOfAP__Calculate_CommonDifference_From_FirstTerm_n_TnOfAP(a,n,Tn)[0];
    var s = Calculate_All_Terms_Of_AP_From_a_d_n(a,d,n);
  
    var SnOfAp_From_a_n_Tn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;
    Sum of first n terms of the A.P. = Sₙ;
    First term of the A.P. = a = ${a}  
    n = ${n}
    nth term of the A.P. = Tₙ = ${Tn};
    The sum of the first n terms of an A.P. is given by:
    Sₙ = (n / 2) * (a + Tₙ)
  
    Substituting the given values and evaluating:
    Sₙ = (${n} / 2) * (${a} + ${Tn})
    Sₙ = (${n_by_2}) * (${a_plus_Tn})
    Sₙ = ${Sn}
    
    Sₙ has been calculated.
  
    
    The series upto n terms is as follows:
  
    `;
  
    for (let i = 0; i < s.length; i++) {
      if(i==s.length-1)
      {
        SnOfAp_From_a_n_Tn_CalculationSteps+=`${s[i]}\n`;
        break;
      }
  
      SnOfAp_From_a_n_Tn_CalculationSteps+=`${s[i]} + `;
      
    }
  
    SnOfAp_From_a_n_Tn_CalculationSteps+=`
    
    d = ${d}
    The steps for calculating 'd' from 'a', 'n' and 'Tₙ' can be found in the "Tₙ of A.P." section.
    `
  
    return [Sn,d,SnOfAp_From_a_n_Tn_CalculationSteps];
  
  }
  
  export var SnOfAP__Calculate_FirstTerm_From_n_TnOfAP_SnOfAP=function(n,Tn,Sn){
    n=parseInt(n);
    Tn=parseFloat(Tn);
    Sn=parseFloat(Sn);
  
    var a= ((2*(Sn/n)) -Tn).toString();
  
    var Sn_by_n=Sn/n;
    var Two_Into__Sn_by_n = 2*Sn_by_n;
  
    var d=TnOfAP__Calculate_CommonDifference_From_FirstTerm_n_TnOfAP(a,n,Tn)[0];
    var s = Calculate_All_Terms_Of_AP_From_a_d_n(a,d,n);
  
    var aOfAp_From_n_Tn_Sn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;  
    First term of the A.P. = a;  
    n = ${n}
    nth term of the A.P. = Tₙ = ${Tn}
    Sum of first n terms of the A.P. = Sₙ = ${Sn};
  
    The sum of the first n terms of an A.P. is given by:
    Sₙ = (n / 2) * (a + Tₙ)
  
    On rearranging the above formula,
  
    The first term of the A.P. is given by:
    a = 2 * (Sₙ / n) - Tₙ
  
    Substituting the given values and evaluating:
    a = 2 * (${Sn} / ${n}) - ${Tn}
    a = 2 * ${Sn_by_n} - ${Tn}
    a = ${Two_Into__Sn_by_n} - ${Tn}
    a = ${Sn}
    
    a has been calculated.
  
    
    The series upto n terms is as follows:
  
    `;
  
    for (let i = 0; i < s.length; i++) {
      if(i==s.length-1)
      {
        aOfAp_From_n_Tn_Sn_CalculationSteps+=`${s[i]}\n`;
        break;
      }
  
      aOfAp_From_n_Tn_Sn_CalculationSteps+=`${s[i]} + `;
      
    }
  
    aOfAp_From_n_Tn_Sn_CalculationSteps+=`
    
    d = ${d}
    The steps for calculating 'd' from 'a', 'n' and 'Tₙ' can be found in the "Tₙ of A.P." section.
    `
  
  
    return [a,d,aOfAp_From_n_Tn_Sn_CalculationSteps];
  
  }
  
  export var SnOfAP__Calculate_n_From_FirstTerm_TnOfAP_SnOfAP=function(a,Tn,Sn){
    a=parseFloat(a);
    Tn=parseFloat(Tn);
    Sn=parseFloat(Sn);
  
    var n= (2 * Sn/(a+Tn)).toString();
  
    var a_plus_Tn = a+Tn;
    var Sn__into_a_plus_Tn = Sn * a_plus_Tn;
  
    var d=TnOfAP__Calculate_CommonDifference_From_FirstTerm_n_TnOfAP(a,n,Tn)[0];
    var s = Calculate_All_Terms_Of_AP_From_a_d_n(a,d,n);
  
    var nOfAp_From_a_Tn_Sn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;  
    n;  
    First term of the A.P. = a = ${a}
    nth term of the A.P. = Tₙ = ${Tn}
    Sum of first n terms of the A.P. = Sₙ = ${Sn};
  
    The sum of the first n terms of an A.P. is given by:
    Sₙ = (n / 2) * (a + Tₙ)
  
    On rearranging the above formula,
  
    n is given by:
    n = 2 * Sₙ / (a + Tₙ)  
  
    Substituting the given values and evaluating:
    n = 2 * ${Sn} / (${a} + ${Tn})
    n = 2 * ${Sn} / (${a_plus_Tn})
    n = 2 * ${Sn__into_a_plus_Tn}
    n = ${n}
  
    n has been calculated.
  
    The series upto n terms is as follows:
  
    `;
  
    for (let i = 0; i < s.length; i++) {
      if(i==s.length-1)
      {
        nOfAp_From_a_Tn_Sn_CalculationSteps+=`${s[i]}\n`;
        break;
      }
  
      nOfAp_From_a_Tn_Sn_CalculationSteps+=`${s[i]} + `;
      
    }
  
    nOfAp_From_a_Tn_Sn_CalculationSteps+=`
    
    d = ${d}
    The steps for calculating 'd' from 'a', 'n' and 'Tₙ' can be found in the "Tₙ of A.P." section.
    `
    
    return [n,d,nOfAp_From_a_Tn_Sn_CalculationSteps];
  }
  
  export var SnOfAP__Calculate_SnOfAP_From_FirstTerm_n_CommonDifference=function(a,n,d){
    a=parseFloat(a);
    n=parseInt(n);
    d=parseFloat(d);
  
    var Sn = ((n/2)*(2*a + (n-1)*d)).toString();
  
    var n_by_2=n/2;
    var a_into_2=2*a;
    var n_minus_1=n-1;
    var n_minus_1__into_d=n_minus_1*d;
  
    var sum1=a_into_2+n_minus_1__into_d;
  
    var Tn = TnOfAP__Calculate_TnOfAP_From_FirstTerm_CommonDifference_n(a,d,n)[0];
    var s = Calculate_All_Terms_Of_AP_From_a_d_n(a,d,n);
  
    var SnOfAp_From_a_n_d_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;
    Sum of first n terms of the A.P. = Sₙ;
    First term of the A.P. = a = ${a}  
    n = ${n}
    Common difference of the A.P. = d = ${d};
    The sum of the first n terms of an A.P. is given by:
    Sₙ = (n / 2) * (2 * a + (n - 1) * d)
  
    Substituting the given values and evaluating:
    Sₙ = (${n} / 2) * (2 * ${a} + (${n} - 1) * ${d})
    Sₙ = (${n_by_2}) * (${a_into_2} + ${n_minus_1} * ${d})
    Sₙ = (${n_by_2}) * (${a_into_2} + ${n_minus_1__into_d})
    Sₙ = (${n_by_2}) * (${sum1})
    Sₙ = ${Sn}
    
    Sₙ has been calculated.
  
    
    The series upto n terms is as follows:
  
    `;
  
    for (let i = 0; i < s.length; i++) {
      if(i==s.length-1)
      {
        SnOfAp_From_a_n_d_CalculationSteps+=`${s[i]}\n`;
        break;
      }
  
      SnOfAp_From_a_n_d_CalculationSteps+=`${s[i]} + `;
      
    }
  
    SnOfAp_From_a_n_d_CalculationSteps+=`
    
    Tₙ = ${Tn}
    The steps for calculating 'Tₙ' from 'a', 'd' and 'n' can be found in the "Tₙ of A.P." section.
    `
  
    return [Sn,Tn,SnOfAp_From_a_n_d_CalculationSteps];
  
  }
  
  export var SnOfAP__Calculate_FirstTerm_From_n_CommonDifference_SnOfAP=function(n,d,Sn){
    n=parseInt(n);
    d=parseFloat(d);
    Sn=parseFloat(Sn);
  
    var a= ((Sn-(n*(n-1)*d    )/2 )/n).toString();
  
    var n_minus_1 = n-1;
    var n__into_n_minus_1__into_d = n*n_minus_1*d;
    var n__into_n_minus_1__into_d___by_2 = n__into_n_minus_1__into_d/2;
    var diff1=Sn-n__into_n_minus_1__into_d___by_2;
  
    var Sn_by_n=Sn/n;
    var Two_Into__Sn_by_n = 2*Sn_by_n;
  
    console.log(`a=${a}, d=${d}, n=${n}\n`);
    var Tn = TnOfAP__Calculate_TnOfAP_From_FirstTerm_CommonDifference_n(a,d,n)[0];
    var s = Calculate_All_Terms_Of_AP_From_a_d_n(a,d,n);
  
    
  
    var aOfAp_From_n_d_Sn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;  
    First term of the A.P. = a;  
    n = ${n}
    nth term of the A.P. = Tₙ = ${Tn}
    Sum of first n terms of the A.P. = Sₙ = ${Sn};
  
    The sum of the first n terms of an A.P. is given by:
    Sₙ = (n / 2) * (2 * a + (n - 1) * d)
  
    On rearranging the above formula,
  
    The first term of the A.P. is given by:
    a = (Sₙ - ((n * (n-1) * d) / 2)) / n
  
    Substituting the given values and evaluating:
    a = (${Sn} - ((${n} * (${n}-1) * ${d}) / 2)) / ${n}
    a = (${Sn} - ((${n} * ${n_minus_1} * ${d}) / 2)) / ${n}
    a = (${Sn} - (${n__into_n_minus_1__into_d}) / 2)) / ${n}
    a = (${diff1}) / ${n}
    a = ${a}
    
    a has been calculated.
  
    
    The series upto n terms is as follows:
  
    `;
  
    for (let i = 0; i < s.length; i++) {
      if(i==s.length-1)
      {
        aOfAp_From_n_d_Sn_CalculationSteps+=`${s[i]}\n`;
        break;
      }
  
      aOfAp_From_n_d_Sn_CalculationSteps+=`${s[i]} + `;
      
    }
  
    aOfAp_From_n_d_Sn_CalculationSteps+=`
    
    Tₙ = ${Tn}
    The steps for calculating 'Tₙ' from 'a', 'd' and 'n' can be found in the "Tₙ of A.P." section.
    `
  
  
    return [a,Tn,aOfAp_From_n_d_Sn_CalculationSteps];
  
  }
  
  export var SnOfAP__Calculate_n_From_FirstTerm_CommonDifference_SnOfAP=function(a,d,Sn){
    a=parseFloat(a);
    d=parseFloat(d);
    Sn=parseFloat(Sn);
    
    var n = Calculate_QuadraticEquationDetails_From_A_B_C(d,a-d,-Sn);
  
    var n1=n[0];
    var n2=n[1];
  
    if(n1>0){
      n=n1;
    }
    else{
      n=n2;
    }
  
    var Tn = TnOfAP__Calculate_TnOfAP_From_FirstTerm_CommonDifference_n(a,d,parseInt(n))[0];
    var s = Calculate_All_Terms_Of_AP_From_a_d_n(a,d,parseInt(n));
  
  
    var nOfAp_From_a_d_Sn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;  
    n;  
    First term of the A.P. = a = ${a}
    nth term of the A.P. = Tₙ = ${Tn}
    Sum of first n terms of the A.P. = Sₙ = ${Sn};
  
    The sum of the first n terms of an A.P. is given by:
    Sₙ = (n / 2) * (2 * a + (n - 1) * d)
  
    On rearranging the above formula,
  
    d * n² + (a - d) * n - Sₙ = 0
  
    On solving the above quadratic equation and accepting only real and positive values of n, we get:
    n = ${n}
  
    n has been calculated.
  
    The steps for finding the roots of a quadratic equation can be found in the "Quadratic Equation Details" section.
  
    This method of calculating n is not reliable as it deals with the solution of a quadratic equation. 
    n can be easily calculated by supplying a value for Tn.
  
  
    The series upto n terms is as follows:
  
    `;
  
    for (let i = 0; i < s.length; i++) {
      if(i==s.length-1)
      {
        nOfAp_From_a_d_Sn_CalculationSteps+=`${s[i]}\n`;
        break;
      }
  
      nOfAp_From_a_d_Sn_CalculationSteps+=`${s[i]} + `;
      
    }
  
    nOfAp_From_a_d_Sn_CalculationSteps+=`
    
    Tₙ = ${Tn}
    The steps for calculating 'Tₙ' from 'a', 'd' and 'n' can be found in the "Tₙ of A.P." section.
    `
    
    return [n,Tn,nOfAp_From_a_d_Sn_CalculationSteps];
  }
  
  export var SnOfAP__Calculate_CommonDifference_Tn_From_FirstTerm_n_SnOfAP=function(a,n,Sn){
    a=parseFloat(a);
    n=parseInt(n);
    Sn=parseFloat(Sn);
  
    var d=((Sn-n*a)/(n*(n-1)/2)).toString()
    var Tn=((2*(Sn/n)) -a).toString();
  
    var s = Calculate_All_Terms_Of_AP_From_a_d_n(a,d,n);
  
    var n_into_a=n*a;
    var n_minus_1=n-1;
    var Diff1= Sn-n_into_a;
    var Prod1 = n*n_minus_1;
    var Prod2 = Prod1/2;
    var Prod3=Sn/n;
    var Prod4= 2*Prod3;
  
    
  
    var dAndTnOfAp_From_a_n_Sn_CalculationSteps = `ToFind,GivenEntered,FormulaCalculationResult;  
    Common difference of the A.P. = d
    nth term of the A.P. = Tₙ;
    First term of the A.P. = a ${a}
    n = ${n}  
    Sum of first n terms of the A.P. = Sₙ = ${Sn};
  
    Calculating d:
  
    The sum of the first n terms of an A.P. is given by:
    Sₙ = (n / 2) * (2 * a + (n - 1) * d)
  
    On rearranging the above formula,
  
    The first term of the A.P. is given by:
    d = (Sₙ - n * a) / (n * (n - 1) / 2)
  
    Substituting the given values and evaluating:
    d = (${Sn} - ${n} * ${a}) / (${n} * (${n} - 1) / 2)
    d = (${Sn} - ${n_into_a}) / (${n} * (${n_minus_1}) / 2)
    d = ${Diff1} / (${Prod1}) / 2)
    d = ${Diff1} / ${Prod2}
    d = ${d}
    
    
    d has been calculated.
  
  
    Calculating Tₙ
  
    The sum of the first n terms of an A.P. is given by:
    Sₙ = (n / 2) * (a + Tₙ)
  
    On rearranging the above formula,
  
    The first term of the A.P. is given by:
    Tₙ = (2 * Sₙ / n) - a
  
    Substituting the given values and evaluating:
    Tₙ = (2 * ${Sn} / ${n}) - ${a}
    Tₙ = (2 * ${Prod3}) - ${a}
    Tₙ = ${Prod4} - ${a}
    Tₙ = ${Tn}
    
    
    Tₙ has been calculated.
  
    
    The series upto n terms is as follows:
  
    `;
  
    for (let i = 0; i < s.length; i++) {
      if(i==s.length-1)
      {
        dAndTnOfAp_From_a_n_Sn_CalculationSteps+=`${s[i]}\n`;
        break;
      }
  
      dAndTnOfAp_From_a_n_Sn_CalculationSteps+=`${s[i]} + `;
      
    }
  
    return [d,Tn,dAndTnOfAp_From_a_n_Sn_CalculationSteps];  
  }
  //Sn of A.P. END