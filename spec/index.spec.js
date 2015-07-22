'use strict';

var Tree = require("../index");

describe("Parsing", function() {
           it("should parse simple text", function() {
                var result = Tree.parseString("Hello World!");
                expect(result).toEqual([{node: Tree.TEXT, text: "Hello World!"}]);
              });
           it("should parse bold tag", function() {
                var result = Tree.parseString("Hello <b>World</b>!");
                expect(result).toEqual(
                  [
                    {node: Tree.TEXT, text: "Hello "},
                    {
                      node: Tree.TAG,
                      name: "b",
                      children: [
                        {node: Tree.TEXT, text: "World"}
                      ]
                    },
                    {node: Tree.TEXT, text: "!"}
                  ]
                );
              });
         });
