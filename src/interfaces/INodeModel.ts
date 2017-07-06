import {INodeArguments} from "./INodeArguments";

export interface INodeModel {
    arguments: INodeArguments,
    values: [{
        valueID: number,
        value: any
    }];
    outputConnectors: [{
        nodeTo: number,
        valueTo: number
    }];
}