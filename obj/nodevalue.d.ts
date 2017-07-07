import { Node } from "./node";
import { NodeConnector } from "./nodeconnector";
import { ICodeNodesValueSchema } from "./interfaces/ICodeNodesValueSchema";
export declare class NodeValue {
    parentNode: Node;
    private dot;
    private gOffset;
    inputConnector: NodeConnector;
    __internalGetValue: Function;
    __internalSetValue: Function;
    private svgEntity;
    options: ICodeNodesValueSchema;
    private popup;
    constructor(opts: ICodeNodesValueSchema, node: Node);
    render(parent: SVGElement, position: number): void;
    getSerializedValue(): any;
    getDotPosition(): {
        x: number;
        y: number;
    };
    remove(): void;
    updateConectorPosition(): void;
    getValue(): any;
}
