export var Return_All_SubjectFormulas_With_Screen_Names = function (
  subjectName
) {
  switch (subjectName) {
    case "Mathematics": {
      return Return_All_MathFormulas_With_Screen_Names();
    }
    case "Physics": {
      return Return_All_PhysicsFormulas_With_Screen_Names();
    }
    case "Chemistry": {
      return Return_All_ChemistryFormulas_With_Screen_Names();
    }
  }
};

var Return_All_SubjectFormulas_With_ScreenNames_SearchTags = function () {
  var mathFormulas = Return_All_MathFormulas_With_Screen_Names();
  var physicsFormulas = Return_All_PhysicsFormulas_With_Screen_Names();
  var chemistryFormulas = Return_All_ChemistryFormulas_With_Screen_Names();

  var allFormulas = mathFormulas
    .concat(physicsFormulas)
    .concat(chemistryFormulas);

  return allFormulas;
};

export var Get_Formulas_From_SearchQuery = function (searchQuery) {
  if (searchQuery == "") {
    return [];
  }

  var firstPriority = 1;
  var lastPriority = 3;

  var allFormulas = Return_All_SubjectFormulas_With_ScreenNames_SearchTags();
  var formulasFound = [];
  var prioritizedFormulasFound = [];
  var nonRedundantPrioritizedFormulasFound = [];

  var lcSearchQuery = searchQuery.toLowerCase();

  allFormulas.forEach((element) => {
    var lcFormulaName = element[0].toLowerCase();

    if (lcSearchQuery.includes(lcFormulaName)) {
      formulasFound.push([element, 2]);
    }
    if (lcFormulaName.includes(lcSearchQuery)) {
      formulasFound.push([element, 2]);
    }

    var tags = element[2].split(";");
    tags.forEach((tag) => {
      if (tag != "") {
        var lcTag = tag.toLowerCase();

        if (lcSearchQuery.includes(lcTag)) {
          formulasFound.push([element, 2]);
        }

        if (lcTag.includes(lcSearchQuery)) {
          formulasFound.push([element, 1]);
        }
      }
    });
  });

  for (let i = firstPriority; i <= lastPriority; i++) {
    formulasFound.forEach((aFormula) => {
      console.log(aFormula);
      if (aFormula[1] == i) {
        prioritizedFormulasFound.push(aFormula[0]);
      }
    });
  }

  prioritizedFormulasFound.forEach((aFormula) => {
    if (!nonRedundantPrioritizedFormulasFound.includes(aFormula)) {
      nonRedundantPrioritizedFormulasFound.push(aFormula);
    }
  });

  return nonRedundantPrioritizedFormulasFound;
};

export var Get_FormulasVersionAndDetails = function () {
  var x = `Formulas
  `;
  var mathFormulas = Return_All_MathFormulas_With_Screen_Names();
  var physicsFormulas = Return_All_PhysicsFormulas_With_Screen_Names();
  var chemFormulas = Return_All_ChemistryFormulas_With_Screen_Names();

  var mathFormulasCount = mathFormulas.length;
  var physicsFormulasCount = physicsFormulas.length;
  var chemistryFormulasCount = chemFormulas.length;

  var totalFormulaCount =
    mathFormulasCount + physicsFormulasCount + chemistryFormulasCount;

  x += `
  Total formulas: ${totalFormulaCount}
  Mathematics: ${mathFormulasCount}
  Physics: ${physicsFormulasCount}
  Chemistry: ${chemistryFormulasCount}`;

  return x;
};

var Return_All_MathFormulas_With_Screen_Names = function () {
  QuadraticEquationDetailsFormula = [
    "Quadratic Equation Details",
    "QuadraticEquationDetailsScreen",
    "x2;a;b;c",
  ];
  QuadraticEquationsCommonRootsFormula = [
    "Quadratic Equations Common Roots",
    "QuadraticEquationCommonRootsScreen",
    "x2;a;b;c",
  ];
  TnOfAPFormula = ["Tₙ of A.P.", "TnOfAPScreen", "a;d;n;Tn;p"];
  SnOfAPFormula = ["Sₙ of A.P.", "SnOfAPScreen", "a;d;n;Tn;Sn;p"];
  GPDetailsFormula = ["G.P. Details", "GPDetailsScreen", "a;r;n"];

  VectorDotProductScreenFormula = [
    "Vector Dot Product",
    "VectorDotProductScreen",
    "a,b,x",
  ];
  VectorCrossProductScreenFormula = [
    "Vector Cross Product",
    "VectorCrossProductScreen",
    "a,b,x",
  ];
  MatrixDeterminantScreenFormula = [
    "Matrix Determinant",
    "MatrixDeterminantScreen",
    "x,A,[,],|,det",
  ];
  PairOfLinearEquationsFormula = [
    "Pair of linear equations",
    "PairOfLinearEquationsScreen",
    "a1;a2;b1;b2;c1;c2;x;y",
  ];
  VectorDetails3DFormula = ["Vector Details (3D)", "VectorDetails3DScreen", ""];

  return [
    QuadraticEquationDetailsFormula,
    QuadraticEquationsCommonRootsFormula,
    TnOfAPFormula,
    SnOfAPFormula,
    GPDetailsFormula,
    PairOfLinearEquationsFormula,
    VectorDotProductScreenFormula,
    VectorCrossProductScreenFormula,
    //MatrixDeterminantScreenFormula,
    VectorDetails3DFormula,
  ];
};

var Return_All_PhysicsFormulas_With_Screen_Names = function () {
  EnergyStoredInACapacitorFormula = [
    "Energy Stored In A Capacitor",
    "EnergyStoredInACapacitorScreen",
    "c;v2",
  ];
  ElasticPotentialEnergyFormula = [
    "Elastic Potential Energy",
    "ElasticPotentialEnergyScreen",
    "k;x2",
  ];
  EscapeVelocityFormula = ["Escape Velocity", "EscapeVelocityScreen", "G;M;r"];
  AverageVelocityFormula = [
    "Average Velocity",
    "AverageVelocityScreen",
    "x;s;v;t",
  ];
  AverageAccelerationFormula = [
    "Average Acceleration",
    "AverageAccelerationScreen",
    "v;a;t",
  ];
  RadiusOfMovingChargeInMagneticFieldFormula = [
    "Radius Of A Moving Charge In A Magnetic Field",
    "RadiusOfMovingChargeInMagneticFieldScreen",
    "r,B,q,m,v",
  ];
  HeatCurrentFormula = [
    "Heat Current",
    "HeatCurrentScreen",
    "K,A,d,Thermal,Heat,Rate of flow",
  ];
  CoulombsConstantFromPermittivityFormula = [
    "Coulomb's Constant From Permittivity Of Material",
    "CoulombsConstantFromPermittivityScreen",
    "k,e,K,E,e0,E0",
  ];
  DipoleMomentScalerFormula = [
    "Dipole Moment (Scaler)",
    "DipoleMomentScalerScreen",
    "p,q,l,a",
  ];
  DipoleMomentVectorFormula = [
    "Dipole Moment (Vector)",
    "DipoleMomentVectorScreen",
    "p,q,l,a",
  ];
  ElectrostaticForceFormula = [
    "Electrostatic Force",
    "ElectrostaticForceScreen",
    "k,q,r,F",
  ];
  ElectrostaticPotentialEnergyFormula = [
    "Electrostatic Potential Energy",
    "ElectrostaticPotentialEnergyScreen",
    "k,q,r,E",
  ];
  GravitationalForceFormula = [
    "Gravitational Force",
    "GravitationalForceScreen",
    "G,M,m,r,F",
  ];
  GravitationalPotentialEnergyFormula = [
    "Gravitational Potential Energy",
    "GravitationalPotentialEnergyScreen",
    "G,M,m,r,U",
  ];
  GravitationalPotentialEnergyOnAPlanetFormula = [
    "Gravitational Potential Energy On A Planet",
    "GravitationalPotentialEnergyOnAPlanetScreen",
    "m,g,h,U",
  ];
  FrictionFormula = ["Friction", "FrictionScreen", "F,u,N"];
  TorqueScalerFormula = ["Torque (Scaler)", "TorqueScalerScreen", "T,F,L"];
  TorqueVectorFormula = ["Torque (Vector)", "TorqueVectorScreen", "T,F,L"];

  return [
    EnergyStoredInACapacitorFormula,
    ElasticPotentialEnergyFormula,
    EscapeVelocityFormula,
    AverageVelocityFormula,
    AverageAccelerationFormula,
    RadiusOfMovingChargeInMagneticFieldFormula,
    HeatCurrentFormula,
    CoulombsConstantFromPermittivityFormula,
    DipoleMomentScalerFormula,
    DipoleMomentVectorFormula,
    ElectrostaticForceFormula,
    ElectrostaticPotentialEnergyFormula,
    GravitationalForceFormula,
    GravitationalPotentialEnergyFormula,
    GravitationalPotentialEnergyOnAPlanetFormula,
    FrictionFormula,
    TorqueScalerFormula,
    TorqueVectorFormula,
  ];
};

var Return_All_ChemistryFormulas_With_Screen_Names = function () {
  BoylesLaw = [
    "Boyle-Mariotte Law: Pressure-Volume relationship",
    "BoylesMariotteLawScreen",
    "p1;v1;p2;v2",
  ];
  CharlesLaw = [
    "Charles's Law: Temperature-Volume relationship",
    "CharlesLawScreen",
    "v1;t1;v2;t2",
  ];

  return [BoylesLaw, CharlesLaw];
};
