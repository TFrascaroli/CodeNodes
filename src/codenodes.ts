import {NodeCanvas} from "./nodecanvas";
import {Node} from "./node";
import {CodeNodesMenu} from "./menu";
import {Point} from "./point";
import {ICodeNodesType} from "./interfaces/ICodeNodesType";
import {ICodeNodesValueSchema} from "./interfaces/ICodeNodesValueSchema";
import {INodeArguments} from "./interfaces/INodeArguments";
import {INodeModel} from "./interfaces/INodeModel";
import {ICodeNodesModel} from "./interfaces/ICodeNodesModel";

export class CodeNodes {
    
    public canvas: NodeCanvas;
    public types:ICodeNodesType[];
    public menu: CodeNodesMenu;
    private menuPoint: Point;
    private nodesCount: number = 0;


    constructor (types: ICodeNodesType[]) {
        let self = this;
        this.canvas = new NodeCanvas();
        this.setTypes(types);
        this.menu = new CodeNodesMenu(this);
        this.canvas.ondblclick = function (p: Point, rawP: Point) {
            self.menuPoint = p;
            self.menu.open(rawP.x + 20, rawP.y - 70);
        }
        this.canvas.onclick = function () {
            self.menu.close();
        }
    };

    setTypes (types: ICodeNodesType[]) {
        this.clear();
        this.types = types.map(t => {
            t.outputType = t.outputType || t.id;
            return t;
        }).sort((a, b) => {
            return b.name.localeCompare(a.name);
        }).reverse();
    }

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
    };

    clear () {
        this.canvas.clear();
    }

    findType (tID: string): ICodeNodesType {
        let i = 0, len = this.types.length;
        for(;i < len; i++) {
            if (this.types[i].id === tID) return this.types[i];
        }
        return null;
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
                    name: " - " + t.name,
                    type: t.id,
                    mode: "in",
                    options: null,
                    multiple: false
                }
            ]
        };
    }

    public addNode (name: string, type: string) {
        let t: ICodeNodesType = this.findType(type);
        if (t) {
            let ot: ICodeNodesType = this.findType(t.outputType);
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
                console.log("There is no type " + t.outputType + " registered. Can not assign output type.");
            }
        } else {
            console.log("There is no type " + type + " registered");
        }
    };
    private collectionBuilder () {
        function flatten (arrs) {
	        var ret = [];
            if (typeof arrs !== "undefined" && arrs.length) {
                arrs.forEach(e => {
                    flatten(e).forEach(en => {
                        ret.push(en);
                    });
                });
            } else {
                ret.push(arrs);
            }
	        return ret;
        }
        // function flatten(arr) {
        //     return arr.reduce(function (flat, toFlatten) {
        //     return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        //     }, []);
        // }
        return flatten(Array.prototype.slice.call(arguments)).filter(function (v) {
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
        let t: ICodeNodesType = this.findType(ofType);
        if (t) {
            let ot: ICodeNodesType = this.findType(t.outputType);
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
                console.log("There is no type " + t.outputType + " registered. Can not assign output type.");
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
        self.canvas.parse(model.nodes, this.types);
    }

    getOfType(type: string): Node[] {
        return this.canvas.getOfType(type);
    }
}