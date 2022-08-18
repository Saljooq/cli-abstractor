"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexScan = exports.openingSequence = exports.closingSquence = void 0;
const closingSquence = '}}';
exports.closingSquence = closingSquence;
const openingSequence = '{{';
exports.openingSequence = openingSequence;

const regexScan = content => {
  // Essentially we're asking for matches with starting
  // and ending jinja brackets without middle part
  var regex = openingSequence + '[^' + openingSequence + ']*' + closingSquence;
  const found = [...content.matchAll(regex)];

  const excludeBrack = s => {
    return s.substr(2, s.length - 4).trim();
  };

  const allInputsWithRepeat = found.map(x => excludeBrack(x[0]));
  const allInput = new Set(allInputsWithRepeat);
  const finalRes = [...allInput]; // console.log(finalRes)

  return finalRes;
}; // test - comment out below to test
// const text = "#include <stdio.h>\nint main()\n{\n    // printf() displays the string inside quotation\n    printf(\"{{Hello}}, World! Welcome to the new {{World}}, let's see if this works {{Hello  }}\");\n    return 0;\n}"
// console.log(regexScan(text))


exports.regexScan = regexScan;