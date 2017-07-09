import {ICodeNodesValueSchema} from "./ICodeNodesValueSchema";
import {ICodeNodesType} from "./ICodeNodesType";


export interface INodeArgumentsReduced {
    id: number;
    title: string;
    type: string;
    isCollection: boolean;
    x: number;
    y: number;
}