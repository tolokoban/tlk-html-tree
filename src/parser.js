'use strict';

var Tree = require("../index.js");
var StateMachine = require("tlk-state-machine");

function pushText() {
  var cursor = this.vars.cursor || 0;
  var text = this.source.substr(cursor, this.index - cursor);
  console.log('"" + text + '"');
}

var rules = {
  TEXT: [
    ["<", "OPEN_TAG", pushText]
  ]
};



module.exports = function(source) {
  return {
    node: Tree.TEXT,
    text: source
  };
};