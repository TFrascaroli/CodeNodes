"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodecanvas_1 = require("./nodecanvas");
var menu_1 = require("./menu");
var CodeNodes = (function () {
    function CodeNodes(types) {
        this.nodesCount = 0;
        var self = this;
        this.canvas = new nodecanvas_1.NodeCanvas();
        this.setTypes(types);
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
    CodeNodes.prototype.setTypes = function (types) {
        this.clear();
        this.types = types.map(function (t) {
            t.outputType = t.outputType || t.id;
            return t;
        }).sort(function (a, b) {
            return b.name.localeCompare(a.name);
        }).reverse();
    };
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
    ;
    CodeNodes.prototype.clear = function () {
        this.canvas.clear();
        if (this.onclear instanceof Function) {
            this.onclear();
        }
    };
    CodeNodes.prototype.findType = function (tID) {
        var i = 0, len = this.types.length;
        for (; i < len; i++) {
            if (this.types[i].id === tID)
                return this.types[i];
        }
        return null;
    };
    CodeNodes.prototype.collectionTypeOf = function (t) {
        return {
            id: t.id,
            name: t.name,
            description: "(Collection) " + t.description,
            builder: this.collectionBuilder,
            clone: this.collectionClone,
            clonable: t.clonable,
            outputType: t.outputType,
            outputMultiple: true,
            schema: [
                {
                    name: " - " + t.name,
                    type: t.id,
                    mode: "in",
                    options: null,
                    multiple: false
                }
            ]
        };
    };
    CodeNodes.prototype.addNode = function (name, type) {
        var t = this.findType(type);
        if (t) {
            var ot = this.findType(t.outputType);
            if (ot) {
                var p = this.menuPoint || { x: 10, y: 10 };
                this.canvas.addNode({
                    id: this.nodesCount++,
                    title: name,
                    type: t,
                    isCollection: false,
                    x: p.x,
                    y: p.y
                });
            }
            else {
                console.log("There is no type " + t.outputType + " registered. Can not assign output type.");
            }
        }
        else {
            console.log("There is no type " + type + " registered");
        }
    };
    ;
    CodeNodes.prototype.collectionBuilder = function () {
        function flatten(arrs) {
            var ret = [];
            if (typeof arrs !== "undefined" && arrs.length) {
                arrs.forEach(function (e) {
                    flatten(e).forEach(function (en) {
                        ret.push(en);
                    });
                });
            }
            else {
                ret.push(arrs);
            }
            return ret;
        }
        // function flatten(arr) {
        //     return arr.reduce(function (flat, toFlatten) {
        //     return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        //     }, []);
        // }
        return flatten(Array.prototype.slice.call(arguments)).filter(function (v) {
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
        var t = this.findType(ofType);
        if (t) {
            var ot = this.findType(t.outputType);
            if (ot) {
                var p = this.menuPoint || { x: 10, y: 10 };
                //name, this.collectionBuilder, collectionSchema, ofType, ot.clonable || false, this.collectionClone, true, outputType, p.x, p.y
                this.canvas.addNode({
                    id: this.nodesCount++,
                    title: name,
                    type: this.collectionTypeOf(t),
                    isCollection: true,
                    x: p.x,
                    y: p.y
                });
            }
            else {
                console.log("There is no type " + t.outputType + " registered. Can not assign output type.");
            }
        }
        else {
            console.log("There is no type " + ofType + " registered");
        }
    };
    ;
    CodeNodes.prototype.serialize = function () {
        return {
            nodes: this.canvas.serialize(),
            transform: this.canvas.getTransform()
        };
    };
    ;
    CodeNodes.prototype.parse = function (model) {
        var self = this;
        this.canvas.setTransform(model.transform);
        self.canvas.parse(model.nodes, this.types);
    };
    CodeNodes.prototype.getOfType = function (type) {
        return this.canvas.getOfType(type);
    };
    return CodeNodes;
}());
exports.CodeNodes = CodeNodes;
