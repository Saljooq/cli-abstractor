"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _io = require("./io.js");

async function updatePackageJson() {
  console.log("We will begin upgrading 'bin', 'type' and 'main' -- this is needed to make this CLI functional");
  const packageRawContent = await (0, _io.readFile)('./package.json');
  const packageContent = JSON.parse(packageRawContent);
  packageContent['main'] = "./cli-abstractor-store/index.js";
  packageContent['type'] = "module";
  packageContent['bin'] = "./cli-abstractor-store/index.js";

  if (!('scripts' in packageContent)) {
    packageContent['scripts'] = {};
  }

  packageContent['scripts']['start'] = "node .";
  packageContent['scripts']['absorb'] = "node ./cli-abstractor-store/absorb.js";
  const finalOutput = JSON.stringify(packageContent, null, 2);
  (0, _io.fileWriter)('package.json', finalOutput);
}

var _default = updatePackageJson;
exports.default = _default;