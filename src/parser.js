'use strict';

var Tree = require("../index.js");
var StateMachine = require("tlk-state-machine");

function pushText() {
  var cursor = this.vars.cursor || 0;
  var text = this.source.substr(cursor, this.index - cursor);
  this.vars.nodes.push(
    {
      node: Tree.TEXT,
      text: text
    }
  );
}

function setCursor() {
  this.vars.cursor = this.index + 1;
}

var rules = {
  TEXT: [
    ["<", "OPEN_TAG", pushText]
  ],
  OPEN_TAG: [
    [">", "TEXT", setCursor]
  ]
};


module.exports = function(source) {
  var ctx = StateMachine.run(rules, source, {cursor: 0, nodes: []});
  if (ctx.state == "TEXT") pushText.call(ctx);
  return ctx.vars;
};
