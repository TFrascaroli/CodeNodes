import {NodeCanvas} from "./nodecanvas";
import {ICodeNodesTypes} from "./ICodeNodesTypes";

class CodeNodes {
    
    private canvas: NodeCanvas;
    private types:ICodeNodesTypes;

    constructor (types: ICodeNodesTypes) {
        this.canvas = new NodeCanvas();
        this.types = types;
    };

    getSVG() {
        this.canvas.render();
        return this.canvas.svg;
    };

    init() {
        this.canvas.init();
    };

    addNode (name, type) {
        var t = this.types[type];
        if (t) {
            this.canvas.addNode(name, t.builder, t.schema, type, t.clonable || false, t.clone, 10, 10);
        } else {
            console.log("There is no type " + type + " registered");
        }
    };
}

export = {
    Interface: CodeNodes
};