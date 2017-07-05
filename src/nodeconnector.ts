import {Node} from "./node";
import {Point} from "./point";
import {NodeValue} from "./nodevalue";


const namespace = "http://www.w3.org/2000/svg";

export class NodeConnector {

    public end1: Node;
    public end2: NodeValue;
    public sp: Point;
    public ep: Point;
    public path: SVGPathElement;

    constructor(sp: Point, node: Node) {
        this.sp = sp;
        this.ep = sp;
        this.end1 = node;
        this.end2 = null;

        this.path = document.createElementNS(namespace, "path");
        this.setPath();
    };

    setPath() {
        let c1 = {
                x: ((this.ep.x - this.sp.x) / 3) + this.sp.x,
                y: this.sp.y
            },
            c2 = {
                x: -((this.ep.x - this.sp.x) / 3) + this.ep.x,
                y: this.ep.y
            };
        this.path.setAttribute("d", "M" + this.sp.x + "," + this.sp.y + " C" + c1.x + "," + c1.y + " " + c2.x + "," + c2.y + " " + this.ep.x + "," + this.ep.y);
    };

    remove() {
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
            this.path.parentNode.removeChild(this.path);
            this.path = null;
        }
    };

    moveEndPoint(point) {
        this.ep = point;
        this.setPath();
    }
}