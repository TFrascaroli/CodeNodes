import {Node} from "./node";
import {Point} from "./point";
import {NodeConnector} from "./nodeconnector";

const namespace = "http://www.w3.org/2000/svg";
const ROW_HEIGHT = 38;

export class NodeValue {

    private name: string;
    public type: string;
    public parentNode: Node;
    private dot : SVGCircleElement;
    private gOffset: Point;
    public inputConnector: NodeConnector;
    private mode: string;
    public __internalGetValue: Function;
    private svgEntity: SVGGElement;
    private options: Array<any>;
    public multiple: boolean;



    constructor (name: string, type:string, mode: string, node: Node, options: any, multiple: boolean){
        this.name = name;
        this.type = type;
        this.mode = mode;
        this.multiple = multiple;
        this.options = options;
        this.inputConnector = null;
		this.__internalGetValue = null;
        this.svgEntity = null;
        this.gOffset = null;
        this.parentNode = node;
    }

    render(parent: SVGElement, position: number) {
        let self = this;
        if (!this.svgEntity) {
            let ent = document.createElementNS(namespace, "g");
            this.gOffset = {
                x: 1,
                y: ((position * ROW_HEIGHT) + 1)
            };
            ent.setAttribute("transform", "translate(" + this.gOffset.x + ", " + this.gOffset.y + ")");
            ent.setAttribute("class", "row");
            if (this.mode === "edit") {
                let rect = document.createElementNS(namespace, "rect"),
                    fo = document.createElementNS(namespace, "foreignObject"),
                    name = document.createElementNS(namespace, "text"),
                    div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                name.textContent = this.name;
                name.setAttribute("x", "10");
                name.setAttribute("y", "6");
                rect.setAttribute("x", "1");
                div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                let input = document.createElement("input");
                switch(this.type) {
                    case "range":
                        this.__internalGetValue = function () {
                                input.min = this.options[0];
                                input.max = this.options[1];
                                if(input.value <= input.max && input.value >= input.min) {
                                    return input.value;
                                } else {
                                    // error range?
                                }
                        };
                        input.type = this.type;
                        div.appendChild(input);
                        break;
                    case "text":
                        this.__internalGetValue = function () {
                            return input.value;
                        };
                        input.type = this.type;
                        div.appendChild(input);
                        break;
                    case "number":
                        this.__internalGetValue = function () {
                                return input.value;
                        };
                        input.type = this.type;
                        div.appendChild(input);
                        break;
                    case "email":
                        this.__internalGetValue = function () {
                            return input.value;
                        };
                        input.type = this.type;
                        div.appendChild(input);
                        break;
                   case "date":
                        this.__internalGetValue = function () {
                                return input.value;
                            };
                        input.type = this.type;
                        div.appendChild(input);
                        break;
                   case "color":
                        this.__internalGetValue = function () {
                                console.log(input.value);
                                return input.value;
                            };
                        input.type = this.type;
                        div.appendChild(input);
                        break;
                    case "select":
                        let div_select = document.createElement("select");
                        this.options.forEach( op =>{
                            let div_option = document.createElement("option");
                            div_option.textContent =op.show.toString();
                            div_option.setAttribute("value", op.save);
                            div_select.appendChild(div_option);
                        });
                        this.__internalGetValue = function () {
                            return div_select.value;
                        };
                        div.appendChild(div_select);
                        break;
                    case "popup":
                        let btn = document.createElement("button");
                        btn.classList.add("popup-btn");
                        btn.textContent = "*Edit";
                        let popup = document.createElement("div");
                        popup.classList.add("codenodes-popup");
                        let popupLayer = document.createElement("div");
                        popupLayer.classList.add("layer");
                        let popupContent = document.createElement("div");
                        popupContent.classList.add("content");
                        let popupWraper = document.createElement("div");
                        popupWraper.classList.add("wraper");
                        let popupTextArea = document.createElement("div");
                        popupTextArea.classList.add("text");
                        popupTextArea.setAttribute("contenteditable", "true");
                        let popupOK = document.createElement("div");
                        popupOK.classList.add("ok");
                        btn.addEventListener("click", function () {
                            popup.classList.add("visible");
                        });
                        let fnClose = function () {
                            popup.classList.remove("visible");
                        }

                        popup.appendChild(popupLayer);
                        popup.appendChild(popupWraper);
                        popupWraper.appendChild(popupContent);
                        popupContent.appendChild(popupTextArea);
                        popupContent.appendChild(popupOK);
                        
                        popupOK.addEventListener("click", fnClose);
                        
                        this.__internalGetValue = function () {
                            return popupTextArea.textContent;
                        };
                        document.body.appendChild(popup);
                        div.appendChild(btn);
                        break;
                }
                fo.appendChild(div);
                fo.setAttribute("transform", "translate(0,13)");
                //ent.appendChild(rect);
                ent.appendChild(name);
                ent.appendChild(fo);
            }

            if (this.mode === "in") {
                let name = document.createElementNS(namespace, "text"),
                    type = document.createElementNS(namespace, "text"),
                    dot = document.createElementNS(namespace, "circle");

                dot.setAttribute("cx", "-1");
                dot.setAttribute("cy", "16");
                dot.setAttribute("r", "4");
                dot.setAttribute("class", "dot");
                dot.addEventListener("click", function(evt) {
                    if (self.inputConnector) {
                        self.inputConnector.remove();
                    }
                    evt.stopPropagation();
                });
                dot["parentValue"] = this;
                name.textContent = this.name;
                name.setAttribute("x", "10");
                name.setAttribute("y", "8");
                if (this.multiple) {
                    type.textContent = "[" + this.type + "]";
                } else {
                    type.textContent = this.type;
                }
				type.classList.add("value-type");
                type.setAttribute("x", "10");
                type.setAttribute("y", "25");
				this.__internalGetValue = function () {
					if (this.inputConnector) {
						return this.inputConnector.end1.build();
					}
					return undefined
				};

                ent.appendChild(name);
                ent.appendChild(type);
                ent.appendChild(dot);
            }
            this.svgEntity = ent;
            parent.appendChild(ent);
        }
    };

    getDotPosition(){
        return {
            x: this.parentNode.position.x + this.gOffset.x - 1,
            y: this.parentNode.position.y + this.gOffset.y + 16
        };
    };

    updateConectorPosition() {
        if (this.inputConnector) {
            this.inputConnector.ep = this.getDotPosition();
            this.inputConnector.setPath();
        }
    }

    getValue() {
        if (this.__internalGetValue instanceof Function) {
			return this.__internalGetValue();
		}
		return null;
    }
}
