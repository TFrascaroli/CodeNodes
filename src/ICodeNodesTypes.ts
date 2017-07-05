import {ICodeNodesValueSchema as schema} from "./ICodeNodesValueSchema";

export interface ICodeNodesTypes {
    builder: Function;
    clone: Function;
    clonable: boolean;
    schema: Array<schema>;
};