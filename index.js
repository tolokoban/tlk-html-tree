'use strict';

var Parser = require("./src/parser");


exports.VOID = 0;
exports.TAG = 1;
exports.TEXT = 2;
exports.COMMENT = 3;
exports.DIRECTIVE = 4;


exports.parseString = function(source) {
  return Parser(source);
};
