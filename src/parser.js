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

function tagName() {
  if (this.vars.tag && this.vars.tag.name) return;
  this.vars.tag = {name: this.source.substr(cursor, this.index - cursor).trim()};
}

function setCursor() {
  this.vars.cursor = this.index + 1;
}

function all() {
  var args = [];
  var i, arg;
  for (i = 0 ; i < arguments.length ; i++) {
    arg = arguments[i];
    args.push(arg);
  }
  return function() {
   args.forEach(
     function(f) {
       f.call(this);
     },
     this
   );
  };
}

var rules = {
  TEXT: [
    ["<", "OPEN_TAG", pushText]
  ],
  OPEN_TAG: [
    ["/"],
    [" ", "ATTRIBS", tagName],
    [">", "TEXT", setCursor]
  ]
};


module.exports = function(source) {
  var ctx = StateMachine.run(rules, source, {cursor: 0, children: []});
  if (ctx.state == "TEXT") pushText.call(ctx);
  return ctx.vars.children;
};
