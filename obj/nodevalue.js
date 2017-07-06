"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var ROW_HEIGHT = 38;
var NodeValue = (function () {
    function NodeValue(opts, node) {
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
                this.__internalGetValue = function () {
                    if (self.inputConnector) {
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

//# sourceMappingURL=nodevalue.js.map
