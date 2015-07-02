'use strict';

var Tree = require("../index");

describe("Parsing", function() {
  it("should parse simple text", function() {
    expect(Tree.parseString("Hello World!")).toEqual({node: Tree.TEXT, text: "Hello World!"});
  });
});
