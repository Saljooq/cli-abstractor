"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForEndUser = exports.isProjectCreator = void 0;

// This should only be true for me
// since my repo will be executed
// and it needs to touch the package.json
// REMEMBER to mark this false when absorbing
const isProjectCreator = () => {
  return true;
};

exports.isProjectCreator = isProjectCreator;

const useForEndUser = () => {
  return true;
};

exports.useForEndUser = useForEndUser;