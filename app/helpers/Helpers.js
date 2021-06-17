//FORMAT: IsValidNumber, OutputValue, IsEmpty, IsNegative, IsInteger
export var Format_Numeric_Input_Value = function (inputValue) {
  var IsValidNumber = false;
  var OutputValue = "";
  var IsEmpty = true;
  var IsNegative = false;
  var IsInteger = false;

  inputValue = inputValue.toString();

  //console.log(`Input value = ${inputValue}        Length = ${inputValue.length}`);

  IsEmpty = inputValue == "" || inputValue == "NaN";

  if (inputValue[0] == "+") {
    inputValue = inputValue.slice(1, inputValue.length);
  }
  if (inputValue[0] == "-") {
    inputValue = inputValue.slice(1, inputValue.length);
    IsNegative = true;
  }

  var vals = inputValue.split(".");

  //A decimal point exists
  if (vals.length == 2) {
    //Nothing after the decimal point
    if (vals[0] != "" && vals[1] == "") {
      //Check before value
      if (/^\d+$/.test(vals[0])) {
        OutputValue = inputValue;
        IsValidNumber = true;
      } else {
        IsValidNumber = false;
      }
    }
    //Nothing before the decimal point
    else if (vals[0] == "" && vals[1] != "") {
      //Check after value
      if (/^\d+$/.test(vals[1])) {
        OutputValue = inputValue;
        OutputValue = "0" + OutputValue;
        IsValidNumber = true;
      } else {
        IsValidNumber = false;
      }
    }
    //Nothing before or after the decimal point
    else if (vals[0] == "" && vals[1] == "") {
      OutputValue = "0.";
      IsValidNumber = true;
    }
    //Things before and after the decimal point
    else {
      //Check before and after values
      if (/^\d+$/.test(vals[0]) && /^\d+$/.test(vals[1])) {
        OutputValue = inputValue;
        IsValidNumber = true;
      } else {
        IsValidNumber = false;
      }
    }
  }
  //No decimal point exists
  else {
    //Valid number
    if (/^\d+$/.test(inputValue)) {
      OutputValue = inputValue;
      IsValidNumber = true;
    }
    //Empty
    else if (inputValue.length == 0) {
      OutputValue = inputValue;
      IsValidNumber = true;
    }
    //Invalid
    else {
      IsValidNumber = false;
    }
  }
  //Adding "-" sign which was removed earlier
  if (IsNegative) {
    OutputValue = "-" + OutputValue;
  }

  IsInteger = (OutputValue.match(/\./g) || []).length == 0;

  return [IsValidNumber, OutputValue, IsEmpty, IsNegative, IsInteger];
};

export var IsNonNegative = function (x) {
  return x >= 0;
};

export var IsPositive = function (x) {
  return x > 0;
};

export var IsNonZero = function (x) {
  return x != 0;
};

export var IsInteger = function (x) {
  return [parseInt(x) == parseFloat(x), parseInt(x)];
};
