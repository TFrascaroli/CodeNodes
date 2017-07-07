import { NodeValue } from "./nodevalue";
import { NodeConnector } from "./nodeconnector";
import { Point } from "./point";
import { INodeArguments } from "./interfaces/INodeArguments";
import { INodeModel } from "./interfaces/INodeModel";
export declare class Node {
    private rect;
    g: SVGGElement;
    private output;
    private closeBtn;
    private built;
    outputOffset: Point;
    private outputText;
    private values;
    position: Point;
    options: INodeArguments;
    private nRows;
    onmousedown: Function;
    outputMousedown: Function;
    rectDownHandler: EventListenerOrEventListenerObject;
    outputConnectors: Array<NodeConnector>;
    outputDownHandler: EventListenerOrEventListenerObject;
    private close;
    onremove: Function;
    constructor(opts: INodeArguments);
    private setValueDefaults(v);
    private collectionValueOf(v);
    render(parent: SVGElement): void;
    cloneLastValue(): void;
    move(x: any, y: any): void;
    serialize(): INodeModel;
    findValue(id: number): NodeValue;
    setValues(vs: {
        valueID: number;
        value: any;
    }[]): void;
    build(): any;
    remove(): void;
}
