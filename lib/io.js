"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeToStore = exports.storeJsonCreator = exports.readFile = exports.fileWriter = void 0;

var _util = require("util");

var _regex = require("./regex.js");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _store = _interopRequireDefault(require("./store.js"));

var _globalVariables = require("./globalVariables.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This should get the content of the file as String from a filenamesfread
 * 
 * @param {String} fileName 
 * @returns 
 */
const readFile = async fileName => {
  try {
    const readFile = (0, _util.promisify)(_fs.default.readFile);
    const data_out = await readFile(fileName, 'utf8');
    return data_out;
  } catch (e) {
    // console.log(e)
    return null;
  }
};
/**
 * General purpose function, takes the filename and the string to be written to it
 * 
 * @param {String} fileName 
 * @param {String} content 
 */


exports.readFile = readFile;

const fileWriter = async (fileName, content) => {

  const isExists = async path => {
    return new Promise(resolve => {
      _fs.default.access(path, _fs.default.constants.F_OK, err => {
        if (err) {
          return resolve(false);
        } else {
          return resolve(true);
        }
      });
    });
  };
  
  const errorLog = custom_string => {
    return err => {
      if (err) {
        console.log(`Error writing to the ${custom_string}. Name : ${fileName}: ${err}`);
      }
    };
  };

  try {

    // console.log('here')
    const dirname = _path.default.dirname(fileName);
    // console.log('here--')
    const exist = await isExists(dirname);

    // console.log(`exits = ${exist}`)

    if (!exist) {
      await _fs.default.mkdirSync(dirname, {
        recursive: true
      }, errorLog('directory'));
    }

    await _fs.default.writeFile(fileName, content, errorLog('file'));
  } catch (err) {
    console.log(`Error writing to file ${fileName}: ${err}`);
  }
};
/**
 * This should take a JSON and save a stringized version on it in store.js
 * 
 * @param {JSON} value 
 */


exports.fileWriter = fileWriter;

const writeToStore = value => {
  var updatedValue;
  let local_data = _store.default;

  if (local_data !== null) {
    local_data.content = local_data.content.filter(x => x.flag !== value.content[0].flag);
    local_data.content.push(value.content[0]);
    updatedValue = local_data;
  } else {
    updatedValue = value;
  }

  const content = JSON.stringify(updatedValue, null, 4);
  const to_be_printed = `const data = ${content}\n\nexport default data;`; // To be used for all content in sotre

  const fileName = `./cli-abstractor-store/store.js`;
  fileWriter(fileName, to_be_printed);
};
/**
 * This is a general purpose function to be used for creating the json
 * and objects to be used for the store
 * 
 * @param content Array of dictionaries with name and content keys for all the files
 */


exports.writeToStore = writeToStore;

const storeJsonCreator = (flag, content) => {
  var inputs = new Set();
  let local_content = treatForCreator(content);

  for (let files of local_content) {
    let newMatch = (0, _regex.regexScan)(files["content"]);
    newMatch.length > 0 && newMatch.forEach(x => inputs.add(x)); // console.log([...inputs])
  }

  const output = {
    projectName: "",
    description: "",
    content: [{
      flag: flag,
      content: local_content,
      mapping: [...inputs]
    }]
  };
  return output;
};
/**
 * This method helps make sure the content is treated for creator repo - since
 * the store.js for intance need to have null as data - or isCreator boolean should 
 * be false - always
 * 
 * @param {} content 
 * @returns 
 */


exports.storeJsonCreator = storeJsonCreator;

const treatForCreator = content => {
  let local_content = content;

  if ((0, _globalVariables.isProjectCreator)()) {
    let new_local_content = [];

    for (let file of local_content) {
      if (file.name === './cli-abstractor-store/store.js') {
        file.content = "const data = null\n\nexport default data;";
      } else if (file.name === './cli-abstractor-store/globalVariables.js') {
        file.content = "// This should only be true for me\n// since my repo will be executed\n// and it needs to touch the package.json\n// REMEMBER to mark this false when absorbing\nexport const isProjectCreator = () => {\n    return false\n}\n\n\nexport const useForEndUser = () => {\n    return false\n}\n";
      }

      new_local_content.push(file);
    }

    local_content = new_local_content;
  }

  return local_content;
};