import { Point } from "./point";
import { Node } from "./node";
import { INodeArguments } from "./interfaces/INodeArguments";
import { ICodeNodesType } from "./interfaces/ICodeNodesType";
import { INodeModel } from "./interfaces/INodeModel";
export declare class NodeCanvas {
    private pt;
    svg: SVGSVGElement;
    private nodes;
    private currentConnector;
    private g;
    private paths;
    private draggingEntity;
    private diff;
    zoomingSvg: SvgPanZoom.Instance;
    ondblclick: Function;
    onclick: Function;
    private offset;
    private ctm;
    constructor();
    center(): void;
    cursorPoint(evt: any): SVGPoint;
    render(): void;
    getTransform(): {
        pan: {
            x: number;
            y: number;
        };
        zoom: number;
    };
    setTransform(transform: {
        pan: {
            x: number;
            y: number;
        };
        zoom: number;
    }): void;
    convertCoords(o: Point): {
        x: number;
        y: number;
    };
    addNode(opts: INodeArguments): Node;
    init(): void;
    serialize(): INodeModel[];
    parseConnectors(nodes: Array<INodeModel>): void;
    findNode(id: number): Node;
    findType(id: string, types: ICodeNodesType[]): ICodeNodesType;
    clear(): void;
    getTerminalNodes(): Node[];
    getOfType(type: string): Node[];
}
