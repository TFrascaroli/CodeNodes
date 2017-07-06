"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var CodeNodesMenu = (function () {
    function CodeNodesMenu(main) {
        var self = this;
        var addMode = null;
        this.main = main;
        this.g = document.createElementNS(namespace, "g");
        this.g.classList.add("menu-g");
        var popup = document.createElement("div");
        popup.classList.add("codenodes-menu-popup");
        this.popup = popup;
        var popupLayer = document.createElement("div");
        popupLayer.classList.add("layer");
        var popupContent = document.createElement("div");
        popupContent.classList.add("content");
        var popupWraper = document.createElement("div");
        popupWraper.classList.add("wraper");
        var popupTitle = document.createElement("div");
        popupTitle.classList.add("title");
        var entitySelector = document.createElement("select");
        var entitySelectorWrap = document.createElement("div");
        entitySelectorWrap.classList.add("entity-selector");
        var entityName = document.createElement("input");
        var entityNameWrap = document.createElement("div");
        entitySelectorWrap.classList.add("entity-name");
        var popupOK = document.createElement("div");
        popupOK.classList.add("ok");
        popup.appendChild(popupLayer);
        popup.appendChild(popupWraper);
        popupWraper.appendChild(popupContent);
        entityNameWrap.appendChild(entityName);
        popupContent.appendChild(entityNameWrap);
        entitySelectorWrap.appendChild(entitySelector);
        popupContent.appendChild(entitySelectorWrap);
        popupContent.appendChild(popupOK);
        document.body.appendChild(popup);
        popupOK.addEventListener("click", function () {
            self.close();
            switch (addMode) {
                case "node":
                    main.addNode(entityName.value, entitySelector.value);
                    break;
                case "collection":
                    main.addCollection(entityName.value, entitySelector.value);
                    break;
            }
        });
        function fillEntitySelector() {
            entitySelector.innerHTML = "";
            entitySelector.value = "";
            var types = Object.keys(self.main.types).filter(function (p) { return self.main.types.hasOwnProperty(p); });
            types.forEach(function (t) {
                var opt = document.createElement("option");
                opt.textContent = t;
                opt.value = t;
                entitySelector.appendChild(opt);
            });
        }
        var _loop_1 = function (i) {
            var rect = document.createElementNS(namespace, "rect"), t = document.createElementNS(namespace, "text");
            rect.classList.add("menu-rect");
            t.classList.add("menu-t");
            rect.setAttribute("x", (5).toString());
            rect.setAttribute("y", (35 * i).toString());
            t.setAttribute("x", (10).toString());
            t.setAttribute("y", ((35 * i) + 19).toString());
            self.g.appendChild(rect);
            self.g.appendChild(t);
            switch (i) {
                case 0:
                    t.textContent = "Add node";
                    rect.addEventListener("click", function (evt) {
                        popupTitle.textContent = t.textContent;
                        entityName.value = "New node";
                        entityName.focus();
                        fillEntitySelector();
                        addMode = "node";
                        popup.classList.add("visible");
                        evt.stopPropagation();
                    });
                    break;
                case 1:
                    t.textContent = "Add collection";
                    rect.addEventListener("click", function (evt) {
                        popupTitle.textContent = t.textContent;
                        entityName.value = "New collection";
                        entityName.focus();
                        fillEntitySelector();
                        addMode = "collection";
                        popup.classList.add("visible");
                        evt.stopPropagation();
                    });
                    break;
                case 2:
                    t.textContent = "Center";
                    rect.addEventListener("click", function (evt) {
                        main.center();
                        self.close();
                        evt.stopPropagation();
                    });
                    break;
                case 3:
                    t.textContent = "Reset";
                    break;
            }
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    }
    CodeNodesMenu.prototype.open = function (x, y) {
        this.g.classList.add("visible");
        this.g.setAttribute("transform", "translate(" + x.toString() + "," + y.toString() + ")");
        this.g.classList.add("visible");
    };
    CodeNodesMenu.prototype.close = function () {
        this.popup.classList.remove("visible");
        this.g.classList.remove("visible");
    };
    return CodeNodesMenu;
}());
exports.CodeNodesMenu = CodeNodesMenu;

//# sourceMappingURL=menu.js.map
