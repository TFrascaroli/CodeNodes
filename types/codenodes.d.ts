import { Node } from "./node";
import { ICodeNodesType } from "./interfaces/ICodeNodesType";
import { ICodeNodesModel } from "./interfaces/ICodeNodesModel";
export declare class CodeNodes {
    private canvas;
    types: ICodeNodesType[];
    private menu;
    private menuPoint;
    private nodesCount;
    constructor(types: ICodeNodesType[]);
    getSVG(): SVGSVGElement;
    init(): void;
    center(): void;
    clear(): void;
    findType(tID: string): ICodeNodesType;
    private collectionTypeOf(t);
    addNode(name: string, type: string): void;
    private collectionBuilder();
    private collectionClone(arr);
    addCollection(name: any, ofType: string): void;
    serialize(): ICodeNodesModel;
    parse(model: ICodeNodesModel): void;
    getOfType(type: string): Node[];
}
