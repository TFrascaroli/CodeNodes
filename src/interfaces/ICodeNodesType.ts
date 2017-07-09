import {ICodeNodesValueSchema as schema} from "./ICodeNodesValueSchema";

export interface ICodeNodesType {
    id: string;
    name: string;
    description: string;
    builder: Function;
    clone?: Function;
    clonable?: boolean;
    outputType: string;
    outputMultiple?: boolean;
    schema: Array<schema>;
    ondrop?: Function;
};