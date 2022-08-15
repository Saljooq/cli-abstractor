"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileAndFoldersToIgnore = void 0;

var _globalVariables = require("./globalVariables.js");

var _io = require("./io.js");

/**
 * This function is used to get the list of string that will be
 * use to ignore files and folders in store. It should return empty array 
 * if no .cli-ignore exists otherwise an array of string of files and folders to ignore
 * 
 * @returns Array of String
 */
const getFileAndFoldersToIgnore = async () => {
  const content_of_ignore_file = await (0, _io.readFile)('./.cli-ignore');

  if (content_of_ignore_file !== null) {
    if (!(0, _globalVariables.isProjectCreator)()) {
      return content_of_ignore_file.split("\n").map(x => x.trimEnd('\r')).filter(x => x !== '');
    } else {
      return content_of_ignore_file.split("\n").map(x => x.trimEnd('\r')).filter(x => x !== '').filter(x => x !== 'cli-abstractor-store');
    }
  }

  return [];
};

exports.getFileAndFoldersToIgnore = getFileAndFoldersToIgnore;