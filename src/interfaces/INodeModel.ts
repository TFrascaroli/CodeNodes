import {INodeArgumentsReduced} from "./INodeArgumentsReduced";

export interface INodeModel {
    arguments: INodeArgumentsReduced,
    values: [{
        valueID: number,
        value: any
    }];
    outputConnectors: [{
        nodeTo: number,
        valueTo: number
    }];
}