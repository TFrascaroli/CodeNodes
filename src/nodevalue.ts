import {Node} from "./node";
import {Point} from "./point";
import {NodeConnector} from "./nodeconnector";
import {ICodeNodesValueSchema} from "./interfaces/ICodeNodesValueSchema";

const namespace = "http://www.w3.org/2000/svg";
const ROW_HEIGHT = 38;

export class NodeValue {
    public parentNode: Node;
    private dot : SVGCircleElement;
    private gOffset: Point;
    public inputConnector: NodeConnector;
    public __internalGetValue: Function;
    public __internalSetValue: Function;
    private svgEntity: SVGGElement;
    public options: ICodeNodesValueSchema;
    private popup: HTMLDivElement = null;



    constructor (opts: ICodeNodesValueSchema, node: Node){
        this.options = opts;
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
            if (this.options.mode === "edit") {
                let rect = document.createElementNS(namespace, "rect"),
                    fo = document.createElementNS(namespace, "foreignObject"),
                    name = document.createElementNS(namespace, "text"),
                    div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                name.textContent = this.options.name;
                name.setAttribute("x", "10");
                name.setAttribute("y", "6");
                rect.setAttribute("x", "1");
                div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                let input = document.createElement("input");
                switch(this.options.type) {
                    case "range":
                        input.min = this.options[0];
                        input.max = this.options[1];
                    case "text":
                    case "number":
                    case "email":
                   case "date":
                   case "color":
                        this.__internalGetValue = function () {
                            return input.value;
                        };
                        this.__internalSetValue = function (v: string) {
                            input.value = v;
                        };
                        input.type = this.options.type;
                        div.appendChild(input);
                        break;
                   case "checkbox":
                        this.__internalGetValue = function () {
                            return input.checked;
                        };
                        this.__internalSetValue = function (v: boolean) {
                            input.checked = v;
                        };
                        input.type = "checkbox";
                        div.appendChild(input);
                        break;
                    case "select":
                        let div_select = document.createElement("select");
                        this.options.options.forEach( op =>{
                            let div_option = document.createElement("option");
                            div_option.textContent =op.show.toString();
                            div_option.setAttribute("value", op.save);
                            div_select.appendChild(div_option);
                        });
                        this.__internalGetValue = function () {
                            return div_select.value;
                        };
                        this.__internalSetValue = function (v: string) {
                            input.value = v;
                        };
                        div.appendChild(div_select);
                        break;
                    case "popup":
                        let btn = document.createElement("button");
                        btn.classList.add("popup-btn");
                        btn.textContent = "*Edit";
                        let popup = document.createElement("div");
                        popup.classList.add("codenodes-popup");
                        this.popup = popup;
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
                        this.__internalSetValue = function (v: string) {
                            popupTextArea.textContent = v;
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

            if (this.options.mode === "in") {
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
                name.textContent = this.options.name;
                name.setAttribute("x", "10");
                name.setAttribute("y", "8");
                if (this.options.multiple) {
                    type.textContent = "[" + this.options.type + "]";
                } else {
                    type.textContent = this.options.type;
                }
				type.classList.add("value-type");
                type.setAttribute("x", "10");
                type.setAttribute("y", "25");
				this.__internalGetValue = function (serializing) {
					if (!serializing && self.inputConnector) {
                        let built = self.inputConnector.end1.build();
                        if (self.options.multiple && !self.inputConnector.end1.options.type.outputMultiple) {
                            return [built];
                        } else {
						    return built;
                        }
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

    getSerializedValue () {
        if (this.options.mode === "edit" && this.__internalGetValue instanceof Function) {
            return this.__internalGetValue();
        }
        return null;
    }

    getDotPosition(){
        return {
            x: this.parentNode.position.x + this.gOffset.x - 1,
            y: this.parentNode.position.y + this.gOffset.y + 16
        };
    };

    remove() {
        if (this.inputConnector) {
            this.inputConnector.remove();
            this.inputConnector = null;
        }
        this.svgEntity.remove();
        this.svgEntity = null;
        if (this.popup) {
            document.body.removeChild(this.popup);
        }
        this.parentNode = null;
    }

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
