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
        }
        this.nodes.forEach(function (node) {
            node.render(self.g);
        });
    };
    ;
    NodeCanvas.prototype.addNode = function (title, builder, schema, type, clonable, clonefn, x, y) {
        var n = new node_1.Node(title, builder, schema, type, clonable, clonefn, x, y), self = this, ctm = null, offset = null;
        function convertCoords(o) {
            var x = o.x, y = o.y;
            return {
                x: (ctm.a * x) + (ctm.c * y) + ctm.e - offset.left,
                y: (ctm.b * x) + (ctm.d * y) + ctm.f - offset.top
            };
        }
        function mouseMoveHandler(evt) {
            if (self.draggingEntity) {
                var p = self.cursorPoint(evt);
                p.x = p.x - self.diff.x;
                p.y = p.y - self.diff.y;
                var p1 = convertCoords(p);
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
            var p = convertCoords(self.cursorPoint(evt));
            self.currentConnector.moveEndPoint(p);
        }
        function mouseUpConnectorHandler(evt) {
            var p = convertCoords(self.cursorPoint(evt));
            self.svg.removeEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.removeEventListener("mouseup", mouseUpConnectorHandler);
            var dots = [].slice.call(document.querySelectorAll(".codenodes .dot"));
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
                if (candidates[0].dot.parentValue.inputConnector) {
                    candidates[0].dot.parentValue.inputConnector.remove();
                }
                candidates[0].dot.parentValue.inputConnector = self.currentConnector;
                self.currentConnector.end2 = candidates[0].dot.parentValue;
                if (self.currentConnector.end2.type !== "any" && (self.currentConnector.end2.type !== self.currentConnector.end1.type)) {
                    self.currentConnector.remove();
                }
                if (self.currentConnector.end1 === candidates[0].dot.parentValue.parentNode) {
                    self.currentConnector.remove();
                }
                candidates[0].dot.parentValue.updateConectorPosition();
            }
            else {
                self.currentConnector.remove();
            }
            self.currentConnector = null;
        }
        this.nodes.push(n);
        n.outputMousedown = function (evt, entity) {
            var p = self.cursorPoint(evt);
            ctm = self.g.getCTM().inverse();
            offset = self.svg.getBoundingClientRect();
            var p1 = {
                x: entity.position.x + parseInt(entity.output.getAttribute("cx")),
                y: entity.position.y + parseInt(entity.output.getAttribute("cy"))
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
            ctm = self.g.getCTM();
            offset = self.svg.getBoundingClientRect();
            var entPos = convertCoords(entity.position);
            self.diff = {
                x: p.x - entPos.x,
                y: p.y - entPos.y
            };
            ctm = ctm.inverse();
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
    NodeCanvas.prototype.clear = function () {
        //Alert the user about the action being irreversible
        var nds = [].concat(this.nodes);
        nds.forEach(function (node) {
            node.remove();
        });
    };
    ;
    NodeCanvas.prototype.getTerminalNodes = function () {
        return this.nodes.filter(function (n) {
            return n.outputConnectors.length === 0;
        });
    };
    ;
    return NodeCanvas;
}());
exports.NodeCanvas = NodeCanvas;

//# sourceMappingURL=nodecanvas.js.map
