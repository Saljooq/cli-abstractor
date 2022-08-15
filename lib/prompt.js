"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askForVar = void 0;

var _readline = _interopRequireDefault(require("readline"));

var _logger = _interopRequireDefault(require("./logger.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simplifies the task of asking the user for an input - without libraries
 * 
 * @param {String} varName 
 * @returns 
 */
const askForVar = async varName => {
  const reader = _readline.default.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const AsyncReader = async query => {
    return new Promise(resolve => {
      reader.question(query, answer => {
        reader.close();
        return resolve(answer);
      });
    });
  };

  const logger = (0, _logger.default)();
  const outData = await AsyncReader(logger.prompt(`What's the ${varName}?        `));
  return outData;
};

exports.askForVar = askForVar;