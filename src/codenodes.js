"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodecanvas_1 = require("./nodecanvas");
var menu_1 = require("./menu");
var CodeNodes = (function () {
    function CodeNodes(types) {
        var self = this;
        this.canvas = new nodecanvas_1.NodeCanvas();
        this.types = types;
        this.menu = new menu_1.CodeNodesMenu(this);
        this.canvas.ondblclick = function (p, rawP) {
            self.menuPoint = p;
            self.menu.open(rawP.x + 20, rawP.y - 70);
        };
        this.canvas.onclick = function () {
            self.menu.close();
        };
    }
    ;
    CodeNodes.prototype.getSVG = function () {
        this.canvas.render();
        return this.canvas.svg;
    };
    ;
    CodeNodes.prototype.init = function () {
        this.canvas.init();
        this.canvas.svg.appendChild(this.menu.g);
    };
    ;
    CodeNodes.prototype.center = function () {
        this.canvas.center();
    };
    CodeNodes.prototype.addNode = function (name, type) {
        var t = this.types[type];
        if (t) {
            var outputType = t.outputType || type;
            var ot = this.types[outputType];
            if (ot) {
                var p = this.menuPoint || { x: 10, y: 10 };
                this.canvas.addNode(name, t.builder, t.schema, type, t.clonable || false, t.clone, false, outputType, p.x, p.y);
            }
            else {
                console.log("There is no type " + outputType + " registered. Can not assign output type.");
            }
        }
        else {
            console.log("There is no type " + type + " registered");
        }
    };
    ;
    CodeNodes.prototype.collectionBuilder = function () {
        function flatten(arr) {
            return arr.reduce(function (flat, toFlatten) {
                return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
        }
        return flatten(arguments).filter(function (v) {
            return typeof v !== "undefined";
        });
    };
    ;
    CodeNodes.prototype.collectionClone = function (arr) {
        return arr;
        // return arr.map(function (e) {
        //     return e.clone()
        // }); TODO: Arreglar això
    };
    ;
    CodeNodes.prototype.addCollection = function (name, ofType) {
        var t = this.types[ofType];
        if (t) {
            var outputType = t.outputType || ofType;
            var ot = this.types[outputType];
            if (ot) {
                var collectionSchema = [
                    {
                        onBuild: true,
                        name: " - " + ofType,
                        type: ofType,
                        mode: "in",
                        options: null,
                        multiple: false
                    }
                ];
                var p = this.menuPoint || { x: 10, y: 10 };
                this.canvas.addNode(name, this.collectionBuilder, collectionSchema, ofType, ot.clonable || false, this.collectionClone, true, outputType, p.x, p.y);
            }
            else {
                console.log("There is no type " + outputType + " registered. Can not assign output type.");
            }
        }
        else {
            console.log("There is no type " + ofType + " registered");
        }
    };
    ;
    return CodeNodes;
}());
exports.CodeNodes = CodeNodes;

//# sourceMappingURL=codenodes.js.map
