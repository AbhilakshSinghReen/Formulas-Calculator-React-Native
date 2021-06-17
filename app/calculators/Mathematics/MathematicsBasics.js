export var roundWithPrecision = function (num, precision) {
  var multiplier = Math.pow(10, precision);
  return Math.round(num * multiplier) / multiplier;
};

export var lazy_RoundLongFloatTo10Places = function (num) {
  if (Math.abs(num) < Math.pow(10, 10) && Math.abs(num) > Math.pow(10, -8)) {
    num = num.toFixed(10);
  }
  return num;
};
