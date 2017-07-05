import {NodeValue} from "./nodevalue";
import {NodeConnector} from "./nodeconnector";
import {Point} from "./point";
import {ICodeNodesValueSchema} from "./ICodeNodesValueSchema";


const namespace = "http://www.w3.org/2000/svg";
const ROW_HEIGHT = 38;

export class Node {

    private title: string;
    private rect: SVGRectElement;
    public g: SVGGElement;
    private output: SVGCircleElement;
    private closeBtn: SVGCircleElement;
    private built: any;
    private builder: Function;
    private clonefn: Function;
    private clonable: boolean;
    private outputOffset: Point;
    public type: string;
    private values: {[valueName:string]:NodeValue};
    public position: Point;
    private schema: Array<ICodeNodesValueSchema>; // Canviar això a l'interfície correcta.
    private nRows: number;
    public onmousedown: Function;
    public outputMousedown: Function;
    public rectDownHandler: EventListenerOrEventListenerObject;
    public outputConnectors: Array<NodeConnector>;
    public outputDownHandler: EventListenerOrEventListenerObject;
    private close: EventListenerOrEventListenerObject;
    public onremove: Function;


    constructor(title: string, builder, schema, type, clonable, clonefn, x, y) {
        let self = this;
        this.title = title;
        this.type = type;
        this.values = {};
        this.clonefn = clonefn;
        this.clonable = clonable;
        this.builder = builder;
        this.position = {
            x: x,
            y: y
        };
        this.schema = schema;
        this.nRows = this.schema.length + 2;
        this.onmousedown = null;
        this.outputConnectors = [];
        this.schema.forEach(function(prop) {
            self.values[prop.name] = new NodeValue(prop.name, prop.type, prop.mode, self, prop.options);
        });
    };

    render(parent: SVGElement) {
        let self = this;
        if (!this.g) {
            this.g = document.createElementNS(namespace, "g");
            this.g.setAttribute("transform", "translate(" + this.position.x + "," + this.position.y + ")");
            this.g.setAttribute("class", "entity");

            this.rect = document.createElementNS(namespace, "rect");
            this.rect.setAttribute("width", "110");
            this.rect.setAttribute("rx", "3");
            this.rect.setAttribute("height", ((this.nRows * ROW_HEIGHT) + 2).toString());
            this.rect.setAttribute("class", "draggable");
            this.rectDownHandler = function(evt) {
                if (this.onmousedown instanceof Function) {
                    this.onmousedown(evt, this);
                }
            }.bind(this);
            this.rect.addEventListener("mousedown", this.rectDownHandler);


            let t = document.createElementNS(namespace, "text");
            t.textContent = this.title;
            t.classList.add("title");
            t.setAttribute("x", "5");
            t.setAttribute("y", "15");

            this.g.appendChild(this.rect);
            this.g.appendChild(t);

            let output = document.createElementNS(namespace, "circle");
            this.output = output;
            this.outputOffset = {
                x: 110,
                y: (this.nRows * ROW_HEIGHT) - 10
            };
            output.setAttribute("cx", (this.outputOffset.x).toString());
            output.setAttribute("cy", (this.outputOffset.y).toString());
            output.setAttribute("r", "6");
            output.setAttribute("class", "output");
            this.outputDownHandler = function(evt) {
                if (this.outputMousedown instanceof Function) {
                    this.outputMousedown(evt, this);
                }
            }.bind(this);
            output.addEventListener("mousedown", this.outputDownHandler);
            let outputType = document.createElementNS(namespace, "text");
            outputType.textContent = "[" + this.type + "]";
            outputType.classList.add("output-type");
            outputType.setAttribute("x", (100).toString());
            outputType.setAttribute("y", (this.outputOffset.y).toString());
            this.g.appendChild(output);
            this.g.appendChild(outputType);


            this.closeBtn = document.createElementNS(namespace, "circle");
            this.closeBtn.classList.add("close-btn");
            this.closeBtn.setAttribute("cx", "100");
            this.closeBtn.setAttribute("r", "6");
            this.closeBtn.setAttribute("cy", "15");
        	this.close = function() {
				this.remove();
            }.bind(this);
            this.closeBtn.addEventListener("click", this.close);
            this.g.appendChild(this.closeBtn);

            parent.appendChild(this.g);
        }
        let i = 1;

        Object.keys(this.values).forEach(function(k) {
            if (self.values.hasOwnProperty(k)) {
                let val = self.values[k];
                val.render(self.g, i++);
            }
        });
    };

    move(x, y) {
        let self = this;
        this.position = {
            x: x,
            y: y
        };
        this.outputConnectors.forEach(function(con) {
            con.sp = {
                x: x + self.outputOffset.x,
                y: y + self.outputOffset.y
            };
            con.setPath();
        });

        Object.keys(this.values).forEach(function(k) {
            if (self.values.hasOwnProperty(k)) {
                let val = self.values[k];
                val.updateConectorPosition();
            }
        });
        this.g.setAttribute("transform", "translate(" + this.position.x + "," + this.position.y + ")");
    };

    build() {
        if (!this.built) {
			var valuesArr = [],
				propsOnBuild = [],
				self = this;
			propsOnBuild = this.schema.filter(function(p) {
				return p.onBuild;
			});
			valuesArr = propsOnBuild.map(function(p) {
				return self.values[p.name].getValue();
			});
			this.built =  this.builder.apply(this, valuesArr);
			return this.built;
		} else {
			if (this.clonable) {
				return this.clonefn(this.built);
			} else {
				return this.built;
			}
		}
    };

    remove() {
        let self = this;
        Object.keys(this.values).forEach(function(k) {
            if (self.values.hasOwnProperty(k)) {
                let val = self.values[k];
                if (val.inputConnector) {
                    val.inputConnector.remove();
                };
            }
        });
        [].concat(this.outputConnectors).forEach(function(con) {
            con.remove();
        });
		if (this.onremove instanceof Function) {
			this.onremove();
		}
        this.closeBtn.removeEventListener("click", this.close);
        this.rect.removeEventListener("mousedown", this.rectDownHandler);
        this.output.addEventListener("mousedown", this.outputDownHandler);
    };
}