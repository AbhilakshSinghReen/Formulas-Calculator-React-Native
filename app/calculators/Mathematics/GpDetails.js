
//Return Value: Tn,Sn,Sinf,GM,Steps
export var Calculate__GpDetails__From__FirstTerm_CommonRatio_n = function(a,r,n){
    a=parseFloat(a);
    r=parseFloat(r);
    n=parseInt(n);

    var Converges=false;
    var Tn= (a * Math.pow(r,n-1)).toString();
    var Sn="";
    var Sinf="";
    var GM="";

    var Case1=false;
    var Case2=false;
    var Case3=false;

    if(Math.abs(r)<1){
        Sinf=(a/(1-r)).toString();
        Converges=true;
    }
    else{
        if(a>0 && r>0){
            Sinf="∞";
            Case1=true;
        }
        else if(a<0 && r>0){
            Sinf="-∞";
            Case2=true;
        }
        else{
            Sinf="∞ or -∞";
            Case3=true;
        }
    }

    Sn=( a* (Math.pow(r,n) -1  )  /(r-1)  ).toString();

    if(n%2==0){
        GM = Math.pow((a * Math.pow(r,(n/2)-1))*(a * Math.pow(r,n/2)),(1/2) ).toString();
    }
    else{
        GM= (a * Math.pow(r,((n+1)/2)-1)).toString();
    }

    var n_minus_1=n-1;
    var expo1= Math.pow(r,n_minus_1);
    var expo2 = Math.pow(r,n);
    var r_minus_1=r-1;
    var diff1= expo2-1;
    var prod1= a*diff1;
    var diff2=1-r;

    var GpDetails_Calculation_Steps=`ToFind,GivenEntered,FormulaCalculationResult;
    nth term of the G.P. = Tₙ
    Sum of the first n terms of the G.P. = Sₙ
    Sum of the G.P. for an infinite number of terms = S(∞)
    Geometric mean of the G.P. for the first n terms = GM;
    First term of the G.P. = a = ${a}
    Common ration of the G.P. = r = ${r}
    Number of terms in the G.P. = n = ${n};  
    The nth term of a G.P. is given by:
    Tₙ = a * (r ^ (n - 1))

    Substituting the given values and evaluating:
    Tₙ = ${a} * (${r} ^ (${n} - 1))
    Tₙ = ${a} * (${r} ^ ${n_minus_1})
    Tₙ = ${a} * ${expo1}
    Tₙ = ${Tn}


    The sum of the first n terms of a G.P. is given by:
    Sₙ = a * ((r ^ n) - 1) / (r - 1)

    Substituting the given values and evaluating:
    Sₙ = ${a} * ((${r} ^ ${n}) - 1) / (${r} - 1)
    Sₙ = ${a} * ((${r} ^ ${n}) - 1) / (${r} - 1)
    Sₙ = ${a} * (${expo2} - 1) / ${r_minus_1}
    Sₙ = ${a} * ${diff1} / ${r_minus_1}
    Sₙ = ${prod1} / ${r_minus_1}
    Sₙ = ${Sn}


    The sum of a G.P. for an infinite number of terms is only defined if the series converges.
    Therefore, each term should be smaller in magnitude than the previous one.
    That is:
    |r| < 1

    Substituting the value of r:
    |${r}| < 1
    `

    if(Converges){
        GpDetails_Calculation_Steps+=`
        The above expression holds true.

        The sum of the G.P. for an infinite number of terms is given by:
        S(∞) = a / (1 - r)

        Substituting the given values and evaluating:
        S(∞) = ${a} / (1 - ${r})
        S(∞) = ${a} / (${diff2})
        S(∞) = ${Sinf}        
        `
    }
    else{
        GpDetails_Calculation_Steps+=`
        The above expression DOES NOT hold true.

        Therefore S(∞) is not a finite value.

        S(∞) can have a few values:

        Case 1: a > 0 and r > 0
        In this case all terms in the G.P. are positive.
        Therefore
        S(∞) = ∞

        Case 2: a < 0 and r > 0
        In this case all terms in the G.P. are negative.
        Therefore
        S(∞) = -∞

        Case 3: r < 0
        In this case the terms of the G.P. change from negative to positive one after another.
        Therefore
        S(∞) can be ∞ or -∞


        From the values entered,`

        if(Case1){
            GpDetails_Calculation_Steps+=`
            Case 1 holds true.            
            `
        }
        else if(Case2){
            GpDetails_Calculation_Steps+=`
            Case 2 holds true.            
            `
        }
        else if(Case3){
            GpDetails_Calculation_Steps+=`
            Case 3 holds true.            
            `
        }

        GpDetails_Calculation_Steps+=`
            Therefore,
            S(∞) = ${Sinf}
            `

    }


    GpDetails_Calculation_Steps+=`
            

    The Geometric mean of a G.P. is given by:
    
    if n is even:
    GM = sqrt(((n / 2)th term) * (((n / 2) + 1)th term))

    if n is odd:
    GM = (((n + 1) / 2)th term)

    n = ${n}
    `

    if(n%2==0){

    var n_by_2 = n/2;
    var n_by_2__plus__1=n_by_2+1;

    GpDetails_Calculation_Steps+=`
    
    
    Since n is even:
    GM = sqrt(((n / 2)th term) * (((n / 2) + 1)th term))
    GM = sqrt((${n_by_2}th term) * (${n_by_2__plus__1}th term))
    GM = sqrt(${a * Math.pow(r,(n/2)-1)} * ${a * Math.pow(r,n/2)})
    GM= ${GM}
    `        
    }
    else{

    GpDetails_Calculation_Steps+=`
    

    Since n is odd:
    GM = (((n + 1) / 2)th term)
    GM= ${GM}
    `        
    }
    return [Tn,Sn,Sinf,GM,GpDetails_Calculation_Steps];

}