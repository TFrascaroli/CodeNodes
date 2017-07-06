import {ICodeNodesValueSchema} from "./ICodeNodesValueSchema";
import {ICodeNodesType} from "./ICodeNodesType";


export interface INodeArguments {
    id: number;
    title: string;
    type: ICodeNodesType;
    isCollection: boolean;
    x: number;
    y: number;
}