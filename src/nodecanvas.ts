import * as svgPanZoom from "svg-pan-zoom";
import {Point} from "./point";
import {Node} from "./node";
import {NodeConnector} from "./nodeconnector";
import {INodeArguments} from "./interfaces/INodeArguments";
import {ICodeNodesType} from "./interfaces/ICodeNodesType";
import {INodeModel} from "./interfaces/INodeModel";

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
    public zoomingSvg: SvgPanZoom.Instance;
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
    getTransform() {
        let ctm = this.g.getCTM();
        return {
            pan: {x: ctm.e, y: ctm.f},
            zoom: ctm.a
        };
    };
    setTransform(transform: {pan:{x: number, y: number}, zoom: number}) {
        this.zoomingSvg.zoom(transform.zoom);
        this.zoomingSvg.pan(transform.pan);
    }
    convertCoords(o: Point) {
        var x = o.x,
            y = o.y;
        return {
            x: (this.ctm.a * x) + (this.ctm.c * y) + this.ctm.e ,//- this.offset.left,
            y: (this.ctm.b * x) + (this.ctm.d * y) + this.ctm.f //- this.offset.top
        };
    }
    addNode (opts: INodeArguments): Node {
        var n = new Node(opts),
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
                if (cc.end1 === candidateDot.parentValue.parentNode) {
                    cc.remove();
                    return;
                }
                if (candidateDot.parentValue.options.type !== "any" && (candidateDot.parentValue.options.type !== cc.end1.options.type.outputType ||
                    (!candidateDot.parentValue.options.multiple && cc.end1.options.type.outputMultiple)
                )) {
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
            } else {
                cc.remove();
            }
            self.currentConnector = null;
        }

        this.nodes.push(n);
        n.outputMousedown = function(evt, entity: Node) {
            let p = self.cursorPoint(evt);
            self.ctm = self.g.getCTM().inverse();
            self.offset = self.svg.getBoundingClientRect();
            let p1 = {
                x: entity.position.x + parseInt(entity.outputOffset.x.toString()),
                y: entity.position.y + parseInt(entity.outputOffset.y.toString())
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
        return n;
    };

    init () {
        this.svg.setAttribute("viewBox", "0 0 " + this.svg.clientWidth + " " + this.svg.clientHeight);
        this.zoomingSvg = svgPanZoom(this.svg, {
            zoomScaleSensitivity: 0.4,
            dblClickZoomEnabled: false,
            eventsListenerElement: this.svg,
            restrictEventsListenerEvent: true
        });
    };

    serialize (): INodeModel[] {
        return this.nodes.map(n => {
            return n.serialize();
        });
    }

    findNode (id: number): Node {
        let i, len = this.nodes.length;
        for (i = 0; i < len; i += 1) {
            if (this.nodes[i].options.id === id) return this.nodes[i];
        }
        return null;
    }

    findType (id: string, types: ICodeNodesType[]): ICodeNodesType {
        let i = 0, len = types.length;
        for (;i < len; i++) {
            if (types[i].id === id) return types[i];
        }
        return null;
    }

    parse (nodes: INodeModel[], types: ICodeNodesType[]) {
        let self = this;
        nodes.forEach(nm => {
            let t = this.findType(nm.arguments.type, types);
            if (t) {
                let args: INodeArguments = {
                    id: nm.arguments.id,
                    title: nm.arguments.title,
                    type: t,
                    isCollection: nm.arguments.isCollection,
                    x: nm.arguments.x,
                    y: nm.arguments.y
                };
                let n = self.addNode(args);
                n.setValues(nm.values);
            }
        });

        nodes.forEach(nm => {
            let n = self.findNode(nm.arguments.id);
            nm.outputConnectors.forEach(cn => {
                let end2 = self.findNode(cn.nodeTo);
                let p1 = {
                    x: n.position.x + parseInt(n.outputOffset.x.toString()),
                    y: n.position.y + parseInt(n.outputOffset.y.toString())
                }
                let conn = new NodeConnector(p1, n);
                n.outputConnectors.push(conn);
                self.paths.appendChild(conn.path);


                if (end2.options.isCollection) {
                    end2.cloneLastValue();
                }
                let val = end2.findValue(cn.valueTo);
                val.inputConnector = conn;
                conn.end2 = val;
                val.updateConectorPosition();
            });
        });
    }

    clear() {
		[].concat(this.nodes).forEach(function (node) {
			node.remove();
		});
        this.paths.innerHTML = "";
    };

    getTerminalNodes () {
		return this.nodes.filter(function (n) {
			return n.outputConnectors.length === 0;
		});
	};

    getOfType(type: string): Node[] {
        return this.nodes.filter(function (n) {
			return n.options.type.id === type;
		});
    }
}