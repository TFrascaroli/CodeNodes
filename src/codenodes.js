"use strict";
var nodecanvas_1 = require("./nodecanvas");
var CodeNodes = (function () {
    function CodeNodes(types) {
        this.canvas = new nodecanvas_1.NodeCanvas();
        this.types = types;
    }
    ;
    CodeNodes.prototype.getSVG = function () {
        this.canvas.render();
        return this.canvas.svg;
    };
    ;
    CodeNodes.prototype.init = function () {
        this.canvas.init();
    };
    ;
    CodeNodes.prototype.addNode = function (name, type) {
        var t = this.types[type];
        if (t) {
            this.canvas.addNode(name, t.builder, t.schema, type, t.clonable || false, t.clone, 10, 10);
        }
        else {
            console.log("There is no type " + type + " registered");
        }
    };
    ;
    return CodeNodes;
}());
module.exports = {
    Interface: CodeNodes
};

//# sourceMappingURL=codenodes.js.map
