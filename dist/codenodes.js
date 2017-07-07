(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.codenodes = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodecanvas_1 = require("./nodecanvas");
var menu_1 = require("./menu");
var CodeNodes = (function () {
    function CodeNodes(types) {
        this.nodesCount = 0;
        var self = this;
        this.canvas = new nodecanvas_1.NodeCanvas();
        this.types = types.sort(function (a, b) {
            return b.name.localeCompare(a.name);
        }).reverse();
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
    ;
    CodeNodes.prototype.clear = function () {
        this.canvas.clear();
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
            var outputType = t.outputType || type;
            var ot = this.findType(outputType);
            t["outputType"] = outputType;
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
        var t = this.findType(ofType);
        if (t) {
            var outputType = t.outputType || ofType;
            var ot = this.findType(outputType);
            t["outputType"] = outputType;
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
                console.log("There is no type " + outputType + " registered. Can not assign output type.");
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
        self.canvas.parse(model.nodes);
    };
    CodeNodes.prototype.getOfType = function (type) {
        return this.canvas.getOfType(type);
    };
    return CodeNodes;
}());
exports.CodeNodes = CodeNodes;



},{"./menu":2,"./nodecanvas":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var CodeNodesMenu = (function () {
    function CodeNodesMenu(main) {
        var self = this;
        var addMode = null;
        this.main = main;
        this.g = document.createElementNS(namespace, "g");
        this.g.classList.add("menu-g");
        var selectedValue = null;
        var popup = document.createElement("div");
        popup.classList.add("codenodes-menu-popup");
        this.popup = popup;
        var popupLayer = document.createElement("div");
        popupLayer.classList.add("layer");
        var popupContent = document.createElement("div");
        popupContent.classList.add("content");
        var popupWraper = document.createElement("div");
        popupWraper.classList.add("wraper");
        var popupTitle = document.createElement("div");
        popupTitle.classList.add("title");
        var entitySelector = document.createElement("div");
        entitySelector.classList.add("select");
        var entitySelectorWrap = document.createElement("div");
        entitySelectorWrap.classList.add("entity-selector");
        var entityName = document.createElement("input");
        entityName.type = "text";
        var entityNameWrap = document.createElement("div");
        entityNameWrap.classList.add("entity-name");
        var popupOK = document.createElement("div");
        popupOK.classList.add("ok");
        popup.appendChild(popupLayer);
        popup.appendChild(popupWraper);
        popupWraper.appendChild(popupContent);
        entityNameWrap.appendChild(entityName);
        popupContent.appendChild(entityNameWrap);
        entitySelectorWrap.appendChild(entitySelector);
        popupContent.appendChild(entitySelectorWrap);
        popupContent.appendChild(popupOK);
        document.body.appendChild(popup);
        popupOK.addEventListener("click", function () {
            self.close();
            switch (addMode) {
                case "node":
                    main.addNode(entityName.value, selectedValue);
                    break;
                case "collection":
                    main.addCollection(entityName.value, selectedValue);
                    break;
            }
        });
        function fillEntitySelector() {
            entitySelector.innerHTML = "";
            self.main.types.forEach(function (t) {
                var opt = document.createElement("div");
                opt.classList.add("option");
                var name = document.createElement("div");
                var desc = document.createElement("div");
                name.classList.add("name");
                desc.classList.add("desc");
                name.textContent = t.name;
                desc.textContent = t.description;
                opt.appendChild(name);
                opt.appendChild(desc);
                opt.addEventListener("click", function () {
                    [].forEach.call(entitySelector.querySelectorAll(".option"), function (o) {
                        o.classList.remove("selected");
                    });
                    opt.classList.add("selected");
                    selectedValue = t.id;
                });
                entitySelector.appendChild(opt);
            });
        }
        var _loop_1 = function (i) {
            var rect = document.createElementNS(namespace, "rect"), t = document.createElementNS(namespace, "text");
            rect.classList.add("menu-rect");
            t.classList.add("menu-t");
            rect.setAttribute("x", (5).toString());
            rect.setAttribute("y", (35 * i).toString());
            t.setAttribute("x", (10).toString());
            t.setAttribute("y", ((35 * i) + 19).toString());
            self.g.appendChild(rect);
            self.g.appendChild(t);
            switch (i) {
                case 0:
                    t.textContent = "Add node";
                    rect.addEventListener("click", function (evt) {
                        popupTitle.textContent = t.textContent;
                        entityName.value = "New node";
                        entityName.focus();
                        fillEntitySelector();
                        addMode = "node";
                        popup.classList.add("visible");
                        evt.stopPropagation();
                    });
                    break;
                case 1:
                    t.textContent = "Add collection";
                    rect.addEventListener("click", function (evt) {
                        popupTitle.textContent = t.textContent;
                        entityName.value = "New collection";
                        entityName.focus();
                        fillEntitySelector();
                        addMode = "collection";
                        popup.classList.add("visible");
                        evt.stopPropagation();
                    });
                    break;
                case 2:
                    t.textContent = "Center";
                    rect.addEventListener("click", function (evt) {
                        main.center();
                        self.close();
                        evt.stopPropagation();
                    });
                    break;
                case 3:
                    t.textContent = "Reset";
                    rect.addEventListener("click", function (evt) {
                        main.clear();
                        self.close();
                        evt.stopPropagation();
                    });
                    break;
            }
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    }
    CodeNodesMenu.prototype.open = function (x, y) {
        this.g.classList.add("visible");
        this.g.setAttribute("transform", "translate(" + x.toString() + "," + y.toString() + ")");
        this.g.classList.add("visible");
    };
    CodeNodesMenu.prototype.close = function () {
        this.popup.classList.remove("visible");
        this.g.classList.remove("visible");
    };
    return CodeNodesMenu;
}());
exports.CodeNodesMenu = CodeNodesMenu;



},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodevalue_1 = require("./nodevalue");
var namespace = "http://www.w3.org/2000/svg";
var ROW_HEIGHT = 38;
var Node = (function () {
    function Node(opts) {
        var self = this;
        this.options = opts;
        this.values = [];
        this.position = {
            x: this.options.x,
            y: this.options.y
        };
        this.nRows = this.options.type.schema.length + 2;
        this.onmousedown = null;
        this.outputConnectors = [];
        this.options.type.schema.forEach(function (prop) {
            self.setValueDefaults(prop);
            var p = prop;
            if (self.options.isCollection) {
                p = self.collectionValueOf(p);
            }
            self.values.push(new nodevalue_1.NodeValue(p, self));
        });
    }
    ;
    Node.prototype.setValueDefaults = function (v) {
        v.options = v.options || [];
        v.multiple = v.multiple || false;
        v.mode = v.mode || "edit";
    };
    Node.prototype.collectionValueOf = function (v) {
        return {
            id: v.id,
            name: v.name + " 0",
            type: v.type,
            mode: v.mode,
            options: v.options,
            multiple: v.multiple
        };
    };
    Node.prototype.render = function (parent) {
        var self = this;
        if (!this.g) {
            this.g = document.createElementNS(namespace, "g");
            this.g.setAttribute("transform", "translate(" + this.position.x + "," + this.position.y + ")");
            this.g.setAttribute("class", "entity");
            this.outputOffset = {
                x: 130,
                y: (this.nRows * ROW_HEIGHT) - 10
            };
            this.rect = document.createElementNS(namespace, "rect");
            this.rect.setAttribute("width", this.outputOffset.x.toString());
            this.rect.setAttribute("rx", "3");
            this.rect.setAttribute("height", ((this.nRows * ROW_HEIGHT) + 2).toString());
            this.rect.setAttribute("class", "draggable");
            this.rectDownHandler = function (evt) {
                if (this.onmousedown instanceof Function) {
                    this.onmousedown(evt, this);
                }
            }.bind(this);
            this.rect.addEventListener("mousedown", this.rectDownHandler);
            var t = document.createElementNS(namespace, "text");
            t.textContent = this.options.title;
            t.classList.add("title");
            t.setAttribute("x", "5");
            t.setAttribute("y", "15");
            this.g.appendChild(this.rect);
            this.g.appendChild(t);
            var output = document.createElementNS(namespace, "circle");
            this.output = output;
            output.setAttribute("cx", (this.outputOffset.x).toString());
            output.setAttribute("cy", (this.outputOffset.y).toString());
            output.setAttribute("r", "6");
            output.setAttribute("class", "output");
            this.outputDownHandler = function (evt) {
                if (this.outputMousedown instanceof Function) {
                    this.outputMousedown(evt, this);
                }
            }.bind(this);
            output.addEventListener("mousedown", this.outputDownHandler);
            var outputType = document.createElementNS(namespace, "text");
            this.outputText = outputType;
            if (this.options.type.outputMultiple) {
                outputType.textContent = "[" + this.options.type.outputType + "]";
            }
            else {
                outputType.textContent = this.options.type.outputType;
            }
            outputType.classList.add("output-type");
            outputType.setAttribute("x", (this.outputOffset.x - 10).toString());
            outputType.setAttribute("y", (this.outputOffset.y).toString());
            this.g.appendChild(output);
            this.g.appendChild(outputType);
            this.closeBtn = document.createElementNS(namespace, "circle");
            this.closeBtn.classList.add("close-btn");
            this.closeBtn.setAttribute("cx", (this.outputOffset.x - 10).toString());
            this.closeBtn.setAttribute("r", "6");
            this.closeBtn.setAttribute("cy", "15");
            this.close = function () {
                this.remove();
            }.bind(this);
            this.closeBtn.addEventListener("click", this.close);
            this.g.appendChild(this.closeBtn);
            parent.appendChild(this.g);
        }
        var i = 1;
        this.values.forEach(function (val) {
            val.render(self.g, i++);
        });
    };
    ;
    Node.prototype.cloneLastValue = function () {
        var self = this;
        if (this.options.isCollection) {
            var schema = this.options.type.schema, full = self.values.every(function (val) {
                return val.inputConnector !== null;
            });
            if (full) {
                var prop = JSON.parse(JSON.stringify(schema[schema.length - 1])), name_1 = prop.name + " " + schema.length;
                schema.push(prop);
                this.nRows++;
                var newN = new nodevalue_1.NodeValue(prop, self);
                self.values.push(newN);
                newN.render(self.g, schema.length);
                this.outputOffset.y = (this.nRows * ROW_HEIGHT) - 10;
                this.output.setAttribute("cx", (this.outputOffset.x).toString());
                this.output.setAttribute("cy", (this.outputOffset.y).toString());
                this.outputText.setAttribute("y", (this.outputOffset.y).toString());
                this.rect.setAttribute("height", ((this.nRows * ROW_HEIGHT) + 2).toString());
            }
        }
    };
    ;
    Node.prototype.move = function (x, y) {
        var self = this;
        this.position = {
            x: x,
            y: y
        };
        this.outputConnectors.forEach(function (con) {
            con.sp = {
                x: x + self.outputOffset.x,
                y: y + self.outputOffset.y
            };
            con.setPath();
        });
        this.values.forEach(function (val) {
            val.updateConectorPosition();
        });
        this.g.setAttribute("transform", "translate(" + this.position.x + "," + this.position.y + ")");
    };
    ;
    Node.prototype.serialize = function () {
        var self = this, model = {
            arguments: JSON.parse(JSON.stringify(this.options)),
            values: this.values.map(function (v) {
                return {
                    valueID: v.options.id,
                    value: v.__internalGetValue(true)
                };
            }),
            outputConnectors: this.outputConnectors.map(function (c) {
                return {
                    nodeTo: c.end2.parentNode.options.id,
                    valueTo: c.end2.options.id
                };
            })
        };
        model.arguments.x = this.position.x;
        model.arguments.y = this.position.y;
        return model;
    };
    ;
    Node.prototype.findValue = function (id) {
        var i, len = this.values.length;
        for (i = 0; i < len; i += 1) {
            if (this.values[i].options.id === id)
                return this.values[i];
        }
        return null;
    };
    Node.prototype.setValues = function (vs) {
        var self = this;
        if (!this.options.isCollection) {
            vs.forEach(function (v) {
                var value = self.values.filter(function (val) {
                    return val.options.id === v.valueID;
                })[0];
                if (value.__internalSetValue instanceof Function) {
                    value.__internalSetValue(v.value);
                }
            });
        }
    };
    ;
    Node.prototype.build = function () {
        if (!this.built) {
            var schema = this.options.type.schema, valuesArr = [], self = this;
            valuesArr = this.values.map(function (v) {
                return v.getValue();
            });
            this.built = this.options.type.builder.apply(this, valuesArr);
            return this.built;
        }
        else {
            if (this.options.type.clonable) {
                return this.options.type.clone(this.built);
            }
            else {
                return this.built;
            }
        }
    };
    ;
    Node.prototype.remove = function () {
        var self = this;
        this.values.forEach(function (val) {
            val.remove();
        });
        this.values = null;
        [].concat(this.outputConnectors).forEach(function (con) {
            con.remove();
        });
        if (this.onremove instanceof Function) {
            this.onremove();
        }
        this.closeBtn.removeEventListener("click", this.close);
        this.rect.removeEventListener("mousedown", this.rectDownHandler);
        this.output.addEventListener("mousedown", this.outputDownHandler);
    };
    ;
    return Node;
}());
exports.Node = Node;



},{"./nodevalue":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var svgPanZoom = require("svg-pan-zoom");
var node_1 = require("./node");
var nodeconnector_1 = require("./nodeconnector");
var namespace = "http://www.w3.org/2000/svg";
var NodeCanvas = (function () {
    function NodeCanvas() {
        this.svg = null;
        this.g = null;
        this.paths = null;
        this.nodes = [];
        this.pt = null;
        this.draggingEntity = null;
        this.currentConnector = null;
        this.diff = null;
    }
    NodeCanvas.prototype.center = function () {
        this.zoomingSvg.reset();
    };
    NodeCanvas.prototype.cursorPoint = function (evt) {
        this.pt.x = evt.clientX;
        this.pt.y = evt.clientY;
        return this.pt.matrixTransform(this.svg.getScreenCTM().inverse());
    };
    ;
    NodeCanvas.prototype.render = function () {
        var self = this;
        if (!this.svg) {
            this.svg = document.createElementNS(namespace, "svg");
            this.svg.setAttribute("class", "codenodes");
            this.pt = this.svg.createSVGPoint();
            this.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", namespace);
            this.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            this.svg.setAttribute("width", "100%");
            this.svg.setAttribute("height", "100%");
            this.g = document.createElementNS(namespace, "g");
            this.paths = document.createElementNS(namespace, "g");
            this.g.classList.add("svg-pan-zoom_viewport");
            this.g.setAttribute("transform", "matrix(1,1,1,1,0,0)");
            this.g.appendChild(this.paths);
            this.svg.appendChild(this.g);
            this.svg.addEventListener("dblclick", function (evt) {
                if (!(evt.target instanceof SVGSVGElement))
                    return;
                var p = self.cursorPoint(evt);
                self.ctm = self.g.getCTM().inverse();
                self.offset = self.svg.getBoundingClientRect();
                self.ondblclick(self.convertCoords(p), p);
            });
            this.svg.addEventListener("click", function (evt) {
                self.onclick();
            });
        }
        ;
    };
    ;
    NodeCanvas.prototype.getTransform = function () {
        var ctm = this.g.getCTM();
        return {
            pan: { x: ctm.e, y: ctm.f },
            zoom: ctm.a
        };
    };
    ;
    NodeCanvas.prototype.setTransform = function (transform) {
        this.zoomingSvg.zoom(transform.zoom);
        this.zoomingSvg.pan(transform.pan);
    };
    NodeCanvas.prototype.convertCoords = function (o) {
        var x = o.x, y = o.y;
        return {
            x: (this.ctm.a * x) + (this.ctm.c * y) + this.ctm.e,
            y: (this.ctm.b * x) + (this.ctm.d * y) + this.ctm.f //- this.offset.top
        };
    };
    NodeCanvas.prototype.addNode = function (opts) {
        var n = new node_1.Node(opts), self = this;
        function mouseMoveHandler(evt) {
            if (self.draggingEntity) {
                var p = self.cursorPoint(evt);
                p.x = p.x - self.diff.x;
                p.y = p.y - self.diff.y;
                var p1 = self.convertCoords(p);
                self.draggingEntity.move(p1.x, p1.y);
            }
        }
        function mouseUpHandler(evt) {
            self.svg.removeEventListener("mousemove", mouseMoveHandler);
            self.svg.removeEventListener("mouseup", mouseUpHandler);
            mouseMoveHandler(evt);
            self.draggingEntity = null;
        }
        function mouseMoveConnectorHandler(evt) {
            var p = self.convertCoords(self.cursorPoint(evt));
            self.currentConnector.moveEndPoint(p);
        }
        function mouseUpConnectorHandler(evt) {
            var p = self.convertCoords(self.cursorPoint(evt));
            self.svg.removeEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.removeEventListener("mouseup", mouseUpConnectorHandler);
            var dots = [].slice.call(document.querySelectorAll(".codenodes .dot"));
            var cc = self.currentConnector;
            var candidates = dots.map(function (dot) {
                var pos = dot.parentValue.getDotPosition();
                var dist = Math.sqrt(Math.pow(p.x - pos.x, 2) + Math.pow(p.y - pos.y, 2));
                return {
                    dist: dist,
                    dot: dot
                };
            }).filter(function (dot) {
                return dot.dist <= 30;
            }).sort(function (a, b) {
                return a.dist - b.dist;
            });
            if (candidates.length > 0) {
                var candidateDot = candidates[0].dot;
                if (cc.end1 === candidateDot.parentValue.parentNode) {
                    cc.remove();
                    return;
                }
                if (candidateDot.parentValue.options.type !== "any" && (candidateDot.parentValue.options.type !== cc.end1.options.type.outputType ||
                    (!candidateDot.parentValue.options.multiple && cc.end1.options.type.outputMultiple))) {
                    cc.remove();
                    return;
                }
                if (candidateDot.parentValue.inputConnector) {
                    candidateDot.parentValue.inputConnector.remove();
                }
                candidateDot.parentValue.inputConnector = cc;
                cc.end2 = candidateDot.parentValue;
                if (cc.end2.parentNode.options.isCollection) {
                    cc.end2.parentNode.cloneLastValue();
                }
                candidateDot.parentValue.updateConectorPosition();
            }
            else {
                cc.remove();
            }
            self.currentConnector = null;
        }
        this.nodes.push(n);
        n.outputMousedown = function (evt, entity) {
            var p = self.cursorPoint(evt);
            self.ctm = self.g.getCTM().inverse();
            self.offset = self.svg.getBoundingClientRect();
            var p1 = {
                x: entity.position.x + parseInt(entity.outputOffset.x.toString()),
                y: entity.position.y + parseInt(entity.outputOffset.y.toString())
            };
            self.currentConnector = new nodeconnector_1.NodeConnector(p1, entity);
            entity.outputConnectors.push(self.currentConnector);
            self.paths.appendChild(self.currentConnector.path);
            self.svg.addEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.addEventListener("mouseup", mouseUpConnectorHandler);
            evt.stopPropagation();
        };
        n.onmousedown = function (evt, entity) {
            var p = self.cursorPoint(evt);
            self.ctm = self.g.getCTM();
            self.offset = self.svg.getBoundingClientRect();
            var entPos = self.convertCoords(entity.position);
            self.diff = {
                x: p.x - entPos.x,
                y: p.y - entPos.y
            };
            self.ctm = self.ctm.inverse();
            evt.stopPropagation();
            self.draggingEntity = entity;
            if (self.draggingEntity) {
                self.svg.addEventListener("mousemove", mouseMoveHandler);
                self.svg.addEventListener("mouseup", mouseUpHandler);
            }
        }.bind(this);
        n.onremove = function () {
            n.outputMousedown = null;
            n.onmousedown = null;
            var ind = self.nodes.indexOf(n);
            if (ind >= 0) {
                self.nodes.splice(ind, 1);
            }
            self.g.removeChild(n.g);
        };
        n.render(self.g);
        return n;
    };
    ;
    NodeCanvas.prototype.init = function () {
        this.svg.setAttribute("viewBox", "0 0 " + this.svg.clientWidth + " " + this.svg.clientHeight);
        this.zoomingSvg = svgPanZoom(this.svg, {
            zoomScaleSensitivity: 0.4,
            dblClickZoomEnabled: false
        });
    };
    ;
    NodeCanvas.prototype.serialize = function () {
        return this.nodes.map(function (n) {
            return n.serialize();
        });
    };
    NodeCanvas.prototype.findNode = function (id) {
        var i, len = this.nodes.length;
        for (i = 0; i < len; i += 1) {
            if (this.nodes[i].options.id === id)
                return this.nodes[i];
        }
        return null;
    };
    NodeCanvas.prototype.parse = function (nodes) {
        var self = this;
        nodes.forEach(function (nm) {
            var n = self.addNode(nm.arguments);
            n.setValues(nm.values);
        });
        nodes.forEach(function (nm) {
            var n = self.findNode(nm.arguments.id);
            nm.outputConnectors.forEach(function (cn) {
                var end2 = self.findNode(cn.nodeTo);
                var p1 = {
                    x: n.position.x + parseInt(n.outputOffset.x.toString()),
                    y: n.position.y + parseInt(n.outputOffset.y.toString())
                };
                var conn = new nodeconnector_1.NodeConnector(p1, n);
                n.outputConnectors.push(conn);
                self.paths.appendChild(conn.path);
                if (end2.options.isCollection) {
                    end2.cloneLastValue();
                }
                var val = end2.findValue(cn.valueTo);
                val.inputConnector = conn;
                conn.end2 = val;
                val.updateConectorPosition();
            });
        });
    };
    NodeCanvas.prototype.clear = function () {
        [].concat(this.nodes).forEach(function (node) {
            node.remove();
        });
        this.paths.innerHTML = "";
    };
    ;
    NodeCanvas.prototype.getTerminalNodes = function () {
        return this.nodes.filter(function (n) {
            return n.outputConnectors.length === 0;
        });
    };
    ;
    NodeCanvas.prototype.getOfType = function (type) {
        return this.nodes.filter(function (n) {
            return n.options.type.id === type;
        });
    };
    return NodeCanvas;
}());
exports.NodeCanvas = NodeCanvas;



},{"./node":3,"./nodeconnector":5,"svg-pan-zoom":undefined}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var NodeConnector = (function () {
    function NodeConnector(sp, node) {
        this.sp = sp;
        this.ep = sp;
        this.end1 = node;
        this.end2 = null;
        this.path = document.createElementNS(namespace, "path");
        this.setPath();
    }
    ;
    NodeConnector.prototype.setPath = function () {
        var c1 = {
            x: ((this.ep.x - this.sp.x) / 3) + this.sp.x,
            y: this.sp.y
        }, c2 = {
            x: -((this.ep.x - this.sp.x) / 3) + this.ep.x,
            y: this.ep.y
        };
        this.path.setAttribute("d", "M" + this.sp.x + "," + this.sp.y + " C" + c1.x + "," + c1.y + " " + c2.x + "," + c2.y + " " + this.ep.x + "," + this.ep.y);
    };
    ;
    NodeConnector.prototype.remove = function () {
        if (this.end1) {
            var ind = this.end1.outputConnectors.indexOf(this);
            if (ind >= 0) {
                this.end1.outputConnectors.splice(ind, 1);
            }
            this.end1 = null;
        }
        if (this.end2) {
            this.end2.inputConnector = null;
        }
        if (this.path) {
            this.path.remove();
            this.path = null;
        }
    };
    ;
    NodeConnector.prototype.moveEndPoint = function (point) {
        this.ep = point;
        this.setPath();
    };
    return NodeConnector;
}());
exports.NodeConnector = NodeConnector;



},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var ROW_HEIGHT = 38;
var NodeValue = (function () {
    function NodeValue(opts, node) {
        this.popup = null;
        this.options = opts;
        this.inputConnector = null;
        this.__internalGetValue = null;
        this.svgEntity = null;
        this.gOffset = null;
        this.parentNode = node;
    }
    NodeValue.prototype.render = function (parent, position) {
        var self = this;
        if (!this.svgEntity) {
            var ent = document.createElementNS(namespace, "g");
            this.gOffset = {
                x: 1,
                y: ((position * ROW_HEIGHT) + 1)
            };
            ent.setAttribute("transform", "translate(" + this.gOffset.x + ", " + this.gOffset.y + ")");
            ent.setAttribute("class", "row");
            if (this.options.mode === "edit") {
                var rect = document.createElementNS(namespace, "rect"), fo = document.createElementNS(namespace, "foreignObject"), name_1 = document.createElementNS(namespace, "text"), div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                name_1.textContent = this.options.name;
                name_1.setAttribute("x", "10");
                name_1.setAttribute("y", "6");
                rect.setAttribute("x", "1");
                div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                var input_1 = document.createElement("input");
                switch (this.options.type) {
                    case "range":
                        input_1.min = this.options[0];
                        input_1.max = this.options[1];
                    case "text":
                    case "number":
                    case "email":
                    case "date":
                    case "color":
                        this.__internalGetValue = function () {
                            return input_1.value;
                        };
                        this.__internalSetValue = function (v) {
                            input_1.value = v;
                        };
                        input_1.type = this.options.type;
                        div.appendChild(input_1);
                        break;
                    case "boolean":
                        this.__internalGetValue = function () {
                            return input_1.checked;
                        };
                        this.__internalSetValue = function (v) {
                            input_1.checked = v;
                        };
                        input_1.type = "checkbox";
                        div.appendChild(input_1);
                        break;
                    case "select":
                        var div_select_1 = document.createElement("select");
                        this.options.options.forEach(function (op) {
                            var div_option = document.createElement("option");
                            div_option.textContent = op.show.toString();
                            div_option.setAttribute("value", op.save);
                            div_select_1.appendChild(div_option);
                        });
                        this.__internalGetValue = function () {
                            return div_select_1.value;
                        };
                        this.__internalSetValue = function (v) {
                            input_1.value = v;
                        };
                        div.appendChild(div_select_1);
                        break;
                    case "popup":
                        var btn = document.createElement("button");
                        btn.classList.add("popup-btn");
                        btn.textContent = "*Edit";
                        var popup_1 = document.createElement("div");
                        popup_1.classList.add("codenodes-popup");
                        this.popup = popup_1;
                        var popupLayer = document.createElement("div");
                        popupLayer.classList.add("layer");
                        var popupContent = document.createElement("div");
                        popupContent.classList.add("content");
                        var popupWraper = document.createElement("div");
                        popupWraper.classList.add("wraper");
                        var popupTextArea_1 = document.createElement("div");
                        popupTextArea_1.classList.add("text");
                        popupTextArea_1.setAttribute("contenteditable", "true");
                        var popupOK = document.createElement("div");
                        popupOK.classList.add("ok");
                        btn.addEventListener("click", function () {
                            popup_1.classList.add("visible");
                        });
                        var fnClose = function () {
                            popup_1.classList.remove("visible");
                        };
                        popup_1.appendChild(popupLayer);
                        popup_1.appendChild(popupWraper);
                        popupWraper.appendChild(popupContent);
                        popupContent.appendChild(popupTextArea_1);
                        popupContent.appendChild(popupOK);
                        popupOK.addEventListener("click", fnClose);
                        this.__internalGetValue = function () {
                            return popupTextArea_1.textContent;
                        };
                        this.__internalSetValue = function (v) {
                            popupTextArea_1.textContent = v;
                        };
                        document.body.appendChild(popup_1);
                        div.appendChild(btn);
                        break;
                }
                fo.appendChild(div);
                fo.setAttribute("transform", "translate(0,13)");
                //ent.appendChild(rect);
                ent.appendChild(name_1);
                ent.appendChild(fo);
            }
            if (this.options.mode === "in") {
                var name_2 = document.createElementNS(namespace, "text"), type = document.createElementNS(namespace, "text"), dot = document.createElementNS(namespace, "circle");
                dot.setAttribute("cx", "-1");
                dot.setAttribute("cy", "16");
                dot.setAttribute("r", "4");
                dot.setAttribute("class", "dot");
                dot.addEventListener("click", function (evt) {
                    if (self.inputConnector) {
                        self.inputConnector.remove();
                    }
                    evt.stopPropagation();
                });
                dot["parentValue"] = this;
                name_2.textContent = this.options.name;
                name_2.setAttribute("x", "10");
                name_2.setAttribute("y", "8");
                if (this.options.multiple) {
                    type.textContent = "[" + this.options.type + "]";
                }
                else {
                    type.textContent = this.options.type;
                }
                type.classList.add("value-type");
                type.setAttribute("x", "10");
                type.setAttribute("y", "25");
                this.__internalGetValue = function (serializing) {
                    if (!serializing && self.inputConnector) {
                        var built = self.inputConnector.end1.build();
                        if (self.options.multiple && !self.inputConnector.end1.options.type.outputMultiple) {
                            return [built];
                        }
                        else {
                            return built;
                        }
                    }
                    return undefined;
                };
                ent.appendChild(name_2);
                ent.appendChild(type);
                ent.appendChild(dot);
            }
            this.svgEntity = ent;
            parent.appendChild(ent);
        }
    };
    ;
    NodeValue.prototype.getSerializedValue = function () {
        if (this.options.mode === "edit" && this.__internalGetValue instanceof Function) {
            return this.__internalGetValue();
        }
        return null;
    };
    NodeValue.prototype.getDotPosition = function () {
        return {
            x: this.parentNode.position.x + this.gOffset.x - 1,
            y: this.parentNode.position.y + this.gOffset.y + 16
        };
    };
    ;
    NodeValue.prototype.remove = function () {
        if (this.inputConnector) {
            this.inputConnector.remove();
            this.inputConnector = null;
        }
        this.svgEntity.remove();
        this.svgEntity = null;
        if (this.popup) {
            document.body.removeChild(this.popup);
        }
        this.parentNode = null;
    };
    NodeValue.prototype.updateConectorPosition = function () {
        if (this.inputConnector) {
            this.inputConnector.ep = this.getDotPosition();
            this.inputConnector.setPath();
        }
    };
    NodeValue.prototype.getValue = function () {
        if (this.__internalGetValue instanceof Function) {
            return this.__internalGetValue();
        }
        return null;
    };
    return NodeValue;
}());
exports.NodeValue = NodeValue;



},{}]},{},[1])(1)
});