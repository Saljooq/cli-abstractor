"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ingest = void 0;

var _regex = require("./regex.js");

const ingest = (fileContent, mappings) => {
  let data = fileContent;

  for (let i of Object.keys(mappings)) {
    const res = mappings[i];
    const st = _regex.openingSequence + '\\s*' + i + '\\s*' + _regex.closingSquence;
    data = data.replace(new RegExp(st, 'g'), res);
  }

  return data;
};

exports.ingest = ingest;