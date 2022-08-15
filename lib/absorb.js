"use strict";

var _io = require("./io.js");

var _getFilesAndToBeStored = require("./getFilesAndToBeStored.js");

var _getFileAndFoldersToIgnore = require("./getFileAndFoldersToIgnore.js");

var _globalVariables = require("./globalVariables.js");

var _prompt = require("./prompt.js");

var _store = _interopRequireDefault(require("./store.js"));

var _logger = _interopRequireDefault(require("./logger.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main() {
  const listOfFilesToIgnore = await (0, _getFileAndFoldersToIgnore.getFileAndFoldersToIgnore)();
  !(0, _globalVariables.isProjectCreator)() && listOfFilesToIgnore.push('.cli-ignore');
  const listOfFilesToStore = (0, _getFilesAndToBeStored.getFileAndFoldersToBeStored)(listOfFilesToIgnore);
  console.log("Here is the list of files that would be added");
  console.log(listOfFilesToStore);
  console.log("Do you want to continue");
  var answer = await (0, _prompt.askForVar)("answer");

  if (answer !== 'yes' && answer !== 'y') {
    return;
  }

  var in_flag = await (0, _prompt.askForVar)("Flag");
  in_flag = in_flag === '' ? 'default' : in_flag;
  const availableFlags = _store.default ? _store.default.content.map(x => x.flag) : [];

  if (availableFlags.includes(in_flag)) {
    console.log(`There appears to be a conflict. Existing flags: ${availableFlags}` + '\nAre you sure you want to overwrite existing files? - check cli-abstractor-store/store.js');
    console.log("Do you want to continue");
    var answer = await (0, _prompt.askForVar)("answer");

    if (answer !== 'yes' && answer !== 'y') {
      return;
    }
  }

  const list_of_files_and_content = [];
  const logger = (0, _logger.default)();
  console.log(logger.important(`INITIATING ABSORPTION UNDER FLAG -> ${in_flag}\n`));

  for (let fileName of listOfFilesToStore) {
    const content_of_file = await (0, _io.readFile)(fileName); // console.log(content_of_file);

    console.log(logger.important(`+ absorbing -> ${fileName}`));
    let new_file_content = {};
    new_file_content['name'] = fileName;
    new_file_content['content'] = content_of_file;
    list_of_files_and_content.push(new_file_content);
  }

  const test_for_file = (0, _io.storeJsonCreator)(in_flag, list_of_files_and_content);
  (0, _io.writeToStore)(test_for_file);
}

main();