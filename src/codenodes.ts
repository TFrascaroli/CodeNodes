import {NodeCanvas} from "./nodecanvas";
import {CodeNodesMenu} from "./menu";
import {Point} from "./point";
import {ICodeNodesType} from "./interfaces/ICodeNodesType";
import {ICodeNodesValueSchema} from "./interfaces/ICodeNodesValueSchema";
import {ICodeNodesModel} from "./interfaces/ICodeNodesModel";

 export class CodeNodes {
    
    private canvas: NodeCanvas;
    public types:ICodeNodesType[];
    private menu: CodeNodesMenu;
    private menuPoint: Point;
    private nodesCount: number = 0;


    constructor (types: ICodeNodesType[]) {
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

    private collectionTypeOf (t: ICodeNodesType): ICodeNodesType{
        return {
            id: t.id,
            name: t.name,
            description: "(Collection) " + t.description,
            builder: this.collectionBuilder,
            clone: this.collectionClone,
            clonable: t.clonable,
            outputType: t.outputType,
            outputMultiple: true,
            schema: [
                <ICodeNodesValueSchema>{
                    name: " - " + t,
                    type: t.id,
                    mode: "in",
                    options: null,
                    multiple: false
                }
            ]
        };
    }

    public addNode (name: string, type: string) {
        let t: ICodeNodesType = this.types[type];
        if (t) {
            let outputType = t.outputType || type;
            let ot: ICodeNodesType = this.types[outputType];
            if (ot) {
                let p = this.menuPoint || {x: 10, y: 10};
                this.canvas.addNode({
                    id: this.nodesCount++,
                    title: name,
                    type: t,
                    isCollection: false,
                    x: p.x,
                    y: p.y
                });
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
        let t: ICodeNodesType = this.types[ofType];
        if (t) {
            let outputType = t.outputType || ofType;
            let ot: ICodeNodesType = this.types[outputType];
            if (ot) {

                let p = this.menuPoint || {x: 10, y: 10};
                //name, this.collectionBuilder, collectionSchema, ofType, ot.clonable || false, this.collectionClone, true, outputType, p.x, p.y
                this.canvas.addNode({
                    id: this.nodesCount++,
                    title: name,
                    type: this.collectionTypeOf(t),
                    isCollection: true,
                    x: p.x,
                    y: p.y
                });
            } else {
                console.log("There is no type " + outputType + " registered. Can not assign output type.");
            }
        } else {
            console.log("There is no type " + ofType + " registered");
        }
    };

    serialize (): ICodeNodesModel {
        return {
            nodes: this.canvas.serialize(),
            transform: this.canvas.getTransform()
        };
    };

    parse (model: ICodeNodesModel) {
        let self = this;
        this.canvas.setTransform(model.transform);
        model.nodes.forEach(nm => {
            self.canvas.parse(model.nodes);
        });
    }
}