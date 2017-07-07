import { Node } from "./node";
import { Point } from "./point";
import { NodeValue } from "./nodevalue";
export declare class NodeConnector {
    end1: Node;
    end2: NodeValue;
    sp: Point;
    ep: Point;
    path: SVGPathElement;
    constructor(sp: Point, node: Node);
    setPath(): void;
    remove(): void;
    moveEndPoint(point: any): void;
}
