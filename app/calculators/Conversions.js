//E = (1/2) * C * V^2

//Metric Units
const MetricUnitsPrefixes = {
  yocto: {
    prefix: "y",
    factor: -24,
  },
  zepto: {
    prefix: "z",
    factor: -21,
  },
  atto: {
    prefix: "a",
    factor: -18,
  },
  femto: {
    prefix: "f",
    factor: -15,
  },
  pico: {
    prefix: "p",
    factor: -12,
  },
  nano: {
    prefix: "n",
    factor: -9,
  },
  micro: {
    prefix: "u",
    factor: -6,
  },
  milli: {
    prefix: "m",
    factor: -3,
  },
  centi: {
    prefix: "c",
    factor: -2,
  },
  deci: {
    prefix: "d",
    factor: -1,
  },
  base: {
    prefix: "",
    factor: 0,
  },
  deca: {
    prefix: "da",
    factor: 1,
  },
  hecto: {
    prefix: "h",
    factor: 2,
  },
  kilo: {
    prefix: "k",
    factor: 3,
  },
  mega: {
    prefix: "M",
    factor: 6,
  },
  giga: {
    prefix: "G",
    factor: 9,
  },
  tera: {
    prefix: "T",
    factor: 12,
  },
  peta: {
    prefix: "P",
    factor: 15,
  },
  exa: {
    prefix: "E",
    factor: 18,
  },
  zetta: {
    prefix: "Z",
    factor: 21,
  },
  yotta: {
    prefix: "Y",
    factor: 24,
  },
};

var Get_MetricUnitsPrefixes = function () {
  return MetricUnitsPrefixes;
};

var Get_MetricUnitsPrefixesByPriority = function (ranges) {
  var l = ranges.length;
  var MetricUnitsPrefixes = Get_MetricUnitsPrefixes();
  var MetricUnitsPrefixesByPriority = [];

  for (let i = 0; i < l; i++) {
    var r = ranges[i].split(":");

    if (r.length == 2) {
      var start = parseInt(r[0]);
      var end = parseInt(r[1]);
      var TempPrefixesByPriority = [];

      for (var key in MetricUnitsPrefixes) {
        if (
          MetricUnitsPrefixes[key].factor >= start &&
          MetricUnitsPrefixes[key].factor <= end
        ) {
          TempPrefixesByPriority.push(MetricUnitsPrefixes[key]);
        }
      }

      TempPrefixesByPriority = TempPrefixesByPriority.sort();

      TempPrefixesByPriority.forEach((element) => {
        MetricUnitsPrefixesByPriority.push(element);
      });
    }
  }
  return MetricUnitsPrefixesByPriority;
};

var ConvertMetricUnits = function (valueIn, prefixIn, prefixOut) {
  var MetricUnitsPrefixes = Get_MetricUnitsPrefixes();
  var factorIn = 0;
  var factorOut = 0;

  for (var key in MetricUnitsPrefixes) {
    if (MetricUnitsPrefixes[key].prefix == prefixIn) {
      factorIn = MetricUnitsPrefixes[key].factor;
    }
    if (MetricUnitsPrefixes[key].prefix == prefixOut) {
      factorOut = MetricUnitsPrefixes[key].factor;
    }
  }
  return valueIn * Math.pow(10, factorIn - factorOut);
};

var Get_MetricUnits = function (baseUnit, ranges) {
  var X = Get_MetricUnitsPrefixesByPriority(ranges);

  X.forEach((element) => {
    element["unit"] = element["prefix"] + baseUnit;
    //delete element['prefix'];
  });

  return X;
};

var Convert_MetricValues = function (valueIn, baseUnit, UnitIn, UnitOut) {
  return ConvertMetricUnits(
    valueIn,
    UnitIn.slice(0, UnitIn.length - baseUnit.length),
    UnitOut.slice(0, UnitOut.length - baseUnit.length)
  );
};

var Is_MetricUnitPrefix = function (prefixToCheck) {
  var MetricUnitsPrefixes = Get_MetricUnitsPrefixes();
  for (var key in MetricUnitsPrefixes) {
    if (MetricUnitsPrefixes[key].prefix == prefixToCheck) {
      return true;
    }
  }
  return false;
};

var Is_MetricUnit = function (unitToCheck, baseUnit) {
  var MetricUnitsPrefixes = Get_MetricUnitsPrefixes();

  var prefixToCheck = unitToCheck.slice(
    0,
    unitToCheck.length - baseUnit.length
  );

  for (var key in MetricUnitsPrefixes) {
    if (MetricUnitsPrefixes[key].prefix == prefixToCheck) {
      return true;
    }
  }
  return false;
};
//Metric Units END

//Other Units
var ConvertUnitsUsingFactors = function (valueIn, factorIn, factorOut) {
  return valueIn * Math.pow(10, factorIn - factorOut);
};
//Other Units END

//Others
var Get_ProperQuantityName_From_QuantityName = function (quantityName) {
  if (quantityName == "Spring constant") {
    return "SpringConstant";
  } else if (
    quantityName == "Extension" ||
    quantityName == "Radius of the centre body" ||
    quantityName == "Total displacement" ||
    quantityName == "Length" ||
    quantityName == "Radius of revolution of the particle" ||
    quantityName == "Distance between the 2 charges" ||
    quantityName == "Vector from negative charge to positive charge" ||
    quantityName == "Distance between the 2 masses" ||
    quantityName == "Height" ||
    quantityName ==
      "Perpendicular distance between the force and the point of rotation" ||
    quantityName == "Length vector"
  ) {
    return "Distance";
  } else if (
    quantityName == "Potential energy" ||
    quantityName == "Electrostatic potential energy" ||
    quantityName == "Gravitational potential energy"
  ) {
    return "Energy";
  } else if (
    quantityName == "Mass of the centre body" ||
    quantityName == "Mass of the particle" ||
    quantityName == "First mass" ||
    quantityName == "Second mass" ||
    quantityName == "Mass of the object"
  ) {
    return "Mass";
  } else if (
    quantityName == "Escape velocity" ||
    quantityName == "Average velocity" ||
    quantityName == "Change in velocity" ||
    quantityName == "Velocity of the particle"
  ) {
    return "Velocity";
  } else if (quantityName == "Time taken") {
    return "Time";
  } else if (
    quantityName == "Average acceleration" ||
    quantityName == "Gravitational acceleration"
  ) {
    return "Acceleration";
  } else if (
    quantityName == "Initial pressure" ||
    quantityName == "Final pressure"
  ) {
    return "Pressure";
  } else if (
    quantityName == "Initial volume" ||
    quantityName == "Final volume"
  ) {
    return "Volume";
  } else if (
    quantityName == "Initial temperature" ||
    quantityName == "Final temperature" ||
    quantityName == "Temperature at end 2" ||
    quantityName == "Temperature at end 1"
  ) {
    return "Temperature";
  } else if (
    quantityName == "Charge on the particle" ||
    quantityName == "Charge at each end" ||
    quantityName == "First charge" ||
    quantityName == "Second charge"
  ) {
    return "Charge";
  } else if (quantityName == "Magnitude of the magnetic field") {
    return "Magnetic Field";
  } else if (quantityName == "Thermal conductivity of material") {
    return "Thermal Conductivity";
  } else if (quantityName == "Area of cross section") {
    return "Area";
  } else if (quantityName == "Heat current") {
    return "Power";
  } else if (quantityName == "Coulomb's constant of material") {
    return "Coulomb's constant";
  } else if (quantityName == "Permittivity of material") {
    return "Permittivity";
  } else if (quantityName == "Magnitude of dipole moment") {
    return "Dipole moment";
  } else if (
    quantityName == "Electrostatic force" ||
    quantityName == "Gravitational force" ||
    quantityName == "Normal reaction" ||
    quantityName == "Friction"
  ) {
    return "Force";
  } else {
    return quantityName;
  }
};

export var Get_Units_From_QuantityName = function (quantityName) {
  quantityName = Get_ProperQuantityName_From_QuantityName(quantityName);

  var requiredUnits;
  var requiredUnitsArray = [];

  switch (quantityName) {
    case "Energy": {
      requiredUnits = Get_EnergyUnits();
      break;
    }
    case "Voltage": {
      requiredUnits = Get_VoltageUnits();
      break;
    }
    case "Capacitance": {
      requiredUnits = Get_CapacitanceUnits();
      break;
    }
    case "Distance": {
      requiredUnits = Get_DistanceUnits();
      break;
    }
    case "SpringConstant": {
      requiredUnits = Get_SpringConstantUnits();
      break;
    }
    case "Mass": {
      requiredUnits = Get_MassUnits();
      break;
    }
    case "Velocity": {
      requiredUnits = Get_VelocityUnits();
      break;
    }
    case "Time": {
      requiredUnits = Get_TimeUnits();
      break;
    }
    case "Acceleration": {
      requiredUnits = Get_AccelerationUnits();
      break;
    }
    case "Volume": {
      requiredUnits = Get_VolumeUnits();
      break;
    }
    case "Pressure": {
      requiredUnits = Get_PressureUnits();
      break;
    }
    case "Temperature": {
      requiredUnits = Get_TemperatureUnits();
      break;
    }
    case "Charge": {
      requiredUnits = Get_ChargeUnits();
      break;
    }
    case "Magnetic Field": {
      requiredUnits = Get_MagneticFieldUnits();
      break;
    }
    case "Area": {
      requiredUnits = Get_AreaUnits();
      break;
    }
    case "Thermal Conductivity": {
      requiredUnits = Get_ThermalConductivityUnits();
      break;
    }
    case "Power": {
      requiredUnits = Get_PowerUnits();
      break;
    }
    case "Coulomb's constant": {
      requiredUnits = Get_CoulombsConstantUnits();
      break;
    }
    case "Permittivity": {
      requiredUnits = Get_PermittivityUnits();
      break;
    }
    case "Dipole moment": {
      requiredUnits = Get_DipoleMomentUnits();
      break;
    }
    case "Force": {
      requiredUnits = Get_ForceUnits();
      break;
    }
    case "Torque": {
      requiredUnits = Get_TorqueUnits();
      break;
    }
    case "Universal gravitational constant": {
      requiredUnits = Get_UniversalGravitationalConstantUnits();
      break;
    }
    case "Coefficient of friction": {
      requiredUnits = Get_CoefficientOfFrictionUnits();
      break;
    }
    default: {
      return requiredUnitsArray;
    }
  }

  requiredUnits.forEach((element) => {
    requiredUnitsArray.push(element);
  });

  return requiredUnitsArray;
};

export var Get_Unit_Conversion_Text = function (
  quantitySymbol,
  valueBeforeConversion,
  unitBeforeConversion,
  valueAfterConversion,
  unitAfterConversion
) {
  return `
  ${quantitySymbol} = ${valueBeforeConversion} ${unitBeforeConversion}
  After converting:
  ${quantitySymbol} = ${valueAfterConversion} ${unitAfterConversion}

  `;
};
//Others END

//Capacitance
var Get_CapacitanceUnits = function (returnFactors = false) {
  var prioritizedRanges = [
    "-6:-6",
    "-3:-3",
    "0:0",
    "-9:-9",
    "-12:-12",
    "3:3",
    "6:6",
  ];
  var u = Get_MetricUnits("F", prioritizedRanges);

  if (returnFactors) {
    var u1 = [];
    u.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    u.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_CapacitanceUnits = function (
  valueIn,
  capacitanceUnitIn,
  capacitanceUnitOut
) {
  return Convert_MetricValues(
    valueIn,
    "F",
    capacitanceUnitIn,
    capacitanceUnitOut
  );
};
//Capacitance END

//Voltage
var Get_VoltageUnits = function (returnFactors = false) {
  var prioritizedRanges = [
    "0:0",
    "3:3",
    "-3:-3",
    "6:6",
    "-6:-6",
    "9:9",
    "-9:-9",
    "12:12",
    "-12:-12",
  ];
  var u = Get_MetricUnits("V", prioritizedRanges);

  if (returnFactors) {
    var u1 = [];
    u.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    u.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_VoltageUnits = function (
  valueIn,
  voltageUnitIn,
  voltageUnitOut
) {
  return Convert_MetricValues(valueIn, "V", voltageUnitIn, voltageUnitOut);
};
//Voltage END

//Energy
var Get_EnergyUnits = function (returnFactors = false) {
  var prioritizedRanges = ["0:0", "3:3", "-3:-3", "6:12"];
  var metricEnergyUnits = Get_MetricUnits("J", prioritizedRanges);
  var additionalNonMetricEnergyUnits = {
    kwh: {
      unit: "kWh",
      factor: Math.log10(3.6e6),
    },
    wh: {
      unit: "Wh",
      factor: Math.log10(3.6e3),
    },
    kcal: {
      unit: "kcal",
      factor: Math.log10(4184),
    },
    cal: {
      unit: "cal",
      factor: Math.log10(4.184),
    },
    eV: {
      unit: "eV",
      factor: Math.log10(1.60217656499999993e-19),
    },
    BTU: {
      unit: "BTU",
      factor: Math.log10(1055.05585262),
    },
    therm: {
      unit: "Therm",
      factor: Math.log10(1.054804e8),
    },
    kilotonOfTNT: {
      unit: "kt of TNT",
      factor: Math.log10(4.184e12),
    },
    megatonOfTNT: {
      unit: "Mt of TNT",
      factor: Math.log10(4.184e15),
    },
    gigatonOfTNT: {
      unit: "Gt of TNT",
      factor: Math.log10(4.184e18),
    },
    tonOfTNT: {
      unit: "t of TNT",
      factor: Math.log10(4.184e9),
    },
  };

  var AllUnits = [];

  metricEnergyUnits.forEach((element) => {
    AllUnits.push(element);
  });
  for (var key in additionalNonMetricEnergyUnits) {
    AllUnits.push(additionalNonMetricEnergyUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_EnergyUnits = function (
  valueIn,
  energyUnitIn,
  energyUnitOut
) {
  var energyUnits = Get_EnergyUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  energyUnits.forEach((element) => {
    if (element.unit == energyUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == energyUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Energy END

//Distance
var Get_DistanceUnits = function (returnFactors = false) {
  var prioritizedRanges = ["0:6", "-6:-1"];
  var metricDistanceUnits1 = Get_MetricUnits("m", prioritizedRanges);
  var additionalNonMetricDistanceUnits1 = {
    inch: {
      unit: "''",
      factor: Math.log10(0.0254),
    },
    feet: {
      unit: "'",
      factor: Math.log10(0.3048),
    },
    yard: {
      unit: "yd",
      factor: Math.log10(0.9144),
    },
    mile: {
      unit: "mi",
      factor: Math.log10(1609.344),
    },
    nauticalMile: {
      unit: "NM",
      factor: Math.log10(1852),
    },
  };
  prioritizedRanges = ["-15:-7"];
  var metricDistanceUnits2 = Get_MetricUnits("m", prioritizedRanges);

  var additionalNonMetricDistanceUnits2 = {
    astronomicalUnit: {
      unit: "AU",
      factor: Math.log10(1.495978707e11),
    },
    lightyear: {
      unit: "ly",
      factor: Math.log10(9.460730472581e15),
    },
    parsec: {
      unit: "pc",
      factor: Math.log10(3.08567758131e16),
    },
    thousandLightyears: {
      unit: "k ly",
      factor: Math.log10(9.460730472581e18),
    },
    millionLightyears: {
      unit: "M ly",
      factor: Math.log10(9.460730472581e21),
    },
    billionLightyears: {
      unit: "G ly",
      factor: Math.log10(9.460730472581e24),
    },
  };

  var AllUnits = [];

  metricDistanceUnits1.forEach((element) => {
    AllUnits.push(element);
  });
  for (var key in additionalNonMetricDistanceUnits1) {
    AllUnits.push(additionalNonMetricDistanceUnits1[key]);
  }
  metricDistanceUnits2.forEach((element) => {
    AllUnits.push(element);
  });
  for (var key in additionalNonMetricDistanceUnits2) {
    AllUnits.push(additionalNonMetricDistanceUnits2[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_DistanceUnits = function (
  valueIn,
  distanceUnitIn,
  distanceUnitOut
) {
  var distanceUnits = Get_DistanceUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  distanceUnits.forEach((element) => {
    if (element.unit == distanceUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == distanceUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Distance END

//Spring constant
var Get_SpringConstantUnits = function (returnFactors = false) {
  var springConstantUnits = {
    newtonPerMetre: {
      unit: "N/m",
      factor: Math.log10(1),
    },
    dynePerCentimetre: {
      unit: "dyn/cm",
      factor: Math.log10(1e-3),
    },
    kiloNewtonPerMetre: {
      unit: "kN/m",
      factor: Math.log10(1e3),
    },
    megaNewtonPerMetre: {
      unit: "MN/m",
      factor: Math.log10(1e6),
    },
    gigaNewtonPerMetre: {
      unit: "GN/m",
      factor: Math.log10(1e9),
    },
  };

  var AllUnits = [];

  for (var key in springConstantUnits) {
    AllUnits.push(springConstantUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_SpringConstantUnits = function (
  valueIn,
  springConstantUnitIn,
  springConstantUnitOut
) {
  var springConstantUnits = Get_SpringConstantUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  springConstantUnits.forEach((element) => {
    if (element.unit == springConstantUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == springConstantUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Distance END

//Mass
var Get_MassUnits = function (returnFactors = false) {
  var prioritizedRanges = ["3:3", "0:0", "-3:-3"];
  var metricMassUnits1 = Get_MetricUnits("g", prioritizedRanges);
  var additionalNonMetricMassUnits1 = {
    pound: {
      unit: "lb",
      factor: Math.log10(453.59237),
    },
    ounce: {
      unit: "oz",
      factor: Math.log10(28.349523125),
    },
    tonne: {
      unit: "t",
      factor: 6,
    },
    stone: {
      unit: "st",
      factor: Math.log10(6350.29318),
    },
  };
  prioritizedRanges = ["1:2", "-9:-4", "-2:-1", "-15:-12"];
  var metricMassUnits2 = Get_MetricUnits("g", prioritizedRanges);

  var additionalNonMetricMassUnits2 = {
    kiloTonne: {
      unit: "kt",
      factor: 9,
    },
    megaTonne: {
      unit: "Mt",
      factor: 12,
    },
    gigaTonne: {
      unit: "Gt",
      factor: 15,
    },
    earthMass: {
      unit: "M⊕",
      factor: Math.log10(5.9742e27),
    },
    solarMass: {
      unit: "M☉",
      factor: Math.log10(1.98847e33),
    },
  };

  var AllUnits = [];

  metricMassUnits1.forEach((element) => {
    AllUnits.push(element);
  });
  for (var key in additionalNonMetricMassUnits1) {
    AllUnits.push(additionalNonMetricMassUnits1[key]);
  }
  metricMassUnits2.forEach((element) => {
    AllUnits.push(element);
  });
  for (var key in additionalNonMetricMassUnits2) {
    AllUnits.push(additionalNonMetricMassUnits2[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_MassUnits = function (valueIn, massUnitIn, massUnitOut) {
  var massUnits = Get_MassUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  massUnits.forEach((element) => {
    if (element.unit == massUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == massUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Mass END

//Velocity
var Get_VelocityUnits = function (returnFactors = false) {
  var velocityUnits = {
    metresPerSecond: {
      unit: "m/s",
      factor: 0,
    },
    feetPerSecond: {
      unit: "ft/s",
      factor: Math.log10(0.3048),
    },
    centimetresPerSecond: {
      unit: "cm/s",
      factor: -2,
    },
    kilometresPerHour: {
      unit: "kph",
      factor: Math.log10(5 / 18),
    },
    milesPerHour: {
      unit: "mph",
      factor: Math.log10(0.44704),
    },
    knots: {
      unit: "Knot",
      factor: Math.log10(0.514444444),
    },
    speedOfLight: {
      unit: "c",
      factor: Math.log10(299792458),
    },
  };

  var AllUnits = [];

  for (var key in velocityUnits) {
    AllUnits.push(velocityUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_VelocityUnits = function (
  valueIn,
  velocityUnitIn,
  velocityUnitOut
) {
  var velocityUnits = Get_VelocityUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  velocityUnits.forEach((element) => {
    if (element.unit == velocityUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == velocityUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Velocity END

//Time
var Get_TimeUnits = function (returnFactors = false) {
  var prioritizedRanges = ["0:0", "-12:-2"];
  var metricTimeUnits = Get_MetricUnits("s", prioritizedRanges);
  var additionalNonMetricTimeUnits = {
    mins: {
      unit: "mins",
      factor: Math.log10(60),
    },
    hours: {
      unit: "hrs",
      factor: Math.log10(3600),
    },
    days: {
      unit: "days",
      factor: Math.log10(86400),
    },
    weeks: {
      unit: "wks",
      factor: Math.log10(604800),
    },
    months: {
      unit: "mts",
      factor: Math.log10(31557556 / 12),
    },
    years: {
      unit: "yrs",
      factor: Math.log10(31557556),
    },
    decades: {
      unit: "decs",
      factor: Math.log10(315575560),
    },
    centuries: {
      unit: "cens",
      factor: Math.log10(3155755600),
    },
  };

  var AllUnits = [];

  metricTimeUnits.forEach((element) => {
    AllUnits.push(element);
  });
  for (var key in additionalNonMetricTimeUnits) {
    AllUnits.push(additionalNonMetricTimeUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_TimeUnits = function (valueIn, timeUnitIn, timeUnitOut) {
  var timeUnits = Get_TimeUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  timeUnits.forEach((element) => {
    if (element.unit == timeUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == timeUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Time END

//Acceleration
var Get_AccelerationUnits = function (returnFactors = false) {
  var accelerationUnits = {
    metresPerSecondSquared: {
      unit: "m/s²",
      factor: Math.log10(1),
    },
    feetPerSecondSquared: {
      unit: "ft/s²",
      factor: Math.log10(0.3048),
    },
    g: {
      unit: "g",
      factor: Math.log10(9.80665),
    },
  };

  var AllUnits = [];

  for (var key in accelerationUnits) {
    AllUnits.push(accelerationUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_AccelerationUnits = function (
  valueIn,
  accelerationUnitIn,
  accelerationUnitOut
) {
  var accelerationUnits = Get_AccelerationUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  accelerationUnits.forEach((element) => {
    if (element.unit == accelerationUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == accelerationUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Acceleration END

//Volume
var Get_VolumeUnits = function (returnFactors = false) {
  var volumeUnits = {
    cubicMetres: {
      unit: "m³",
      factor: 0,
    },
    litres: {
      unit: "l",
      factor: -3,
    },
    gallons: {
      unit: "gal",
      factor: Math.log10(0.003785411784),
    },
    cubicFeet: {
      unit: "cu ft",
      factor: Math.log10(0.02831684659),
    },
    milliitres: {
      unit: "ml",
      factor: -6,
    },
    microlitres: {
      unit: "ul",
      factor: -9,
    },
    nanolitres: {
      unit: "nl",
      factor: -12,
    },
    cubicInch: {
      unit: "cu in",
      factor: Math.log10(1.6387064e-5),
    },
  };

  var AllUnits = [];

  for (var key in volumeUnits) {
    AllUnits.push(volumeUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_VolumeUnits = function (
  valueIn,
  volumeUnitIn,
  volumeUnitOut
) {
  var volumeUnits = Get_VolumeUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  volumeUnits.forEach((element) => {
    if (element.unit == volumeUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == volumeUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Volume END

//Pressure
var Get_PressureUnits = function (returnFactors = false) {
  var pressureUnits = {
    pascal: {
      unit: "Pa",
      factor: 0,
    },
    bar: {
      unit: "bar",
      factor: 5,
    },
    standardAtmosphere: {
      unit: "atm",
      factor: Math.log10(101325),
    },
    poundsPerSquareInch: {
      unit: "psi",
      factor: Math.log10(6894.75729299999949),
    },
    torr: {
      unit: "Torr",
      factor: Math.log10(133.3223684),
    },
    technicalAtmosphere: {
      unit: "at",
      factor: Math.log10(98066.5),
    },
  };

  var AllUnits = [];

  for (var key in pressureUnits) {
    AllUnits.push(pressureUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_PressureUnits = function (
  valueIn,
  pressureUnitIn,
  pressureUnitOut
) {
  var pressureUnits = Get_PressureUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  pressureUnits.forEach((element) => {
    if (element.unit == pressureUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == pressureUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Pressure END

//Temperature
var Get_TemperatureUnits = function (returnFactors = false) {
  var temperatureUnits = {
    kelvin: {
      unit: "K",
    },
    degreesCelsius: {
      unit: "°C",
    },
    degreesFahrenheit: {
      unit: "°F",
    },
    degreesRankine: {
      unit: "°Ra",
    },
    degreesReaumur: {
      unit: "°Re",
    },
  };

  var AllUnits = [];

  for (var key in temperatureUnits) {
    AllUnits.push(temperatureUnits[key]);
  }

  var u1 = [];
  AllUnits.forEach((element) => {
    u1.push(element.unit);
  });
  return u1;
};

var Any_To_kelvin = function (temperatureValueIn, temperatureUnitIn) {
  temperatureValueIn = parseFloat(temperatureValueIn);
  if (temperatureUnitIn == "°C") {
    return temperatureValueIn + 273.15;
  } else if (temperatureUnitIn == "°F") {
    return (temperatureValueIn - 32) * (5 / 9) + 273.15;
  } else if (temperatureUnitIn == "°Ra") {
    return temperatureValueIn / 1.8;
  } else if (temperatureUnitIn == "°Re") {
    return temperatureValueIn * 1.25 + 273.15;
  } else {
    return temperatureValueIn;
  }
};

var kelvin_To_Any = function (temperatureValueIn, temperatureUnitOut) {
  temperatureValueIn = parseFloat(temperatureValueIn);
  if (temperatureUnitOut == "°C") {
    return temperatureValueIn - 273.15;
  } else if (temperatureUnitOut == "°F") {
    return (temperatureValueIn - 273.15) * 1.8 + 32;
  } else if (temperatureUnitOut == "°Ra") {
    return temperatureValueIn * 1.8;
  } else if (temperatureUnitOut == "°Re") {
    return (temperatureValueIn - 273.15) * 0.8;
  } else {
    return temperatureValueIn;
  }
};

export var Convert_TemperatureUnits = function (
  valueIn,
  temperatureUnitIn,
  temperatureUnitOut
) {
  return kelvin_To_Any(
    Any_To_kelvin(valueIn, temperatureUnitIn),
    temperatureUnitOut
  );
};
//Temperature END

//Resistance
var Get_ResistanceUnits = function (returnFactors = false) {
  var prioritizedRanges = ["0:0", "3:6", "-3:-3", "-6:-6", "7:9"];
  var metricResistanceUnits = Get_MetricUnits("Ω", prioritizedRanges);

  var AllUnits = [];

  for (var key in metricResistanceUnits) {
    AllUnits.push(metricResistanceUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_ResistanceUnits = function (
  valueIn,
  resistanceUnitIn,
  resistanceUnitOut
) {
  var resistanceUnits = Get_ResistanceUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  resistanceUnits.forEach((element) => {
    if (element.unit == resistanceUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == resistanceUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Resistance END

//Charge
var Get_ChargeUnits = function (returnFactors = false) {
  var chargeUnits = {
    coulomb: {
      unit: "C",
      factor: 0,
    },
    ampHour: {
      unit: "Ah",
      factor: Math.log10(3600),
    },
    electronCharge: {
      unit: "e",
      factor: Math.log10(1.602176487000000083e-19),
    },
    milliAmpHour: {
      unit: "mAh",
      factor: Math.log10(3.6),
    },
    statCoulomb: {
      unit: "statC",
      factor: Math.log10(3.335646048e-10),
    },
    milliCoulomb: {
      unit: "mC",
      factor: -3,
    },
    kiloCoulomb: {
      unit: "kC",
      factor: 3,
    },
    microCoulomb: {
      unit: "uC",
      factor: -6,
    },
    megaCoulomb: {
      unit: "MC",
      factor: 6,
    },
    nanoCoulomb: {
      unit: "nC",
      factor: -9,
    },
    gigaCoulomb: {
      unit: "GC",
      factor: 9,
    },
    picoCoulomb: {
      unit: "pC",
      factor: -12,
    },
    teraCoulomb: {
      unit: "TC",
      factor: 12,
    },
  };

  var AllUnits = [];

  for (var key in chargeUnits) {
    AllUnits.push(chargeUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_ChargeUnits = function (
  valueIn,
  chargeUnitIn,
  chargeUnitOut
) {
  var chargeUnits = Get_ChargeUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  chargeUnits.forEach((element) => {
    if (element.unit == chargeUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == chargeUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Charge END

//MagneticField
var Get_MagneticFieldUnits = function (returnFactors = false) {
  var magneticFieldUnits = {
    tesla: {
      unit: "T",
      factor: 0,
    },
    gauss: {
      unit: "Gs",
      factor: -4,
    },
    /*
    oersted: {
      unit: "Oe",
      factor: Math.log10(1.602176487000000083e-19),
    },
    */
  };

  var AllUnits = [];

  for (var key in magneticFieldUnits) {
    AllUnits.push(magneticFieldUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_MagneticFieldUnits = function (
  valueIn,
  magneticFieldUnitIn,
  magneticFieldUnitOut
) {
  var magneticFieldUnits = Get_MagneticFieldUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  magneticFieldUnits.forEach((element) => {
    if (element.unit == magneticFieldUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == magneticFieldUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//MagneticField END

//Area
var Get_AreaUnits = function (returnFactors = false) {
  var areaUnits = {
    squareMetre: {
      unit: "m²",
      factor: 0,
    },
    squareFoot: {
      unit: "ft²",
      factor: Math.log10(0.09290304000000002),
    },
    squareYard: {
      unit: "yd²",
      factor: Math.log10(0.8361273600000001),
    },
    squareCentimetre: {
      unit: "cm²",
      factor: -4,
    },
    squareMillimetre: {
      unit: "mm²",
      factor: -6,
    },
    squareInch: {
      unit: "in²",
      factor: Math.log10(0.0006451612903225808),
    },
    acre: {
      unit: "ac",
      factor: Math.log10(4046.856422399999),
    },
    hectare: {
      unit: "ha",
      factor: 4,
    },
    squareKilometre: {
      unit: "km²",
      factor: 6,
    },
    squareMile: {
      unit: "mi²",
      factor: Math.log10(2589988.1103360015),
    },
    barn: {
      unit: "barn",
      factor: -28,
    },
    squareMicrometre: {
      unit: "um²",
      factor: -12,
    },
    squareNanometre: {
      unit: "nm²",
      factor: -18,
    },
    squarePicometre: {
      unit: "pm²",
      factor: -24,
    },
  };

  var AllUnits = [];

  for (var key in areaUnits) {
    AllUnits.push(areaUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_AreaUnits = function (valueIn, areaUnitIn, areaUnitOut) {
  var areaUnits = Get_AreaUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  areaUnits.forEach((element) => {
    if (element.unit == areaUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == areaUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Area END

//Thermal Conductivity
var Get_ThermalConductivityUnits = function (returnFactors = false) {
  var thermalConductivityUnits = {
    wattsPerMetreKelvin: {
      unit: "W/(m.K)",
      factor: 0,
    },
    kilowattsPerMetreKelvin: {
      unit: "kW/(m.K)",
      factor: 3,
    },
    /*
    caloriesPerMetreKelvin: {
      unit: "W/(m.K)",
      factor: 0,
    },
    kilocaloriesPerMetreKelvin: {
      unit: "W/(m.K)",
      factor: 0,
    },
    */
    wattsPerCentimetreKelvin: {
      unit: "W/(cm.K)",
      factor: 2,
    },
    btuiPerHourFootDegreesFarenheit: {
      unit: "BTUI/(h.ft.°F)",
      factor: Math.log10(1.730734666371),
    },
  };

  var AllUnits = [];

  for (var key in thermalConductivityUnits) {
    AllUnits.push(thermalConductivityUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_ThermalConductivityUnits = function (
  valueIn,
  thermalConductivityIn,
  thermalConductivityOut
) {
  var thermalConductivitys = Get_ThermalConductivityUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  thermalConductivitys.forEach((element) => {
    if (element.unit == thermalConductivityIn) {
      factorIn = element.factor;
    }
    if (element.unit == thermalConductivityOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Thermal Conductivity END

//Power
var Get_PowerUnits = function (returnFactors = false) {
  var powerUnits = {
    watt: {
      unit: "W",
      factor: 0,
    },
    kilowatt: {
      unit: "kW",
      factor: 3,
    },
    milliwatt: {
      unit: "mW",
      factor: -3,
    },
    brakeHorsepower: {
      unit: "bhp",
      factor: Math.log10(745.69987158227),
    },
    horsepower: {
      unit: "bhp",
      factor: Math.log10(735.49875),
    },
    boilerHorsepower: {
      unit: "hp(S)",
      factor: Math.log10(9812.5),
    },
    megawatt: {
      unit: "MW",
      factor: 6,
    },
    microwatt: {
      unit: "uW",
      factor: -6,
    },
    calPerSecond: {
      unit: "cal/s",
      factor: Math.log10(4.1868),
    },
    kcalPerSecond: {
      unit: "kcal/s",
      factor: Math.log10(4186.8),
    },
    btuPerSecond: {
      unit: "BTU/s",
      factor: Math.log10(1055.05585262),
    },
    gigawatt: {
      unit: "GW",
      factor: 9,
    },
    nanowatt: {
      unit: "nW",
      factor: -9,
    },
    terawatt: {
      unit: "TW",
      factor: 12,
    },
    picowatt: {
      unit: "pW",
      factor: -12,
    },
    calPerMinute: {
      unit: "cal/min",
      factor: Math.log10(0.06978),
    },
    kcalPerMinute: {
      unit: "kcal/min",
      factor: Math.log10(69.78),
    },
    btuPerMinute: {
      unit: "BTU/min",
      factor: Math.log10(17.584264210333),
    },
    calPerHour: {
      unit: "cal/hr",
      factor: Math.log10(0.001163),
    },
    kcalPerHour: {
      unit: "kcal/hr",
      factor: Math.log10(1.163),
    },
    btuPerHour: {
      unit: "BTU/hr ",
      factor: Math.log10(0.29307107017222),
    },
  };

  var AllUnits = [];

  for (var key in powerUnits) {
    AllUnits.push(powerUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_PowerUnits = function (valueIn, powerIn, powerOut) {
  var powers = Get_PowerUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  powers.forEach((element) => {
    if (element.unit == powerIn) {
      factorIn = element.factor;
    }
    if (element.unit == powerOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Power END

//CoulombsConstant
var Get_CoulombsConstantUnits = function (returnFactors = false) {
  var coulombsConstantUnits = {
    newton_MetreSquared_By_CoulombSquared: {
      unit: "N·m²/C²",
      factor: 0,
    },
    electronVolt_Armstrong_By_ElementaryChargeSquared: {
      unit: "eV·Å/e²",
      factor: Math.log10(8.9875517923e9 / 14.3996),
    },
    Newton_SecondSquared_SpeedOfLightSquared_By_CoulombSquared: {
      unit: "N·s².c²/C²",
      factor: Math.log10(8.9875517923e9 / 1e-7),
    },
  };

  var AllUnits = [];

  for (var key in coulombsConstantUnits) {
    AllUnits.push(coulombsConstantUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_CoulombsConstantUnits = function (
  valueIn,
  coulombsConstantUnitIn,
  coulombsConstantUnitOut
) {
  var coulombsConstantUnits = Get_CoulombsConstantUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  coulombsConstantUnits.forEach((element) => {
    if (element.unit == coulombsConstantUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == coulombsConstantUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//CoulombsConstant END

//Permittivity
var Get_PermittivityUnits = function (returnFactors = false) {
  var permittivityUnits = {
    farad_Per_Metre: {
      unit: "F/m",
      factor: 0,
    },
  };

  var AllUnits = [];

  for (var key in permittivityUnits) {
    AllUnits.push(permittivityUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_PermittivityUnits = function (
  valueIn,
  permittivityUnitIn,
  permittivityUnitOut
) {
  return valueIn;

  var permittivityUnits = Get_PermittivityUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  permittivityUnits.forEach((element) => {
    if (element.unit == permittivityUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == permittivityUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Permittivity END

//DipoleMoment
var Get_DipoleMomentUnits = function (returnFactors = false) {
  var dipoleMomentUnits = {
    Coulomb_Metre: {
      unit: "C.m",
      factor: 0,
    },
    Debye: {
      unit: "D",
      factor: Math.log10(1 / 299792458178090000000000000000),
    },
    milliCoulomb_Metre: {
      unit: "mC.m",
      factor: -3,
    },
    microCoulomb_Metre: {
      unit: "uC.m",
      factor: -6,
    },
    nanoCoulomb_Metre: {
      unit: "nC.m",
      factor: -9,
    },
    picoCoulomb_Metre: {
      unit: "pC.m",
      factor: -12,
    },
    kiloDebye: {
      unit: "kD",
      factor: 3 + Math.log10(1 / 299792458178090000000000000000),
    },
    megaDebye: {
      unit: "MD",
      factor: 6 + Math.log10(1 / 299792458178090000000000000000),
    },
    gigaDebye: {
      unit: "GD",
      factor: 9 + Math.log10(1 / 299792458178090000000000000000),
    },
    teraDebye: {
      unit: "TD",
      factor: 12 + Math.log10(1 / 299792458178090000000000000000),
    },
  };

  var AllUnits = [];

  for (var key in dipoleMomentUnits) {
    AllUnits.push(dipoleMomentUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_DipoleMomentUnits = function (
  valueIn,
  dipoleMomentUnitIn,
  dipoleMomentUnitOut
) {
  var dipoleMomentUnits = Get_DipoleMomentUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  dipoleMomentUnits.forEach((element) => {
    if (element.unit == dipoleMomentUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == dipoleMomentUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//DipoleMoment END

//Force
var Get_ForceUnits = function (returnFactors = false) {
  var forceUnits = {
    Newton: {
      unit: "N",
      factor: 0,
    },
    Dyne: {
      unit: "dyn",
      factor: -5,
    },
    kilogramForce: {
      unit: "kgf",
      factor: Math.log10(9.80665),
    },
    poundForce: {
      unit: "lbf",
      factor: Math.log10(4.448222),
    },
    gramForce: {
      unit: "gf",
      factor: Math.log10(9.80665) - 3,
    },
    poundal: {
      unit: "pdl",
      factor: Math.log10(0.138255),
    },
    kiloNewton: {
      unit: "kN",
      factor: 3,
    },
    milliNewton: {
      unit: "mN",
      factor: -3,
    },
    megaNewton: {
      unit: "MN",
      factor: 6,
    },
    microNewton: {
      unit: "uN",
      factor: -6,
    },
    gigaNewton: {
      unit: "GN",
      factor: 9,
    },
    nanoNewton: {
      unit: "nN",
      factor: -9,
    },
    teraNewton: {
      unit: "TN",
      factor: 12,
    },
    picoNewton: {
      unit: "pN",
      factor: -12,
    },
  };

  var AllUnits = [];

  for (var key in forceUnits) {
    AllUnits.push(forceUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_ForceUnits = function (valueIn, forceUnitIn, forceUnitOut) {
  var forceUnits = Get_ForceUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  forceUnits.forEach((element) => {
    if (element.unit == forceUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == forceUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Force END

//Universal gravitational constant
var Get_UniversalGravitationalConstantUnits = function (returnFactors = false) {
  var universalGravitationalConstantUnits = {
    Newton: {
      unit: "m³/(kg.s²)",
      factor: 0,
    },
  };

  var AllUnits = [];

  for (var key in universalGravitationalConstantUnits) {
    AllUnits.push(universalGravitationalConstantUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

/*
export var Convert_ForceUnits = function (valueIn, forceUnitIn, forceUnitOut) {
  var forceUnits = Get_ForceUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  forceUnits.forEach((element) => {
    if (element.unit == forceUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == forceUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
*/
//Universal gravitational constant END

//CoefficientOfFriction
var Get_CoefficientOfFrictionUnits = function (returnFactors = false) {
  var coefficientOfFrictionUnits = {
    NewtonPerNewton: {
      unit: "N/N",
      factor: 0,
    },
  };

  var AllUnits = [];

  for (var key in coefficientOfFrictionUnits) {
    AllUnits.push(coefficientOfFrictionUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};
//CoefficientOfFriction END

//Torque
var Get_TorqueUnits = function (returnFactors = false) {
  var torqueUnits = {
    Newton_Metre: {
      unit: "N.m",
      factor: 0,
    },
    Pound_Feet: {
      unit: "lb.ft",
      factor: Math.log10(1.35581794829999976),
    },
    Pound_Inches: {
      unit: "lb.in",
      factor: Math.log10(0.11298482933),
    },
  };

  var AllUnits = [];

  for (var key in torqueUnits) {
    AllUnits.push(torqueUnits[key]);
  }

  if (returnFactors) {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push({
        unit: element.unit,
        factor: element.factor,
      });
    });
    return u1;
  } else {
    var u1 = [];
    AllUnits.forEach((element) => {
      u1.push(element.unit);
    });
    return u1;
  }
};

export var Convert_TorqueUnits = function (
  valueIn,
  torqueUnitIn,
  torqueUnitOut
) {
  var torqueUnits = Get_TorqueUnits(true);
  var factorIn = 0;
  var factorOut = 0;

  torqueUnits.forEach((element) => {
    if (element.unit == torqueUnitIn) {
      factorIn = element.factor;
    }
    if (element.unit == torqueUnitOut) {
      factorOut = element.factor;
    }
  });

  return ConvertUnitsUsingFactors(valueIn, factorIn, factorOut);
};
//Torque END
