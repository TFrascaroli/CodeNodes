import { NodeCanvas } from "./nodecanvas";
import { Node } from "./node";
import { CodeNodesMenu } from "./menu";
import { ICodeNodesType } from "./interfaces/ICodeNodesType";
import { ICodeNodesModel } from "./interfaces/ICodeNodesModel";
export declare class CodeNodes {
    canvas: NodeCanvas;
    types: ICodeNodesType[];
    menu: CodeNodesMenu;
    private menuPoint;
    private nodesCount;
    onclear: Function;
    constructor(types: ICodeNodesType[]);
    setTypes(types: ICodeNodesType[]): void;
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
