import * as svgPanZoom from "svg-pan-zoom";
import {Point} from "./point";
import {Node} from "./node";
import {NodeConnector} from "./nodeconnector";

const namespace = "http://www.w3.org/2000/svg";


export class NodeCanvas {

    private pt: SVGPoint;
    public svg: SVGSVGElement;
    private nodes: Array<Node>;
    private currentConnector: NodeConnector;
    private g: SVGGElement;
    private paths: SVGGElement;
    private draggingEntity: Node;
    private diff: Point;
    private zoomingSvg: SvgPanZoom.Instance;
    public ondblclick: Function;
    public onclick: Function;
    private offset: ClientRect;
    private ctm: SVGMatrix;

    constructor () {
        this.svg = null;
        this.g = null;
        this.paths = null;
        this.nodes = [];
        this.pt = null;
        this.draggingEntity = null;
        this.currentConnector = null;
        this.diff = null;
    }

    center () {
        this.zoomingSvg.reset();
    }

    cursorPoint(evt) {
        this.pt.x = evt.clientX;
        this.pt.y = evt.clientY;
        return this.pt.matrixTransform(this.svg.getScreenCTM().inverse());
    };

    render() {
        let self = this;
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
                if (!(evt.target instanceof SVGSVGElement)) return;
                let p = self.cursorPoint(evt);
                self.ctm = self.g.getCTM().inverse();
                self.offset = self.svg.getBoundingClientRect();
                self.ondblclick(self.convertCoords(p), p);
            });
            this.svg.addEventListener("click", function (evt) {
                self.onclick();
            });
        };
    };
    convertCoords(o: Point) {
        var x = o.x,
            y = o.y;
        return {
            x: (this.ctm.a * x) + (this.ctm.c * y) + this.ctm.e ,//- this.offset.left,
            y: (this.ctm.b * x) + (this.ctm.d * y) + this.ctm.f //- this.offset.top
        };
    }
    addNode (title, builder, schema, type, clonable, clonefn, multiple, outputType, x, y) {
        var n = new Node(title, builder, schema, type, clonable, clonefn, multiple, outputType, x, y),
            self = this;
        function mouseMoveHandler(evt) {
            if (self.draggingEntity) {
                var p = self.cursorPoint(evt);
                p.x = p.x - self.diff.x;
                p.y = p.y - self.diff.y;
                let p1 = self.convertCoords(p);
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
            let p = self.convertCoords(self.cursorPoint(evt));
            self.svg.removeEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.removeEventListener("mouseup", mouseUpConnectorHandler);
            let dots = [].slice.call(document.querySelectorAll(".codenodes .dot"));
            let cc: NodeConnector = self.currentConnector;
            let candidates = dots.map(function(dot) {
                let pos = dot.parentValue.getDotPosition();
                let dist = Math.sqrt(Math.pow(p.x - pos.x, 2) + Math.pow(p.y - pos.y, 2));
                return {
                    dist: dist,
                    dot: dot
                };
            }).filter(function(dot) {
                return dot.dist <= 30;
            }).sort(function(a, b) {
                return a.dist - b.dist;
            });
            if (candidates.length > 0) {
                let candidateDot = candidates[0].dot;
                if (candidateDot.parentValue.inputConnector) {
                    candidateDot.parentValue.inputConnector.remove();
                }
                candidateDot.parentValue.inputConnector = cc;
                cc.end2 = candidateDot.parentValue;
                if (cc.end2.type !== "any" && (cc.end2.type !== cc.end1.outputType || cc.end1.multiple !== cc.end2.multiple)) {
                    cc.remove();
                }
                if (cc.end1 === candidateDot.parentValue.parentNode) {
                    cc.remove();
                }
                if (cc.end2.parentNode.multiple) {
                    cc.end2.parentNode.cloneLastValue();
                }
                candidateDot.parentValue.updateConectorPosition();
            } else {
                cc.remove();
            }
            self.currentConnector = null;
        }

        this.nodes.push(n);
        n.outputMousedown = function(evt, entity) {
            let p = self.cursorPoint(evt);
            self.ctm = self.g.getCTM().inverse();
            self.offset = self.svg.getBoundingClientRect();
            let p1 = {
                x: entity.position.x + parseInt(entity.output.getAttribute("cx")),
                y: entity.position.y + parseInt(entity.output.getAttribute("cy"))
            }
            self.currentConnector = new NodeConnector(p1, entity);
            entity.outputConnectors.push(self.currentConnector);
            self.paths.appendChild(self.currentConnector.path);
            self.svg.addEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.addEventListener("mouseup", mouseUpConnectorHandler);
            evt.stopPropagation();
        };
        n.onmousedown = function(evt, entity) {
            let p = self.cursorPoint(evt);
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
        n.onremove = function() {
            n.outputMousedown = null;
            n.onmousedown = null;
            var ind = self.nodes.indexOf(n);
            if (ind >= 0) {
                self.nodes.splice(ind, 1);
            }
            self.g.removeChild(n.g);
        }
        n.render(self.g);
    };

    init () {
        this.svg.setAttribute("viewBox", "0 0 " + this.svg.clientWidth + " " + this.svg.clientHeight);
        this.zoomingSvg = svgPanZoom(this.svg, {
            zoomScaleSensitivity: 0.4,
            dblClickZoomEnabled: false
        });
    };

    clear() {
		//Alert the user about the action being irreversible
		var nds = [].concat(this.nodes);
		nds.forEach(function (node) {
			node.remove();
		});
    };

    getTerminalNodes () {
		return this.nodes.filter(function (n) {
			return n.outputConnectors.length === 0;
		});
	};
}