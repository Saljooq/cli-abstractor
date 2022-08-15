#!/usr/bin/env node
"use strict";

var _prompt = require("./prompt.js");

var _io = require("./io.js");

var _getFilesAndToBeStored = require("./getFilesAndToBeStored.js");

var _getFileAndFoldersToIgnore = require("./getFileAndFoldersToIgnore.js");

var _globalVariables = require("./globalVariables.js");

var _store = _interopRequireDefault(require("./store.js"));

var _updatePackageJson = _interopRequireDefault(require("./updatePackageJson.js"));

var _ingest = require("./ingest.js");

var _logger = _interopRequireDefault(require("./logger.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This will be running on the end user's computers
async function main() {
  const logger = (0, _logger.default)();

  if ((0, _globalVariables.isProjectCreator)()) {
    (0, _updatePackageJson.default)();
  }

  const availableFlags = _store.default ? _store.default.content.map(x => x.flag) : [];
  var inFlag;

  if (availableFlags.length === 0) {
    console.log(logger.warning('no flags found. Ending program.'));
    return;
  } else if (availableFlags.length === 1) {
    console.log(logger.important(`only one flag available -> ${availableFlags[0]}\nProcessing it by default....`));
    inFlag = availableFlags[0];
  } else {
    console.log(logger.important(`Available flags: ${availableFlags}`)); // check for flag

    inFlag = await (0, _prompt.askForVar)('flag');
    inFlag = inFlag === '' ? 'default' : inFlag;
  }

  const dataSelected = _store.default ? _store.default.content.filter(x => x.flag === inFlag) : [];

  if (dataSelected.length === 0) {
    console.log(`nothing matching the flag found. Available flags: ${availableFlags}`);
  } else {
    // There shouldn't be more than one modules matching the same flag
    const selectedModule = dataSelected[0]; // Here we create a map of all the prompt results from the user

    let userDefinedMapping = {};

    for (let unknown of selectedModule.mapping) {
      userDefinedMapping[unknown] = await await (0, _prompt.askForVar)(unknown);
    }

    for (let file of selectedModule.content) {
      console.log(`+ creating/writing to file ${file.name}`);
      let contentToPrint = (0, _ingest.ingest)(file.content, userDefinedMapping);
      await (0, _io.fileWriter)(file.name, contentToPrint);
    }
  }
}

main();