import {NodeCanvas} from "./nodecanvas";
import {CodeNodesMenu} from "./menu";
import {Point} from "./point";
import {ICodeNodesTypes} from "./ICodeNodesTypes";
import {ICodeNodesValueSchema} from "./ICodeNodesValueSchema";

 export class CodeNodes {
    
    private canvas: NodeCanvas;
    public types:{(key: string): ICodeNodesTypes};
    private menu: CodeNodesMenu;
    private menuPoint: Point;


    constructor (types: {(key: string): ICodeNodesTypes}) {
        let self = this;
        this.canvas = new NodeCanvas();
        this.types = types;
        this.menu = new CodeNodesMenu(this);
        this.canvas.ondblclick = function (p: Point, rawP: Point) {
            self.menuPoint = p;
            self.menu.open(rawP.x + 20, rawP.y - 70);
        }
        this.canvas.onclick = function () {
            self.menu.close();
        }
    };

    getSVG () {
        this.canvas.render();
        return this.canvas.svg;
    };

    init () {
        this.canvas.init();
        this.canvas.svg.appendChild(this.menu.g);
    };

    center () {
        this.canvas.center();
    }

    public addNode (name, type) {
        let t = this.types[type];
        if (t) {
            let outputType = t.outputType || type;
            let ot: ICodeNodesTypes = this.types[outputType];
            if (ot) {
                let p = this.menuPoint || {x: 10, y: 10};
                this.canvas.addNode(name, t.builder, t.schema, type, t.clonable || false, t.clone, false, outputType, p.x, p.y);
            } else {
                console.log("There is no type " + outputType + " registered. Can not assign output type.");
            }
        } else {
            console.log("There is no type " + type + " registered");
        }
    };
    private collectionBuilder () {
        function flatten(arr) {
            return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
        }
        return flatten(arguments).filter(function (v) {
            return typeof v !== "undefined";
        });
    };
    private collectionClone (arr) {
        return arr;
        // return arr.map(function (e) {
        //     return e.clone()
        // }); TODO: Arreglar això
    };
    public addCollection (name, ofType: string) {
        let t: ICodeNodesTypes = this.types[ofType];
        if (t) {
            let outputType = t.outputType || ofType;
            let ot: ICodeNodesTypes = this.types[outputType];
            if (ot) {
                let collectionSchema: Array<ICodeNodesValueSchema> = [
                    {
                        onBuild: true,
                        name: " - " + ofType,
                        type: ofType,
                        mode: "in",
                        options: null,
                        multiple: false
                    }
                ];
                let p = this.menuPoint || {x: 10, y: 10};
                this.canvas.addNode(name, this.collectionBuilder, collectionSchema, ofType, ot.clonable || false, this.collectionClone, true, outputType, p.x, p.y);
            } else {
                console.log("There is no type " + outputType + " registered. Can not assign output type.");
            }
        } else {
            console.log("There is no type " + ofType + " registered");
        }
    };
}