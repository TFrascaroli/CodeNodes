"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodevalue_1 = require("./nodevalue");
var namespace = "http://www.w3.org/2000/svg";
var ROW_HEIGHT = 38;
var Node = (function () {
    function Node(opts) {
        this.builtWith = [];
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
    Node.prototype.dropPreBuilt = function () {
        if (this.options.type.ondrop instanceof Function) {
            this.options.type.ondrop(this.built);
        }
        this.built = null;
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
        model.arguments.type = this.options.type.id;
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
    Node.prototype.checkBuiltWithEquals = function (valuesArr) {
        if (this.builtWith.length === 0)
            return false;
        return this.builtWith.every(function (v, i) {
            return v === valuesArr[i];
        });
    };
    Node.prototype.build = function () {
        var schema = this.options.type.schema, valuesArr = [], self = this;
        valuesArr = this.values.map(function (v) {
            return v.getValue();
        });
        if (!this.checkBuiltWithEquals(valuesArr) && this.built) {
            this.dropPreBuilt();
        }
        if (!this.built || !this.checkBuiltWithEquals(valuesArr)) {
            this.built = this.options.type.builder.apply(this, valuesArr);
            this.builtWith = valuesArr;
            return this.built;
        }
        else {
            if (this.options.type.clonable) {
                return this.options.type.clone(this.built, this.options.type);
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
