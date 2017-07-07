import { INodeModel } from "./INodeModel";
export interface ICodeNodesModel {
    nodes: INodeModel[];
    transform: {
        pan: {
            x: number;
            y: number;
        };
        zoom: number;
    };
}
